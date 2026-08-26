import {
  buildCorpusIndex,
  inboundCount,
  isIndexPage,
  stubRatio,
  type CorpusIndex,
  type IndexedPage,
} from "./lib/corpus-index.ts";
import { CULINARY_ALIASES, normalizePhrase } from "./lib/aliases.ts";

const RELATED_CAP = 8;
const HUB_MIN_DEGREE = 6;
const STUBBY_MIN_PAGES = 3;
const STUBBY_RATIO = 0.5;

function printSection(title: string, lines: string[]) {
  console.log(`\n## ${title}`);
  if (!lines.length) {
    console.log("none");
    return;
  }
  for (const line of lines) console.log(line);
}

function degree(index: CorpusIndex, page: IndexedPage): number {
  return inboundCount(index, page.data.id) + page.outboundIds.length;
}

function branchKey(page: IndexedPage): string {
  const parts = page.fileId.split("/");
  if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  return parts[0] ?? page.fileId;
}

function graphOrphans(index: CorpusIndex): string[] {
  return index.pages
    .filter((page) => !isIndexPage(page) && inboundCount(index, page.data.id) === 0)
    .map((page) => `${page.data.id}  ${page.file}`);
}

function noInbound(index: CorpusIndex): string[] {
  return index.pages
    .filter((page) => inboundCount(index, page.data.id) === 0)
    .map((page) => `${page.data.id}  ${page.file}${isIndexPage(page) ? "  (index)" : ""}`);
}

function noOutbound(index: CorpusIndex): string[] {
  return index.pages
    .filter((page) => page.outboundIds.length === 0 && page.data.status !== "stub")
    .map((page) => `${page.data.id}  ${page.file}`);
}

function hubs(index: CorpusIndex): string[] {
  return [...index.pages]
    .sort((a, b) => degree(index, b) - degree(index, a))
    .filter((page) => degree(index, page) >= HUB_MIN_DEGREE)
    .slice(0, 15)
    .map(
      (page) =>
        `${degree(index, page)}  in:${inboundCount(index, page.data.id)} out:${page.outboundIds.length}  ${page.data.id}`,
    );
}

function duplicateTitles(index: CorpusIndex): string[] {
  const lines: string[] = [];
  for (const [title, pages] of index.byNormalizedTitle) {
    if (pages.length < 2) continue;
    lines.push(`${title}  →  ${pages.map((page) => page.data.id).join("  ~  ")}`);
  }
  return lines;
}

function aliasCollisions(index: CorpusIndex): string[] {
  const byPhrase = new Map<string, Set<string>>();
  for (const target of index.phraseTargets) {
    if (target.origin === "id-slug" && target.confidence === "low") continue;
    const set = byPhrase.get(target.normalized) ?? new Set<string>();
    set.add(target.canonicalId);
    byPhrase.set(target.normalized, set);
  }
  const lines: string[] = [];
  for (const [phrase, ids] of byPhrase) {
    if (ids.size < 2) continue;
    lines.push(`${phrase}  →  ${[...ids].join("  ~  ")}`);
  }

  for (const alias of CULINARY_ALIASES) {
    const pages = index.byNormalizedTitle.get(normalizePhrase(alias.phrase)) ?? [];
    for (const page of pages) {
      if (page.data.id !== alias.canonicalId) {
        lines.push(
          `title ${page.data.title} (${page.data.id}) collides with alias for ${alias.canonicalId}`,
        );
      }
    }
  }
  return [...new Set(lines)];
}

function danglingConcepts(index: CorpusIndex): string[] {
  const known = new Set([...index.byGgId.keys(), ...index.bySourceId.keys()]);
  const dangling = new Map<string, string[]>();
  for (const target of index.phraseTargets) {
    if (known.has(target.canonicalId)) continue;
    const list = dangling.get(target.canonicalId) ?? [];
    list.push(`${target.origin}:${target.phrase}`);
    dangling.set(target.canonicalId, list);
  }
  return [...dangling.entries()].map(
    ([id, origins]) => `${id}  (no page yet; ${[...new Set(origins)].join(", ")})`,
  );
}

