import { AttackBasePayload } from "../common/AttackBasePayload";

export interface XssReflectedPayload extends AttackBasePayload {
  marker: string; // ex: "<xss123>"
}
