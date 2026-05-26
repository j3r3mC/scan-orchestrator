import { TaskPayloadMap } from "../TaskPayloadMap";

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

    const attack: TaskPayloadMap["attack:sqli:timebased"] = {
      url: "https://test.com",
      method: "GET",
      headers: {},
      body: {},
      query: {},
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

    expect(page.url).toBe("https://test.com");
  });

  it("rejette un mauvais payload pour un TaskType", () => {
    // @ts-expect-error
    const wrong: TaskPayloadMap["crawl:page"] = { method: "POST" };

    // @ts-expect-error
    const wrong2: TaskPayloadMap["attack:sqli:timebased"] = { url: 123 };

    expect(true).toBe(true);
  });
});
