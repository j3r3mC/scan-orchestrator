import { TaskType } from "../TaskType";

describe("TaskType (success)", () => {
  it("accepte tous les TaskType valides", () => {
    const validTypes: TaskType[] = [
      "crawl:page",
      "crawl:assets",
      "crawl:form",
      "crawl:api",
      "attack:sqli:timebased",
      "attack:sqli:errorbased",
      "attack:xss:reflected",
      "attack:xss:stored",
      "attack:lfi",
      "attack:rfi",
      "analyze:http",
      "analyze:dom",
      "normalize:attack",
      "normalize:context",
    ];

    expect(validTypes.length).toBeGreaterThan(0);
  });
});
