---
name: research-topic
description: Research a Gourmet Gastronomer food topic into a structured brief without drafting the final page. Use when starting a new encyclopedia article, checking for duplicates, evaluating sources, or turning a question such as desired dough temperature, pectin, or San Francisco sourdough history into research.
---

# Research a topic

Turn a food question into a research brief. **Stop before writing the encyclopedia page** unless a human asks to continue.

Follow `docs/RESEARCH-WORKFLOW.md`, `docs/EDITORIAL.md`, `docs/EVIDENCE.md`, `docs/SOURCES.md`, `docs/TERMINOLOGY.md`, `docs/SOURCE-ECOSYSTEMS.md`, and `docs/INFORMATION-ARCHITECTURE.md`.

## Hard rules

- Flat files are canonical. Do not add a CMS, database, or admin UI.
- Never fabricate URLs, quotations, ISBNs, DOIs, or page numbers.
- Never improvise food-safety numbers.
- Never set `status: reviewed`.
- Do not mass-generate pages or placeholder sources.
- Prefer deepening an existing ID over creating a twin.

## Procedure

Copy this checklist:

```text
Research progress:
- [ ] 1. Corpus check
- [ ] 2. Duplicate / taxonomy check
- [ ] 3. Important questions
- [ ] 4. Authoritative research
- [ ] 5. Source evaluation
- [ ] 6. Propose source records
- [ ] 7. Disputes, observations, connections
- [ ] 8. Write the brief
- [ ] 9. Stop
```

### 1. Inspect the existing corpus

Search `content/` for titles, IDs, tags, and body mentions. Run:

```sh
npm run suggest:links -- --query "<topic>"
npm run report:graph
```

Record every relevant existing ID, including cousins.

### 2. Duplicates, aliases, and page kind

Read `docs/TERMINOLOGY.md`. Decide: **new page**, **deepen existing**, **alias only**, or **do not write**.

Choose kind and folder from the IA. Shared science and ingredients do not belong buried under `baking/`.

### 3. Questions the page must answer

Use the nine obligations in `docs/EDITORIAL.md`: definition, mechanism, consequence, observation, variables, failure modes, action, connections, evidence.

Apply **Observe, don't just time.**

### 4. Research authoritative sources

Start from `docs/SOURCE-ECOSYSTEMS.md`. Discovery blogs may suggest leads; they should rarely anchor technical or safety claims.

### 5. Distinguish strong evidence from weak evidence

Use `docs/EVIDENCE.md`. Label claims as fact, evidence, inference, practitioner consensus, editorial observation, disputed, tradition, or uncertainty.

### 6. Propose source records

Sketch YAML. Create `content/sources/*.yaml` only for real works that will be cited in a later draft.

### 7. Practical, sensory, and graph notes

- What should a cook notice?
- What can go wrong?
- Which other domains connect (fermentation ↔ cheese ↔ wine ↔ preserving; salt; tasting)?
- Which relationships would be intellectually useful — not decorative?

### 8. Write the brief

Use the template in `docs/research/BRIEF-TEMPLATE.md`. A completed example is `docs/research/desired-dough-temperature.md`.

### 9. Stop

Do not draft the final page, do not fill stubs with generic prose, and do not mark anything reviewed.

If asked to continue, use `docs/AUTHORING.md` and then `.cursor/skills/deepen-page` / `.cursor/skills/editorial-review`.
