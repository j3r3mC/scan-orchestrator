import { AttackBasePayload } from "../common/AttackBasePayload";

export interface SqliErrorPayload extends AttackBasePayload {
  errorSignature: string; // ex: "You have an error in your SQL syntax"
}
