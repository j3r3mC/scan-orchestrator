export interface CrawlFormPayload {
  url: string;
  headers?: Record<string, string>;

  // Méthode du formulaire (si connue)
  method?: "GET" | "POST";

  // Sélecteur CSS pour cibler un formulaire précis
  formSelector?: string;

  // Pour les scanners avancés
  extractHiddenFields?: boolean;
  simulateDefaultValues?: boolean;
}
