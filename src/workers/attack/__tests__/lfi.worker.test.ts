import { worker } from "../lfi.worker";
import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerResult } from "@/types/core";

describe("lfi.worker", () => {
  it("détecte un LFI dans les query params", async () => {
    const payload: AnalyzePayload = {
      url: "https://example.com",
      method: "GET",
      headers: {},
      body: {},
      query: { file: "../../etc/passwd" },
      response: null,
    };

    const result: WorkerResult = await worker(payload);

    expect(result.findings).toBeDefined();
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].taskType).toBe(TaskType.ATTACK_LFI);
    expect(result.findings![0].message).toContain("query parameter");
  });

  it("détecte un LFI dans le body", async () => {
    const payload: AnalyzePayload = {
      url: "https://example.com",
      method: "POST",
      headers: {},
      body: { path: "../windows/win.ini" },
      query: {},
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings).toBeDefined();
    expect(result.findings!.length).toBe(1);
    expect(result.findings![0].message).toContain("body field");
  });

  it("détecte un LFI dans les headers", async () => {
    const payload: AnalyzePayload = {
      url: "https://example.com",
      method: "GET",
      headers: {
        "x-custom-path":
          "php://filter/convert.base64-encode/resource=index.php",
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
      headers: { "x-header": "hello" },
      body: { name: "test" },
      query: { id: "123" },
      response: null,
    };

    const result = await worker(payload);

    expect(result.findings).toBeDefined();
    expect(result.findings!.length).toBe(0);
  });
});
