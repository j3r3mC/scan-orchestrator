import { SqliTimePayload } from "../attack/SqliTimePayload";
import { SqliErrorPayload } from "../attack/SqliErrorPayload";
import { XxePayload } from "../attack/XxePayload";
import { RcePayload } from "../attack/RcePayload";
import { PathTraversalPayload } from "../attack/PathTraversalPayload";

describe("Attack payloads typing", () => {
  test("SqliTimePayload requires delay", () => {
    const payload: SqliTimePayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      vector: "' OR SLEEP(5) --",
      delay: 5,
    };

    expect(payload.delay).toBe(5);
  });

  test("SqliErrorPayload requires errorSignature", () => {
    const payload: SqliErrorPayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      vector: "' OR 1=1 --",
      errorSignature: "SQL syntax error",
    };

    expect(payload.errorSignature).toBe("SQL syntax error");
  });

  test("XxePayload requires xmlPayload", () => {
    const payload: XxePayload = {
      url: "http://test",
      method: "POST",
      headers: {},
      vector: "<!DOCTYPE foo>",
      xmlPayload: "<!DOCTYPE foo>",
    };

    expect(payload.xmlPayload).toBe("<!DOCTYPE foo>");
  });

  test("RcePayload requires command", () => {
    const payload: RcePayload = {
      url: "http://test",
      method: "POST",
      headers: {},
      vector: "id",
      command: "id",
    };

    expect(payload.command).toBe("id");
  });

  test("PathTraversalPayload requires filePath", () => {
    const payload: PathTraversalPayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      vector: "../../../../etc/passwd",
      filePath: "../../../../etc/passwd",
    };

    expect(payload.filePath).toBe("../../../../etc/passwd");
  });
});
