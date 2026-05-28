import { SecurityContextPayload } from "@/types/core";

export interface AnalyzePayload extends SecurityContextPayload {
  response?: unknown;
}
