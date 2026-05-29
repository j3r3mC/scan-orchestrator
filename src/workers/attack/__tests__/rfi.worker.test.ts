import { worker } from "../rfi.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerResult } from "@/types/core";

describe("rfi.worker", () => {
  it("détecte un RFI dans les query params", async () => {
    const payload: AnalyzePayload = {
      url: "https://example.com",
      method: "GET",
      headers: {},
      body: {},
      query: {
        include: "http://evil.com/shell.txt",
      },
      response: null,
    };

    const result: WorkerResult = await worker(payload);

    expect(result.findings).toBeDefined();
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_RFI);
    expect(result.findings![0].message).toContain("query parameter");
  });

  it("détecte un RFI dans le body", async () => {
    const payload: AnalyzePayload = {
      url: "https://example.com",
      method: "POST",
      headers: {},
      body: {
        template: "https://attacker.net/backdoor.php",
      },
      query: {},
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings).toBeDefined();
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].message).toContain("body field");
  });

  it("détecte un RFI dans les headers", async () => {
    const payload: AnalyzePayload = {
      url: "https://example.com",
      method: "GET",
      headers: {
        "x-forwarded-host": "ftp://malicious.site/payload",
      },
      body: {},
      query: {},
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings).toBeDefined();
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].message).toContain("header");
  });

  it("ne détecte rien si aucune valeur n'est suspecte", async () => {
    const payload: AnalyzePayload = {
      url: "https://example.com",
      method: "GET",
      headers: {
        "x-header": "hello",
      },
      body: {
        name: "test",
      },
      query: {
        id: "123",
      },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings).toBeDefined();
    expect(result.findings!.length).toBe(0);
  });
});
