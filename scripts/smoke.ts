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
    "sour-flour/index.html",
    "editorial/index.html",
    "corrections/index.html",
    "reuse/index.html",
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

test("home keeps the encyclopedia primary and provides a bounded Sour Flour bridge", () => {
  const home = html("index.html");
  assert.match(home, /Gourmet Gastronomer/);
  assert.match(home, /href="\/learn\/sourdough\/"/);
  assert.match(home, /class="sour-flour-feature"/);
  assert.match(home, /href="\/sour-flour\/"/);
  const primaryNav = home.match(/<nav class="primary-nav"[\s\S]*?<\/nav>/)?.[0] ?? "";
  assert.doesNotMatch(primaryNav, /href="\/sour-flour\/"/);
});

test("article pages have canonical URLs, skip links, and no app JS", () => {
  const article = html("baking/sourdough/bulk-fermentation/index.html");
  assert.match(article, /rel="canonical"/);
  assert.match(article, /href="#main"/);
  assert.match(article, /id="section-nav"/);
  assert.match(article, /class="permalink"/);
  assert.match(article, /Connected from|Referenced from|Related topics/);
  assert.doesNotMatch(article, /<script src=/);
  assert.doesNotMatch(article, /class="practice-bridge"/);
});

test("Sour Flour bridges appear only on high-intent bread pages", () => {
  const starter = html("baking/sourdough/starter/index.html");
  const generalArticle = html("baking/sourdough/bulk-fermentation/index.html");
  const bridge = html("sour-flour/index.html");
  assert.match(starter, /class="practice-bridge"/);
  assert.doesNotMatch(generalArticle, /class="practice-bridge"/);
  assert.match(bridge, /baking-courses/);
  assert.match(bridge, /starter-flour/);
  assert.match(bridge, /sour-flour-hotline/);
});

test("detail pages do not reuse the site-wide social card", () => {
  const article = html("baking/sourdough/starter/index.html");
  assert.doesNotMatch(article, /property="og:image"/);
  assert.doesNotMatch(article, /name="twitter:image"/);
  assert.match(article, /property="og:type" content="article"/);
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
  assert.match(html("reuse/index.html"), /CC BY 4.0/);
  assert.match(html("about/index.html"), /CC BY 4.0/);
});

test("citation, license, and machine-discovery signals are in the build", () => {
  const article = html("baking/desired-dough-temperature/index.html");
  assert.match(article, /Cite this page/);
  assert.match(article, /gg:topic:desired-dough-temperature/);
  assert.match(article, /property="og:type" content="article"/);
  assert.doesNotMatch(article, /property="og:image"/);
  assert.match(article, /"@type":"Organization"/);
  assert.match(article, /rel="license"/);

  const home = html("index.html");
  assert.match(home, /property="og:image"/);
  assert.match(home, /SearchAction/);
  assert.match(home, /query-input/);
  assert.match(home, /href="\/reuse\/"/);
  assert.match(home, /CC BY 4.0/);

  const robots = html("robots.txt");
  assert.match(robots, /GPTBot/);
  assert.match(robots, /PerplexityBot/);
  assert.match(robots, /Sitemap:/);

  const llms = html("llms.txt");
  assert.match(llms, /Gourmet Gastronomer/);
  assert.match(llms, /desired-dough-temperature/);
  assert.match(llms, /CC BY 4.0/);

  assert.equal(existsSync(join(dist, "og.png")), true, "missing dist/og.png");
  assert.equal(existsSync(join(dist, "favicon.svg")), true, "missing dist/favicon.svg");
  assert.equal(
    existsSync(join(dist, "apple-touch-icon.png")),
    true,
    "missing dist/apple-touch-icon.png",
  );
});
