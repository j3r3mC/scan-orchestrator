import { SqliTimePayload } from "../attack/server/SqliTimePayload";
import { SqliErrorPayload } from "../attack/server/SqliErrorPayload";
import { SqliUnionPayload } from "../attack/server/SqliUnionPayload";
import { XxePayload } from "../attack/server/XxePayload";
import { RcePayload } from "../attack/server/RcePayload";
import { PathTraversalPayload } from "../attack/server/PathTraversalPayload";

describe("Attack payloads typing", () => {
  test("SqliTimePayload requires delay", () => {
    const payload: SqliTimePayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      vector: "' OR SLEEP(5)--",
      delay: 5000,
    };

    expect(payload.delay).toBe(5000);
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
      vector: '<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>',
      xmlPayload: "<!DOCTYPE foo>",
    };

    expect(payload.xmlPayload).toBe("<!DOCTYPE foo>");
  });

  test("RcePayload requires command", () => {
    const payload: RcePayload = {
      url: "http://test",
      method: "POST",
      headers: {},
      vector: "ls -la",
      command: "ls -la",
    };

    expect(payload.command).toBe("ls -la");
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

  test("SqliUnionPayload inherits SecurityContextPayload", () => {
    const payload: SqliUnionPayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      query: { id: "1 UNION SELECT 1,2" },
    };

    expect(payload.query!.id).toBe("1 UNION SELECT 1,2");
  });
});
