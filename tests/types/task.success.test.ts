import { Task } from "../../src/types/Task";
import { describe, it, expect } from "@jest/globals";

describe("Task (success)", () => {
  it("creates a valid task object", () => {
    const task: Task = {
      id: "123",
      type: "crawl",
      payload: { url: "https://example.com" },
      createdAt: Date.now(),
    };

    expect(task.type).toBe("crawl");
  });
});
