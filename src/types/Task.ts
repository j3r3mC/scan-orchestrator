export type TaskType = "crawl" | "attack" | "analyze" | "normalize";

export interface Task {
  id: string;
  type: TaskType;
  payload: unknown;
  createdAt: number;
}
