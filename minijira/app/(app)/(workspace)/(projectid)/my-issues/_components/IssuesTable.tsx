"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { StatusPill } from "./StatusPill";
import {
  type WorkItem,
  type Status,
  type Priority,
  PRIORITY_LABELS,
  PRIORITY_ORDER,
  STATUS_ORDER,
} from "../_types";

// ─── Priority dot colour ──────────────────────────────────────────────────────
const PRIORITY_COLORS: Record<Priority, string> = {
  urgent: "bg-red-500",
  high: "bg-amber-400",
  medium: "bg-blue-400",
  low: "bg-zinc-400",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function isOverdue(item: WorkItem): boolean {
  if (!item.dueDate || item.status === "done") return false;
  return new Date(item.dueDate) < new Date();
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface IssuesTableProps {
  items: WorkItem[];
  groupBy: "" | "priority" | "status" | "project";
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: (ids: string[]) => void;
  onStatusChange: (itemId: string, newStatus: Status) => void;
  isLoading: boolean;
}

// ─── Single row ───────────────────────────────────────────────────────────────
function IssueRow({
  item,
  selected,
  onToggleSelect,
  onStatusChange,
}: {
  item: WorkItem;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onStatusChange: (id: string, s: Status) => void;
}) {
  const router = useRouter();
  const overdue = isOverdue(item);

  return (
    <tr
      onClick={() => router.push(`/issues/${item.id}`)}
      className={cn(
        "group cursor-pointer transition-colors",
        selected
          ? "bg-blue-50 dark:bg-blue-950/30"
          : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      )}
    >
      {/* Overdue indicator + checkbox */}
      <td
        className={cn(
          "pl-3 pr-1 py-2 w-8",
          overdue
            ? "border-l-2 border-red-500"
            : "border-l-2 border-transparent"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(item.id)}
          className="rounded border-zinc-300 accent-zinc-800"
          aria-label={`Select ${item.title}`}
        />
      </td>

      {/* ID */}
      <td className="px-2 py-2 w-[72px]">
        <span className="text-[11px] font-mono text-zinc-400">{item.id}</span>
      </td>

      {/* Priority dot */}
      <td className="px-1 py-2 w-6">
        <span
          title={PRIORITY_LABELS[item.priority]}
          className={cn(
            "inline-block w-2 h-2 rounded-full",
            PRIORITY_COLORS[item.priority]
          )}
        />
      </td>

      {/* Title */}
      <td className="px-2 py-2 min-w-0">
        <span className="block text-[13px] text-zinc-800 dark:text-zinc-200 truncate max-w-sm">
          {item.title}
        </span>
      </td>

      {/* Status */}
      <td
        className="px-2 py-2 w-[110px]"
        onClick={(e) => e.stopPropagation()}
      >
        <StatusPill
          status={item.status}
          itemId={item.id}
          onStatusChange={onStatusChange}
        />
      </td>

      {/* Project */}
      <td className="px-2 py-2 w-[100px]">
        <span className="text-[11px] text-zinc-400 truncate block">
          {item.project.name}
        </span>
      </td>

      {/* Due date */}
      <td className="px-2 py-2 w-[90px]">
        {item.dueDate ? (
          <span
            className={cn(
              "text-[11px]",
              overdue
                ? "text-red-500 font-medium"
                : "text-zinc-400"
            )}
          >
            {overdue && "⚠ "}
            {fmtDate(item.dueDate)}
          </span>
        ) : (
          <span className="text-[11px] text-zinc-300 dark:text-zinc-600">—</span>
        )}
      </td>

      {/* Assignee avatar */}
      <td className="px-2 py-2 w-[66px]">
        {item.assignee ? (
          item.assignee.avatarUrl ? (
            <img
              src={item.assignee.avatarUrl}
              alt={item.assignee.name}
              title={item.assignee.name}
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <div
              title={item.assignee.name}
              className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[9px] font-semibold text-blue-600 dark:text-blue-300"
            >
              {item.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )
        ) : (
          <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800" />
        )}
      </td>
    </tr>
  );
}

// ─── Table header ─────────────────────────────────────────────────────────────
function TableHead({
  allSelected,
  onToggleAll,
}: {
  allSelected: boolean;
  onToggleAll: () => void;
}) {
  return (
    <thead>
      <tr className="bg-zinc-50 dark:bg-zinc-800/60">
        <th className="pl-3 pr-1 py-2 w-8 border-l-2 border-transparent">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            className="rounded border-zinc-300 accent-zinc-800"
            aria-label="Select all"
          />
        </th>
        <th className="px-2 py-2 text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide w-[72px]">
          ID
        </th>
        <th className="px-1 py-2 w-6" />
        <th className="px-2 py-2 text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide">
          Title
        </th>
        <th className="px-2 py-2 text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide w-[110px]">
          Status
        </th>
        <th className="px-2 py-2 text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide w-[100px]">
          Project
        </th>
        <th className="px-2 py-2 text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide w-[90px]">
          Due
        </th>
        <th className="px-2 py-2 text-left text-[11px] font-medium text-zinc-400 uppercase tracking-wide w-[66px]">
          Assignee
        </th>
      </tr>
    </thead>
  );
}

// ─── Group label row ─────────────────────────────────────────────────────────
function GroupRow({ label, count }: { label: string; count: number }) {
  return (
    <tr>
      <td colSpan={8} className="px-3 pt-4 pb-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
            {label}
          </span>
          <span className="text-[11px] text-zinc-300 dark:text-zinc-600">
            {count}
          </span>
          <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </td>
    </tr>
  );
}

// ─── Skeleton rows ────────────────────────────────────────────────────────────
function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="pl-3 pr-1 py-2 border-l-2 border-transparent">
            <div className="w-3.5 h-3.5 rounded bg-zinc-100 dark:bg-zinc-800" />
          </td>
          <td className="px-2 py-2">
            <div className="h-2.5 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
          </td>
          <td className="px-1 py-2">
            <div className="w-2 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          </td>
          <td className="px-2 py-2">
            <div
              className="h-2.5 rounded bg-zinc-100 dark:bg-zinc-800"
              style={{ width: `${50 + (i * 17) % 40}%` }}
            />
          </td>
          <td className="px-2 py-2">
            <div className="h-4 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          </td>
          <td className="px-2 py-2">
            <div className="h-2.5 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
          </td>
          <td className="px-2 py-2">
            <div className="h-2.5 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
          </td>
          <td className="px-2 py-2">
            <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          </td>
        </tr>
      ))}
    </>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) {
  return (
    <tr>
      <td colSpan={8}>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-3xl mb-3 opacity-30">📭</div>
          <p className="text-sm text-zinc-500 mb-2">
            {hasFilters ? "No items match your filters." : "Nothing here yet."}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              Clear all filters
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function IssuesTable({
  items,
  groupBy,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onStatusChange,
  isLoading,
}: IssuesTableProps) {
  const hasFilters = false; // passed from parent in real usage

  const allIds = items.map((i) => i.id);
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));

  function handleToggleAll() {
    onToggleSelectAll(allIds);
  }

  // ── Group items ────────────────────────────────────────────────────────────
  function renderRows() {
    if (isLoading) return <SkeletonRows />;
    if (!items.length) return <EmptyState hasFilters={hasFilters} onClear={() => {}} />;

    if (!groupBy) {
      return items.map((item) => (
        <IssueRow
          key={item.id}
          item={item}
          selected={selectedIds.has(item.id)}
          onToggleSelect={onToggleSelect}
          onStatusChange={onStatusChange}
        />
      ));
    }

    // Build groups
    const groupMap = new Map<string, WorkItem[]>();
    items.forEach((item) => {
      const key =
        groupBy === "priority"
          ? item.priority
          : groupBy === "status"
          ? item.status
          : item.project.name;
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(item);
    });

    // Respect canonical order for priority / status
    const keys =
      groupBy === "priority"
        ? PRIORITY_ORDER.filter((k) => groupMap.has(k))
        : groupBy === "status"
        ? STATUS_ORDER.filter((k) => groupMap.has(k))
        : [...groupMap.keys()];

    return keys.flatMap((key) => {
      const group = groupMap.get(key)!;
      const label =
        groupBy === "priority"
          ? PRIORITY_LABELS[key as Priority]
          : groupBy === "status"
          ? key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())
          : key;
      return [
        <GroupRow key={`group-${key}`} label={label} count={group.length} />,
        ...group.map((item) => (
          <IssueRow
            key={item.id}
            item={item}
            selected={selectedIds.has(item.id)}
            onToggleSelect={onToggleSelect}
            onStatusChange={onStatusChange}
          />
        )),
      ];
    });
  }

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden mb-4">
      <table className="w-full border-collapse table-fixed">
        <TableHead allSelected={allSelected} onToggleAll={handleToggleAll} />
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}
