// types/dashboard.ts

export type Priority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in_progress" | "done";

export interface DashboardTask {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string | null; // ISO date string
  status: TaskStatus;
  projectKey: string; // e.g. "MJ-42"
}

export interface Meeting {
  id: string;
  title: string;
  attendees: string; // e.g. "Team" or "Mentor"
  startTime: string; // "HH:MM"
  durationMinutes: number;
  date: string; // ISO date string
}

export interface TaskStats {
  done: number;
  inProgress: number;
  todo: number;
  overdue: number;
  blocked: number;
}

export interface DashboardData {
  tasks: DashboardTask[];
  meetings: Meeting[];
  stats: TaskStats;
}