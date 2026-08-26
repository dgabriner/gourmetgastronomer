# Gourmet Gastronomer — agent instructions

This repository is a Git-canonical food encyclopedia. The corpus is `content/`. The site is static Astro 7.

## Before changing content

1. Read `docs/CONTENT-MODEL.md`, `docs/AUTHORING.md`, and `docs/EDITORIAL.md`.
2. Imitate canonical examples, not empty templates alone.
3. Never fabricate URLs, quotations, organizations, people, addresses, hours, or facts.
4. Create a source YAML record before citing a new work.
5. Use `[[gg:kind:slug]]` for internal links. Do not set `status: reviewed`.

## Commands

- `npm run qa` — lint, unit tests, corpus validate, Astro typecheck, production build, Pagefind, then `dist/` smoke tests
- `npm run validate` — corpus integrity (also runs as `prebuild`)
- `npm test` — validator, editorial-tooling, and formula unit tests
- `npm run check` — `astro check`
- `npm run lint`
- `npm run build` — validate, typecheck, static build, Pagefind
- `npm run smoke` — inspect `dist/` after a build; not a substitute for `qa`
- `npm run verify:links` — optional external URL check; do not put this in the default build
- `npm run report:sources` — source audit (pass `--check-urls` only when investigating)
- `npm run report:graph` — editorial graph health
- `npm run suggest:links` — conservative internal-link and duplicate suggestions; never auto-edits prose

New encyclopedia work starts with `.cursor/skills/research-topic` (`docs/RESEARCH-WORKFLOW.md`). Create a page with `.cursor/skills/add-page`. Deepen with `.cursor/skills/deepen-page`. Do not draft a page from a brief unless asked.

Imitate the canonical examples in `docs/CONTENT-MODEL.md` (bulk fermentation, wheat flour, desired dough temperature, country loaf, Tartine, learn sourdough).

## Completeness

- `stub`: id, title, summary, correct folder
- `developing`: real prose, at least one real source, 2–8 `related` including one outside the current folder
- `reviewed`: humans only
