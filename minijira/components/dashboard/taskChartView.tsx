"use client";

import { useEffect, useRef } from "react";
import { TaskStats } from "@/types/dashboard";

interface TaskBreakdownChartProps {
  stats: TaskStats;
}

export function TaskBreakdownChart({ stats }: TaskBreakdownChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  const total = stats.done + stats.inProgress + stats.todo;
  const pctDone = total > 0 ? Math.round((stats.done / total) * 100) : 0;
  const pctInProgress = total > 0 ? Math.round((stats.inProgress / total) * 100) : 0;
  const pctTodo = 100 - pctDone - pctInProgress;

  useEffect(() => {
    let Chart: any;

    async function initChart() {
      // Dynamic import so it only loads on the client
      const mod = await import("chart.js/auto");
      Chart = mod.default;

      if (!canvasRef.current) return;

      // Destroy previous instance on hot reload / re-render
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: "doughnut",
        data: {
          labels: ["Done", "In progress", "To do"],
          datasets: [
            {
              data: [stats.done, stats.inProgress, stats.todo],
              backgroundColor: ["#3a9e72", "#0066ff", "#666666"],
              borderColor: "#171720",
              borderWidth: 3,
              hoverOffset: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#1a1a24",
              borderColor: "#2a2a38",
              borderWidth: 1,
              titleColor: "#a0a0b8",
              bodyColor: "#606070",
              callbacks: {
                label: (ctx: any) =>
                  `  ${ctx.label}: ${ctx.raw}`,
              },
            },
          },
        },
      });
    }

    initChart();

    return () => {
      chartRef.current?.destroy();
    };
  }, [stats]);

  return (
    <div className="bg-neutral-900 border border-neutral-700/80 rounded-xl p-4">
      <p className="text-[10px] font-medium tracking-[0.09em] uppercase text-neutral-500 mb-4">
        Task breakdown
      </p>

      <div className="grid grid-cols-[140px_1fr] gap-6 items-center">
        {/* Donut */}
        <div className="relative w-[140px] h-[140px]">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Task breakdown: ${stats.done} done, ${stats.inProgress} in progress, ${stats.todo} to do`}
          />
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[22px] font-medium text-neutral-100 leading-none">
              {total}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col text-neutral-500 gap-2">
          <LegendRow color="#3a9e72" label="Done" count={stats.done} pct={pctDone} />
          <LegendRow color="#0066ff" label="In progress" count={stats.inProgress} pct={pctInProgress} />
          <LegendRow color="#666666" label="To do" count={stats.todo} pct={pctTodo} />

          <div className="h-px bg-neutral-800/60 my-0.5" />

          <LegendRow color="#8a3030" label="Overdue" count={stats.overdue} />
          <LegendRow color="#7a5a20" label="Blocked" count={stats.blocked} />
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <StatTile value={`${pctDone}%`} label="Complete" valueClass="text-emerald-600" />
        <StatTile value={`${pctInProgress}%`} label="In flight" valueClass="text-blue-500" />
        <StatTile value={stats.overdue} label="Overdue" valueClass="text-red-500" />
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LegendRow({
  color,
  label,
  count,
  pct,
}: {
  color: string;
  label: string;
  count: number;
  pct?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-2 h-2 rounded-sm flex-shrink-0"
        style={{ background: color }}
      />
      <span className="text-[12px] text-neutral-500 flex-1">{label}</span>
      <span className="text-[12px] font-medium text-neutral-400 tabular-nums">
        {count}
        {pct !== undefined && (
          <span className="text-neutral-700 ml-1 text-[10px]">{pct}%</span>
        )}
      </span>
    </div>
  );
}

function StatTile({
  value,
  label,
  valueClass,
}: {
  value: string | number;
  label: string;
  valueClass: string;
}) {
  return (
    <div className="bg-neutral-950 border border-neutral-800/40 rounded-lg px-3 py-2.5">
      <p className={`text-xl font-medium leading-none ${valueClass}`}>{value}</p>
      <p className="text-[9.5px] uppercase tracking-widest text-neutral-500 mt-1.5">
        {label}
      </p>
    </div>
  );
}