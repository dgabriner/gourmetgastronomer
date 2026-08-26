---
name: editorial-review
description: Independently review a Gourmet Gastronomer page for accuracy, specificity, mechanism, observation, sourcing, generic prose, and graph fit. Use when reviewing a draft, doing editorial QA, or checking whether a page is ready for a human. Never marks a page reviewed.
---

# Editorial review

Review as an independent editor, not as the author. Do not rewrite the whole page unless asked. Do not set `status: reviewed`. Human approval remains required.

Read `docs/EDITORIAL.md`, `docs/EVIDENCE.md`, `docs/SOURCES.md`, and `docs/TERMINOLOGY.md`.

## Questions

Answer each with evidence from the page (quote a phrase or say “missing”):

1. **Is this accurate?**
2. **Is it specific?**
3. **Does it explain mechanisms?**
4. **Does it help someone do or understand something?**
5. **Does it teach observation?** (Observe, don't just time.)
6. **Does it distinguish fact from judgment?**
7. **Are important claims sourced?**
8. **Is the writing generic?**
9. **Is the page unnecessarily repetitive?**
10. **Does it connect into the rest of Gourmet Gastronomer?**
11. **Does it belong at this location?**
12. **Is there a duplicate canonical concept elsewhere?**
13. **Could any paragraph be deleted without losing meaningful information?**

## Method

1. Read the page and its canonical neighbors.
2. Run `npm run suggest:links -- --file <path>` and `npm run report:sources` if sourcing or linking is in doubt.
3. Produce a review with:

   - **Blockers** — accuracy, safety, fabricated or missing required evidence
   - **Should fix** — generic prose, missing observation, weak mechanism, duplicate explanation
   - **Optional** — extra links, aliases, related IDs
   - **Verdict** — not ready / developing-quality / ready for human review

4. Leave `status` unchanged unless a human is performing the review and asked you only to *prepare* the file. Agents still must not set `reviewed`.

## Safety

Flag any improvised canning times, pathogen claims, dairy safety, or fermentation safety parameters as blockers.
