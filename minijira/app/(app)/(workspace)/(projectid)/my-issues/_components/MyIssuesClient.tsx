"use client";

import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMyIssues } from "../_hooks/useMyIssues";
import { FiltersBar } from "./FiltersBar";
import { IssuesTable } from "./IssuesTable";
import { BulkActionBar } from "./BulkActionBar";
import type { MyIssuesResponse, ScopeFilter, WorkItemType, Status } from "../_types";

const SCOPE_OPTIONS: { value: ScopeFilter; label: string }[] = [
  { value: "assigned", label: "Assigned" },
  { value: "created", label: "Created" },
  { value: "mentioned", label: "Mentioned" },
];

const TYPE_OPTIONS: { value: WorkItemType; label: string }[] = [
  { value: "issue", label: "Issues" },
  { value: "task", label: "Tasks" },
];

interface MyIssuesClientProps {
  initialData: MyIssuesResponse;
  projects: { id: string; name: string }[];
  issuesTotalCount: number;
  tasksTotalCount: number;
}

export function MyIssuesClient({
  initialData,
  projects,
  issuesTotalCount,
  tasksTotalCount,
}: MyIssuesClientProps) {
  const {
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
  } = useMyIssues(initialData);

  // ── Selection state ────────────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback((ids: string[]) => {
    setSelectedIds((prev) => {
      const allSelected = ids.every((id) => prev.has(id));
      if (allSelected) {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        return next;
      }
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // ── Status change clears selection if item leaves current filter ───────────
  const handleStatusChange = useCallback(
    (itemId: string, newStatus: Status) => {
      updateItemStatus(itemId, newStatus);
    },
    [updateItemStatus]
  );

  // ── Counts for tabs ────────────────────────────────────────────────────────
  const tabCounts: Record<WorkItemType, number> = {
    issue: issuesTotalCount,
    task: tasksTotalCount,
  };

  return (
    <div className="py-6">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-medium text-zinc-900 dark:text-zinc-100">
            My issues
          </h1>
          <p className="text-[12px] text-zinc-400 mt-0.5">
            Work assigned to, created by, or mentioning you
          </p>
        </div>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1.5 h-8 px-3",
            "text-[12px] font-medium",
            "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
            "rounded-md hover:opacity-85 transition-opacity"
          )}
        >
          <Plus className="w-3.5 h-3.5" />
          New issue
        </button>
      </div>

      {/* ── Scope toggle (Assigned / Created / Mentioned) ─────────────────── */}
      <div className="flex gap-0 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden w-fit mb-4">
        {SCOPE_OPTIONS.map((opt, i, arr) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setFilter("scope", opt.value);
              clearSelection();
            }}
            className={cn(
              "px-3 py-1 text-[12px] transition-colors",
              i < arr.length - 1 &&
                "border-r border-zinc-200 dark:border-zinc-700",
              filters.scope === opt.value
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                : "bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Issues / Tasks tab bar ─────────────────────────────────────────── */}
      <div className="flex justify-center border-b border-zinc-200 dark:border-zinc-700 mb-4">
        {TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setFilter("tab", opt.value);
              clearSelection();
            }}
            className={cn(
              "relative px-5 py-2 text-[13px] transition-colors",
              filters.tab === opt.value
                ? "font-medium text-zinc-900 dark:text-zinc-100"
                : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
            )}
          >
            {opt.label}
            <span
              className={cn(
                "ml-1.5 px-1.5 py-0.5 rounded-full text-[11px]",
                filters.tab === opt.value
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
              )}
            >
              {tabCounts[opt.value]}
            </span>
            {/* Active underline */}
            {filters.tab === opt.value && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Filters bar ───────────────────────────────────────────────────── */}
      <FiltersBar
        filters={filters}
        onFilterChange={setFilter}
        onClearFilters={() => {
          clearFilters();
          clearSelection();
        }}
        projects={projects}
      />

      {/* ── Error banner ──────────────────────────────────────────────────── */}
      {error && (
        <div className="mb-3 px-3 py-2 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-[12px] text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ── Bulk action bar ───────────────────────────────────────────────── */}
      <BulkActionBar
        selectedIds={selectedIds}
        onClearSelection={clearSelection}
        onBulkStatus={() => console.log("bulk status", [...selectedIds])}
        onBulkPriority={() => console.log("bulk priority", [...selectedIds])}
        onBulkReassign={() => console.log("bulk reassign", [...selectedIds])}
        onBulkDelete={() => console.log("bulk delete", [...selectedIds])}
      />

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <IssuesTable
        items={items}
        groupBy={filters.groupBy}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
      />

      {/* ── Footer: total count + load more ───────────────────────────────── */}
      <div className="flex items-center justify-between text-[12px] text-zinc-400 px-1">
        <span>
          {isLoading ? "Loading..." : `${total} ${filters.tab}${total !== 1 ? "s" : ""}`}
        </span>
        {hasMore && (
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoadingMore}
            className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors disabled:opacity-50"
          >
            {isLoadingMore ? "Loading more..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}
