import { AttackBasePayload } from "../common/AttackBasePayload";

export interface LfiPayload extends AttackBasePayload {
  filePath: string; // ex: "../../../../etc/passwd"
}
