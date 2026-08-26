import assert from "node:assert/strict";
import test from "node:test";
import { parseGrams, summarizeFormula } from "../src/lib/formula.ts";
import type { RecipeData } from "../src/lib/schema.ts";

test("parses grams from amount strings and prefers an explicit grams field", () => {
  assert.equal(parseGrams("1000 g"), 1000);
  assert.equal(parseGrams("200 g ripe starter"), 200);
  assert.equal(parseGrams("5½ cups"), undefined);
  assert.equal(parseGrams("100 g", 95), 95);
});

test("derives baker's percent, hydration, and inoculation from a flour line", () => {
  const recipe = {
    id: "gg:recipe:test-loaf",
    kind: "recipe",
    title: "Test loaf",
    summary: "Fixture",
    status: "developing",
    tags: [],
    sources: [],
    related: [],
    prerequisites: [],
    equipment: [],
    ingredients: [
      { id: "gg:ingredient:wheat-flour", amount: "1000 g", bakers_percent: 100 },
      { id: "gg:ingredient:water", amount: "750 g" },
      {
        id: "gg:topic:sourdough-starter",
        name: "ripe starter",
        amount: "200 g ripe starter",
      },
    ],
  } as RecipeData;

  const summary = summarizeFormula(recipe, (id) => {
    if (id === "gg:ingredient:wheat-flour") {
      return { url: "/ingredients/wheat-flour/", title: "Wheat flour" };
    }
    if (id === "gg:ingredient:water") {
      return { url: "/ingredients/water/", title: "Water" };
    }
    return undefined;
  });

  assert.equal(summary.flourGrams, 1000);
  assert.equal(summary.hydration, 75);
  assert.equal(summary.inoculation, 20);
  assert.equal(summary.rows[1]?.bakers_percent, 75);
  assert.equal(summary.rows[0]?.url, "/ingredients/wheat-flour/");
});
