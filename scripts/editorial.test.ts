import assert from "node:assert/strict";
import test from "node:test";
import { CULINARY_ALIASES, normalizePhrase } from "./lib/aliases.ts";
import { buildCorpusIndex } from "./lib/corpus-index.ts";
import { findPhraseMentions, queryMatches } from "./lib/mentions.ts";

test("normalizes baker's percentage variants to one phrase family", () => {
  assert.equal(normalizePhrase("baker's percentage"), normalizePhrase("bakers percentage"));
  assert.equal(normalizePhrase("baker’s percentage"), normalizePhrase("baker's percentage"));
  assert.equal(normalizePhrase("pâte fermentée"), normalizePhrase("pate fermentee"));
});

test("keeps sourdough and sour dough as related spellings, not identical strings", () => {
  assert.notEqual(normalizePhrase("sourdough"), normalizePhrase("sour dough"));
  const sour = CULINARY_ALIASES.find((alias) => alias.phrase === "sour dough");
  assert.equal(sour?.canonicalId, "gg:topic:sourdough");
});

test("finds desired dough temperature even when the page does not exist yet", () => {
  const body =
    "Temperature, inoculation, and dough strength change the clock. Aim for a desired dough temperature near 24 C.";
  const mentions = findPhraseMentions(body, [
    {
      phrase: "desired dough temperature",
      normalized: "desired dough temperature",
      canonicalId: "gg:topic:desired-dough-temperature",
      confidence: "high",
      origin: "alias",
    },
  ]);
  assert.equal(mentions.length, 1);
  assert.equal(mentions[0]?.canonicalId, "gg:topic:desired-dough-temperature");
});

test("does not suggest links inside existing wiki markup", () => {
  const body = "See [[gg:topic:fermentation|fermentation]] in bread.";
  const mentions = findPhraseMentions(body, [
    {
      phrase: "fermentation",
      normalized: "fermentation",
      canonicalId: "gg:topic:fermentation",
      confidence: "high",
      origin: "title",
    },
  ]);
  assert.equal(mentions.length, 0);
});

test("does not match LAB inside laboratory", () => {
  const mentions = findPhraseMentions("The laboratory notebook is wet.", [
    {
      phrase: "LAB",
      normalized: "lab",
      canonicalId: "gg:topic:lactic-acid-bacteria",
      confidence: "high",
      origin: "alias",
    },
  ]);
  assert.equal(mentions.length, 0);
});

test("query matcher uses aliases to find sourdough from sour dough", () => {
  const fromAliases = CULINARY_ALIASES.map((alias) => ({
    phrase: alias.phrase,
    normalized: normalizePhrase(alias.phrase),
    canonicalId: alias.canonicalId,
    confidence: alias.confidence,
    origin: "alias" as const,
  }));
  assert.ok(
    queryMatches("sour dough", fromAliases).some(
      (target) => target.canonicalId === "gg:topic:sourdough",
    ),
  );
  assert.ok(
    queryMatches("desired dough temperature", fromAliases).some(
      (target) => target.canonicalId === "gg:topic:desired-dough-temperature",
    ),
  );
});

test("corpus index loads pages and flags developing pages that have no sources", async () => {
  const index = await buildCorpusIndex();
  assert.ok(index.pages.length > 10);
  assert.ok(index.byGgId.has("gg:topic:sourdough"));
  assert.equal(index.byGgId.has("gg:topic:desired-dough-temperature"), false);
  const tasting = index.byGgId.get("gg:topic:tasting");
  assert.ok(tasting);
  assert.equal(tasting.data.sources.length, 0);
  assert.equal(tasting.citationIds.length, 0);
  const flour = index.byGgId.get("gg:ingredient:wheat-flour");
  assert.ok(flour?.data.kind === "ingredient" && flour.data.also_called.includes("flour"));
});
