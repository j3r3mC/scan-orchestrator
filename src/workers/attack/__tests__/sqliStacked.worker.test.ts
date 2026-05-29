import { worker } from "../sqliStacked.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType } from "@/types/core";

describe("sqliStacked.worker", () => {
  const base: Omit<AnalyzePayload, "response"> = {
    url: "https://example.com",
    method: "GET",
    headers: {},
    body: {},
    query: {},
  };

  it("détecte un ; DROP TABLE", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "1; DROP TABLE users;" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_SQLI_STACKED);
  });

  it("détecte un ; SELECT obfusqué", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "1;%20SELECT%201" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(1);
  });

  it("ne détecte rien sur une requête normale", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "hello world" },
      response: null,
    };

    const result = await worker(payload);
    expect(result.findings!.length).toBe(0);
  });
});
