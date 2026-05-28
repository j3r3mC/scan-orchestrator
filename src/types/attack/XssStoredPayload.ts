import { AttackBasePayload } from "./AttackBasePayload";

export interface XssStoredPayload extends AttackBasePayload {
  storageLocation?: string; // ex: "comments", "profile"
}
