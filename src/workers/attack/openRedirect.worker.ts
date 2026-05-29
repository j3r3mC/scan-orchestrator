import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerFinding, WorkerResult } from "@/types/core";

const REDIRECT_KEYS = ["redirect", "next", "url", "continue", "return", "goto"];

const EVIL_PATTERNS = [
  /^https?:\/\//i,
  /^\/\//i,
  /%2f%2f/i,
  /%68%74%74%70%3a%2f%2f/i, // http:// encodé
];

function normalize(value: unknown): string {
  if (!value) return "";
  try {
    return decodeURIComponent(String(value)).toLowerCase();
  } catch {
    return String(value).toLowerCase();
  }
}

function detectOpenRedirect(key: string, value: unknown): boolean {
  const val = normalize(value);
  if (!REDIRECT_KEYS.includes(key.toLowerCase())) return false;
  return EVIL_PATTERNS.some((regex) => regex.test(val));
}

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { query } = payload;

  const entries = Object.entries(query ?? {});

  const hasRedirect = entries.some(([key, value]) =>
    detectOpenRedirect(key, value),
  );

  if (hasRedirect) {
    findings.push({
      message: "Possible Open Redirect detected in request parameters",
      severity: "high",
      taskType: TaskType.ATTACK_OPEN_REDIRECT,
    });
  }

  return {
    taskType: TaskType.ATTACK_OPEN_REDIRECT,
    status: "success",
    findings,
    output: {
      scannedParams: entries.length,
      detected: hasRedirect,
    },
  };
}
