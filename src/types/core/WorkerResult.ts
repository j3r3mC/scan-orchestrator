import { TaskType, Task } from "@/types/core";

export type WorkerStatus = "success" | "error";

export interface WorkerFinding {
  taskType: TaskType;
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  details?: unknown;
}

export interface WorkerResult {
  taskId?: string;
  taskType: TaskType;

  status: WorkerStatus;

  // Résultat brut du worker (ex: réponse HTTP, DOM, payload d’attaque…)
  output?: unknown;

  // Findings générés par ce worker
  findings?: WorkerFinding[];

  // Nouvelles tâches à ajouter à la queue
  nextTasks?: Task[];

  // Erreur éventuelle
  error?: string;
}
