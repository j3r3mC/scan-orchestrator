import { SecurityContextPayload } from "@/types/core";

export interface SqliUnionPayload extends SecurityContextPayload {
  body?: Record<string, unknown>;
}
