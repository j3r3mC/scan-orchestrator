import { worker } from "../sqliTime.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType } from "@/types/core";

describe("sqliTime.worker", () => {
  const base: Omit<AnalyzePayload, "response"> = {
    url: "https://example.com",
    method: "GET",
    headers: {},
    body: {},
    query: {},
  };

  it("détecte un délai anormal (SQLi Time-Based)", async () => {
    const payload: AnalyzePayload = {
      ...base,
      response: null,
      responseTime: 3500,
      baselineTime: 200,
    } as any;

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_SQLI_TIME);
  });

  it("ne détecte rien si le délai est normal", async () => {
    const payload: AnalyzePayload = {
      ...base,
      response: null,
      responseTime: 150,
      baselineTime: 100,
    } as any;

    const result = await worker(payload);

    expect(result.findings!.length).toBe(0);
  });

  it("ne détecte rien si responseTime est absent", async () => {
    const payload: AnalyzePayload = {
      ...base,
      response: null,
    } as any;

    const result = await worker(payload);

    expect(result.findings!.length).toBe(0);
  });
});
