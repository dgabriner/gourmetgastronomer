# Professional baking — research map

A planning artifact, not a permission to mass-generate pages. Do not create these files until a research brief exists and a human wants the page.

Professional baking is a **practice layer** on top of ingredients, science, and skills. Shared concepts stay in their IA homes. This map says where a future canonical page should live and what it should connect to.

Existing corpus already covers pieces of the craft path: `gg:topic:mixing`, `gg:topic:dough-development`, `gg:topic:bulk-fermentation`, `gg:topic:shaping`, `gg:topic:final-proof`, `gg:topic:bake`, `gg:topic:levain`, `gg:topic:sourdough-starter`.

## Placement rules

- **Baking tree** (`content/baking/`): craft operations, bakery math as used on the bench, equipment-as-used, production flow.
- **Science** (`content/science/`): fermentation biology, heat transfer as food physics, water activity — not “how the bakery schedules it.”
- **Ingredients**: flour, water, salt, malt, yeast products.
- **Skills**: tasting, food safety, and general measurement habits that are not bread-specific.
- **Atlas**: bakeries, mills, ovens as places.
- **Learn**: pathways that *sequence* canonical pages, not a second copy of the textbook.

Folder vs leaf: a topic stays a file until it has three same-kind children shipping now.

## Concept map

Abbreviations: **home** = likely filesystem home; **id** = proposed immutable ID if the page does not exist yet.

### Baker's math

| | |
| --- | --- |
| **Home** | `baking/` (craft application). Not science. |
| **Likely page** | `gg:topic:bakers-percentage` (core). Dough yield and scaling may start as sections here; split only when each has enough mechanism of its own. |
| **Relationships** | flour and water ingredients; mixing; production scaling; formulas (`kind: recipe` with `bakers_percent`) |
| **Sources** | Professional baking texts (Gisslen, Suas, Hamelman, Calvel); BBGA education; mill spec sheets for absorption — practitioner + technical books, not blogs |

### Desired dough temperature

| | |
| --- | --- |
| **Home** | `baking/desired-dough-temperature.md` — general breadmaking, **not** nested only under sourdough |
| **Likely page** | `gg:topic:desired-dough-temperature` |
| **Relationships** | mixing; bulk-fermentation; fermentation (science); water; wheat-flour; levain (preferment temperature); friction factor |
| **Sources** | Technical bakery books; practitioner writeups (e.g. King Arthur DDT articles as secondary); mixer manuals for friction behavior |
| **Note** | Water-temperature *calculation* belongs **on this page**, not as a twin article. Proof brief: [research/desired-dough-temperature.md](research/desired-dough-temperature.md) |

### Flour temperature

Variable on the DDT page first. Promote to its own page only if mill/storage/tempering needs a dedicated mechanism article. Ingredient physics of flour stay on `gg:ingredient:wheat-flour`.

### Water temperature calculation

Same page as DDT. Related ingredient: `gg:ingredient:water`. Ice as a cooling method is a section, with arithmetic labeled as bakery practice.

### Friction factor

| | |
| --- | --- |
| **Home** | `baking/` — likely `gg:topic:friction-factor`, or a major section of DDT until there is enough mixer-specific content |
| **Relationships** | DDT; mixing; professional equipment |
| **Sources** | Mixer manufacturers; production-baking texts; empirical shop measurements (editorial/practitioner, not universal constants) |

### Prefermented flour

| | |
| --- | --- |
| **Home** | `baking/` as `gg:topic:prefermented-flour` |
| **Relationships** | levain; pâte fermentée (future); baker's percentage; inoculation; fermentation |
| **Sources** | Calvel; Hamelman; Suas — preferment systems as craft, plus fermentation science on the science page |

Do not alias this to levain. Levain is one vehicle for prefermented flour.

### Inoculation

| | |
| --- | --- |
| **Home** | Shared idea: **science** owns the microbial meaning; baking owns baker’s-% of starter/levain in dough. Prefer a baking page `gg:topic:inoculation` that *links* to `gg:topic:fermentation` rather than restating microbiology. |
| **Relationships** | levain; starter; cheese cultures (`gg:topic:cheese-cultures`); wine (must inoculation is a cousin, not a merge) |
| **Sources** | Fermentation microbiology papers for mechanisms; bakery texts for percentages as practice |

### Dough yield

Section of baker's math until production accounting needs its own node (`gg:topic:dough-yield`). Relates to waste/yield and batch size.

### Production scaling

| | |
| --- | --- |
| **Home** | `baking/` `gg:topic:production-scaling` |
| **Relationships** | baker's percentage; batch size; mixing; equipment; waste |
| **Sources** | Production-baking manuals; bakery operations teaching (K-State bakery science; Gisslen) |

### Batch size

Usually a section of production scaling. Mixer capacity and friction factor change with batch — link those pages rather than duplicating DDT.

### Mixing

