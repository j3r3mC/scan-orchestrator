import { AttackBasePayload } from "./AttackBasePayload";

export interface HeadersPayload extends AttackBasePayload {
  headerName: string;
  headerValue: string;
}
