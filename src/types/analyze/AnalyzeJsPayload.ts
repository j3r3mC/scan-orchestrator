export interface AnalyzeJsPayload {
  url: string; // URL du script
  code: string; // Contenu JS brut
  isInline?: boolean; // Script inline ou externe
  ast?: unknown; // AST optionnel (si tu veux parser)
  metadata?: Record<string, any>; // Infos supplémentaires
}
