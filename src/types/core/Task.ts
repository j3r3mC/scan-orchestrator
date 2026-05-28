import { TaskType, TaskPayloadMap } from "@/types/core";

export type Task = {
  [K in TaskType]: {
    id: string;
    type: K;
    payload: TaskPayloadMap[K];
    createdAt: number;
  };
}[TaskType];
