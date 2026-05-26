export type TaskType =
  // Crawl
  | "crawl:page"
  | "crawl:assets"
  | "crawl:form"
  | "crawl:api"

  // Attacks
  | "attack:sqli:timebased"
  | "attack:sqli:errorbased"
  | "attack:xss:reflected"
  | "attack:xss:stored"
  | "attack:lfi"
  | "attack:rfi"
  | "attack:headers"

  // Analyze
  | "analyze:http"
  | "analyze:dom"

  // Normalize
  | "normalize:attack"
  | "normalize:context";

export interface Task {
  id: string;
  type: TaskType;
  payload: unknown;
  createdAt: number;
}
