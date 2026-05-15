// components/dashboard/NearestTasksCard.tsx

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DashboardTask, Priority } from "@/types/dashboard";
import { getTaskDueLabel } from "@/lib/dashboard/greeting";
import { cn } from "@/lib/utils";

interface NearestTasksCardProps {
  tasks: DashboardTask[];
}

const PRIORITY_DOT: Record<Priority, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-emerald-600",
};

const DUE_TAG: Record<string, string> = {
  overdue:
    "bg-red-950/60 text-red-400 border border-red-900/50",
  today:
    "bg-amber-950/60 text-amber-400 border border-amber-900/50",
  soon:
    "bg-blue-950/60 text-blue-400 border border-blue-900/50",
  default:
    "bg-neutral-800/60 text-neutral-500 border border-neutral-700/50",
};

export function NearestTasksCard({ tasks }: NearestTasksCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-700/80 rounded-xl font-sans p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-medium tracking-[0.09em] uppercase text-neutral-500">
          Nearest due tasks
        </p>
        <Link href="/my-issues">
          <button className="p-1.5 hover:bg-neutral-700/50 rounded-lg  transition-colors">
            <ArrowUpRight className="w-4 h-4 text-neutral-400 hover:text-neutral-200" />
          </button>
        </Link>
      </div>

      <ul className="divide-y divide-neutral-700/30">
        {tasks.map((task) => {
          const due = getTaskDueLabel(task.dueDate);
          return (
            <li
              key={task.id}
              className="flex items-start gap-2.5 py-2 first:pt-0 last:pb-0"
            >
              {/* Priority dot */}
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0",
                  PRIORITY_DOT[task.priority]
                )}
                aria-label={`${task.priority} priority`}
              />

              {/* Task info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-neutral-100 truncate leading-snug">
                  {task.title}
                </p>
                <p className="text-[10.5px] text-neutral-400 mt-0.5 font-mono">
                  {task.projectKey}
                </p>
              </div>

              {/* Due badge */}
              <span
                className={cn(
                  "text-[9.5px] font-semibold tracking-wide px-1.5 py-0.5 rounded flex-shrink-0 self-center",
                  DUE_TAG[due.variant]
                )}
              >
                {due.label}
              </span>
            </li>
          );
        })}
      </ul>

      {tasks.length === 0 && (
        <p className="text-sm text-neutral-100 py-4 text-center">
          No upcoming tasks!
        </p>
      )}
    </div>
  );
}