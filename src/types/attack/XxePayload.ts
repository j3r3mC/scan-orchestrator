import { AttackBasePayload } from "./AttackBasePayload";

export interface XxePayload extends AttackBasePayload {
  xmlPayload: string; // Le XML injecté
  externalEntityUrl?: string; // URL ciblée par l'entité externe
}
