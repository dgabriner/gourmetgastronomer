# Research brief: Desired dough temperature

- **Question:** What is desired dough temperature, why do professionals manage it, and how should Gourmet Gastronomer teach it without turning bakery arithmetic into fake physics?
- **Proposed canonical ID:** `gg:topic:desired-dough-temperature`
- **Proposed path / kind:** `content/baking/desired-dough-temperature.md` · `kind: topic` · `level: intermediate`
- **Decision:** **new page** — the concept is not in the corpus as a title, ID, or alias. Closest existing pages are mixing, bulk fermentation, fermentation, water, and wheat flour.
- **Existing IDs that already cover or overlap:**
  - `gg:topic:mixing` — where friction heat is generated
  - `gg:topic:bulk-fermentation` — where dough temperature continues to govern rate
  - `gg:topic:fermentation` — microbial mechanism (do not duplicate)
  - `gg:topic:dough-development` — mixing intensity vs temperature tradeoff
  - `gg:ingredient:water` — the usual control lever
  - `gg:ingredient:wheat-flour` — flour as a heat and enzyme reservoir
  - `gg:topic:levain` — preferment as a fourth temperature term
  - `gg:topic:final-proof` — later temperature history
  - `gg:recipe:country-loaf` — a formula that will eventually *use* DDT, not define it

No `gg:topic:desired-dough-temperature` page exists. Bulk fermentation currently talks about temperature as a variable but does not teach the professional control loop. **Do not** nest this only under `baking/sourdough/`; DDT is breadmaking practice for yeasted and wild-leavened doughs.

## Definition

**Desired dough temperature (DDT)** is the **target temperature of the dough at the end of mixing** (after kneading / machine development), chosen so that fermentation, enzyme activity, and shop schedule stay inside a planned window.

It is not:

- room temperature
- oven temperature
- the temperature of the water in the formula (that is an *input*)
- a single universal “perfect” number for all bread

In professional shorthand, DDT names both the **target** and the **arithmetic** used to choose water temperature so the target is hit.

## Why it matters (consequence)

Microbial gas and acid production, flour enzyme activity, and dough handling all move with temperature. A bakery that cannot put mixed dough in a narrow band cannot put bread on the rack on time, and cannot keep flavor and proofing aligned from winter to summer.

