import { CrawlPagePayload } from "../crawls/CrawlPagePayload";
import { CrawlAssetsPayload } from "../crawls/CrawlAssetsPayload";
import { CrawlFormPayload } from "../crawls/CrawlFormPayload";
import { CrawlApiPayload } from "../crawls/CrawlApiPayload";

import { SqliTimePayload } from "../attack/SqliTimePayload";
import { SqliErrorPayload } from "../attack/SqliErrorPayload";
import { XssReflectedPayload } from "../attack/XssReflectedPayload";
import { XssStoredPayload } from "../attack/XssStoredPayload";
import { LfiPayload } from "../attack/LfiPayload";
import { RfiPayload } from "../attack/RfiPayload";
import { HeadersPayload } from "../attack/HeadersPayload";
import { OpenRedirectPayload } from "../attack/OpenRedirectPayload";

import { XxePayload } from "../attack/XxePayload";
import { RcePayload } from "../attack/RcePayload";
import { PathTraversalPayload } from "../attack/PathTraversalPayload";

import { AnalyzePayload } from "../analyze/AnalyzePayload";
import { AnalyzeJsPayload } from "../analyze/AnalyzeJsPayload";

import { NormalizeAssetsPayload } from "../normalize/NormalizeAssetsPayload";
import { NormalizeAttackPayload } from "../normalize/NormalizeAttackPayload";
import { NormalizeContextPayload } from "../normalize/NormalizeContextPayload";

import { TaskType } from "./TaskType";
import { SsrfPayload } from "../attack/SsrfPayload";

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
