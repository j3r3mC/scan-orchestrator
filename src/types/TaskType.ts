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
  | "attack:openredirect"

  // Analyze
  | "analyze:http"
  | "analyze:dom"
  | "analyze:js"

  // Normalize
  | "normalize:attack"
  | "normalize:context"
  | "normalize:assets";

export interface Task {
  id: string;
  type: TaskType;
  payload: unknown;
  createdAt: number;
}
