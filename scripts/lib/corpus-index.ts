import { extractCitationIds, extractWikiIds } from "../../src/lib/wikilinks.ts";
import { parentFileId, rootOf } from "../../src/lib/paths.ts";
import type { PageData, SourceData } from "../../src/lib/schema.ts";
import { loadCorpus, type Issue } from "../validate.ts";
import {
  CULINARY_ALIASES,
  normalizePhrase,
  slugTokens,
  uniqueTargets,
  type PhraseTarget,
} from "./aliases.ts";

export type IndexedPage = {
  file: string;
  fileId: string;
  data: PageData;
  body: string;
  root: string | null;
  wikiIds: string[];
  citationIds: string[];
  outboundIds: string[];
};

export type IndexedSource = {
  file: string;
  data: SourceData;
};

export type CorpusIndex = {
  pages: IndexedPage[];
  sources: IndexedSource[];
  issues: Issue[];
  byGgId: Map<string, IndexedPage>;
  bySourceId: Map<string, IndexedSource>;
  byNormalizedTitle: Map<string, IndexedPage[]>;
  inbound: Map<string, Set<string>>;
  phraseTargets: PhraseTarget[];
};

export function pageOutboundIds(page: {
  data: PageData;
  wikiIds: string[];
}): string[] {
  const ids = [
    ...page.data.related,
    ...page.data.prerequisites,
    ...page.wikiIds,
  ];
  if (page.data.kind === "ingredient") ids.push(...page.data.substitutes);
  if (page.data.kind === "recipe") {
    ids.push(...page.data.equipment);
    for (const ingredient of page.data.ingredients) {
      if (ingredient.id) ids.push(ingredient.id);
    }
  }
  if (page.data.kind === "place" && page.data.part_of) ids.push(page.data.part_of);
  if (page.data.kind === "pathway") {
    for (const step of page.data.steps) ids.push(step.id);
  }
  return [...new Set(ids)];
}

export function allSourceRefs(page: IndexedPage): string[] {
  return [...new Set([...page.data.sources, ...page.citationIds])];
}

export async function buildCorpusIndex(): Promise<CorpusIndex> {
  const { pages, sources, issues } = await loadCorpus();
  const indexedPages: IndexedPage[] = pages.map((page) => {
    const wikiIds = extractWikiIds(page.body);
    const citationIds = extractCitationIds(page.body);
    const prepared = { data: page.data, wikiIds };
    return {
      file: page.file,
      fileId: page.fileId,
      data: page.data,
      body: page.body,
      root: rootOf(page.fileId),
      wikiIds,
      citationIds,
      outboundIds: pageOutboundIds(prepared),
    };
  });

  const byGgId = new Map<string, IndexedPage>();
  const byNormalizedTitle = new Map<string, IndexedPage[]>();
  const inbound = new Map<string, Set<string>>();

  const addInbound = (targetId: string, fromId: string) => {
    if (targetId === fromId) return;
    const set = inbound.get(targetId) ?? new Set<string>();
    set.add(fromId);
    inbound.set(targetId, set);
  };

  for (const page of indexedPages) {
    byGgId.set(page.data.id, page);
    const titleKey = normalizePhrase(page.data.title);
    const titleList = byNormalizedTitle.get(titleKey) ?? [];
    titleList.push(page);
    byNormalizedTitle.set(titleKey, titleList);
  }

  for (const page of indexedPages) {
    for (const id of page.outboundIds) addInbound(id, page.data.id);
    for (const id of page.data.sources) addInbound(id, page.data.id);
    for (const id of page.citationIds) addInbound(id, page.data.id);
  }

  const bySourceId = new Map<string, IndexedSource>();
  for (const source of sources) {
    bySourceId.set(source.data.id, source);
  }

  const phraseTargets = uniqueTargets(collectPhraseTargets(indexedPages));

  return {
    pages: indexedPages,
    sources,
    issues,
    byGgId,
    bySourceId,
    byNormalizedTitle,
    inbound,
    phraseTargets,
  };
}

export function collectPhraseTargets(pages: IndexedPage[]): PhraseTarget[] {
  const targets: PhraseTarget[] = [];

  for (const page of pages) {
    const wordCount = page.data.title.trim().split(/\s+/).length;
    const titleConfidence =
      wordCount >= 2 || page.data.title.replace(/\s+/g, "").length >= 12
        ? "high"
        : "low";
    targets.push({
      phrase: page.data.title,
      normalized: normalizePhrase(page.data.title),
      canonicalId: page.data.id,
      confidence: titleConfidence,
      origin: "title",
    });
    targets.push({
      phrase: slugTokens(page.data.id),
      normalized: normalizePhrase(slugTokens(page.data.id)),
      canonicalId: page.data.id,
      confidence: "low",
      origin: "id-slug",
    });
    if (page.data.kind === "ingredient") {
      for (const alias of page.data.also_called) {
        targets.push({
          phrase: alias,
          normalized: normalizePhrase(alias),
          canonicalId: page.data.id,
          confidence: alias.trim().length >= 8 ? "high" : "low",
          origin: "also_called",
        });
      }
    }
  }

  for (const alias of CULINARY_ALIASES) {
    targets.push({
      phrase: alias.phrase,
      normalized: normalizePhrase(alias.phrase),
      canonicalId: alias.canonicalId,
      confidence: alias.confidence,
      origin: "alias",
    });
  }

  return targets.filter((target) => target.normalized.length >= 3);
}

export function inboundCount(index: CorpusIndex, id: string): number {
  return index.inbound.get(id)?.size ?? 0;
}

export function parentExists(index: CorpusIndex, page: IndexedPage): boolean {
  const parent = parentFileId(page.fileId);
  if (!parent) return false;
  return [...index.pages].some((candidate) => candidate.fileId === parent);
}

export function hostnameOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function daysSince(isoDate: string, now = new Date()): number {
  const then = new Date(`${isoDate}T00:00:00Z`);
  return Math.floor((now.getTime() - then.getTime()) / 86_400_000);
}

export function isIndexPage(page: IndexedPage): boolean {
  return page.file.endsWith("index.md");
}

export function stubRatio(pages: IndexedPage[]): number {
  if (!pages.length) return 0;
  const stubs = pages.filter((page) => page.data.status === "stub").length;
  return stubs / pages.length;
}
