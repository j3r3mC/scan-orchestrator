export interface CrawlPagePayload {
  url: string;
  headers?: Record<string, string>;
  depth?: number; // optionnel
}