**Exists:** `gg:topic:mixing`. Deepen with intensive vs gentle mix, gluten development vs temperature rise. Relates to dough-development, DDT, equipment.

### Dough development

**Exists:** `gg:topic:dough-development`. Keep gluten mechanism on `gg:topic:gluten`; this page is the craft of arriving at a target network.

### Dough temperature management

Mostly DDT + retarding + bulk. Avoid a fourth overlapping page. If written, it should be an operations umbrella that links, not a second DDT essay.

### Fermentation scheduling

| | |
| --- | --- |
| **Home** | `baking/` `gg:topic:fermentation-scheduling` |
| **Relationships** | bulk-fermentation; final-proof; retarding; DDT; science/fermentation |
| **Sources** | Production texts; practitioner scheduling; science page for *why* rate changes |

### Retarding

| | |
| --- | --- |
| **Home** | `baking/` `gg:topic:retarding` |
| **Relationships** | bulk; final-proof; fermentation; food-safety (time/temperature as quality vs safety — do not invent pathogen rules) |
| **Sources** | Bakery texts; for safety of held dough, authoritative food-safety sources only |

### Dividing

| | |
| --- | --- |
| **Home** | `baking/` `gg:topic:dividing` |
| **Relationships** | baker's math (piece weight); shaping; production scaling; quality control |
| **Sources** | Production-baking texts; equipment manuals |

### Pre-shaping

Likely a section of **exists** `gg:topic:shaping` until there is enough distinct technique (degassing, skin, bench rest) to split. Prefer deepening shaping.

### Final shaping

Same: deepen `gg:topic:shaping` first.

### Proofing

**Exists** as `gg:topic:final-proof`. British *prove* is an alias, not a new ID. Do not use bare “proof” as a global alias (alcohol proof).

### Oven loading

| | |
| --- | --- |
| **Home** | `baking/` `gg:topic:oven-loading` |
| **Relationships** | bake; steam; scoring; professional equipment |
| **Sources** | Deck/oven manufacturer docs; craft texts |

### Steam

| | |
| --- | --- |
| **Home** | `baking/` `gg:topic:steam` (craft). Physics of crust may also warrant a science note that this page links to rather than owns. |
| **Relationships** | bake; scoring; oven-loading |
| **Sources** | Baking texts; oven manuals |

### Baking profiles

Section of **exists** `gg:topic:bake` until multiple heat curves need a dedicated node. Relates to cooling and quality control.

### Cooling

| | |
| --- | --- |
| **Home** | `baking/` `gg:topic:cooling` (staling onset, condensation, slicing time) |
| **Relationships** | bake; starch/gluten science (do not dump cereal chemistry here) |
| **Sources** | Cereal science on staling; bakery practice for rack cooling |

### Quality control

| | |
| --- | --- |
| **Home** | `baking/` `gg:topic:bakery-quality-control` or `skills/` if the method is generic inspection. Prefer baking until the skill is truly cross-domain. |
| **Relationships** | tasting; baker's math; ingredient specifications; consistency |
| **Sources** | Production QC manuals; sensory methods (skills/tasting); mill COAs |

### Ingredient specifications

Live primarily on **ingredient** pages (flour ash, protein, absorption). A baking hub `gg:topic:bakery-ingredient-specs` may only *index* how a bakery uses those specs. Do not duplicate 21 CFR on a baking URL.

### Production sequencing

Cousin of fermentation scheduling: oven, mixer, and labor order. `gg:topic:production-sequencing` under baking. Relates to equipment and waste.

### Waste / yield

`gg:topic:bakery-yield` under baking; links dough yield, dividing, and cost-of-goods as practice — not a finance product.

### Consistency

Editorial theme across DDT, scaling, specs, and QC. Probably **not** its own page; a pathway `learn/` could sequence the others.

### Professional equipment

| | |
| --- | --- |
| **Home** | Split: mixer/oven *types* as baking topics; specific machines in shops as **atlas** places when location matters; manufacturer claims from technical sheets |
| **Likely pages** | `gg:topic:spiral-mixer`, `gg:topic:deck-oven` when needed — not a catalog of brands |
| **Sources** | Manufacturer documentation (highest for *that machine*); production texts for class of equipment |

## Cross-domain connections to prefer

```text
science/fermentation  ↔  sourdough, cheese, wine, preserving
skills/tasting        ↔  bread, cheese, wine, ingredients
ingredients/salt      ↔  baking, cheese, preserving, cooking
ingredients/water     ↔  DDT, mixing, jam, cheese
```

Do not add `related` only to densify the graph. Each edge should teach a real dependency.

## Suggested writing order (when a human asks)

1. Desired dough temperature (brief already exists)
2. Baker's percentage / baker's math
3. Friction factor (or DDT section, then split)
4. Prefermented flour
5. Retarding and fermentation scheduling
6. Steam / oven loading as deepenings of `gg:topic:bake`

Do not generate empty stubs for the rest.
