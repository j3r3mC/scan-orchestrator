import { AttackBasePayload } from "./AttackBasePayload";

export interface XssReflectedPayload extends AttackBasePayload {
  marker: string; // ex: "<xss123>"
}
