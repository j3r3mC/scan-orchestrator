import { TaskType } from "./TaskType";
import { TaskPayloadMap } from "./TaskPayloadMap";

export type Task = {
  [K in TaskType]: {
    id: string;
    type: K;
    payload: TaskPayloadMap[K];
    createdAt: number;
  };
}[TaskType];
