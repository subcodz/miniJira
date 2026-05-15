"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Status, STATUS_LABELS, STATUS_ORDER } from "../_types";

// ─── Style maps ───────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<Status, string> = {
  todo: "bg-[#F1EFE8] text-[#5F5E5A] border-[#D3D1C7]",
  in_progress: "bg-[#E6F1FB] text-[#185FA5] border-[#B5D4F4]",
  in_review: "bg-[#FAEEDA] text-[#854F0B] border-[#FAC775]",
  done: "bg-[#EAF3DE] text-[#3B6D11] border-[#C0DD97]",
};

interface StatusPillProps {
  status: Status;
  itemId: string;
  onStatusChange: (itemId: string, newStatus: Status) => void;
  disabled?: boolean;
}

export function StatusPill({
  status,
  itemId,
  onStatusChange,
  disabled = false,
}: StatusPillProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function handleSelect(newStatus: Status) {
    onStatusChange(itemId, newStatus);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border",
          "transition-opacity",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80",
          STATUS_STYLES[status]
        )}
      >
        {STATUS_LABELS[status]}
        <ChevronDown className="w-2.5 h-2.5 opacity-60" />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-full left-0 mt-1 z-50",
            "min-w-[140px] py-1 rounded-md",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-200 dark:border-zinc-700",
            "shadow-md"
          )}
        >
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(s);
              }}
              className={cn(
                "w-full flex items-center gap-2 px-2.5 py-1.5 text-left",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                "transition-colors"
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
                  STATUS_STYLES[s]
                )}
              >
                {STATUS_LABELS[s]}
              </span>
              {s === status && (
                <span className="ml-auto text-[10px] text-zinc-400">current</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
