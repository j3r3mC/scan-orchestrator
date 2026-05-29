import { SecurityContextPayload } from "@/types/core";

export interface HttpResponseData {
  status: number;
  headers: Record<string, string>;
  body: string;
}

export interface AnalyzePayload extends SecurityContextPayload {
  response?: HttpResponseData | null;
}
