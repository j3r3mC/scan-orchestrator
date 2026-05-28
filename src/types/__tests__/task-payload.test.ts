import { TaskPayloadMap } from "../core/TaskPayloadMap";

describe("TaskPayloadMap", () => {
  it("accepte les bons payloads pour chaque TaskType", () => {
    const page: TaskPayloadMap["crawl:page"] = { url: "https://test.com" };
    const assets: TaskPayloadMap["crawl:assets"] = {
      url: "https://test.com",
      includeJS: true,
    };
    const form: TaskPayloadMap["crawl:form"] = {
      url: "https://test.com",
      method: "POST",
    };

    const api: TaskPayloadMap["crawl:api"] = {
      baseUrl: "https://api.test.com",
      headers: { Authorization: "Bearer token" },
      depth: 1,
    };

    const js: TaskPayloadMap["analyze:js"] = {
      url: "https://test.com/app.js",
      code: "console.log('hello');",
      isInline: false,
      metadata: { size: 1234 },
    };
    const attack: TaskPayloadMap["attack:sqli:timebased"] = {
      url: "http://test",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      vector: "' OR SLEEP(5) --",
      delay: 5,
    };

    const analyze: TaskPayloadMap["analyze:http"] = {
      url: "https://test.com",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      response: { status: 200, body: "" },
    };

    const normalize: TaskPayloadMap["normalize:attack"] = {
      rawFindings: [],
      context: {},
    };
    const normAssets: TaskPayloadMap["normalize:assets"] = {
      rawAssets: [],
      context: { source: "crawler" },
    };

    const openRedirect: TaskPayloadMap["attack:openredirect"] = {
      url: "http://test",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      vector: "https://evil.com",
      redirectUrl: "https://evil.com",
    };

    expect(page.url).toBe("https://test.com");
    expect(api.baseUrl).toBe("https://api.test.com");
    expect(js.url).toBe("https://test.com/app.js");
    expect(js.code).toContain("console.log");
    expect(normAssets.rawAssets).toEqual([]);
    expect(openRedirect.url).toBe("http://test");
  });

  it("rejette un mauvais payload pour un TaskType", () => {
    // @ts-expect-error
    const wrong: TaskPayloadMap["crawl:page"] = { method: "POST" };

    // @ts-expect-error
    const wrong2: TaskPayloadMap["attack:sqli:timebased"] = { url: 123 };

    // @ts-expect-error
    const wrongNormAssets: TaskPayloadMap["normalize:assets"] = { foo: "bar" };

    // @ts-expect-error: invalid payload
    const wrongOpenRedirect: TaskPayloadMap["attack:openredirect"] = 123;

    expect(true).toBe(true);
  });
});
