// components/dashboard/AISummaryCard.tsx
//
// Placeholder for the AI daily briefing (Phase 4).
// When ready, this will call your Fastify /api/v1/ai/summary endpoint,
// stream the response, and render it here.

export function AISummaryCard() {
  return (
    <div className="mb-3">
      <p className="text-[10px] font-medium tracking-[0.09em] uppercase text-neutral-500 mb-2.5">
        Summary
      </p>
      <div className="bg-neutral-900 border border-gray-700/80 rounded-xl p-4 font-sans flex items-start gap-3 min-h-[80px]">
        {/* Icon */}
        <div className="w-7 h-7 rounded-lg bg-blue-700/40 border border-blue-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.5 1L7.8 5.2L12 6.5L7.8 7.8L6.5 12L5.2 7.8L1 6.5L5.2 5.2L6.5 1Z"
              fill="#93c5fd"
            />
          </svg>
        </div>

        {/* Body */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.08em] uppercase text-blue-400 bg-blue-700/40 border border-violet-900/40 rounded px-2 py-0.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Summary
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">
            This section will surface an{" "}
            <span className="text-neutral-300">intelligent daily briefing</span>{" "}
            — sprint health, blockers, velocity trends, and what needs your
            attention most. Coming in Phase 4.
          </p>
        </div>
      </div>
    </div>
  );
}