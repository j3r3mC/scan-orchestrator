import { Task } from "./Task";
import { TaskType } from "./TaskType";

export type ScanStatus = "pending" | "running" | "completed" | "failed";

export interface ScanProgress {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  failedTasks: number;
}

export interface ScanFinding {
  id: string;
  taskType: TaskType; // ← ultra typé : chaque finding vient d’un worker précis
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  details?: unknown; // payload brut du worker (analyze/normalize)
}

export interface Scan {
  id: string;
  target: string;
  status: ScanStatus;
  createdAt: number;
  updatedAt: number;

  progress: ScanProgress;

  tasks: Task[];

  findings: ScanFinding[];
}
