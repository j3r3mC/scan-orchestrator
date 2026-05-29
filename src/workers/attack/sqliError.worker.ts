import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerFinding, WorkerResult } from "@/types/core";

const SQL_ERROR_PATTERNS = [
  /you have an error in your sql syntax/i,
  /warning: mysql/i,
  /mysql_fetch/i,
  /unclosed quotation mark after the character string/i,
  /odbc sql server driver/i,
  /sql syntax error/i,
  /pg::syntaxerror/i,
  /sqlite3::sqlexception/i,
  /ora-\d{5}/i,
  /syntax error/i,
  /unexpected end of SQL command/i,
];

function detectSqlError(value: unknown): boolean {
  if (!value) return false;
  const str = String(value);
  return SQL_ERROR_PATTERNS.some((regex) => regex.test(str));
}

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { response } = payload;

  if (response && detectSqlError(response.body)) {
    findings.push({
      message:
        "Possible SQL Injection (Error-Based) detected in server response",
      severity: "critical",
      taskType: TaskType.ATTACK_SQLI_ERROR,
    });
  }

  return {
    taskType: TaskType.ATTACK_SQLI_ERROR,
    status: "success",
    findings,
    output: {
      scanned: !!response,
      responseSnippet: response?.body?.slice(0, 200) ?? null,
    },
  };
}
