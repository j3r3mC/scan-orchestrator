import { CrawlPagePayload } from "./CrawlPayload";
import { AttackPayload } from "./AttackPayload";
import { AnalyzePayload } from "./AnalyzePayload";
import { NormalizePayload } from "./NormalizePayload";
import { TaskType } from "./TaskType";

export type TaskPayloadMap = {
  // Crawl
  "crawl:page": CrawlPagePayload;
  "crawl:assets": CrawlPagePayload;
  "crawl:form": CrawlPagePayload;
  "crawl:api": CrawlPagePayload;

  // Attack
  "attack:sqli:timebased": AttackPayload;
  "attack:sqli:errorbased": AttackPayload;
  "attack:xss:reflected": AttackPayload;
  "attack:xss:stored": AttackPayload;
  "attack:lfi": AttackPayload;
  "attack:rfi": AttackPayload;
  "attack:headers": AttackPayload;

  // Analyze
  "analyze:http": AnalyzePayload;
  "analyze:dom": AnalyzePayload;

  // Normalize
  "normalize:attack": NormalizePayload;
  "normalize:context": NormalizePayload;
};

export type TaskPayload = TaskPayloadMap[TaskType];
