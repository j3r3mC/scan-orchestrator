import { SecurityContextPayload } from "@/types/core";

export interface GenericAttackPayload extends SecurityContextPayload {
  vector?: string; // payload injecté (ex: "' OR 1=1 --")
  param?: string; // paramètre ciblé (ex: "username")
  rawFindings?: unknown[]; // findings bruts du worker d’attaque
  content?: unknown; // contenu ciblé (ex: réponse HTTP, DOM, etc.)
  context?: unknown; // utilisé par normalize:context
  details?: Record<string, any>; // infos supplémentaires
}
