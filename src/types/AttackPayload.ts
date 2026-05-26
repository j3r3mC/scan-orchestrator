import { SecurityContextPayload } from "./SecurityContextPayload";

export interface AttackPayload extends SecurityContextPayload {
  param?: string;
}
