import { AttackBasePayload } from "../common/AttackBasePayload";

export interface XssStoredPayload extends AttackBasePayload {
  storageLocation?: string; // ex: "comments", "profile"
}
