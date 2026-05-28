import { AttackBasePayload } from "./AttackBasePayload";

export interface OpenRedirectPayload extends AttackBasePayload {
  redirectUrl: string;
}
