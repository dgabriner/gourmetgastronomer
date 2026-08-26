import { normalizePhrase, type PhraseTarget } from "./aliases.ts";

export type BodyMention = {
  phrase: string;
  canonicalId: string;
  confidence: PhraseTarget["confidence"];
  origin: PhraseTarget["origin"];
  index: number;
  excerpt: string;
};

function maskProtectedSpans(body: string): string {
  return body
    .replace(/\[\[gg:[^\]]+\]\]/g, (match) => " ".repeat(match.length))
    .replace(/\[src:gg:[^\]]+\]/g, (match) => " ".repeat(match.length))
    .replace(/\[[^\]]+\]\([^)]+\)/g, (match) => " ".repeat(match.length));
}

function isBoundary(ch: string | undefined): boolean {
  if (ch === undefined) return true;
  return /[^a-z0-9%]/i.test(ch);
}

function excerptAt(body: string, index: number, length: number): string {
  const start = Math.max(0, index - 40);
  const end = Math.min(body.length, index + length + 40);
  return body.slice(start, end).replaceAll("\n", " ").trim();
}

export function findPhraseMentions(
  body: string,
  targets: PhraseTarget[],
): BodyMention[] {
  const masked = maskProtectedSpans(body);
  const used = new Array<boolean>(masked.length).fill(false);
  const mentions: BodyMention[] = [];

  const ranked = [...targets]
    .filter((target) => target.normalized.length >= 3)
    .sort((a, b) => b.normalized.length - a.normalized.length || b.phrase.length - a.phrase.length);

  for (const target of ranked) {
    const needle = target.phrase;
    const caseSensitive = target.origin === "alias" && needle === needle.toUpperCase() && needle.length <= 4;
    const haystack = caseSensitive ? masked : masked.toLowerCase();
    const find = caseSensitive ? needle : needle.toLowerCase();
    if (!find) continue;

    let from = 0;
    while (from < haystack.length) {
      const index = haystack.indexOf(find, from);
      if (index === -1) break;
      from = index + find.length;
      if (!isBoundary(masked[index - 1]) || !isBoundary(masked[index + find.length])) continue;
      let occupied = false;
      for (let i = index; i < index + find.length; i += 1) {
        if (used[i]) {
          occupied = true;
          break;
        }
      }
      if (occupied) continue;
      for (let i = index; i < index + find.length; i += 1) used[i] = true;
      mentions.push({
        phrase: body.slice(index, index + find.length),
        canonicalId: target.canonicalId,
        confidence: target.confidence,
        origin: target.origin,
        index,
        excerpt: excerptAt(body, index, find.length),
      });
    }
  }

  return mentions.sort((a, b) => a.index - b.index);
}

export function queryMatches(
  query: string,
  targets: PhraseTarget[],
): PhraseTarget[] {
  const normalized = normalizePhrase(query);
  if (!normalized) return [];
  return targets.filter(
    (target) =>
      target.normalized === normalized ||
      target.normalized.includes(normalized) ||
      normalized.includes(target.normalized),
  );
}
