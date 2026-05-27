import { CrawlPagePayload } from "./CrawlPagePayload";
import { CrawlAssetsPayload } from "./CrawlAssetsPayload";
import { CrawlFormPayload } from "./CrawlFormPayload";

import { AttackPayload } from "./AttackPayload";
import { AnalyzePayload } from "./AnalyzePayload";
import { NormalizePayload } from "./NormalizePayload";

import { TaskType } from "./TaskType";
import { CrawlApiPayload } from "./CrawlApiPayload";
import { AnalyzeJsPayload } from "./AnalyzeJsPayload";
import { NormalizeAssetsPayload } from "./NormalizeAssetsPayload";

export type TaskPayloadMap = {
  // Crawl
  "crawl:page": CrawlPagePayload;
  "crawl:assets": CrawlAssetsPayload;
  "crawl:form": CrawlFormPayload;
  "crawl:api": CrawlApiPayload;

  // Attack
  "attack:sqli:timebased": AttackPayload;
  "attack:sqli:errorbased": AttackPayload;
  "attack:xss:reflected": AttackPayload;
  "attack:xss:stored": AttackPayload;
  "attack:lfi": AttackPayload;
  "attack:rfi": AttackPayload;
  "attack:headers": AttackPayload;
  "attack:openredirect": AttackPayload;

  // Analyze
  "analyze:http": AnalyzePayload;
  "analyze:dom": AnalyzePayload;
  "analyze:js": AnalyzeJsPayload;

  // Normalize
  "normalize:attack": NormalizePayload;
  "normalize:context": NormalizePayload;
  "normalize:assets": NormalizeAssetsPayload;
};

export type TaskPayload = TaskPayloadMap[TaskType];
