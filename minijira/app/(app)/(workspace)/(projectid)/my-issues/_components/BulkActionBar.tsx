"use client";

import { SlidersHorizontal, Flag, UserRound, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkActionBarProps {
  selectedIds: Set<string>;
  onClearSelection: () => void;
  onBulkStatus: () => void;
  onBulkPriority: () => void;
  onBulkReassign: () => void;
  onBulkDelete: () => void;
}

export function BulkActionBar({
  selectedIds,
  onClearSelection,
  onBulkStatus,
  onBulkPriority,
  onBulkReassign,
  onBulkDelete,
}: BulkActionBarProps) {
  if (selectedIds.size === 0) return null;

  const count = selectedIds.size;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 mb-3 rounded-md",
        "bg-zinc-100 dark:bg-zinc-800",
        "border border-zinc-200 dark:border-zinc-700",
        "text-[12px]"
      )}
    >
      <span className="font-medium text-zinc-700 dark:text-zinc-300 flex-1">
        {count} selected
      </span>

      <button
        type="button"
        onClick={onBulkStatus}
        className="flex items-center gap-1.5 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <SlidersHorizontal className="w-3 h-3" />
        Change status
      </button>

      <button
        type="button"
        onClick={onBulkPriority}
        className="flex items-center gap-1.5 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <Flag className="w-3 h-3" />
        Priority
      </button>

      <button
        type="button"
        onClick={onBulkReassign}
        className="flex items-center gap-1.5 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <UserRound className="w-3 h-3" />
        Reassign
      </button>

      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-600 mx-1" />

      <button
        type="button"
        onClick={onBulkDelete}
        className="flex items-center gap-1.5 px-2 py-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <Trash2 className="w-3 h-3" />
        Delete
      </button>

      <button
        type="button"
        onClick={onClearSelection}
        aria-label="Clear selection"
        className="ml-1 p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
