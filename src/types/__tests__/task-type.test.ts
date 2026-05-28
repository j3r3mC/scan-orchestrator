import { TaskType } from "../core/TaskType";

describe("TaskType (success)", () => {
  it("accepte tous les TaskType valides", () => {
    const validTypes: TaskType[] = [
      TaskType.CRAWL_PAGE,
      TaskType.CRAWL_ASSETS,
      TaskType.CRAWL_FORM,
      TaskType.CRAWL_API,

      TaskType.ANALYZE_HTTP,
      TaskType.ANALYZE_DOM,

      TaskType.ATTACK_HEADERS,
      TaskType.ATTACK_LFI,
      TaskType.ATTACK_RFI,
      TaskType.ATTACK_SQLI_ERROR,
      TaskType.ATTACK_SQLI_TIME,
      TaskType.ATTACK_PATH_TRAVERSAL,
      TaskType.ATTACK_RCE,
      TaskType.ATTACK_XXE,
      TaskType.ATTACK_SSRF,

      TaskType.ATTACK_XSS_REFLECTED,
      TaskType.ATTACK_XSS_STORED,

      TaskType.NORMALIZE_ATTACK,
      TaskType.NORMALIZE_CONTEXT,
      TaskType.NORMALIZE_ASSETS,
    ];

    expect(validTypes.length).toBeGreaterThan(0);
  });

  it("accepte crawl:api comme TaskType valide", () => {
    const type: TaskType = TaskType.CRAWL_API;
    expect(type).toBe(TaskType.CRAWL_API);
  });
});
