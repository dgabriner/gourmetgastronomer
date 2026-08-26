# Design

Visual language for a food reference that should still feel serious in twenty years. Tokens stay cream `#f6f1e8`, ink `#2b2218`, muted `#6b5c4a`, rule `#d8cbb8`. No webfonts unless a future human overturns that.

## What it should feel like

A typeset manual you can stain with flour: Georgia for prose, system-ui for chrome and numbers. Not SaaS, not a recipe-ad site, not a luxury brand generated to look expensive.

## Type

- Body ~18px / 1.65, measure ~65–68ch.
- Headings stay in the serif. Eyebrows and nav stay small-caps / sans.
- Do not shrink body text to buy whitespace.
- Tables and baker’s percentages use tabular lining figures via `font-variant-numeric: tabular-nums`.

## Editorial primitives (HTML, zero JS)

Use these sparingly in Markdown. They are CSS classes on semantic elements, not a component library.

| Class | Element | Use |
| --- | --- | --- |
| `cue` | `aside` | Look / smell / feel / taste |
| `safety` | `aside` | Evidence-based safety only |
| `pro-note` | `aside` | Shop-scale notes home cooks can skip |
| `field-note` | `aside` | Place or producer observation |
| `compare` | `table` or `dl` | Real distinctions, not listicles |
| `formula-table` | `table` | Grams and baker’s % |
| `troubleshoot` | `table` | Symptom → cause → check → correction |

Do not wrap every paragraph. If a cue is one bold lead-in (`**Look.**`), the existing prose styles are enough.

## Print

`@media print` hides masthead, focus window, skip links, footer. Keeps title, body, formula, sources, and a canonical URL. Assume black-and-white.

## Media

No decorative hero photography. When images exist they need alt, caption, credit, source, and a license we can defend. Prefer diagrams that teach (crumb, scoring, gel set, mill flow). Binaries stay out of Git at scale (`ROADMAP.md`).

## Motion

Honor `prefers-reduced-motion`. No view transitions.
