import { TaskType } from "../TaskType";

describe("TaskType (success)", () => {
  it("accepte tous les TaskType valides", () => {
    const validTypes: TaskType[] = [
      "crawl:page",
      "crawl:assets",
      "crawl:form",
      "attack:sqli:timebased",
      "attack:sqli:errorbased",
      "attack:xss:reflected",
      "attack:xss:stored",
      "attack:lfi",
      "attack:rfi",
      "analyze:http",
      "analyze:dom",
      "analyze:js",
      "normalize:attack",
      "normalize:context",
      "normalize:assets",
    ];

    expect(validTypes.length).toBeGreaterThan(0);
  });

  it("accepte crawl:api comme TaskType valide", () => {
    const type: TaskType = "crawl:api";
    expect(type).toBe("crawl:api");
  });
  it("accepte analyze:js comme TaskType valide", () => {
    const type: TaskType = "analyze:js";
    expect(type).toBe("analyze:js");
  });
  it("accepte normalize:assets comme TaskType valide", () => {
    const type: TaskType = "normalize:assets";
    expect(type).toBe("normalize:assets");
  });
  it("accepte attack:openredirect comme TaskType valide", () => {
    const type: TaskType = "attack:openredirect";
    expect(type).toBe("attack:openredirect");
  });
});
