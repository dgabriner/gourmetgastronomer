import {
  buildCorpusIndex,
  daysSince,
  hostnameOf,
  inboundCount,
  type CorpusIndex,
  type IndexedPage,
  type IndexedSource,
} from "./lib/corpus-index.ts";

const STALE_DAYS = 540;
const HEAVY_DOMAIN_MIN = 2;

function hasLocator(source: IndexedSource): boolean {
  return Boolean(source.data.url || source.data.isbn || source.data.doi);
}

function sourceRefsOnPage(page: IndexedPage): string[] {
  return [...new Set([...page.data.sources, ...page.citationIds])];
}

function duplicateSourceGroups(index: CorpusIndex): string[][] {
  const byUrl = new Map<string, string[]>();
  const byTitle = new Map<string, string[]>();
  for (const source of index.sources) {
    if (source.data.url) {
      const key = source.data.url.replace(/\/+$/, "").toLowerCase();
      const list = byUrl.get(key) ?? [];
      list.push(source.data.id);
      byUrl.set(key, list);
    }
    const titleKey = source.data.title.trim().toLowerCase();
    const list = byTitle.get(titleKey) ?? [];
    list.push(source.data.id);
    byTitle.set(titleKey, list);
  }
  const groups: string[][] = [];
  const seen = new Set<string>();
  for (const group of [...byUrl.values(), ...byTitle.values()]) {
    const unique = [...new Set(group)];
    if (unique.length < 2) continue;
    const key = unique.slice().sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    groups.push(unique);
  }
  return groups;
}

function printSection(title: string, lines: string[]) {
  console.log(`\n## ${title}`);
  if (!lines.length) {
    console.log("none");
    return;
  }
  for (const line of lines) console.log(line);
}

async function checkUrls(index: CorpusIndex): Promise<string[]> {
  const lines: string[] = [];
  for (const source of index.sources) {
    if (!source.data.url) continue;
    try {
      const response = await fetch(source.data.url, { method: "HEAD", redirect: "follow" });
      const ok = response.ok || response.status === 405;
      if (!ok) {
        lines.push(
          `${source.data.id} ${response.status} ${source.data.url} — investigate; do not delete provenance`,
        );
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      lines.push(`${source.data.id} fetch-failed ${source.data.url} (${detail})`);
    }
  }
  return lines;
}

const args = process.argv.slice(2);
const checkUrlsFlag = args.includes("--check-urls");

const index = await buildCorpusIndex();

console.log("# Source audit");
console.log(`pages: ${index.pages.length}`);
console.log(`sources: ${index.sources.length}`);
console.log(`stale-after-days: ${STALE_DAYS}`);

const developingNoSources = index.pages
  .filter((page) => page.data.status === "developing" && sourceRefsOnPage(page).length === 0)
  .map((page) => `${page.data.id}  ${page.file}`);

const reviewedWeak = index.pages
  .filter((page) => page.data.status === "reviewed")
  .flatMap((page) => {
    const refs = sourceRefsOnPage(page);
    const notes: string[] = [];
    if (refs.length === 0) notes.push("no sources");
    if (page.data.sources.length > 0 && page.citationIds.length === 0) {
      notes.push("frontmatter sources but no body citations");
    }
    return notes.map((note) => `${page.data.id}  ${page.file}  ${note}`);
  });

const unusedSources = index.sources
  .filter((source) => inboundCount(index, source.data.id) === 0)
  .map((source) => `${source.data.id}  ${source.file}`);

const singleSourcePages = index.pages
  .filter((page) => {
    if (page.data.status === "stub") return false;
    const refs = sourceRefsOnPage(page);
    return refs.length >= 1 && new Set(refs).size === 1 && page.body.trim().length > 200;
  })
  .map((page) => `${page.data.id}  depends on ${sourceRefsOnPage(page)[0]}  ${page.file}`);

const stale = index.sources
  .filter((source) => daysSince(source.data.verified) >= STALE_DAYS)
  .map(
    (source) =>
      `${source.data.id}  verified ${source.data.verified}  (${daysSince(source.data.verified)}d)  ${source.file}`,
  );

const noLocator = index.sources
  .filter((source) => !hasLocator(source))
  .map((source) => `${source.data.id}  ${source.file}`);

const duplicates = duplicateSourceGroups(index).map((group) => group.join("  ~  "));

const domainCounts = new Map<string, number>();
for (const source of index.sources) {
  const host = hostnameOf(source.data.url);
  if (!host) continue;
  domainCounts.set(host, (domainCounts.get(host) ?? 0) + 1);
}
const heavyDomains = [...domainCounts.entries()]
  .filter(([, count]) => count >= HEAVY_DOMAIN_MIN)
  .sort((a, b) => b[1] - a[1])
  .map(([host, count]) => `${count}  ${host}`);

printSection("Developing pages with no sources", developingNoSources);
printSection("Reviewed pages with inadequate sourcing", reviewedWeak);
printSection("Source records never referenced", unusedSources);
printSection("Pages heavily dependent on one source", singleSourcePages);
printSection("Sources with stale verification dates", stale);
printSection("Sources lacking URL / DOI / ISBN", noLocator);
printSection("Possible duplicate source records", duplicates);
printSection("Heavily used domains", heavyDomains);

if (checkUrlsFlag) {
  const broken = await checkUrls(index);
  printSection("External URL check (investigate only; not a delete list)", broken);
} else {
  console.log("\n## External URL check");
  console.log("skipped (pass --check-urls to fetch; not part of the default build)");
}

console.log("\nA broken or stale URL is information to investigate, not permission to delete historical provenance.");
