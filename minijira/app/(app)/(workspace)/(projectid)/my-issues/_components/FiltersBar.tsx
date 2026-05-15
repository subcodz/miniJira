"use client";

import { useCallback, useTransition } from "react";
import { Search, LayoutList, Columns, GanttChartSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MyIssuesFilters, Priority, Status } from "../_types";

interface FiltersBarProps {
  filters: MyIssuesFilters;
  onFilterChange: <K extends keyof MyIssuesFilters>(
    key: K,
    value: MyIssuesFilters[K]
  ) => void;
  onClearFilters: () => void;
  projects: { id: string; name: string }[];
}

const DIVIDER = "border-r border-zinc-200 dark:border-zinc-700";

export function FiltersBar({
  filters,
  onFilterChange,
  onClearFilters,
  projects,
}: FiltersBarProps) {
  const [, startTransition] = useTransition();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        onFilterChange("search", e.target.value);
      });
    },
    [onFilterChange]
  );

  const hasActiveFilters =
    filters.projectId || filters.priority || filters.status || filters.search;

  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap">
      {/* ── Search ────────────────────────────────────────────────────── */}
      <div className="relative flex-shrink-0 w-40">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={handleSearch}
          className={cn(
            "w-full h-7 pl-7 pr-2.5 text-[12px] rounded-md",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-200 dark:border-zinc-700",
            "placeholder:text-zinc-400",
            "focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500"
          )}
        />
      </div>

      {/* ── Grouped filter selects ─────────────────────────────────────── */}
      <div
        className={cn(
          "flex flex-shrink-0 overflow-hidden rounded-md",
          "border border-zinc-200 dark:border-zinc-700"
        )}
      >
        {/* Project */}
        <select
          value={filters.projectId}
          onChange={(e) => onFilterChange("projectId", e.target.value)}
          className={cn(
            "h-7 px-2 text-[12px] bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300",
            "focus:outline-none hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors",
            DIVIDER
          )}
        >
          <option value="">All projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          value={filters.priority}
          onChange={(e) =>
            onFilterChange("priority", e.target.value as Priority | "")
          }
          className={cn(
            "h-7 px-2 text-[12px] bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300",
            "focus:outline-none hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors",
            DIVIDER
          )}
        >
          <option value="">All priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange("status", e.target.value as Status | "")
          }
          className={cn(
            "h-7 px-2 text-[12px] bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300",
            "focus:outline-none hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors",
            DIVIDER
          )}
        >
          <option value="">All statuses</option>
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="in_review">In review</option>
          <option value="done">Done</option>
        </select>

        {/* Group by */}
        <select
          value={filters.groupBy}
          onChange={(e) =>
            onFilterChange(
              "groupBy",
              e.target.value as MyIssuesFilters["groupBy"]
            )
          }
          className={cn(
            "h-7 px-2 text-[12px] bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300",
            "focus:outline-none hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          )}
        >
          <option value="">No grouping</option>
          <option value="priority">Group: priority</option>
          <option value="status">Group: status</option>
          <option value="project">Group: project</option>
        </select>
      </div>

      {/* ── Clear filters ──────────────────────────────────────────────── */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="h-7 px-2.5 text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors underline underline-offset-2"
        >
          Clear
        </button>
      )}

      {/* ── Spacer ────────────────────────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── View switcher ─────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex flex-shrink-0 overflow-hidden rounded-md",
          "border border-zinc-200 dark:border-zinc-700"
        )}
      >
        {[
          { id: "table", Icon: LayoutList, label: "Table view" },
          { id: "board", Icon: Columns, label: "Board view" },
          { id: "timeline", Icon: GanttChartSquare, label: "Timeline view" },
        ].map(({ id, Icon, label }, i, arr) => (
          <button
            key={id}
            type="button"
            aria-label={label}
            title={label}
            className={cn(
              "flex items-center justify-center w-8 h-7",
              "bg-white dark:bg-zinc-900 text-zinc-500",
              "hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200",
              "transition-colors",
              id === "table" &&
                "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
              i < arr.length - 1 && DIVIDER
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
