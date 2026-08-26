import { buildCorpusIndex, type IndexedPage } from "./lib/corpus-index.ts";
import { normalizePhrase } from "./lib/aliases.ts";
import { findPhraseMentions, queryMatches, type BodyMention } from "./lib/mentions.ts";

function argValue(flag: string): string | undefined {
  const args = process.argv.slice(2);
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  return args[index + 1];
}

function printSection(title: string, lines: string[]) {
  console.log(`\n## ${title}`);
  if (!lines.length) {
    console.log("none");
    return;
  }
  for (const line of lines) console.log(line);
}

function mentionLine(page: IndexedPage, mention: BodyMention, exists: boolean): string {
  const status = exists ? "existing page" : "no page yet — research before creating";
  return [
    `${page.file}  mentions “${mention.phrase}”`,
    `  possible target: ${mention.canonicalId}  (${status}; ${mention.origin}, ${mention.confidence})`,
    `  … ${mention.excerpt}`,
  ].join("\n");
}

function alreadyLinked(page: IndexedPage, id: string): boolean {
  return page.wikiIds.includes(id) || page.data.related.includes(id);
}

const fileFilter = argValue("--file");
const query = argValue("--query");
const includeLow = process.argv.includes("--include-low");

const index = await buildCorpusIndex();
const targets = index.phraseTargets.filter((target) => includeLow || target.confidence === "high");

console.log("# Link and duplicate suggestions");
console.log("Never automatically modify prose. A human or authoring agent decides.");
console.log("Flags: --query <phrase>  --file <path-or-id>  --include-low  --all");
console.log(`targets: ${targets.length}${includeLow ? " (including low-confidence)" : " (high-confidence only)"}`);

if (query) {
  const matches = queryMatches(query, index.phraseTargets);
  const lines = matches.map((target) => {
    const page = index.byGgId.get(target.canonicalId);
    const status = page ? `exists as ${page.file}` : "no page yet";
    return `${target.canonicalId}  “${target.phrase}”  [${target.origin}/${target.confidence}]  ${status}`;
  });
  printSection(`Corpus matches for “${query}”`, lines);
}

const scanAll = !fileFilter && (!query || process.argv.includes("--all"));

const pages: IndexedPage[] = fileFilter
  ? index.pages.filter((page) => pageMatchesFile(page, fileFilter))
  : scanAll
    ? index.pages
    : [];

function pageMatchesFile(page: IndexedPage, raw: string): boolean {
  const normalized = raw.replaceAll("\\", "/").replace(/^content\//, "");
  return (
    page.file.replaceAll("\\", "/") === normalized ||
    page.fileId === normalized.replace(/\.md$/, "") ||
    page.data.id === raw
  );
}

if (fileFilter && pages.length === 0) {
  console.error(`No page matched --file ${fileFilter}`);
  process.exit(1);
}

const suggestions: string[] = [];

for (const page of pages) {
  const mentions = findPhraseMentions(page.body, targets);
  const seen = new Set<string>();
  for (const mention of mentions) {
    if (mention.canonicalId === page.data.id) continue;
    const key = `${page.data.id}|${mention.canonicalId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (alreadyLinked(page, mention.canonicalId)) continue;
    const exists = index.byGgId.has(mention.canonicalId);
    suggestions.push(mentionLine(page, mention, exists));
  }
}

const likelyDuplicates: string[] = [];
for (const page of index.pages) {
  const title = normalizePhrase(page.data.title);
  for (const target of index.phraseTargets) {
    if (target.canonicalId === page.data.id) continue;
    if (target.origin === "id-slug") continue;
    if (target.normalized !== title) continue;
    if (!index.byGgId.has(target.canonicalId)) continue;
    likelyDuplicates.push(
      `${page.data.id} title “${page.data.title}” matches ${target.origin} for ${target.canonicalId}`,
    );
  }
}

printSection("Possible internal links (body mentions without a wiki link or related edge)", suggestions);
printSection("Likely duplicate concepts (investigate before creating a new page)", [...new Set(likelyDuplicates)]);
