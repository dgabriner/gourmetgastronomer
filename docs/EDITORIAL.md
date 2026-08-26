# Editorial standard

Gourmet Gastronomer pages should make a careful reader more capable, not more impressed.

A good page teaches **what a thing is**, **why it behaves**, **what to notice**, and **what to do**. It does not imitate the tone of a recipe blog, a brand manifesto, or a language model performing “food writing.”

If a paragraph could appear on any food website with the names swapped, delete it.

## The nine obligations

Every developing or reviewed page should earn its keep against these questions. Not every page needs a labeled heading for each one. The thinking must be present.

### 1. Definition

What exactly is this?

Name the thing so it cannot be confused with a neighbor. Levain is not starter. Jam is not “preserves” in every legal or kitchen sense. Desired dough temperature is not room temperature.

One precise sentence belongs near the top. The `summary` field is that sentence’s public form.

### 2. Mechanism

Why does it work?

Explain the causal chain in food terms: microbes, water, heat, time, enzymes, salt, pectin, evaporation, shear. Do not hide the mechanism behind a slogan (“fermentation creates flavor”). Say what is being transformed, by what, into what.

If the mechanism is unknown or disputed, say so. Uncertainty is content.

### 3. Consequence

Why does that matter in actual food?

Connect the mechanism to crumb, rind, gel, aroma, shelf life, yield, or safety. A reader who understands lactic acid but cannot imagine a wet crumb or a sour cream line has only collected vocabulary.

### 4. Observation

What should the cook, baker, or taster notice?

Teach sensory and physical cues: look, smell, feel, sound, taste, and the behavior of the material. This is the heart of the encyclopedia.

### 5. Variables

What changes the outcome?

List the levers that actually move the process: temperature, inoculation, hydration, fruit ripeness, salt, humidity, mixer friction, vessel, time. Distinguish strong variables from folklore.

### 6. Failure modes

What can go wrong, and why?

Name the under- and over- versions. Separate a quality failure (weak gel, slack dough) from a safety failure (unsafe canning). Do not invent rescue methods for safety failures.

### 7. Action

What can the reader do with this knowledge?

Give a next move: adjust water temperature, fold sooner, wait for the wrinkle test, buy a different flour, read a related page. Action is not a recipe dump. It is applied understanding.

### 8. Connections

Where does this concept lead elsewhere in food?

Gourmet Gastronomer is valuable because branches connect. Fermentation should be able to walk toward bread, cheese, wine, and preserving without copying the same essay onto each page. Link to the canonical ID. Do not re-explain the destination.

### 9. Evidence

Which statements require authoritative support?

Mark the difference between a lab result, a regulation, a producer’s claim about itself, a baker’s useful rule of thumb, and your own tasting note. See [EVIDENCE.md](EVIDENCE.md) and [SOURCES.md](SOURCES.md).

## Observe, don't just time

Time is a proxy. The food is the signal.

Do not write:

> Bulk ferment for four hours.

Teach:

- what is changing in the dough (gas, acidity, extensibility)
- which variables alter the clock (temperature, inoculation, flour enzyme activity)
- what the dough should look like
- what it should feel like
- signs of insufficient fermentation
- signs of excessive fermentation
- what correction might still be possible

Apply the same philosophy beyond bread:

| Domain | Clock-talk to reject | Observation to teach |
| --- | --- | --- |
| Jam set | “Boil 10 minutes more” | Sheet / wrinkle test, soluble solids, fruit’s pectin and acid |
| Curd | “Wait 45 minutes” | Clean break, whey clarity, temperature, culture activity |
| Ripeness | “Ripe in 3 days” | Aroma, give, color at the stem, variety behavior |
| Caramelization | “Cook to 340°F and you’re done” | Color, smell of the sugar, residual moisture, pan behavior |
| Roasting | “40 minutes at 425°F” | Maillard vs drying, probe feel, juices, carryover |
| Cheese aging | “Age 60 days” | Rind development, paste texture, aroma, humidity and air |
| Wine tasting | “Let it breathe 30 minutes” | What the wine is doing in the glass, temperature, sediment |
| Fermentation | “Ferment 7 days” | Bubbles, acidity, smell, pellicle, target flavor, safety limits |

Clocks still matter for **food-safety processes**. A tested canning time is not a metaphor. Do not replace a validated process with a sensory vibe. Observation and regulation occupy different jobs.

## Reject generic AI food writing

Ban these habits:

- **Mood instead of mechanism.** “There’s something magical about slow fermentation.”
- **Unsourced superlatives.** “The best bread in the world.”
- **Fake folksiness.** “Grandmothers have always known…”
- **Inflated stakes.** “This one trick will transform your baking forever.”
- **Synonym padding.** Restating the summary three times in prettier words.
- **Tourism copy** on atlas pages. Hours, addresses, and origin stories only if sourced.
- **Sour Flour marketing.** Lineage belongs in historical/project context, not as a pitch.
- **Invented consensus.** “Chefs agree that…” unless you can name who, and they did.
- **Orphaned advice.** A tip with no mechanism, variable, or failure mode.
- **Decorative citations.** A source listed in frontmatter but unused by any claim.

Prefer short, specific sentences. Name materials. Name temperatures as ranges with conditions, not as commandments, unless a safety process requires a number.

## Voice

Write as a serious teacher who likes food.

- Second person is fine when instructing (“feel the dough”).
- Third person is fine when defining (“pectin is…”).
- Do not perform a persona. Do not apologize. Do not tease the next heading.
- Jokes are allowed if they carry information. They are not a substitute for it.

## Page architecture for authors

A developing topic page often works in this order. Rearrange when the subject demands it.

1. Precise definition
2. Why anyone should care (consequence, not hype)
3. Mechanism
4. What to observe
5. Variables and typical ranges, with conditions
6. Failure modes and possible corrections
7. Connections (internal links, not a second essay)
8. Evidence notes and open questions

Recipes (`kind: recipe`) still explain *why* a step exists. Formulas are not exempt from mechanism.

Stubs may be definition-plus-summary only. Do not pad stubs to look finished.

## Length

Make the page substantially more useful, not merely longer.

If a paragraph can be deleted without losing a definition, a mechanism, an observation, a variable, a failure mode, an action, a connection, or a piece of evidence, delete it.

Duplicate explanations of a canonical concept belong on that concept’s page. Here, link.

## Status and humility

Agents may ship `stub` or `developing`. Humans set `reviewed`.

A developing page should already be specific, sourced where required, and observationally useful. “Developing” is not permission to be vague.
