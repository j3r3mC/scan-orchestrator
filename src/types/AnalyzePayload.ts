import { SecurityContextPayload } from "./SecurityContextPayload";

export interface AnalyzePayload extends SecurityContextPayload {
  response?: unknown;
}
