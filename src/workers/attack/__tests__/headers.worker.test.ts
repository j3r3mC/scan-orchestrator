import { worker } from "../headers.worker";
import {
  TaskType,
  WorkerFinding,
  WorkerResult,
  SecurityContextPayload,
} from "@/types/core";

describe("headers.worker", () => {
  it("détecte l'absence de Content-Security-Policy", async () => {
    const payload: SecurityContextPayload = {
      url: "https://example.com",
      method: "GET",
      headers: {
        "x-powered-by": "Express",
        server: "nginx",
      },
      body: {},
      query: {},
    };

    const result: WorkerResult = await worker(payload);

    const finding = result.findings?.find((f) =>
      f.message.includes("Content-Security-Policy"),
    );

    expect(finding).toBeDefined();
    expect(finding?.severity).toBe("medium");
  });

  it("détecte la présence de X-Powered-By", async () => {
    const payload: SecurityContextPayload = {
      url: "https://example.com",
      method: "GET",
      headers: {
        "x-powered-by": "PHP/8.1",
      },
      body: {},
      query: {},
    };

    const result = await worker(payload);

    const finding = result.findings?.find((f) =>
      f.message.includes("X-Powered-By"),
    );

    expect(finding).toBeDefined();
    expect(finding?.severity).toBe("low");
  });

  it("détecte la présence du header Server", async () => {
    const payload: SecurityContextPayload = {
      url: "https://example.com",
      method: "GET",
      headers: {
        server: "Apache",
      },
      body: {},
      query: {},
    };

    const result = await worker(payload);

    const finding = result.findings?.find((f) =>
      f.message.includes("Server header exposed"),
    );

    expect(finding).toBeDefined();
    expect(finding?.severity).toBe("low");
  });

  it("retourne la liste des headers analysés", async () => {
    const payload: SecurityContextPayload = {
      url: "https://example.com",
      method: "GET",
      headers: {
        server: "nginx",
        "x-powered-by": "Express",
      },
      body: {},
      query: {},
    };

    const result = await worker(payload);

    expect(result.output).toBeDefined();
    expect((result.output as any).analyzedHeaders).toContain("server");
    expect((result.output as any).analyzedHeaders).toContain("x-powered-by");
  });
});
