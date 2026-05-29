import { worker } from "../sqliBoolean.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType } from "@/types/core";

describe("sqliBoolean.worker", () => {
  const base: Omit<AnalyzePayload, "response"> = {
    url: "https://example.com",
    method: "GET",
    headers: {},
    body: {},
    query: {},
  };

  it("détecte un payload classique ' OR '1'='1", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "' OR '1'='1" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_SQLI_BOOLEAN);
  });

  it("détecte un payload OR 1=1", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "test' or 1=1--" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
  });

  it("détecte un payload encodé", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "%27%20OR%20%271%27%3D%271" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
  });

  it("ne détecte rien sur une requête légitime", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "hello world" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(0);
  });
});
