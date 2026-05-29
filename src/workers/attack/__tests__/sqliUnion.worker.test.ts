import { worker } from "../sqliUnion.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType } from "@/types/core";

describe("sqliUnion.worker", () => {
  const base: Omit<AnalyzePayload, "response"> = {
    url: "https://example.com",
    method: "GET",
    headers: {},
    body: {},
    query: {},
  };

  it("détecte un UNION SELECT classique", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "UNION SELECT username, password FROM users" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_SQLI_UNION);
  });

  it("détecte un UNION SELECT obfusqué", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "UNION/**/SELECT 1,2" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
  });

  it("détecte un UNION SELECT encodé", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "UNION%20SELECT%201,2" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
  });

  it("ne détecte rien si aucun pattern n'est présent", async () => {
    const payload: AnalyzePayload = {
      ...base,
      query: { q: "hello world" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(0);
  });
});
