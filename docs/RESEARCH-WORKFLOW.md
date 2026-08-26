# Research workflow

Turn a food question into a Gourmet Gastronomer contribution without generating filler.

This is an operating procedure for agents, not a bureaucracy. Skip a step only when it is genuinely empty (for example, a corpus check that already found an excellent canonical page and the task is to deepen it).

```text
QUESTION / IDEA
      ↓
CORPUS CHECK
      ↓
DUPLICATE / TAXONOMY CHECK
      ↓
RESEARCH
      ↓
SOURCE EVALUATION
      ↓
RESEARCH BRIEF
      ↓
CONTENT PLAN
      ↓
DRAFT
      ↓
CROSS-LINK REVIEW
      ↓
EDITORIAL REVIEW
      ↓
VALIDATION
      ↓
HUMAN REVIEW
```

Skills that implement pieces of this path:

- `.cursor/skills/research-topic/` — stop after the brief unless asked to continue
- `.cursor/skills/deepen-page/` — improve an existing canonical page
- `.cursor/skills/editorial-review/` — independent review; never sets `reviewed`

Reports:

```sh
npm run report:sources
npm run report:graph
npm run suggest:links
npm run validate
```

## 1. Question / idea

Write the question in one sentence. Name the likely domain (baking, science, ingredients, cheese, wine, preserving, atlas, skills) without forcing a folder yet.

## 2. Corpus check

Search the existing corpus before the open web:

- `content/` titles, IDs, aliases, tags, body mentions
- `npm run suggest:links -- --query "…"` when the phrase might already be a page
- `npm run report:graph` if you need duplicate-title or orphan context

Record matching IDs even when they are only cousins.

## 3. Duplicate / taxonomy check

Read [INFORMATION-ARCHITECTURE.md](INFORMATION-ARCHITECTURE.md) and [TERMINOLOGY.md](TERMINOLOGY.md).

Decide:

- already exists → deepen, do not fork
- alias of an existing ID → add the alias thinking to the canonical page / alias table, do not create a twin
- new concept → choose kind (`topic`, `ingredient`, …) and folder by IA rules
- shared concept (fermentation, salt, tasting) → do **not** bury a canonical science or ingredient page under `baking/`

## 4. Research

Use [SOURCE-ECOSYSTEMS.md](SOURCE-ECOSYSTEMS.md) as a map of starting authorities, then go to the actual documents.

Take notes as claims, not as prose. Capture locator (page, section, URL) while you have the source open.

## 5. Source evaluation

Rank sources with editorial judgment, not a fake numeric trust score. Follow [SOURCES.md](SOURCES.md) and [EVIDENCE.md](EVIDENCE.md).

Discovery sources (blogs, forums, aggregators) may suggest questions. They should rarely anchor a technical or safety claim.

Propose YAML records. Create `content/sources/*.yaml` only for real works you will actually cite. Never invent locators.

## 6. Research brief

Write a brief (see `docs/research/` and the research-topic skill template) covering definition, mechanism, variables, observations, disputes, aliases, related IDs, sources, and a recommended article structure.

**Stop here** unless a human asked for a draft.

## 7. Content plan

From the brief: file path, immutable `id`, `related` (2–8, including one outside the folder when developing), which claims need citations, which sections would duplicate another page.

## 8. Draft

Copy `content/_templates/`. Imitate canonical examples in [CONTENT-MODEL.md](CONTENT-MODEL.md). Write to [EDITORIAL.md](EDITORIAL.md). Leave `status: developing`.

## 9. Cross-link review

Run `npm run suggest:links -- --file <path>`. Accept only intellectually useful links. Do not auto-insert. Check `related` caps.

## 10. Editorial review

Use the editorial-review skill, ideally in a separate turn from the author.

## 11. Validation

`npm run validate`. Fix errors. Treat warnings as editorial signals, not noise.

## 12. Human review

Only a human sets `status: reviewed`. Agents never do.