King Arthur Baking’s technical blog states the professional problem plainly: the same formula fails when the *room and ingredients* change, even if the baker’s routine does not. Their teaching range for wheat-based yeast dough after mixing is **75–78 °F** (about **24–26 °C**), presented as a working range for flavor and rise, including wheat sourdoughs in their account ([King Arthur, “Desired dough temperature,” 2018](https://www.kingarthurbaking.com/blog/2018/05/29/desired-dough-temperature)).

**Claim kind:** practitioner consensus / quality secondary teaching — **not** a regulatory limit and **not** a peer-reviewed optimum for every flour and process. Calvel’s technical breadmaking (already in-corpus as `gg:source:calvel-taste-of-bread`) treats dough temperature as a process condition to manage, not as a slogan. Cite Calvel for the professional attitude; cite a specific edition/page when quoting a number from the book.

## Mechanism

After mixing, dough temperature is the result of:

1. **Ingredient temperatures** (flour, water, preferment if present) — heat capacity is dominated by water and the wet dough mass.
2. **Ambient heat exchange** — room and bowl; more important in small home batches than in large troughs (King Arthur notes the formula under-accounts for extreme room temperature in small doughs).
3. **Mechanical energy** — mixer or hand kneading converts work to heat. Bakers bundle that rise as a **friction factor**, an empirical offset in the same unit system as the other temperatures, not a dimensionless coefficient from a physics textbook.
4. **Ongoing fermentation** — after the mixer, metabolism continues to warm or, in retarding, the dough is cooled on purpose. DDT is a *starting* condition for bulk, not a lock for the whole day.

The usual shop formula is an **equal-weight mixing model**: assume flour, water, (preferment,) and “friction” contribute comparably, so water is the unknown that balances the target.

**Straight dough (no preferment):**

\[
T_{\text{water}} = 3 \times T_{\text{DDT}} - T_{\text{room}} - T_{\text{flour}} - F
\]

**With preferment / levain / poolish / biga:**

\[
T_{\text{water}} = 4 \times T_{\text{DDT}} - T_{\text{room}} - T_{\text{flour}} - T_{\text{preferment}} - F
\]

where \(F\) is the friction factor in °F or °C **consistent with the other terms**.

King Arthur: multiply DDT by 3 (or 4 with pre-ferment) to get a “total temperature factor,” then subtract the known terms ([same article](https://www.kingarthurbaking.com/blog/2018/05/29/desired-dough-temperature); friction follow-up [“Determining the friction factor in baking,” 2018](https://www.kingarthurbaking.com/blog/2018/08/27/determining-the-friction-factor-in-baking)).

**Claim kind:** practitioner arithmetic. It is a useful control heuristic. It is **not** a complete heat-transfer model (it ignores mass fractions, mixer jacket water, dough size, and bowl conductivity). Say that on the page.

## Variables

| Variable | What it does | Notes |
| --- | --- | --- |
| Target DDT | Sets fermentation speed after mix | Wheat yeasted/sourdough teaching range often ~24–26 °C; rye, enriched, and pizza shops may choose otherwise |
| Flour temperature | Directly enters the formula | Flour stored in hot or cold rooms moves the water number |
| Room temperature | Formula term + ongoing exchange | Home-scale: consider aiming slightly cooler on hot days (King Arthur) |
| Preferment temperature | Fourth term | Ripe levain is often warmer than flour |
| Friction factor \(F\) | Mixer work | Must be **measured for that mixer, batch size, time, and speed**; published examples are not portable |
| Hydration / dough mass | Changes how much water can steer the mix and how fast the dough exchanges heat | Small batches drift toward room |
| Mix intensity / time | Raises \(F\) | Dough development vs temperature is a tradeoff (`gg:topic:dough-development`) |
| Ice | Replaces part of formula water | Separate shop arithmetic when tap water cannot go cold enough — cite a production text before publishing numbers |
| Yeast type | Cool water vs instant/ADY handling | King Arthur: don’t shock ADY/instant with very cold water without a procedure |

## Observation / sensory / production cues

Teach the baker to **read the dough after mix**, not only to trust the calculator:

- Probe the dough in the mass, not the bowl wall.
- Cool target dough: slower bulk, tighter schedule risk, less enzyme activity in the short term.
- Hot dough: faster gas, shorter window, more acid in a given clock time, slackening, overproof risk in the pan (King Arthur’s 94 °F / 120 °F-water demo loaf: dramatic rise, then surface bubbling, collapse, wrinkling, bitter/acid flavor, drier crumb).
- “On target” dough still needs bulk judged by volume, feel, and jiggly strength — **observe, don’t just time** (`docs/EDITORIAL.md`). King Arthur’s own DDT article says to let the dough’s progress guide, not the clock.

Production: same DDT across shifts is a consistency tool. If the mixer or batch size changes, re-measure \(F\).

## Failure modes

- **Hitting the water number but missing DDT** — wrong friction factor, thermometer error, flour lumps, added mix time.
- **Correct DDT, still wild bulk** — inoculation, flour amylase, dough weight, or bench temperature dominating after mix.
- **Chasing a 75–78 °F slogan** in a shop that retards immediately or runs a hot fermentation on purpose.
- **Safety confusion** — DDT is a quality/process target. It is **not** a pathogen-control parameter. Do not invent “safe dough temperatures.”

## Common calculation approach

1. Choose target DDT for *this* dough and schedule.
2. Measure flour, room, preferment.
3. Use a known \(F\) for this mixer + time + batch, or run a calibration batch and solve for \(F\) (King Arthur friction article: mix with known water, measure final dough, back-calculate).
4. Compute water temperature; if the result is below ice or above tap, change mix time, batch, or use ice/chilled flour — don’t fictionalize the arithmetic.
5. Mix, measure, record. Adjust \(F\) when the error repeats.

Worked example (King Arthur, °F): DDT 78, room 72, flour 71, \(F\) 22 → water 69 °F.

## Practical caveats

- Unit consistency (°C vs °F) is a common failure; \(F\) is not “22” without a unit.
- Home mixers vs spirals vs forks: published \(F\) (e.g. KA KitchenAid ~22–24 °F, hand mix ~6–8 °F for *their* protocol) are **illustrations**.
- Instant yeast + very cold water: follow a sourced handling note; do not improvise yeast biology.
- Sourdough: preferment term matters; acidity and enzyme load still vary at the same DDT.

## Common misconceptions

- “DDT is the water temperature.”
- “One friction factor works for every dough in the shop.”
- “75–78 °F is scientifically optimal for all wheat doughs.”
- “If I mix to DDT I can time bulk with a kitchen timer and ignore the dough.”
- “Colder dough is always more flavorful / hotter is always more sour” as laws rather than tendencies.

## Terminology / aliases

Add to `scripts/lib/aliases.ts` (already appropriate):

- desired dough temperature
- DDT (baking; disambiguate from the pesticide in any science page that might collide — here the baking phrase is long enough)
- dough temperature (low-confidence: too generic)
- friction factor (related concept; may live as section or `gg:topic:friction-factor`)
- total temperature factor / TTF (King Arthur pedagogy)

Not aliases: final proof temperature, oven spring, desired *finished* bread temperature.

## Claim register

| Claim | Kind | Evidence needed | Proposed source |
| --- | --- | --- | --- |
| DDT means target dough temperature at end of mix | Fact / definition | Practitioner texts + KA | KA 2018; Calvel; production textbook |
| Water is the usual control lever | Practitioner consensus | Same | KA; bakery manuals |
| 3- and 4-factor water formulas | Practitioner consensus | Show formula + limits | KA 2018; confirm against a professional textbook before treating numbers as canonical |
| 75–78 °F teaching range for wheat yeast dough | Practitioner consensus | Do not upgrade to fact | KA 2018; check Calvel/Hamelman ranges when the book is in hand |
| Friction factor is mixer- and protocol-specific | Fact about the method | KA friction article; mixer docs | KA 2018-08-27 |
| Temperature changes fermentation rate | Scientific (direction) | Food-micro / baking science | Science page + a real paper or monograph when citing a Q10-style claim — **do not invent coefficients** |
| Small doughs exchange more heat with the room | Inference / practice | KA caveat | KA 2018 |
| Calvel treats temperature as a process condition | Historical/technical | Printed book | `gg:source:calvel-taste-of-bread` with page locator when quoted |

## Related Gourmet Gastronomer IDs

`gg:topic:mixing`, `gg:topic:bulk-fermentation`, `gg:topic:fermentation`, `gg:topic:dough-development`, `gg:ingredient:water`, `gg:ingredient:wheat-flour`, `gg:topic:levain`, `gg:topic:final-proof`, `gg:topic:bake`, `gg:topic:sourdough`, `gg:recipe:country-loaf`.

Future: `gg:topic:friction-factor`, `gg:topic:bakers-percentage`, `gg:topic:retarding`, `gg:topic:fermentation-scheduling` ([PROFESSIONAL-BAKING-MAP.md](../PROFESSIONAL-BAKING-MAP.md)).

## Cross-domain opportunities

- **Cheese:** vat temperature is a cousin control problem — link later, do not merge IDs.
- **Yogurt / cultured dairy:** incubation targets are safety-adjacent; different evidence rules.
- **Chocolate / confectionery:** tempering curves are not DDT.
- **Skills/tasting:** cooler vs warmer fermented breads differ in acid/aroma; observational, not a score.

## Proposed source records

Create these YAML files **only when the article is drafted** and the claims are actually cited. Do not add unused bibliography to `content/sources/` now.

```yaml
id: gg:source:king-arthur-desired-dough-temperature
kind: article
title: Desired dough temperature
authors:
  - King Arthur Baking
publisher: King Arthur Baking
year: 2018
url: https://www.kingarthurbaking.com/blog/2018/05/29/desired-dough-temperature
verified: 2026-08-25
note: >-
  Practitioner teaching article. Use for the shop formula and observational
  mixing trial, not as cereal-science authority.
```

```yaml
id: gg:source:king-arthur-friction-factor
kind: article
title: Determining the friction factor in baking
publisher: King Arthur Baking
year: 2018
url: https://www.kingarthurbaking.com/blog/2018/08/27/determining-the-friction-factor-in-baking
verified: 2026-08-25
note: Empirical friction-factor procedure for a given mixer protocol.
```

Keep using `gg:source:calvel-taste-of-bread` with a page locator. When a professional textbook (Hamelman *Bread*, Suas *Advanced Bread and Pastry*, Gisslen *Professional Baking*) is in hand, add a real ISBN record — do not guess ISBNs.

## Unresolved questions

- What numeric DDT ranges does Calvel (English 2001) actually publish, by dough type? Needs the book in hand.
- How do Hamelman/Suas treat preferment mass in the formula — equal fourth term vs weighted masses?
- Ice-replacement formulas: several trade articles exist; pick one production textbook and cite it rather than a pizza-trade blog.
- Interaction of DDT with retardation: one page or two (`retarding`)? Map says two, DDT links out.
- Whether friction factor deserves its own ID immediately or only a section.

## Recommended article structure

1. Definition (target at end of mix)
2. Why shops care (consistency, schedule, flavor window)
3. Mechanism (ingredients + work + later fermentation)
4. The water-temperature arithmetic, with the model’s limits
5. Measuring and revising friction factor
6. What to observe in the dough and during bulk (not the clock)
7. Variables and failure modes
8. Misconceptions
9. Links to mixing, bulk, fermentation, water, levain
10. Open questions

Voice: [EDITORIAL.md](../EDITORIAL.md). Evidence labels: [EVIDENCE.md](../EVIDENCE.md).

## Stop

This brief is the research deliverable. **Do not draft** `content/baking/desired-dough-temperature.md` unless a human asks to continue. Do not set `status: reviewed`. Do not create placeholder source YAML.
