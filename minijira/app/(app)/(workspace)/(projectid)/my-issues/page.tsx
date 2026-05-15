import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MyIssuesClient } from "./_components/MyIssuesClient";
import type { MyIssuesResponse } from "./_types";

const API_BASE = process.env.API_URL ?? "http://localhost:3001";

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function getSessionCookie(): Promise<string | null> {
  const cookieStore = cookies();
  // Supabase sets this cookie on the server after SSR auth
  const session = (await cookieStore).get("sb-access-token");
  return session?.value ?? null;
}

async function fetchInitialIssues(
  accessToken: string,
  searchParams: Record<string, string>
): Promise<MyIssuesResponse> {
  const params = new URLSearchParams({
    type: searchParams.tab ?? "issue",
    scope: searchParams.scope ?? "assigned",
    limit: "20",
    ...(searchParams.projectId && { projectId: searchParams.projectId }),
    ...(searchParams.priority && { priority: searchParams.priority }),
    ...(searchParams.status && { status: searchParams.status }),
    ...(searchParams.search && { search: searchParams.search }),
    ...(searchParams.groupBy && { groupBy: searchParams.groupBy }),
    ...(searchParams.cursor && { cursor: searchParams.cursor }),
  });

  const res = await fetch(`${API_BASE}/api/v1/issues/me?${params}`, {
    headers: {
      // Forward the Supabase JWT to Fastify for auth
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    // Next.js cache: revalidate every 30s (background refresh)
    next: { revalidate: 30 },
  });

  if (res.status === 401) redirect("/login");
  if (!res.ok) {
    // Return an empty response rather than crashing the page —
    // the client will show an error state and can retry
    return { data: [], nextCursor: null, hasMore: false, total: 0 };
  }

  return res.json();
}

async function fetchProjects(
  accessToken: string
): Promise<{ id: string; name: string }[]> {
  const res = await fetch(`${API_BASE}/api/v1/projects`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

// Fetch counts for both tabs (issues + tasks) for the tab badges
async function fetchTabCounts(
  accessToken: string,
  scope: string
): Promise<{ issues: number; tasks: number }> {
  const [issueRes, taskRes] = await Promise.all([
    fetch(
      `${API_BASE}/api/v1/issues/me?type=issue&scope=${scope}&limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` }, next: { revalidate: 30 } }
    ),
    fetch(
      `${API_BASE}/api/v1/issues/me?type=task&scope=${scope}&limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` }, next: { revalidate: 30 } }
    ),
  ]);

  const [issueJson, taskJson] = await Promise.all([
    issueRes.ok ? issueRes.json() : { total: 0 },
    taskRes.ok ? taskRes.json() : { total: 0 },
  ]);

  return { issues: issueJson.total ?? 0, tasks: taskJson.total ?? 0 };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Record<string, string>;
}

export default async function MyIssuesPage({ searchParams }: PageProps) {
  const accessToken = await getSessionCookie();
  if (!accessToken) redirect("/");

  const scope = searchParams.scope ?? "assigned";

  // Parallel server-side fetches
  const [initialData, projects, tabCounts] = await Promise.all([
    fetchInitialIssues(accessToken, searchParams),
    fetchProjects(accessToken),
    fetchTabCounts(accessToken, scope),
  ]);

  return (
    // Suspense boundary so loading.tsx handles the skeleton during navigation
    <Suspense>
      <MyIssuesClient
        initialData={initialData}
        projects={projects}
        issuesTotalCount={tabCounts.issues}
        tasksTotalCount={tabCounts.tasks}
      />
    </Suspense>
  );
}
