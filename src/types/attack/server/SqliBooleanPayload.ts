import { SecurityContextPayload } from "@/types/core";

export interface SqliBooleanPayload extends SecurityContextPayload {
  body?: Record<string, unknown>;
}
