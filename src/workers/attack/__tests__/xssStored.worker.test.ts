import { worker } from "../xssStored.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType } from "@/types/core";

describe("xssStored.worker", () => {
  const base: Omit<AnalyzePayload, "response"> = {
    url: "https://example.com",
    method: "POST",
    headers: {},
    body: {},
    query: {},
  };

  it("détecte un XSS stocké", async () => {
    const payload: AnalyzePayload = {
      ...base,
      body: { comment: "<script>alert(1)</script>" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_XSS_STORED);
  });

  it("ne détecte rien sur un contenu safe", async () => {
    const payload: AnalyzePayload = {
      ...base,
      body: { comment: "Nice article!" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(0);
  });
});
