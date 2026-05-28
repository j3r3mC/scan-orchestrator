import { AttackBasePayload } from "../common/AttackBasePayload";

export interface RfiPayload extends AttackBasePayload {
  remoteUrl: string; // ex: "http://evil.com/shell.txt"
}
