import { AttackBasePayload } from "../common/AttackBasePayload";

export interface HeadersPayload extends AttackBasePayload {
  headerName: string;
  headerValue: string;
}
