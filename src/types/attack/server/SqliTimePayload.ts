import { AttackBasePayload } from "../common/AttackBasePayload";

export interface SqliTimePayload extends AttackBasePayload {
  delay: number; // ex: 5 secondes
}
