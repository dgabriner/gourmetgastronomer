# Information architecture

The filesystem is the tree. Metadata is the graph.

## Roots under `content/`

baking, cheese, preserving, wine, ingredients, science, skills, atlas, recipes, learn

Fermentation is not a top-level craft. Its canonical page is `science/fermentation.md`. Flour lives in `ingredients/`. Bakeries live in `atlas/`.

## Folder vs leaf

A topic stays a file until it has three same-kind children shipping now. Hard cap: four levels under `content/`.

## Global nav

Baking, Atlas, Learn, Catalog, Search. Other roots appear on the homepage contents and in the catalog.

`/sour-flour/` is a static project bridge outside the corpus. It is not a content root and does not enter the global navigation. It is reached from a focused homepage feature, the footer, and a small allowlist of high-intent bread pages. The bridge connects durable encyclopedia knowledge to Sour Flour’s current courses, bread, starter and flour, and hotline; changing schedules and offers stay on Sour Flour’s own site.

## Discovery at scale

Search, catalog, pathways, and a local focus window. Never a site-wide collapsible tree.
