import { worker } from "../openRedirect.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType } from "@/types/core";

describe("openRedirect.worker", () => {
  const base: Omit<AnalyzePayload, "response"> = {
    url: "https://example.com",
    method: "GET",
    headers: {},
    body: {},
    query: {},
  };

  it("détecte un redirect=http://evil.com", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { redirect: "http://evil.com" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_OPEN_REDIRECT);
  });

  it("détecte un redirect encodé", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { redirect: "%2f%2fevil.com" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(1);
  });

  it("ne détecte rien sur un redirect interne", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { redirect: "/dashboard" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(0);
  });
});
