import { AttackBasePayload } from "./AttackBasePayload";

export interface PathTraversalPayload extends AttackBasePayload {
  filePath: string; // ex: "../../../../etc/passwd"
  depth?: number; // profondeur de traversal
}
