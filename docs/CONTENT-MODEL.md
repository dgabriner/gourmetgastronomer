# Content model

Six page kinds in one `pages` collection: `topic`, `ingredient`, `recipe`, `place`, `pathway`, `person`.

Sources are a separate `sources` collection of YAML records.

## Identifiers

`gg:<kind>:<kebab-slug>` — immutable. Files and titles may change; IDs do not.

## Authored relationships

Only `related` and optional `prerequisites`. The target’s kind is the relationship type. Parent/children come from the filesystem. Prev/next belong to pathways.

## Status

`stub` | `developing` | `reviewed`

Agents may set stub or developing. Only a human sets `reviewed`. Stub is the only status shown to readers.

## Canonical examples

Imitate these before writing similar pages. They are the house standard, not placeholders.

- Conceptual topic: `content/baking/sourdough/bulk-fermentation.md`
- Professional baking: `content/baking/desired-dough-temperature.md`
- Ingredient: `content/ingredients/wheat-flour.md`
- Recipe / formula: `content/recipes/country-loaf.md`
- Tested preserve (safety): `content/recipes/strawberry-jam.md`
- Place: `content/atlas/tartine-bakery.md`
- Pathway: `content/learn/sourdough.md`
- Chapter hub: `content/baking/sourdough/index.md`
- Source: `content/sources/calvel-taste-of-bread.yaml`

Templates live in `content/_templates/` and are not published.
