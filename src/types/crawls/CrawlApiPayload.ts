export interface CrawlApiPayload {
  baseUrl: string;
  headers?: Record<string, string>;
  depth?: number;
}
