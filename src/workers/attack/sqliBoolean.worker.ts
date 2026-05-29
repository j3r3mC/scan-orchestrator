import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerFinding, WorkerResult } from "@/types/core";

const BOOLEAN_PATTERNS = [
  /'\s*or\s*'1'\s*=\s*'1/i,
  /"\s*or\s*"1"\s*=\s*"1/i,
  /\sor\s1=1/i,
  /\sand\s1=1/i,
  /\sand\s1=2/i,
  /\sor\s'[^']*'\s*=\s*'[^']*'/i,
  /\sor\strue--/i,
];

function normalize(value: unknown): string {
  if (!value) return "";
  try {
    return decodeURIComponent(String(value)).toLowerCase();
  } catch {
    return String(value).toLowerCase();
  }
}

function detectBooleanSqli(value: unknown): boolean {
  const str = normalize(value);
  return BOOLEAN_PATTERNS.some((regex) => regex.test(str));
}

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { query, body, headers } = payload;

  const allValues = [
    ...Object.values(query ?? {}),
    ...Object.values(body ?? {}),
    ...Object.values(headers ?? {}),
  ];

  const hasBoolean = allValues.some((v) => detectBooleanSqli(v));

  if (hasBoolean) {
    findings.push({
      message:
        "Possible SQL Injection (Boolean-Based) detected in request parameters",
      severity: "critical",
      taskType: TaskType.ATTACK_SQLI_BOOLEAN,
    });
  }

  return {
    taskType: TaskType.ATTACK_SQLI_BOOLEAN,
    status: "success",
    findings,
    output: {
      scannedValues: allValues.length,
      detected: hasBoolean,
    },
  };
}
