import { AttackBasePayload } from "./AttackBasePayload";

export interface RcePayload extends AttackBasePayload {
  command: string; // Commande injectée (ex: "id", "whoami")
  encoding?: "base64" | "plain"; // Méthode d'encodage
}
