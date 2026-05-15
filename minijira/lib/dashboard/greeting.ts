// lib/dashboard/greeting.ts

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export interface GreetingInfo {
  timeOfDay: TimeOfDay;
  label: string;
  sub: string;
}

export function getGreeting(hour: number): GreetingInfo {
  if (hour >= 5 && hour < 12) {
    return {
      timeOfDay: "morning",
      label: "Good morning",
      sub: "You've got a productive day ahead.",
    };
  }
  if (hour >= 12 && hour < 17) {
    return {
      timeOfDay: "afternoon",
      label: "Good afternoon",
      sub: "Keep the momentum going.",
    };
  }
  if (hour >= 17 && hour < 21) {
    return {
      timeOfDay: "evening",
      label: "Good evening",
      sub: "Wrapping up for the day?",
    };
  }
  return {
    timeOfDay: "night",
    label: "Working late?",
    sub: "Don't forget to rest.",
  };
}

export function formatMeetingDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function getTaskDueLabel(dueDateStr: string | null): {
  label: string;
  variant: "overdue" | "today" | "soon" | "default";
} {
  if (!dueDateStr) return { label: "No due date", variant: "default" };

  const due = new Date(dueDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return { label: "Overdue", variant: "overdue" };
  if (diffDays === 0) return { label: "Today", variant: "today" };
  if (diffDays <= 3) return { label: "Soon", variant: "soon" };

  return {
    label: due.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    variant: "default",
  };
}