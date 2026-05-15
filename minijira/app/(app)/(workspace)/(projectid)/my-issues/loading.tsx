import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse",
        className
      )}
    />
  );
}

export default function MyIssuesLoading() {
  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      {/* Scope toggle */}
      <Skeleton className="h-7 w-64 rounded-md mb-4" />

      {/* Type tabs */}
      <div className="flex justify-center gap-8 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-7 w-40 rounded-md" />
        <Skeleton className="h-7 w-64 rounded-md" />
        <div className="flex-1" />
        <Skeleton className="h-7 w-20 rounded-md" />
      </div>

      {/* Table */}
      <div className="border border-zinc-100 dark:border-zinc-800 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-zinc-50 dark:bg-zinc-800/60 px-3 py-2 flex gap-3">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16 ml-auto" />
        </div>
        {/* Rows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="px-3 py-2.5 flex items-center gap-3 border-t border-zinc-100 dark:border-zinc-800"
          >
            <Skeleton className="h-3 w-3 rounded flex-shrink-0" />
            <Skeleton className="h-2.5 w-12 flex-shrink-0" />
            <Skeleton className="h-2 w-2 rounded-full flex-shrink-0" />
            <Skeleton
              className="h-2.5 rounded flex-1"
              style={{ maxWidth: `${40 + (i * 13) % 45}%` } as React.CSSProperties}
            />
            <Skeleton className="h-4 w-16 rounded-full flex-shrink-0" />
            <Skeleton className="h-2.5 w-16 flex-shrink-0" />
            <Skeleton className="h-2.5 w-12 flex-shrink-0" />
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
