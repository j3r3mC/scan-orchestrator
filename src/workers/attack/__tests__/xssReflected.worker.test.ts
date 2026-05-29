import { worker } from "../xssReflected.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType } from "@/types/core";

describe("xssReflected.worker", () => {
  const base: Omit<AnalyzePayload, "response"> = {
    url: "https://example.com",
    method: "GET",
    headers: {},
    body: {},
    query: {},
  };

  it("détecte un <script>alert(1)</script>", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "<script>alert(1)</script>" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_XSS_REFLECTED);
  });

  it("détecte un XSS via onerror", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "<img src=x onerror=alert(1)>" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(1);
  });

  it("ne détecte rien sur une valeur safe", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "hello world" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(0);
  });
});
