import assert from "node:assert/strict";
import test from "node:test";
import {
  apaCitation,
  chicagoCitation,
  formatDateLong,
  recommendedCitation,
} from "../src/lib/cite.ts";

const sample = {
  title: "Desired dough temperature",
  url: "https://gourmetgastronomer.com/baking/desired-dough-temperature/",
  id: "gg:topic:desired-dough-temperature",
  updated: "2026-03-15",
};

test("formats ISO dates in English for citation styles", () => {
  assert.equal(formatDateLong("2026-03-15"), "March 15, 2026");
});

test("recommended citation includes title, dated URL, and graph id", () => {
  assert.equal(
    recommendedCitation(sample),
    'Gourmet Gastronomer. "Desired dough temperature." Updated 2026-03-15. https://gourmetgastronomer.com/baking/desired-dough-temperature/ gg:topic:desired-dough-temperature.',
  );
});

test("Chicago and APA cite the dated version, not a moving target", () => {
  assert.equal(
    chicagoCitation(sample),
    'Gourmet Gastronomer. "Desired dough temperature." Gourmet Gastronomer. Updated March 15, 2026. https://gourmetgastronomer.com/baking/desired-dough-temperature/.',
  );
  assert.equal(
    apaCitation(sample),
    "Gourmet Gastronomer. (2026, March 15). Desired dough temperature. https://gourmetgastronomer.com/baking/desired-dough-temperature/",
  );
});

test("APA uses n.d. when a page has no updated date", () => {
  assert.match(apaCitation({ ...sample, updated: undefined }), /\(n\.d\.\)/);
});
