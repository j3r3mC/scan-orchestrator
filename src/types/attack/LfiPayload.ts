import { AttackBasePayload } from "./AttackBasePayload";

export interface LfiPayload extends AttackBasePayload {
  filePath: string; // ex: "../../../../etc/passwd"
}
