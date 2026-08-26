---
name: deepen-page
description: Improve an existing Gourmet Gastronomer encyclopedia page for definition, mechanism, observation, sources, and cross-links without creating new pages. Use when asked to deepen, strengthen, expand, or de-generify an article.
---

# Deepen an existing page

Make the page **substantially more useful, not merely longer.**

Do **not** automatically create new pages. If a missing concept deserves an article, name the ID in notes and leave it for `research-topic`.

## Hard rules

- Never set `status: reviewed`.
- Never invent sources or safety numbers.
- Prefer the canonical page over fragmenting the corpus.
- Delete paragraphs that only restate the summary.
- Keep `related` at 8 or fewer, with one ID outside the folder when developing.

## Procedure

1. Identify the page by path or `gg:` ID. Read it and its `related` targets.
2. Run corpus tools for this file:

   ```sh
   npm run suggest:links -- --file <content/path.md>
   npm run report:sources
   ```

3. Score the page against `docs/EDITORIAL.md`:

   - definition quality
   - mechanism
   - practical usefulness
   - sensory / observational guidance
   - missing variables
   - troubleshooting / failure modes
   - unsupported claims (`docs/EVIDENCE.md`)
   - sources (`docs/SOURCES.md`)
   - terminology / aliases (`docs/TERMINOLOGY.md`)
   - cross-links and duplicated explanations
   - generic AI prose

4. Edit the canonical file. Imitate pages listed in `docs/CONTENT-MODEL.md`.
5. Add real source YAML before new citations. Use `[[gg:kind:slug]]`.
6. Run `npm run validate`.
7. Summarize what became more useful (not a word count).

## Observe, don't just time

Replace clock-only instructions with what is changing, what to look and feel for, what insufficient and excessive look like, and whether a correction is still possible. Safety process times stay sourced and intact.

## When not to deepen

If the file is a stub and the subject is unresearched, stop and run `research-topic` instead of padding.
