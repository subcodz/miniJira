
// These functions will call your Fastify API endpoints once they're built.
// Replace each function body with a real fetch() call in Phase 2/3.

import { DashboardData, DashboardTask, Meeting, TaskStats } from "@/types/dashboard";

const FASTIFY_BASE = process.env.FASTIFY_URL ?? "http://localhost:3001";

// ─── Mock data (swap these out as you build endpoints) ────────────────────────

const MOCK_TASKS: DashboardTask[] = [
  {
    id: "1",
    title: "Set up Fastify auth middleware",
    priority: "high",
    dueDate: "2026-04-29",
    status: "in_progress",
    projectKey: "MJ-12",
  },
  {
    id: "2",
    title: "Schema migration for issues table",
    priority: "high",
    dueDate: new Date().toISOString().split("T")[0], // today
    status: "todo",
    projectKey: "MJ-15",
  },
  {
    id: "3",
    title: "Wire Redis pub/sub adapter",
    priority: "medium",
    dueDate: "2026-05-03",
    status: "todo",
    projectKey: "MJ-18",
  },
  {
    id: "4",
    title: "Build kanban drag-and-drop UI",
    priority: "low",
    dueDate: "2026-05-07",
    status: "todo",
    projectKey: "MJ-21",
  },
];

const MOCK_MEETINGS: Meeting[] = [
  {
    id: "1",
    title: "Sprint planning",
    attendees: "Team",
    startTime: "10:00",
    durationMinutes: 30,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "2",
    title: "Backend architecture review",
    attendees: "Mentor",
    startTime: "14:30",
    durationMinutes: 60,
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "3",
    title: "Standup sync",
    attendees: "Team",
    startTime: "11:00",
    durationMinutes: 45,
    date: "2026-05-02",
  },
  {
    id: "4",
    title: "Design review",
    attendees: "Team",
    startTime: "16:00",
    durationMinutes: 60,
    date: "2026-05-05",
  },
];

const MOCK_STATS: TaskStats = {
  done: 12,
  inProgress: 8,
  todo: 15,
  overdue: 3,
  blocked: 2,
};

// ─── Fetchers ─────────────────────────────────────────────────────────────────

/**
 * Fetch nearest due tasks assigned to the current user.
 *
 * TODO (Phase 2): Replace with:
 *   const res = await fetch(`${FASTIFY_BASE}/api/v1/issues?assignee=me&sort=dueDate&limit=5`, {
 *     headers: { Authorization: `Bearer ${token}` },
 *     next: { revalidate: 60 },
 *   });
 *   return res.json();
 */
export async function getNearestTasks(
  _userId: string
): Promise<DashboardTask[]> {
  return MOCK_TASKS;
}

/**
 * Fetch upcoming meetings for the current user.
 *
 * TODO (Phase 4): Replace with Google Calendar API call via your Fastify
 *   /api/v1/calendar/upcoming endpoint.
 */
export async function getUpcomingMeetings(_userId: string): Promise<Meeting[]> {
  return MOCK_MEETINGS;
}

/**
 * Fetch aggregate task stats for the current user.
 *
 * TODO (Phase 2): Replace with:
 *   const res = await fetch(`${FASTIFY_BASE}/api/v1/issues/stats?assignee=me`, {
 *     headers: { Authorization: `Bearer ${token}` },
 *     next: { revalidate: 120 },
 *   });
 *   return res.json();
 */
export async function getTaskStats(_userId: string): Promise<TaskStats> {
  return MOCK_STATS;
}

/**
 * Convenience: fetch everything in parallel.
 */
export async function getDashboardData(userId: string): Promise<DashboardData> {
  const [tasks, meetings, stats] = await Promise.all([
    getNearestTasks(userId),
    getUpcomingMeetings(userId),
    getTaskStats(userId),
  ]);
  return { tasks, meetings, stats };
}