# Excellence audit

Inspected 2026-08-26 against the live Mission 1 implementation (Astro 7 static site, Git-canonical `content/`, validator green, HTTP deploy to DreamHost). This is not a second architecture. Findings are classified by whether they compound across thousands of future pages.

## Already in good shape

- Static HTML, zero article JS, Pagefind only on `/search/`, cream/ink tokens, focus window instead of a site tree.
- ID graph, wiki links, citations, corpus validator, and `status: reviewed` reserved for humans.
- Editorial docs already exist: `EDITORIAL.md`, `EVIDENCE.md`, `SOURCES.md`, `RESEARCH-WORKFLOW.md`, `TERMINOLOGY.md`.
- Skills `research-topic`, `deepen-page`, `editorial-review`; CLI `report:sources`, `report:graph`, `suggest:links`.
- Desired dough temperature is already a strong professional-baking page. Do not fork it.

## P0 — correctness / integrity

None blocking the live encyclopedia. Validator, typecheck, lint, and tests pass. DreamHost archive `gourmetgastronomer.com.old` is untouched.

Watch items (treat as P0 if they regress):

- Dangling `related` / `[[gg:]]` IDs fail the build — keep that rule.
- Safety process times must stay NCHFP/extension-sourced. Never invent canning minutes.
- Do not commit deploy passwords. `scripts/sftp-upload.py` reads the environment only.

## P1 — high-value foundational improvements

These compound. Implement now.

1. **Recipe / formula model.** `amount` as a string is correct for jam cups. Baker’s math needs derived hydration and inoculation when grams (or parseable `g`) exist. Optional `grams` and `stage`; do not invent a second recipe language.
2. **Place time.** Cowgirl’s closed shop lives only in prose. Optional `operating: current | closed | historical | unknown` on places, shown at a glance. No event store.
3. **Backlinks the reader can use.** `inboundRelated` already exists and is unused. Show a short “Referenced from” list, capped, excluding IDs already in `related`.
4. **Editorial primitives in CSS, not components.** Style sensory cues, safety asides, professional notes, comparison, and formula tables. Markdown stays default; no JS.
5. **Print CSS.** Recipes and formulas must survive paper: hide chrome, keep sources, URL, tables.
6. **Heading permalinks.** On-this-page links already slugify; headings need matching `id` plus a visible permalink.
7. **Canonical examples.** Point agents at bulk fermentation, wheat flour, DDT, country loaf, Tartine, learn-sourdough — deepen those rather than adding siblings.
8. **One `npm run qa` command** (lint, test, build, smoke of `dist/`). Public Git is `dgabriner/gourmetgastronomer`; skip GitHub Actions until they are worth the noise.
9. **Public trust.** Expand About / Method; add Editorial standards, Corrections, and Reuse (CC BY 4.0) as short public pages. Do not invent a board. Citation and discoverability runbook: [DISCOVERABILITY.md](DISCOVERABILITY.md).
10. **Cursor OS.** Three subagents (`research-verifier`, `food-editor`, `corpus-reviewer`) plus `/add-page`. Do not add a skill that duplicates `report:graph`.

## P2 — professional polish

- Typography: type scale, formula tables on narrow screens, fractions, permalink hover.
- Search aliases (`sour dough` → sourdough) exist in CLI; Pagefind does not stem them. Document; do not replace Pagefind.
- 404 is honest; could offer catalog letters.
- Skip-to-section-nav is present on pages with no `#section-nav`.
- Diagrams (fermentation timeline, grain→bread) as inline SVG when a page actually needs one.
- Image/media philosophy in `DESIGN.md` only until binaries exist.

## P3 — later

- GitHub Actions on `dgabriner/gourmetgastronomer` (remote exists; workflow not yet).
- Pathway progress UI.
- Copy-to-clipboard for formula grams (that is JS — justify then).
- Region folders under atlas after ~40 places.
- Admin panel: never, unless a concrete requirement appears.

## Architectural decisions preserved

| Decision | Keep unless |
| --- | --- |
| Astro 7 static, no Starlight, no React | A feature truly cannot be HTML/CSS |
| Filesystem tree + ID graph | Proven unworkable at 1,000 nodes |
| No hours/phone on places | A human later wants a directory product |
| No CMS | Git stops being the corpus |
| Agents cannot set `reviewed` | Never |

## What this audit is not

A list of fifty todos. The implementation slice is the P1 list above, plus gold-standard deepening of pages that already exist.

## Implemented in this mission

P1 items 1–10 are in the tree: derived formula math, `operating` on places, inbound “Connected from”, CSS primitives and print CSS, heading permalinks, canonical examples, `npm run qa`, public editorial/corrections/reuse pages, three subagents plus `/add-page`, and deepened bulk fermentation / wheat flour / country loaf. Sour Flour is lineage on `/sour-flour/`, not primary navigation. Citation colophon, `llms.txt`, Organization/SearchAction JSON-LD, and CC BY 4.0 followed. HTTPS on the live host remains an ops item ([DISCOVERABILITY.md](DISCOVERABILITY.md)).
