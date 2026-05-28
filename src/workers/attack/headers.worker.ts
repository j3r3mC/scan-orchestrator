import { TaskPayloadMap } from "@/types/core";
import { WorkerFinding, WorkerResult } from "@/types/core";
import { TaskType } from "@/types/core";

export async function worker(
  payload: TaskPayloadMap[TaskType.ATTACK_HEADERS],
): Promise<WorkerResult> {
  const { url, method, headers } = payload;

  const findings: WorkerFinding[] = [];

  if (!headers["content-security-policy"]) {
    findings.push({
      message: "Missing Content-Security-Policy header",
      severity: "medium",
      taskType: TaskType.ATTACK_HEADERS,
    });
  }

  if (headers["x-powered-by"]) {
    findings.push({
      message: `Leaking technology via X-Powered-By: ${headers["x-powered-by"]}`,
      severity: "low",
      taskType: TaskType.ATTACK_HEADERS,
    });
  }

  if (headers["server"]) {
    findings.push({
      message: `Server header exposed: ${headers["server"]}`,
      severity: "low",
      taskType: TaskType.ATTACK_HEADERS,
    });
  }

  return {
    taskType: TaskType.ATTACK_HEADERS,
    status: "success",

    output: {
      analyzedHeaders: Object.keys(headers),
    },

    findings,
  };
}
