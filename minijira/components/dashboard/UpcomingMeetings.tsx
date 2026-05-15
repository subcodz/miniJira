// components/dashboard/UpcomingMeetingsCard.tsx

import { Meeting } from "@/types/dashboard";
import { formatMeetingDate, formatDuration } from "@/lib/dashboard/greeting";

interface UpcomingMeetingsCardProps {
  meetings: Meeting[];
}

export function UpcomingMeetingsCard({ meetings }: UpcomingMeetingsCardProps) {
  return (
    <div className="bg-neutral-900 border font-sans border-neutral-700/80 rounded-xl p-4">
      <p className="text-[10px] font-medium tracking-[0.09em] uppercase text-neutral-500 mb-3">
        Upcoming meetings
      </p>

      <ul className="divide-y divide-neutral-800/60">
        {meetings.map((meeting) => (
          <li
            key={meeting.id}
            className="flex items-center gap-3 py-2 first:pt-0 last:pb-0"
          >
            {/* Time */}
            <div className="text-right flex-shrink-0 w-10">
              <p className="text-[11px] font-mono font-medium text-neutral-400 tabular-nums">
                {meeting.startTime}
              </p>
            </div>

            {/* Vertical divider */}
            <div className="w-px h-7 bg-neutral-700/60 flex-shrink-0" />

            {/* Meeting info */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-neutral-100 truncate leading-snug">
                {meeting.title}
              </p>
              <p className="text-[10.5px] text-neutral-400 mt-0.5">
                {meeting.attendees} · {formatMeetingDate(meeting.date)}
              </p>
            </div>

            {/* Duration */}
            <span className="text-[11px] text-neutral-400 flex-shrink-0">
              {formatDuration(meeting.durationMinutes)}
            </span>
          </li>
        ))}
      </ul>

      {meetings.length === 0 && (
        <p className="text-sm text-neutral-100 py-4 text-center">
          No upcoming meetings
        </p>
      )}
    </div>
  );
}