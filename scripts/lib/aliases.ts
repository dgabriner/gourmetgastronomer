/** Culinary aliases for search, duplicate detection, and link suggestions. */

export type AliasKind = "synonym" | "spelling" | "abbreviation" | "related-term";

export type AliasConfidence = "high" | "low";

export type CulinaryAlias = {
  /** Surface form people actually type or write. */
  phrase: string;
  /** Canonical Gourmet Gastronomer ID, even if the page does not exist yet. */
  canonicalId: string;
  kind: AliasKind;
  /**
   * High: safe for link suggestions when matched as a whole phrase.
   * Low: useful for duplicate detection / research, too generic to auto-suggest.
   */
  confidence: AliasConfidence;
};

export function normalizePhrase(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc']/g, "")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/æ/g, "ae")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9%]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function slugTokens(id: string): string {
  const parts = id.split(":");
  return parts[parts.length - 1]?.replaceAll("-", " ") ?? "";
}

/**
 * Project alias table. Keep phrases specific. Bare words like "proof" and
 * "mother" are omitted on purpose — they collide across food domains.
 */
export const CULINARY_ALIASES: CulinaryAlias[] = [
  { phrase: "sour dough", canonicalId: "gg:topic:sourdough", kind: "spelling", confidence: "high" },
  { phrase: "sourdough bread", canonicalId: "gg:topic:sourdough", kind: "synonym", confidence: "low" },
  { phrase: "levain", canonicalId: "gg:topic:levain", kind: "synonym", confidence: "high" },
  { phrase: "leaven", canonicalId: "gg:topic:levain", kind: "related-term", confidence: "low" },
  { phrase: "sourdough starter", canonicalId: "gg:topic:sourdough-starter", kind: "synonym", confidence: "high" },
  { phrase: "starter culture", canonicalId: "gg:topic:sourdough-starter", kind: "related-term", confidence: "low" },
  { phrase: "lactic acid bacteria", canonicalId: "gg:topic:lactic-acid-bacteria", kind: "synonym", confidence: "high" },
  { phrase: "LAB", canonicalId: "gg:topic:lactic-acid-bacteria", kind: "abbreviation", confidence: "high" },
  { phrase: "lactic-acid bacteria", canonicalId: "gg:topic:lactic-acid-bacteria", kind: "spelling", confidence: "high" },
  { phrase: "baker's percentage", canonicalId: "gg:topic:bakers-percentage", kind: "synonym", confidence: "high" },
  { phrase: "bakers percentage", canonicalId: "gg:topic:bakers-percentage", kind: "spelling", confidence: "high" },
  { phrase: "baker's %", canonicalId: "gg:topic:bakers-percentage", kind: "abbreviation", confidence: "high" },
  { phrase: "bakers %", canonicalId: "gg:topic:bakers-percentage", kind: "spelling", confidence: "high" },
  { phrase: "baker's math", canonicalId: "gg:topic:bakers-percentage", kind: "related-term", confidence: "high" },
  { phrase: "whole wheat", canonicalId: "gg:ingredient:wheat-flour", kind: "related-term", confidence: "low" },
  { phrase: "wholemeal", canonicalId: "gg:ingredient:wheat-flour", kind: "spelling", confidence: "low" },
  { phrase: "final proof", canonicalId: "gg:topic:final-proof", kind: "synonym", confidence: "high" },
  { phrase: "final prove", canonicalId: "gg:topic:final-proof", kind: "spelling", confidence: "high" },
  { phrase: "proving", canonicalId: "gg:topic:final-proof", kind: "spelling", confidence: "low" },
  { phrase: "preserves", canonicalId: "gg:topic:jam", kind: "related-term", confidence: "low" },
  { phrase: "pate fermentee", canonicalId: "gg:topic:pate-fermentee", kind: "spelling", confidence: "high" },
  { phrase: "pâte fermentée", canonicalId: "gg:topic:pate-fermentee", kind: "synonym", confidence: "high" },
  { phrase: "autolyse", canonicalId: "gg:topic:autolyse", kind: "synonym", confidence: "high" },
  { phrase: "autolyze", canonicalId: "gg:topic:autolyse", kind: "spelling", confidence: "high" },
  { phrase: "affinage", canonicalId: "gg:topic:affinage", kind: "synonym", confidence: "high" },
  { phrase: "cheese aging", canonicalId: "gg:topic:affinage", kind: "related-term", confidence: "low" },
  { phrase: "terroir", canonicalId: "gg:topic:terroir", kind: "synonym", confidence: "high" },
  { phrase: "nixtamal", canonicalId: "gg:topic:nixtamal", kind: "synonym", confidence: "high" },
  { phrase: "masa", canonicalId: "gg:ingredient:masa", kind: "synonym", confidence: "high" },
  { phrase: "desired dough temperature", canonicalId: "gg:topic:desired-dough-temperature", kind: "synonym", confidence: "high" },
  { phrase: "desired dough temp", canonicalId: "gg:topic:desired-dough-temperature", kind: "abbreviation", confidence: "high" },
  { phrase: "friction factor", canonicalId: "gg:topic:friction-factor", kind: "synonym", confidence: "high" },
  { phrase: "wild yeast", canonicalId: "gg:topic:wild-yeast", kind: "synonym", confidence: "high" },
  { phrase: "bulk ferment", canonicalId: "gg:topic:bulk-fermentation", kind: "synonym", confidence: "high" },
  { phrase: "bulk fermentation", canonicalId: "gg:topic:bulk-fermentation", kind: "synonym", confidence: "high" },
  { phrase: "first rise", canonicalId: "gg:topic:bulk-fermentation", kind: "related-term", confidence: "low" },
  { phrase: "dough development", canonicalId: "gg:topic:dough-development", kind: "synonym", confidence: "high" },
  { phrase: "wheat flour", canonicalId: "gg:ingredient:wheat-flour", kind: "synonym", confidence: "high" },
  { phrase: "food safety", canonicalId: "gg:topic:food-safety", kind: "synonym", confidence: "high" },
  { phrase: "wine tasting", canonicalId: "gg:topic:wine-tasting", kind: "synonym", confidence: "high" },
  { phrase: "tasting wine", canonicalId: "gg:topic:wine-tasting", kind: "synonym", confidence: "high" },
  { phrase: "cheese tasting", canonicalId: "gg:topic:cheese-tasting", kind: "synonym", confidence: "high" },
  { phrase: "tasting cheese", canonicalId: "gg:topic:cheese-tasting", kind: "synonym", confidence: "high" },
  { phrase: "marmalade", canonicalId: "gg:topic:marmalade", kind: "synonym", confidence: "high" },
  { phrase: "fruit jelly", canonicalId: "gg:topic:jelly", kind: "synonym", confidence: "high" },
  { phrase: "home canning", canonicalId: "gg:topic:canning", kind: "synonym", confidence: "high" },
  { phrase: "boiling water bath", canonicalId: "gg:topic:canning", kind: "related-term", confidence: "low" },
  { phrase: "rennet", canonicalId: "gg:topic:cheese-coagulation", kind: "related-term", confidence: "high" },
  { phrase: "milk clotting", canonicalId: "gg:topic:cheese-coagulation", kind: "related-term", confidence: "high" },
  { phrase: "curds and whey", canonicalId: "gg:topic:curd", kind: "related-term", confidence: "high" },
  { phrase: "cheese curd", canonicalId: "gg:topic:curd", kind: "synonym", confidence: "high" },
  { phrase: "bloomy rind", canonicalId: "gg:topic:cheese-rind", kind: "related-term", confidence: "high" },
  { phrase: "washed rind", canonicalId: "gg:topic:cheese-rind", kind: "related-term", confidence: "high" },
  { phrase: "cheese cultures", canonicalId: "gg:topic:cheese-cultures", kind: "synonym", confidence: "high" },
  { phrase: "tannin", canonicalId: "gg:topic:tannin", kind: "synonym", confidence: "high" },
  { phrase: "tannins", canonicalId: "gg:topic:tannin", kind: "spelling", confidence: "high" },
  { phrase: "astringency", canonicalId: "gg:topic:tannin", kind: "related-term", confidence: "low" },
  { phrase: "san francisco sourdough", canonicalId: "gg:topic:san-francisco-sourdough", kind: "synonym", confidence: "high" },
  { phrase: "lactobacillus sanfranciscensis", canonicalId: "gg:topic:san-francisco-sourdough", kind: "related-term", confidence: "high" },
  { phrase: "fructilactobacillus sanfranciscensis", canonicalId: "gg:topic:san-francisco-sourdough", kind: "related-term", confidence: "high" },
  { phrase: "napa valley", canonicalId: "gg:place:napa-valley", kind: "synonym", confidence: "high" },
  { phrase: "sonoma county", canonicalId: "gg:place:sonoma-county", kind: "synonym", confidence: "high" },
];

export type AliasIndexEntry = {
  normalized: string;
  alias: CulinaryAlias;
};

export function buildAliasIndex(aliases: CulinaryAlias[] = CULINARY_ALIASES): Map<string, AliasIndexEntry[]> {
  const index = new Map<string, AliasIndexEntry[]>();
  for (const alias of aliases) {
    const normalized = normalizePhrase(alias.phrase);
    if (!normalized) continue;
    const list = index.get(normalized) ?? [];
    list.push({ normalized, alias });
    index.set(normalized, list);
  }
  return index;
}

export function aliasesForId(
  id: string,
  aliases: CulinaryAlias[] = CULINARY_ALIASES,
): CulinaryAlias[] {
  return aliases.filter((alias) => alias.canonicalId === id);
}

export type PhraseTarget = {
  phrase: string;
  normalized: string;
  canonicalId: string;
  confidence: AliasConfidence;
  origin: "title" | "also_called" | "alias" | "id-slug";
};

export function uniqueTargets(targets: PhraseTarget[]): PhraseTarget[] {
  const seen = new Set<string>();
  const out: PhraseTarget[] = [];
  for (const target of targets) {
    const key = `${target.normalized}|${target.canonicalId}|${target.origin}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(target);
  }
  return out;
}
