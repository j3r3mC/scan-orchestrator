import { SecurityContextPayload } from "@/types/core";

export interface SqliStackedPayload extends SecurityContextPayload {
  body?: Record<string, unknown>;
}
