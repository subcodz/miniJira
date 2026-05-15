export type Priority = "urgent" | "high" | "medium" | "low";
export type Status = "todo" | "in_progress" | "in_review" | "done";
export type WorkItemType = "issue" | "task";
export type ScopeFilter = "assigned" | "created" | "mentioned";

export interface WorkItem {
  id: string;
  type: WorkItemType;
  title: string;
  priority: Priority;
  status: Status;
  project: {
    id: string;
    name: string;
  };
  assignee: {
    id: string;
    name: string;
    avatarUrl: string | null;
  } | null;
  dueDate: string | null;       // ISO string
  assignedAt: string;           // ISO string
  createdAt: string;            // ISO string
}

export interface MyIssuesResponse {
  data: WorkItem[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
}

export interface MyIssuesFilters {
  tab: WorkItemType;
  scope: ScopeFilter;
  projectId: string;
  priority: Priority | "";
  status: Status | "";
  search: string;
  groupBy: "priority" | "status" | "project" | "";
  cursor: string;
}

// Display-friendly label maps
export const PRIORITY_LABELS: Record<Priority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const STATUS_LABELS: Record<Status, string> = {
  todo: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
};

export const STATUS_ORDER: Status[] = ["todo", "in_progress", "in_review", "done"];
export const PRIORITY_ORDER: Priority[] = ["urgent", "high", "medium", "low"];
