import { CrawlPagePayload } from "../crawls/CrawlPagePayload";
import { CrawlAssetsPayload } from "../crawls/CrawlAssetsPayload";
import { CrawlFormPayload } from "../crawls/CrawlFormPayload";
import { CrawlApiPayload } from "../crawls/CrawlApiPayload";

import { SqliTimePayload } from "../attack/server/SqliTimePayload";
import { SqliErrorPayload } from "../attack/server/SqliErrorPayload";
import { XssReflectedPayload } from "../attack/client/XssReflectedPayload";
import { XssStoredPayload } from "../attack/client/XssStoredPayload";
import { LfiPayload } from "../attack/server/LfiPayload";
import { RfiPayload } from "../attack/server/RfiPayload";
import { HeadersPayload } from "../attack/server/HeadersPayload";
import { OpenRedirectPayload } from "../attack/client/OpenRedirectPayload";

import { XxePayload } from "../attack/server/XxePayload";
import { RcePayload } from "../attack/server/RcePayload";
import { PathTraversalPayload } from "../attack/server/PathTraversalPayload";

import { AnalyzePayload } from "../analyze/AnalyzePayload";
import { AnalyzeJsPayload } from "../analyze/AnalyzeJsPayload";

import { NormalizeAssetsPayload } from "../normalize/NormalizeAssetsPayload";
import { NormalizeAttackPayload } from "../normalize/NormalizeAttackPayload";
import { NormalizeContextPayload } from "../normalize/NormalizeContextPayload";

import { TaskType } from "./TaskType";
import { SsrfPayload } from "../attack/server/SsrfPayload";

export type TaskPayloadMap = {
  // Crawl
  "crawl:page": CrawlPagePayload;
  "crawl:assets": CrawlAssetsPayload;
  "crawl:form": CrawlFormPayload;
  "crawl:api": CrawlApiPayload;

  // Attack
  "attack:sqli:timebased": SqliTimePayload;
  "attack:sqli:errorbased": SqliErrorPayload;
  "attack:xss:reflected": XssReflectedPayload;
  "attack:xss:stored": XssStoredPayload;
  "attack:lfi": LfiPayload;
  "attack:rfi": RfiPayload;
  "attack:headers": HeadersPayload;
  "attack:openredirect": OpenRedirectPayload;
  "attack:ssrf": SsrfPayload;

  // New attacks
  "attack:xxe": XxePayload;
  "attack:rce": RcePayload;
  "attack:pathtraversal": PathTraversalPayload;

  // Analyze
  "analyze:http": AnalyzePayload;
  "analyze:dom": AnalyzePayload;
  "analyze:js": AnalyzeJsPayload;

  // Normalize
  "normalize:attack": NormalizeAttackPayload;
  "normalize:context": NormalizeContextPayload;
  "normalize:assets": NormalizeAssetsPayload;
};

export type TaskPayload = TaskPayloadMap[TaskType];
