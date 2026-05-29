# 🔍 Scan Orchestrator

Moteur de scan de sécurité modulaire, typé et extensible.  
Il orchestre des tâches, exécute des workers d’attaque, normalise les résultats et produit un rapport unifié.

## ✨ Features

- 🧩 Architecture modulaire (tasks → workers → normalize)
- ⚡ Scheduler + Dispatcher intégrés
- 🛠️ Workers d’attaque complets :
  - SQL Injection (Error, Time, Boolean, Union, Stacked)
  - XSS (Reflected, Stored)
  - LFI / RFI / Path Traversal
  - Open Redirect
  - XXE
  - SSRF (classique)
  - RCE
  - Header Injection
- 🧹 Normalisation avancée :
  - normalize:context
  - normalize:attack
  - normalize:assets
- 🧪 Tests Jest complets (typages + workers + mapping)
- 🧱 Typage strict (TaskType, TaskPayloadMap, Scan, Findings…)

---

## 🏗️ Architecture

```bash
C:\DEV\SCAN-ORCHESTRATOR\SRC
|   index.ts
|   src-architecture.txt
|
+---adapters
|   +---queue
|   |       QueueAdapter.ts
|   |
|   \---storage
|           StorageAdapter.ts
|
+---core
|       Orchestrator.ts
|       ScanStateManager.ts
|       TaskDispatcher.ts
|       TaskScheduler.ts
|
+---types
|   |   index.ts
|   |
|   +---analyze
|   |       AnalyzeJsPayload.ts
|   |       AnalyzePayload.ts
|   |       index.ts
|   |
|   +---attack
|   |   |   index.ts
|   |   |
|   |   +---client
|   |   |       index.ts
|   |   |       OpenRedirectPayload.ts
|   |   |       XssReflectedPayload.ts
|   |   |       XssStoredPayload.ts
|   |   |
|   |   +---common
|   |   |       AttackBasePayload.ts
|   |   |       GenericAttackPayload.ts
|   |   |       index.ts
|   |   |
|   |   \---server
|   |           HeadersPayload.ts
|   |           index.ts
|   |           LfiPayload.ts
|   |           OpenRedirectPayload.ts
|   |           PathTraversalPayload.ts
|   |           RcePayload.ts
|   |           RfiPayload.ts
|   |           SqliBooleanPayload.ts
|   |           SqliErrorPayload.ts
|   |           SqliStackedPayload.ts
|   |           SqliTimePayload.ts
|   |           SqliUnionPayload.ts
|   |           SsrfPayload.ts
|   |           XxePayload.ts
|   |
|   +---core
|   |       index.ts
|   |       Scan.ts
|   |       SecurityContextPayload.ts
|   |       Task.ts
|   |       TaskPayload.ts
|   |       TaskPayloadMap.ts
|   |       TaskType.ts
|   |       WorkerResult.ts
|   |
|   +---crawls
|   |       CrawlApiPayload.ts
|   |       CrawlAssetsPayload.ts
|   |       CrawlFormPayload.ts
|   |       CrawlPagePayload.ts
|   |       index.ts
|   |
|   +---normalize
|   |       index.ts
|   |       NormalizeAssetsPayload.ts
|   |       NormalizeAttackPayload.ts
|   |       NormalizeContextPayload.ts
|   |
|   \---__tests__
|           attack-payloads.test.ts
|           task-payload.test.ts
|           task-type.failure.ts
|           task-type.test.ts
|           task.failure.ts
|           task.test.ts
|
\---workers
    +---analyze
    |       domAnalyze.worker.ts
    |       httpAnalyze.worker.ts
    |
    +---attack
    |   |   headers.worker.ts
    |   |   lfi.worker.ts
    |   |   openRedirect.worker.ts
    |   |   rfi.worker.ts
    |   |   sqliBoolean.worker.ts
    |   |   sqliError.worker.ts
    |   |   sqliStacked.worker.ts
    |   |   sqliTime.worker.ts
    |   |   sqliUnion.worker.ts
    |   |   xssReflected.worker.ts
    |   |   xssStored.worker.ts
    |   |
    |   \---__tests__
    |           headers.worker.test.ts
    |           lfi.worker.test.ts
    |           openRedirect.worker.test.ts
    |           rfi.worker.test.ts
    |           sqliBoolean.worker.test.ts
    |           sqliError.worker.test.ts
    |           sqliStacked.worker.test.ts
    |           sqliTime.worker.test.ts
    |           sqliUnion.worker.test.ts
    |           xssReflected.worker.test.ts
    |           xssStored.worker.test.ts
    |
    +---crawl
    |       crawlApi.worker.ts
    |       crawlAssets.worker.ts
    |       crawlForm.worker.ts
    |       crawlPage.worker.ts
    |
    \---normalize
            normalizeAttack.worker.ts
            normalizeContext.worker.ts
```

### 🔄 Flow général

1. **Création du scan**
2. **Génération des tâches**
3. **Dispatch vers les workers**
4. **Collecte des findings**
5. **Normalisation**
6. **Résultat final structuré**

---

## 🚀 Installation

```bash
npm install
npm run build
```

\*\* Utilisation
Lancer un scan

```ts
import { createScan } from "./src/core/createScan";

const scan = await createScan({
  target: "https://example.com",
});
console.log(scan.findings);
```

Ajouter un worker custom

```ts
export async function worker(payload) {
  return {
    taskType: "custom:task",
    status: "success",
    findings: [],
    output: {},
  };
}
```

## Tests

```bash
npm run test
```

100% des workers testés

Tests de typage strict (ts-expect-error)

Tests de mapping TaskType → Payload

Tests de normalize

## Roadmap

[ ] Serveur OAST externe (SSRF blind)

[ ] DOM XSS Worker

[ ] CSP Analyzer

[ ] OpenAPI / GraphQL surface discovery

[ ] Dashboard findings

## Licence

MIT
