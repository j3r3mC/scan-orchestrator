import { Task } from "../../src/types/Task";

// ❌ On teste volontairement un mauvais type
const badTask: Task = {
  id: "123",
  // @ts-expect-error
  type: "invalid-type",
  payload: {},
  createdAt: Date.now(),
};