function relatedOverCap(index: CorpusIndex): string[] {
  return index.pages
    .filter((page) => page.data.related.length > RELATED_CAP)
    .map((page) => `${page.data.id}  related=${page.data.related.length}  ${page.file}`);
}

function crossDomain(index: CorpusIndex): string[] {
  const pairs = new Map<string, number>();
  for (const page of index.pages) {
    if (!page.root) continue;
    for (const id of page.outboundIds) {
      const target = index.byGgId.get(id);
      if (!target?.root || target.root === page.root) continue;
      const key = [page.root, target.root].sort().join(" ↔ ");
      pairs.set(key, (pairs.get(key) ?? 0) + 1);
    }
  }
  return [...pairs.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([pair, count]) => `${count}  ${pair}`);
}

function stubbyBranches(index: CorpusIndex): string[] {
  const groups = new Map<string, IndexedPage[]>();
  for (const page of index.pages) {
    const key = branchKey(page);
    const list = groups.get(key) ?? [];
    list.push(page);
    groups.set(key, list);
  }
  return [...groups.entries()]
    .filter(([, pages]) => pages.length >= STUBBY_MIN_PAGES && stubRatio(pages) >= STUBBY_RATIO)
    .map(([key, pages]) => {
      const stubs = pages.filter((page) => page.data.status === "stub").length;
      return `${key}  ${stubs}/${pages.length} stubs`;
    });
}

function pathwayOnlyNodes(index: CorpusIndex): string[] {
  const lines: string[] = [];
  for (const page of index.pages) {
    if (page.data.kind !== "pathway") continue;
    for (const step of page.data.steps) {
      const inbound = index.inbound.get(step.id);
      const others = inbound
        ? [...inbound].filter((id) => id !== page.data.id)
        : [];
      if (others.length === 0) {
        lines.push(`${step.id}  only referenced by pathway ${page.data.id}`);
      }
    }
  }
  return lines;
}

function missingMajorBridges(index: CorpusIndex): string[] {
  const wanted: [string, string][] = [
    ["science", "baking"],
    ["science", "cheese"],
    ["science", "wine"],
    ["science", "preserving"],
    ["skills", "baking"],
    ["skills", "cheese"],
    ["skills", "wine"],
    ["ingredients", "baking"],
    ["ingredients", "cheese"],
    ["ingredients", "preserving"],
  ];
  const present = new Set(
    crossDomain(index).map((line) => line.replace(/^\d+\s+/, "")),
  );
  return wanted
    .filter(([a, b]) => {
      const key = [a, b].sort().join(" ↔ ");
      return !present.has(key);
    })
    .map(([a, b]) => `no ${a} ↔ ${b} graph edges yet — add only if intellectually useful`);
}

const index = await buildCorpusIndex();

console.log("# Graph health");
console.log(`pages: ${index.pages.length}`);
console.log(`sources: ${index.sources.length}`);
console.log("Relationships must be intellectually useful. Density is not a goal.");

printSection("Orphan pages (no inbound graph references, excluding index files)", graphOrphans(index));
printSection("Pages with no inbound references", noInbound(index));
printSection("Pages with no outbound relationships", noOutbound(index));
printSection("Heavily connected nodes", hubs(index));
printSection("Suspicious duplicate titles", duplicateTitles(index));
printSection("Alias collisions", aliasCollisions(index));
printSection("Dangling concepts (aliases / titles pointing at missing IDs)", danglingConcepts(index));
printSection(`Related lists over the cap (${RELATED_CAP})`, relatedOverCap(index));
printSection("Cross-domain connections", crossDomain(index));
printSection("Missing high-value domain bridges (suggestions, not tasks)", missingMajorBridges(index));
printSection("Branches consisting mostly of stubs", stubbyBranches(index));
printSection("Pathway steps referenced nowhere else", pathwayOnlyNodes(index));
