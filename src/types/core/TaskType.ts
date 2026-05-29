export enum TaskType {
  // Crawl
  CRAWL_PAGE = "crawl:page",
  CRAWL_ASSETS = "crawl:assets",
  CRAWL_FORM = "crawl:form",
  CRAWL_API = "crawl:api",

  // Analyze
  ANALYZE_HTTP = "analyze:http",
  ANALYZE_DOM = "analyze:dom",

  // Attack (server)
  ATTACK_HEADERS = "attack:headers",
  ATTACK_LFI = "attack:lfi",
  ATTACK_RFI = "attack:rfi",
  ATTACK_SQLI_ERROR = "attack:sqli:error",
  ATTACK_SQLI_TIME = "attack:sqli:time",
  ATTACK_SQLI_UNION = "attack:sqli:union",
  ATTACK_SQLI_BOOLEAN = "attack:sqli:boolean",
  ATTACK_SQLI_STACKED = "attack:sqli:stacked",

  ATTACK_PATH_TRAVERSAL = "attack:pathtraversal",
  ATTACK_RCE = "attack:rce",
  ATTACK_XXE = "attack:xxe",
  ATTACK_SSRF = "attack:ssrf",
  ATTACK_OPEN_REDIRECT = "attack:openredirect",

  // Attack (client)
  ATTACK_XSS_REFLECTED = "attack:xss:reflected",
  ATTACK_XSS_STORED = "attack:xss:stored",

  // Normalize
  NORMALIZE_CONTEXT = "normalize:context",
  NORMALIZE_ATTACK = "normalize:attack",
  NORMALIZE_ASSETS = "normalize:assets",
}
