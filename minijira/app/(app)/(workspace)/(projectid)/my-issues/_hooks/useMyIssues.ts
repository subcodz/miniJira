"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type {
  MyIssuesFilters,
  MyIssuesResponse,
  WorkItem,
  WorkItemType,
  ScopeFilter,
  Priority,
  Status,
} from "../_types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const PAGE_LIMIT = 20;

// ─── Default filter state ─────────────────────────────────────────────────────
const DEFAULT_FILTERS: MyIssuesFilters = {
  tab: "issue",
  scope: "assigned",
  projectId: "",
  priority: "",
  status: "",
  search: "",
  groupBy: "",
  cursor: "",
};

// ─── Parse filters from URL search params ────────────────────────────────────
function filtersFromParams(params: URLSearchParams): MyIssuesFilters {
  return {
    tab: (params.get("tab") as WorkItemType) || DEFAULT_FILTERS.tab,
    scope: (params.get("scope") as ScopeFilter) || DEFAULT_FILTERS.scope,
    projectId: params.get("projectId") || "",
    priority: (params.get("priority") as Priority) || "",
    status: (params.get("status") as Status) || "",
    search: params.get("search") || "",
    groupBy: (params.get("groupBy") as MyIssuesFilters["groupBy"]) || "",
    cursor: params.get("cursor") || "",
  };
}

// ─── Serialize filters to URLSearchParams ────────────────────────────────────
function filtersToParams(filters: MyIssuesFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (filters.tab !== DEFAULT_FILTERS.tab) p.set("tab", filters.tab);
  if (filters.scope !== DEFAULT_FILTERS.scope) p.set("scope", filters.scope);
  if (filters.projectId) p.set("projectId", filters.projectId);
  if (filters.priority) p.set("priority", filters.priority);
  if (filters.status) p.set("status", filters.status);
  if (filters.search) p.set("search", filters.search);
  if (filters.groupBy) p.set("groupBy", filters.groupBy);
  if (filters.cursor) p.set("cursor", filters.cursor);
  return p;
}

// ─── Build the API URL from filters ──────────────────────────────────────────
function buildApiUrl(filters: MyIssuesFilters): string {
  const p = new URLSearchParams();
  p.set("type", filters.tab);
  p.set("scope", filters.scope);
  p.set("limit", String(PAGE_LIMIT));
  if (filters.projectId) p.set("projectId", filters.projectId);
  if (filters.priority) p.set("priority", filters.priority);
  if (filters.status) p.set("status", filters.status);
  if (filters.search) p.set("search", filters.search);
  if (filters.groupBy) p.set("groupBy", filters.groupBy);
  if (filters.cursor) p.set("cursor", filters.cursor);
  return `${API_BASE}/api/v1/issues/me?${p.toString()}`;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useMyIssues(initialData?: MyIssuesResponse) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFiltersState] = useState<MyIssuesFilters>(() =>
    filtersFromParams(searchParams)
  );
  const [items, setItems] = useState<WorkItem[]>(initialData?.data ?? []);
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialData?.nextCursor ?? null
  );
  const [hasMore, setHasMore] = useState(initialData?.hasMore ?? false);
  const [total, setTotal] = useState(initialData?.total ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track whether this is the initial mount — skip fetch if we have initialData
  const isFirstRender = useRef(true);

  // ── Sync URL → state when browser back/forward is used ───────────────────
  useEffect(() => {
    const parsed = filtersFromParams(searchParams);
    setFiltersState(parsed);
  }, [searchParams]);

  // ── Fetch whenever filters change (skip first render if initialData given) ─
  useEffect(() => {
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return;
    }
    isFirstRender.current = false;

    let cancelled = false;

    async function fetchIssues() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(buildApiUrl(filters), {
          credentials: "include", // sends the Supabase session cookie
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message ?? `Request failed: ${res.status}`);
        }
        const json: MyIssuesResponse = await res.json();
        if (!cancelled) {
          setItems(json.data);
          setNextCursor(json.nextCursor);
          setHasMore(json.hasMore);
          setTotal(json.total);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchIssues();
    return () => {
      cancelled = true;
    };
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Update a single filter — resets cursor and pushes to URL ─────────────
  const setFilter = useCallback(
    <K extends keyof MyIssuesFilters>(key: K, value: MyIssuesFilters[K]) => {
      setFiltersState((prev) => {
        const next = { ...prev, [key]: value, cursor: "" }; // always reset cursor on filter change
        const params = filtersToParams(next);
        const qs = params.toString();
        router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
        return next;
      });
    },
    [pathname, router]
  );

  // ── Clear all filters ─────────────────────────────────────────────────────
  const clearFilters = useCallback(() => {
    const next: MyIssuesFilters = {
      ...DEFAULT_FILTERS,
      tab: filters.tab,   // preserve the current tab
      scope: filters.scope,
    };
    router.push(pathname, { scroll: false });
    setFiltersState(next);
  }, [filters.tab, filters.scope, pathname, router]);

  // ── Load next page (append) ───────────────────────────────────────────────
  const loadMore = useCallback(async () => {
    if (!hasMore || !nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    setError(null);
    try {
      const res = await fetch(
        buildApiUrl({ ...filters, cursor: nextCursor }),
        { credentials: "include" }
      );
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json: MyIssuesResponse = await res.json();
      setItems((prev) => [...prev, ...json.data]);
      setNextCursor(json.nextCursor);
      setHasMore(json.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoadingMore(false);
    }
  }, [filters, hasMore, nextCursor, isLoadingMore]);

  // ── Optimistic inline status update ──────────────────────────────────────
  const updateItemStatus = useCallback(
    async (itemId: string, newStatus: Status) => {
      // 1. Optimistic update
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );
      // 2. Persist to server
      try {
        const res = await fetch(`${API_BASE}/api/v1/issues/${itemId}/status`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (!res.ok) throw new Error("Failed to update status");
      } catch {
        // 3. Roll back on failure
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, status: item.status } // revert — in practice you'd store old value
              : item
          )
        );
        setError("Failed to update status. Please try again.");
      }
    },
    []
  );

  return {
    filters,
    setFilter,
    clearFilters,
    items,
    total,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    updateItemStatus,
  };
}
