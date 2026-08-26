/**
 * Inspect production output in dist/. Run after `npm run build`.
 * This is Gourmet Gastronomer behavior, not a test of Astro itself.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const dist = join(process.cwd(), "dist");

function html(rel: string): string {
  const path = join(dist, rel);
  assert.equal(existsSync(path), true, `missing ${rel}`);
  return readFileSync(path, "utf8");
}

test("representative routes exist in dist/", () => {
  for (const rel of [
    "index.html",
    "404.html",
    "search/index.html",
    "editorial/index.html",
    "corrections/index.html",
    "baking/sourdough/starter/index.html",
    "baking/sourdough/bulk-fermentation/index.html",
    "baking/desired-dough-temperature/index.html",
    "recipes/country-loaf/index.html",
    "ingredients/wheat-flour/index.html",
    "atlas/tartine-bakery/index.html",
    "learn/sourdough/index.html",
    "catalog/index.html",
  ]) {
    html(rel);
  }
});

test("home is the encyclopedia, not a Sour Flour funnel", () => {
  const home = html("index.html");
  assert.match(home, /Gourmet Gastronomer/);
  assert.match(home, /href="\/learn\/sourdough\/"/);
  assert.doesNotMatch(home, /Take it into practice with Sour Flour/);
  assert.doesNotMatch(home, /href="\/sour-flour\/"[^>]*>Sour Flour/);
});

test("article pages have canonical URLs, skip links, and no app JS", () => {
  const article = html("baking/sourdough/bulk-fermentation/index.html");
  assert.match(article, /rel="canonical"/);
  assert.match(article, /href="#main"/);
  assert.match(article, /id="section-nav"/);
  assert.match(article, /class="permalink"/);
  assert.match(article, /Connected from|Referenced from|Related topics/);
  assert.doesNotMatch(article, /<script src=/);
  assert.doesNotMatch(article, /Continue with Sour Flour/);
});

test("country loaf renders a formula table and recipe structured data", () => {
  const loaf = html("recipes/country-loaf/index.html");
  assert.match(loaf, /class="formula-table"/);
  assert.match(loaf, /Hydration 75%/);
  assert.match(loaf, /application\/ld\+json/);
  assert.match(loaf, /"@type":"Recipe"/);
});

test("place pages can show operating status", () => {
  const tartine = html("atlas/tartine-bakery/index.html");
  assert.match(tartine, /Operating/);
});

test("search page and Pagefind index exist", () => {
  const search = html("search/index.html");
  assert.match(search, /pagefind/i);
  assert.equal(
    existsSync(join(dist, "pagefind", "pagefind.js")),
    true,
    "missing dist/pagefind/pagefind.js",
  );
});

test("404 offers catalog discovery", () => {
  const missing = html("404.html");
  assert.match(missing, /href="\/catalog\/"/);
  assert.match(missing, /href="\/catalog\/#A"/);
});

test("public trust pages exist", () => {
  assert.match(html("editorial/index.html"), /Editorial standards/);
  assert.match(html("corrections/index.html"), /Corrections/);
});
