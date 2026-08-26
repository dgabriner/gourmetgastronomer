# Terminology and aliases

Food language is messy, multilingual, and professionally inconsistent. Gourmet Gastronomer does not localize the site. It does respect how cooks actually speak.

The smallest useful alias capability is:

1. **Canonical title** on the page
2. **`also_called`** on ingredients (schema already supports this)
3. A **project alias table** used by research and linking tools (`scripts/lib/aliases.ts`)
4. **Stable IDs**, which outrank any path or wording

That is enough for search hints, duplicate detection, glossary discovery, and conservative link suggestions. It is not a translation memory.

## Rules

- One concept, one ID. Aliases never mint a second page.
- An alias may point at only one canonical ID. If two crafts share a word, do not alias the ambiguous word; disambiguate in prose.
- Short generic words (`flour`, `proof`, `culture`, `mother`) are dangerous. Prefer longer phrases, or mark them low-confidence in the alias table.
- Spelling variants belong in the alias table (`sour dough`, `baker's percentage`).
- Related-but-distinct concepts are **not** aliases. Levain is not starter. Tasting is not wine tasting. Jam is not every preserve.

## Stress cases

| Language people use | Canonical move | Not |
| --- | --- | --- |
| sourdough / sour dough | `gg:topic:sourdough` | A second “sour dough” page |
| levain / leaven | Levain → `gg:topic:levain`. *Leaven* is broader (any fermenting agent) — related-term, not a synonym | Merging levain into starter |
| starter / mother | Starter → `gg:topic:sourdough-starter` in the bread tree. *Mother* also names vinegar and kombucha cultures — too ambiguous to alias globally | One “mother” page for all ferments |
| LAB / lactic acid bacteria | `gg:topic:lactic-acid-bacteria` | Expanding the abbreviation in every sentence without a first definition |
| baker's percentage / bakers percentage / baker's % | Future `gg:topic:bakers-percentage` (not yet a page). Until it exists, tools should still recognize the phrases as one concept | Three stubs |
| whole wheat / wholemeal | Ingredient-level aliases on flour / wheat pages, not a style of bread | Equating all whole-grain breads |
| proof / prove / proving / final proof | Final rise → `gg:topic:final-proof`. British *prove* is a spelling, not a different step. *Proof* also means alcohol strength — do not alias the bare word | Using “proof” for bulk fermentation |
| jam / preserves | `gg:topic:jam` for jam. Preserves is a wider commercial and home-canning category — related, not identical | Treating every fruit spread as jam |
| pâte fermentée | Prefermented dough; likely its own topic under baking when written, related to prefermented flour — not an alias of levain | Calling all preferments levain |
| autolyse | Its own mixing-stage topic when written; not an alias of rest or of gluten | |
| affinage | `gg:topic:affinage` (cheese aging practice). Not a synonym of “aging” in wine or beef | |
| terroir | Wine (and sometimes cheese/produce) sense; do not alias to a place page | Using it as decoration on bakery pages |
| masa / nixtamal | Distinct: nixtamal is the alkaline-cooked grain; masa is the dough. Future ingredient/topic pair, not one ID | |

## Existing near-collisions in this corpus

These are **correctly separate**:

- `gg:topic:tasting` (skill) vs `gg:topic:wine-tasting` (wine sequence)
- `gg:topic:levain` vs `gg:topic:sourdough-starter`
- `gg:topic:jam` vs `gg:recipe:strawberry-jam`

Tools should suggest links, not mergers, for those pairs.

## What authors should do

When introducing a term, define it once on the canonical page. Elsewhere, use `[[gg:kind:slug|the local wording]]` so the graph stays attached to the ID.

When you discover a real synonym, add it to `also_called` (ingredients) or `scripts/lib/aliases.ts` (everything else). Do not create `gg:topic:sour-dough`.

When you discover a false friend, add a sentence of disambiguation on the canonical page instead of an alias.

## What this system will not do

- Localization or translated navigation
- Automatic page creation from aliases
- Scoring “trust” of a word
- Redirects that hide a bad ID (IDs stay immutable; aliases are labels)
