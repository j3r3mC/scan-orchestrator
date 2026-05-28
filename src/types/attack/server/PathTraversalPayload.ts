import { AttackBasePayload } from "../common/AttackBasePayload";

export interface PathTraversalPayload extends AttackBasePayload {
  filePath: string; // ex: "../../../../etc/passwd"
  depth?: number; // profondeur de traversal
}
