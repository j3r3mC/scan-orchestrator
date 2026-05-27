export interface NormalizeAssetsPayload {
  rawAssets: unknown[]; // Résultats bruts du crawl
  context?: Record<string, any>; // Infos supplémentaires (URL, headers…)
}
