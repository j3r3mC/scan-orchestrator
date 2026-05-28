export interface SecurityContextPayload {
  url: string;
  method: string;
  headers: Record<string, string>;
  ip?: string;
  body?: unknown;
  query?: Record<string, string | string[]>;
  cookies?: Record<string, string>;
}
