import { Task } from "../Task";

describe("Task (success)", () => {
  it("creates a valid task object", () => {
    const task: Task = {
      id: "123",
      type: "crawl:page",
      payload: { url: "https://example.com" },
      createdAt: Date.now(),
    };

    expect(task.type).toBe("crawl:page");
  });
});
