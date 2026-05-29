import { AnalyzePayload } from "@/types/analyze";
import { TaskType, WorkerFinding, WorkerResult } from "@/types/core";

const TIME_THRESHOLD_MS = 2000; // 2 secondes

export async function worker(payload: AnalyzePayload): Promise<WorkerResult> {
  const findings: WorkerFinding[] = [];

  const { responseTime, baselineTime } = payload as any;

  if (typeof responseTime === "number") {
    const baseline = typeof baselineTime === "number" ? baselineTime : 300;

    const isSlow =
      responseTime > baseline * 3 || responseTime > TIME_THRESHOLD_MS;

    if (isSlow) {
      findings.push({
        message:
          "Possible SQL Injection (Time-Based) detected due to abnormal response delay",
        severity: "critical",
        taskType: TaskType.ATTACK_SQLI_TIME,
      });
    }
  }

  return {
    taskType: TaskType.ATTACK_SQLI_TIME,
    status: "success",
    findings,
    output: {
      responseTime,
      baselineTime,
      isSlow: findings.length > 0,
    },
  };
}
