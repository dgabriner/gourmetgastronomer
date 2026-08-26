---
id: "gg:topic:desired-dough-temperature"
kind: topic
title: Desired dough temperature
summary: >-
  The target temperature of dough at the end of mixing, used so fermentation
  and the bakery schedule stay inside a planned window.
status: developing
updated: "2026-08-26"
level: intermediate
tags: [bread, baking, fermentation]
sources:
  - "gg:source:king-arthur-desired-dough-temperature"
  - "gg:source:king-arthur-friction-factor"
  - "gg:source:calvel-taste-of-bread"
related:
  - "gg:topic:mixing"
  - "gg:topic:bulk-fermentation"
  - "gg:topic:fermentation"
  - "gg:topic:dough-development"
  - "gg:ingredient:water"
  - "gg:ingredient:wheat-flour"
  - "gg:topic:levain"
---

Desired dough temperature (DDT) is the temperature you want the dough to be **when mixing ends** — after the hook, the spiral, or the hands have done their work. It is a process target, not room temperature, not oven temperature, and not the temperature of the [[gg:ingredient:water]] you pour in.

Professionals care because microbes and enzymes do not read the calendar. The same formula that behaved in January can race or stall in August if flour, room, and mixer heat have moved. King Arthur Baking’s technical teaching puts the practical range for wheat-based yeast dough, including wheat sourdoughs in their account, near 75–78 °F (about 24–26 °C) after mixing [src:gg:source:king-arthur-desired-dough-temperature]. That is workshop consensus, not a law of cereal chemistry and not a food-safety limit. Calvel treats dough temperature as a condition to manage in technical breadmaking, not as a slogan [src:gg:source:calvel-taste-of-bread].

## Mechanism

After [[gg:topic:mixing]], dough temperature is mostly four things:

1. **Ingredient temperatures** — flour and water (and a preferment, if you have one). Water carries most of the heat capacity you can still steer.
2. **The room** — the bowl and the dough keep exchanging heat. Small home batches drift toward ambient more than a mixer trough does [src:gg:source:king-arthur-desired-dough-temperature].
3. **Work** — mixing converts mechanical energy into heat. Bakers bundle that rise as a **friction factor**: an empirical number in °F or °C, not a physics coefficient. It belongs to *this* mixer, *this* batch size, *this* time and speed [src:gg:source:king-arthur-friction-factor].
4. **What happens next** — [[gg:topic:fermentation]] keeps going in [[gg:topic:bulk-fermentation]]. DDT is a starting condition, not a lock for the whole day.

The usual shop formula is an equal-share heuristic: treat flour, water, (preferment,) and friction as comparable terms, and solve for water.

Straight dough (no preferment):

`Water temperature = (DDT × 3) − room temperature − flour temperature − friction factor`

With [[gg:topic:levain]], poolish, biga, or another preferment, multiply DDT by 4 and also subtract the preferment temperature [src:gg:source:king-arthur-desired-dough-temperature].

This is bakery arithmetic. It ignores mass fractions, jacketed bowls, and how fast a one-kilo dough sheds heat. Use it as a control loop, then **measure the dough**.

King Arthur’s worked example in °F: DDT 78, room 72, flour 71, friction 22 → water 69 °F [src:gg:source:king-arthur-desired-dough-temperature].

## Friction factor

Do not copy a number from a blog and tattoo it on the mixer. Measure it.

King Arthur’s procedure: mix with known water, take the dough temperature in the mass, then solve the same formula for the unknown friction term. Change mix time, speed, or batch size, and the number moves [src:gg:source:king-arthur-friction-factor]. Their illustrations (a KitchenAid protocol near 22–24 °F, hand mixing near 6–8 °F) describe *their* tests, not your spiral.

If the calculated water is colder than ice or hotter than the tap, change the mix, the batch, or chill the flour. Do not invent a new equation to save the arithmetic.

## What to observe

Probe the dough in the mass, not the bowl wall.

Cool dough after mix: slower gas, a tighter schedule, less enzyme activity in the short term. Hot dough: faster gas, a shorter window, more acid in a given clock time, slackening. King Arthur’s trial with very warm water produced dough around 94 °F: a dramatic rise, then bubbling, collapse, wrinkling, a drier crumb, and a bitter, acidic flavor [src:gg:source:king-arthur-desired-dough-temperature].

On-target dough still has to be judged in bulk by volume, feel, and strength. King Arthur’s own DDT article says to let the dough’s progress guide you, not the clock [src:gg:source:king-arthur-desired-dough-temperature]. Same rule as [[gg:topic:bulk-fermentation]]: observe, don’t just time.

If the mixer or the batch size changes, re-measure friction. Consistency across shifts is the point of the target.

## Failure modes

- You hit the water number and miss DDT — wrong friction, a bad thermometer, extra mix time, or flour that was not the temperature you recorded.
- You hit DDT and bulk still runs wild — inoculation, flour enzymes, dough weight, or bench temperature after the mix.
- You treat 75–78 °F as a moral rule in a shop that retards immediately or runs a warm fermentation on purpose.
- You talk about DDT as if it were a pathogen-control temperature. It is not. Do not invent “safe dough temperatures.”

## Misconceptions

DDT is not the water temperature. One friction factor does not serve every dough in the shop. Hitting DDT does not license a kitchen timer for bulk. Colder is not always more flavorful, and hotter is not always more sour — those are tendencies, not laws.

[[gg:ingredient:wheat-flour]] temperature is a measured input. [[gg:topic:dough-development]] trades mix intensity against that heat. A teaching loaf that will eventually *use* this control, rather than define it, is [[gg:recipe:country-loaf]].
