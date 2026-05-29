import { TaskType } from "./TaskType";

// Crawl
import { CrawlPagePayload } from "../crawls/CrawlPagePayload";
import { CrawlAssetsPayload } from "../crawls/CrawlAssetsPayload";
import { CrawlFormPayload } from "../crawls/CrawlFormPayload";
import { CrawlApiPayload } from "../crawls/CrawlApiPayload";

// Analyze
import { AnalyzePayload } from "../analyze/AnalyzePayload";
import { AnalyzeJsPayload } from "../analyze/AnalyzeJsPayload";

// Attack (server)
import { HeadersPayload } from "../attack/server/HeadersPayload";
import { LfiPayload } from "../attack/server/LfiPayload";
import { RfiPayload } from "../attack/server/RfiPayload";
import { SqliErrorPayload } from "../attack/server/SqliErrorPayload";
import { SqliTimePayload } from "../attack/server/SqliTimePayload";
import { PathTraversalPayload } from "../attack/server/PathTraversalPayload";
import { RcePayload } from "../attack/server/RcePayload";
import { XxePayload } from "../attack/server/XxePayload";
import { SsrfPayload } from "../attack/server/SsrfPayload";
import { SqliUnionPayload } from "../attack/server/SqliUnionPayload";
import { SqliStackedPayload } from "../attack/server/SqliStackedPayload";

// Attack (client)
import { XssReflectedPayload } from "../attack/client/XssReflectedPayload";
import { XssStoredPayload } from "../attack/client/XssStoredPayload";

// Normalize
import { NormalizeAttackPayload } from "../normalize/NormalizeAttackPayload";
import { NormalizeContextPayload } from "../normalize/NormalizeContextPayload";
import { NormalizeAssetsPayload } from "../normalize/NormalizeAssetsPayload";
import { SqliBooleanPayload } from "../attack/server/SqliBooleanPayload";
import { OpenRedirectPayload } from "../attack/server/OpenRedirectPayload";

export type TaskPayloadMap = {
  // Crawl
  [TaskType.CRAWL_PAGE]: CrawlPagePayload;
  [TaskType.CRAWL_ASSETS]: CrawlAssetsPayload;
  [TaskType.CRAWL_FORM]: CrawlFormPayload;
  [TaskType.CRAWL_API]: CrawlApiPayload;

  // Analyze
  [TaskType.ANALYZE_HTTP]: AnalyzePayload;
  [TaskType.ANALYZE_DOM]: AnalyzeJsPayload;

  // Attack (server)
  [TaskType.ATTACK_HEADERS]: AnalyzePayload; // ou SecurityContextPayload si tu préfères
  [TaskType.ATTACK_LFI]: LfiPayload;
  [TaskType.ATTACK_RFI]: RfiPayload;
  [TaskType.ATTACK_SQLI_ERROR]: SqliErrorPayload;
  [TaskType.ATTACK_SQLI_TIME]: SqliTimePayload;
  [TaskType.ATTACK_SQLI_UNION]: SqliUnionPayload;
  [TaskType.ATTACK_PATH_TRAVERSAL]: PathTraversalPayload;
  [TaskType.ATTACK_SQLI_BOOLEAN]: SqliBooleanPayload;
  [TaskType.ATTACK_SQLI_STACKED]: SqliStackedPayload;

  [TaskType.ATTACK_RCE]: RcePayload;
  [TaskType.ATTACK_XXE]: XxePayload;
  [TaskType.ATTACK_SSRF]: SsrfPayload;
  [TaskType.ATTACK_OPEN_REDIRECT]: OpenRedirectPayload;

  // Attack (client)
  [TaskType.ATTACK_XSS_REFLECTED]: XssReflectedPayload;
  [TaskType.ATTACK_XSS_STORED]: XssStoredPayload;

  // Normalize
  [TaskType.NORMALIZE_ATTACK]: NormalizeAttackPayload;
  [TaskType.NORMALIZE_CONTEXT]: NormalizeContextPayload;
  [TaskType.NORMALIZE_ASSETS]: NormalizeAssetsPayload;
};

export type TaskPayload = TaskPayloadMap[TaskType];
