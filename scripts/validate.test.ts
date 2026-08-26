import assert from "node:assert/strict";
import test from "node:test";
import { GG_ID_RE } from "../src/lib/schema.ts";
import { splitFrontmatter } from "./validate.ts";
import { extractCitationIds, extractWikiIds } from "../src/lib/wikilinks.ts";
import { generateCollectionId, parentFileId } from "../src/lib/paths.ts";

test("accepts stable Gourmet Gastronomer ids", () => {
  assert.equal(GG_ID_RE.test("gg:topic:sourdough"), true);
  assert.equal(GG_ID_RE.test("gg:ingredient:wheat-flour"), true);
  assert.equal(GG_ID_RE.test("gg:source:calvel-taste-of-bread"), true);
  assert.equal(GG_ID_RE.test("topic:sourdough"), false);
});

test("splits YAML frontmatter from Markdown", () => {
  const parsed = splitFrontmatter("---\ntitle: Test\n---\n\nHello\n");
  assert.match(parsed.frontmatter, /title: Test/);
  assert.equal(parsed.body.trim(), "Hello");
});

test("extracts wiki links and citations", () => {
  const body =
    "See [[gg:topic:wild-yeast|wild yeast]] [src:gg:source:calvel-taste-of-bread, p. 31].";
  assert.deepEqual(extractWikiIds(body), ["gg:topic:wild-yeast"]);
  assert.deepEqual(extractCitationIds(body), [
    "gg:source:calvel-taste-of-bread",
  ]);
});

test("maps files to collection ids and parents", () => {
  assert.equal(
    generateCollectionId("baking/sourdough/starter.md"),
    "baking/sourdough/starter",
  );
  assert.equal(
    generateCollectionId("baking/sourdough/index.md"),
    "baking/sourdough",
  );
  assert.equal(parentFileId("baking/sourdough/starter"), "baking/sourdough");
});
