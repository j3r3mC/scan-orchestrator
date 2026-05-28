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
  | "attack:xxe"
  | "attack:rce"
  | "attack:pathtraversal"

  // Analyze
  | "analyze:http"
  | "analyze:dom"
  | "analyze:js"

  // Normalize
  | "normalize:attack"
  | "normalize:context"
  | "normalize:assets";
