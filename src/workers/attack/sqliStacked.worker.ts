import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerFinding, WorkerResult } from "@/types/core";

const STACKED_PATTERNS = [
  /;\s*select/i,
  /;\s*insert/i,
  /;\s*update/i,
  /;\s*delete/i,
  /;\s*drop/i,
  /;\s*create/i,
  /;\s*alter/i,
  /;\s*exec/i,
  /;%20select/i,
  /;%0aselect/i,
];

function normalize(value: unknown): string {
  if (!value) return "";
  try {
    return decodeURIComponent(String(value)).toLowerCase();
  } catch {
    return String(value).toLowerCase();
  }
}

function detectStacked(value: unknown): boolean {
  const str = normalize(value);
  return STACKED_PATTERNS.some((regex) => regex.test(str));
}

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { query, body, headers } = payload;

  const allValues = [
    ...Object.values(query ?? {}),
    ...Object.values(body ?? {}),
    ...Object.values(headers ?? {}),
  ];

  const hasStacked = allValues.some((v) => detectStacked(v));

  if (hasStacked) {
    findings.push({
      message: "Possible SQL Injection (Stacked Queries) detected",
      severity: "critical",
      taskType: TaskType.ATTACK_SQLI_STACKED,
    });
  }

  return {
    taskType: TaskType.ATTACK_SQLI_STACKED,
    status: "success",
    findings,
    output: {
      scannedValues: allValues.length,
      detected: hasStacked,
    },
  };
}
