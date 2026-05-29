import { WorkerFinding, WorkerResult, TaskType } from "@/types/core";

import { AnalyzePayload } from "@/types/analyze";

const LFI_PATTERNS = [
  /\.\.\/\.\.\//i, // ../../
  /\.\.\//i, // ../
  /\/etc\/passwd/i,
  /\/etc\/shadow/i,
  /windows\/win\.ini/i,
  /php:\/\/filter/i,
  /file:\/\//i,
];

function detectLfi(value: unknown): boolean {
  if (!value) return false;

  const str = String(value);

  return LFI_PATTERNS.some((regex) => regex.test(str));
}

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { url, method, headers, body, query } = payload;

  // 1. Scan query parameters
  for (const [key, val] of Object.entries(query ?? {})) {
    if (detectLfi(val)) {
      findings.push({
        message: `Possible LFI detected in query parameter "${key}"`,
        severity: "high",
        taskType: TaskType.ATTACK_LFI,
      });
    }
  }

  // 2. Scan body
  for (const [key, val] of Object.entries(body ?? {})) {
    if (detectLfi(val)) {
      findings.push({
        message: `Possible LFI detected in body field "${key}"`,
        severity: "high",
        taskType: TaskType.ATTACK_LFI,
      });
    }
  }

  // 3. Scan headers
  for (const [key, val] of Object.entries(headers ?? {})) {
    if (detectLfi(val)) {
      findings.push({
        message: `Possible LFI detected in header "${key}"`,
        severity: "medium",
        taskType: TaskType.ATTACK_LFI,
      });
    }
  }

  return {
    taskType: TaskType.ATTACK_LFI,
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
