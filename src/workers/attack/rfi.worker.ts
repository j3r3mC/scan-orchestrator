import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerFinding, WorkerResult } from "@/types/core";

const RFI_PATTERNS = [
  /^https?:\/\//i,
  /^ftp:\/\//i,
  /^smb:\/\//i,
  /^php:\/\/input/i,
  /^data:\/\//i,
];

function detectRfi(value: unknown): boolean {
  if (!value) return false;
  const str = String(value);
  return RFI_PATTERNS.some((regex) => regex.test(str));
}

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { url, method, headers, body, query } = payload;

  // 1. Query parameters
  for (const [key, val] of Object.entries(query ?? {})) {
    if (detectRfi(val)) {
      findings.push({
        message: `Possible RFI detected in query parameter "${key}"`,
        severity: "critical",
        taskType: TaskType.ATTACK_RFI,
      });
    }
  }

  // 2. Body fields
  for (const [key, val] of Object.entries(body ?? {})) {
    if (detectRfi(val)) {
      findings.push({
        message: `Possible RFI detected in body field "${key}"`,
        severity: "critical",
        taskType: TaskType.ATTACK_RFI,
      });
    }
  }

  // 3. Headers
  for (const [key, val] of Object.entries(headers ?? {})) {
    if (detectRfi(val)) {
      findings.push({
        message: `Possible RFI detected in header "${key}"`,
        severity: "high",
        taskType: TaskType.ATTACK_RFI,
      });
    }
  }

  return {
    taskType: TaskType.ATTACK_RFI,
    status: "success",
    findings,
    output: {
      url,
      method,
      scannedFields: {
        query: Object.keys(query ?? {}),
        body: Object.keys(body ?? {}),
        headers: Object.keys(headers ?? {}),
      },
    },
  };
}
