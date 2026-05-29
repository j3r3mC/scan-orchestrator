import { worker } from "../sqliError.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType } from "@/types/core";

describe("sqliError.worker", () => {
  const base: Omit<AnalyzePayload, "response"> = {
    url: "https://example.com",
    method: "GET",
    headers: {},
    body: {},
    query: {},
  };

  it("détecte une erreur SQL classique", async () => {
    const payload: AnalyzePayload = {
      ...base,
      response: {
        status: 500,
        headers: {},
        body: "You have an error in your SQL syntax near 'FROM'",
      },
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_SQLI_ERROR);
  });

  it("détecte une erreur PostgreSQL (pg::SyntaxError)", async () => {
    const payload: AnalyzePayload = {
      ...base,
      response: {
        status: 500,
        headers: {},
        body: 'PG::SyntaxError: ERROR: syntax error at or near "SELECT"',
      },
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_SQLI_ERROR);
  });

  it("ne détecte rien si la réponse est propre", async () => {
    const payload: AnalyzePayload = {
      ...base,
      response: {
        status: 200,
        headers: {},
        body: "Hello world",
      },
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(0);
  });

  it("ne détecte rien si aucune réponse n'est fournie", async () => {
    const payload: AnalyzePayload = {
      ...base,
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings!.length).toBe(0);
  });
});
