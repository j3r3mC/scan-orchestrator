import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerFinding, WorkerResult } from "@/types/core";

const UNION_PATTERNS = [
  /union\s+select/i,
  /union\s+all\s+select/i,
  /union\/\*.*?\*\/\s*select/i,
  /union%20select/i,
  /union%0aselect/i,
  /union%09select/i,
];

function normalize(value: unknown): string {
  if (!value) return "";
  return decodeURIComponent(String(value)).toLowerCase();
}

function detectUnion(value: unknown): boolean {
  const str = normalize(value);
  return UNION_PATTERNS.some((regex) => regex.test(str));
}

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { query, body, headers } = payload;

  const allValues = [
    ...Object.values(query ?? {}),
    ...Object.values(body ?? {}),
    ...Object.values(headers ?? {}),
  ];

  const hasUnion = allValues.some((v) => detectUnion(v));

  if (hasUnion) {
    findings.push({
      message:
        "Possible SQL Injection (UNION-Based) detected in request parameters",
      severity: "critical",
      taskType: TaskType.ATTACK_SQLI_UNION,
    });
  }

  return {
    taskType: TaskType.ATTACK_SQLI_UNION,
    status: "success",
    findings,
    output: {
      scannedValues: allValues.length,
      detected: hasUnion,
    },
  };
}
