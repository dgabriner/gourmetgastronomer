---
name: add-page
description: Safely create one new Gourmet Gastronomer encyclopedia page after research exists. Checks duplicates, chooses a stable ID, uses the correct template, adds sources and relationships, and runs validation. Does not mass-generate pages or mark them reviewed.
---

# Add one encyclopedia page

Create **one** canonical page. If the work is still research, stop and use `research-topic` instead.

## Hard rules

- Never set `status: reviewed`.
- Never invent URLs, quotations, addresses, hours, or safety numbers.
- Create the source YAML record before citing a new work.
- Prefer deepening an existing ID over a twin page.
- Do not create 20 stubs because a taxonomy could contain them.

## Procedure

1. Read `docs/CONTENT-MODEL.md`, `docs/INFORMATION-ARCHITECTURE.md`, `docs/AUTHORING.md`, and `docs/EDITORIAL.md`.
2. Search `content/` for titles, aliases, tags, and IDs. Run `npm run suggest:links` if a neighbor page already discusses the idea.
3. If a canonical page exists, stop. Deepen that file instead (`deepen-page`).
4. Choose folder from the IA roots. Copy `content/_templates/` for the kind.
5. Quote the new immutable `id` in YAML (`id: "gg:topic:example"`).
6. Write a real `summary`. Imitate the canonical examples in `docs/CONTENT-MODEL.md`, not the empty template alone.
7. Add 2–8 `related` IDs, including one outside the current folder when status is `developing`.
8. Add source records first. Cite with `[src:gg:source:…]`. Link with `[[gg:kind:slug]]`.
9. Leave `status: developing` (or `stub` if there is no real prose yet).
10. Run `npm run validate`.

## After the file exists

Do not keep writing siblings. If the branch needs a map, describe missing IDs in notes; do not create them in the same turn unless a human asked for those pages.
