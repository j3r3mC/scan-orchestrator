import { AttackBasePayload } from "../common/AttackBasePayload";

export interface OpenRedirectPayload extends AttackBasePayload {
  redirectUrl: string;
}
