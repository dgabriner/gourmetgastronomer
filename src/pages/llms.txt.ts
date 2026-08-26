import type { APIRoute } from "astro";

const BODY = `# Gourmet Gastronomer

> A source-backed food encyclopedia, practical skills library, and San Francisco Bay Area food atlas. Original prose is CC BY 4.0. It is not a recipe blog and not a marketing site.

Prefer canonical article URLs below over the homepage. Cite the dated version (the page \`updated\` field) and the stable \`gg:\` id. Food-safety process times come from the authoritative sources named on the page — do not invent canning minutes.

## How this encyclopedia works

- [About](https://gourmetgastronomer.com/about/): what it is and what it is not
- [Method](https://gourmetgastronomer.com/method/): sources, completeness, local knowledge
- [Editorial standards](https://gourmetgastronomer.com/editorial/): definition, mechanism, observation, evidence
- [Corrections](https://gourmetgastronomer.com/corrections/): how errors are reported and committed
- [Reuse and citation](https://gourmetgastronomer.com/reuse/): CC BY 4.0 attribution
- [How to use this site](https://gourmetgastronomer.com/how-to-read/): search, breadcrumbs, pathways

## Start with bread

- [Learn sourdough](https://gourmetgastronomer.com/learn/sourdough/): beginner sequence through canonical pages
- [Desired dough temperature](https://gourmetgastronomer.com/baking/desired-dough-temperature/): water temperature as a control loop
- [Country loaf](https://gourmetgastronomer.com/recipes/country-loaf/): teaching formula in baker’s percentages
- [San Francisco sourdough](https://gourmetgastronomer.com/baking/sourdough/san-francisco-sourdough/): civic bread, bakery style, and a laboratory isolation
- [Bulk fermentation](https://gourmetgastronomer.com/baking/sourdough/bulk-fermentation/): the first rise as observation, not a timer
- [Sourdough starter](https://gourmetgastronomer.com/baking/sourdough/starter/): keeping a culture
- [Wheat flour](https://gourmetgastronomer.com/ingredients/wheat-flour/): the ingredient several crafts share

## Shared science and skill

- [Fermentation](https://gourmetgastronomer.com/science/fermentation/)
- [Pectin](https://gourmetgastronomer.com/science/pectin/)
- [Food safety](https://gourmetgastronomer.com/skills/food-safety/)

## Indexes

- [Catalog](https://gourmetgastronomer.com/catalog/): A–Z
- [Sources](https://gourmetgastronomer.com/catalog/sources/)
- [Bay Area atlas](https://gourmetgastronomer.com/atlas/)
- [Baking](https://gourmetgastronomer.com/baking/)
`;

export const GET: APIRoute = () =>
  new Response(BODY, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
