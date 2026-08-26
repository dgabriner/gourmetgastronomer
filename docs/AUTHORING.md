# Authoring

1. Choose the folder by the IA rules in [INFORMATION-ARCHITECTURE.md](INFORMATION-ARCHITECTURE.md).
2. Copy a template from `content/_templates/`.
3. Give a new immutable `id`, quoted in YAML: `id: "gg:topic:example"`.
4. Write a real `summary`.
5. Link outward with `related` (2–8, including one ID outside the folder when developing) and `[[gg:kind:slug]]` in the body.
6. Add source records first, then cite them.
7. Run `npm run validate`.
8. Leave `status: developing` unless you are a human marking `reviewed`.

Imitate the canonical examples listed in [CONTENT-MODEL.md](CONTENT-MODEL.md). Write to the standard in [EDITORIAL.md](EDITORIAL.md) and the claim types in [EVIDENCE.md](EVIDENCE.md). Do not invent URLs, quotations, hours, or addresses. Empty page modules are omitted at build time — do not fill them with placeholders.

Research a new topic with `.cursor/skills/research-topic` before drafting. Deepen an existing page rather than forking a synonym ([TERMINOLOGY.md](TERMINOLOGY.md)).
