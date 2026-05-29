import { SqliTimePayload } from "../attack/server/SqliTimePayload";
import { SqliErrorPayload } from "../attack/server/SqliErrorPayload";
import { XxePayload } from "../attack/server/XxePayload";
import { RcePayload } from "../attack/server/RcePayload";
import { PathTraversalPayload } from "../attack/server/PathTraversalPayload";
import { SqliBooleanPayload } from "../attack/server/SqliBooleanPayload";
import { SqliUnionPayload } from "../attack/server/SqliUnionPayload";
import { SqliStackedPayload } from "../attack/server/SqliStackedPayload";
import { OpenRedirectPayload } from "../attack/server/OpenRedirectPayload";
import { XssReflectedPayload } from "../attack/client/XssReflectedPayload";
import { XssStoredPayload } from "../attack/client/XssStoredPayload";

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

  test("SqliBooleanPayload accepts boolean-based SQLi vectors", () => {
    const payload: SqliBooleanPayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      query: { q: "' OR '1'='1" },
      body: {},
    };

    expect(payload.query!.q).toBe("' OR '1'='1");
  });

  test("SqliUnionPayload accepts UNION-based SQLi vectors", () => {
    const payload: SqliUnionPayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      query: { q: "UNION SELECT 1,2" },
      body: {},
    };

    expect(payload.query!.q).toBe("UNION SELECT 1,2");
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

  test("SqliStackedPayload accepts stacked SQLi vectors", () => {
    const payload: SqliStackedPayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      query: { q: "1; DROP TABLE users;" },
    };

    expect(payload.query!.q).toBe("1; DROP TABLE users;");
  });

  test("OpenRedirectPayload accepts redirect parameters", () => {
    const payload: OpenRedirectPayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      query: { redirect: "http://evil.com" },
    };

    expect(payload.query!.redirect).toBe("http://evil.com");
  });

  test("XssReflectedPayload requires marker", () => {
    const payload: XssReflectedPayload = {
      url: "http://test",
      method: "GET",
      headers: {},
      body: {},
      query: {},
      vector: "<script>alert(1)</script>",
      marker: "XSS_MARKER",
    };

    expect(payload.marker).toBe("XSS_MARKER");
  });

  test("XssStoredPayload accepts stored XSS vectors", () => {
    const payload: XssStoredPayload = {
      url: "http://test",
      method: "POST",
      headers: {},
      body: {},
      query: {},
      vector: "<img src=x onerror=alert(1)>",
    };

    expect(payload.vector).toBe("<img src=x onerror=alert(1)>");
  });
});
