import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerFinding, WorkerResult } from "@/types/core";

const XSS_PATTERNS = [
  /<script.*?>/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /javascript:/i,
  /<img[^>]+onerror/i,
  /<svg[^>]+onload/i,
];

function normalize(value: unknown): string {
  if (!value) return "";
  try {
    return decodeURIComponent(String(value)).toLowerCase();
  } catch {
    return String(value).toLowerCase();
  }
}

function detectXss(value: unknown): boolean {
  const str = normalize(value);
  return XSS_PATTERNS.some((r) => r.test(str));
}

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { body } = payload;

  const values = Object.values(body ?? {});

  const hasXss = values.some((v) => detectXss(v));

  if (hasXss) {
    findings.push({
      message: "Possible Stored XSS detected",
      severity: "critical",
      taskType: TaskType.ATTACK_XSS_STORED,
    });
  }

  return {
    taskType: TaskType.ATTACK_XSS_STORED,
    status: "success",
    findings,
    output: {
      scannedValues: values.length,
      detected: hasXss,
    },
  };
}
