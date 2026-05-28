export interface SsrfPayload {
  url: string; // URL cible à tester
  callbackUrl: string; // URL générée par ton orchestrateur
  method?: string; // GET par défaut
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, any>;
}
