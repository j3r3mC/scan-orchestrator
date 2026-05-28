import { SecurityContextPayload } from "../core/SecurityContextPayload";

export interface AttackBasePayload extends SecurityContextPayload {
  vector: string; // payload injecté
  param?: string; // paramètre ciblé
  context?: unknown; // contexte additionnel
}
