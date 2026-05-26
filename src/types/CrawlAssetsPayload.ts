export interface CrawlAssetsPayload {
  url: string;
  headers?: Record<string, string>;
  includeJS?: boolean;
  includeCSS?: boolean;
  includeImages?: boolean;
  includeFonts?: boolean;
  followImports?: boolean;
}
