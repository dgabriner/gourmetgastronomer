export const WIKI_RE =
  /\[\[(gg:(?:topic|ingredient|recipe|place|pathway|person|source):[a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

export const SRC_RE =
  /\[src:(gg:source:[a-z0-9-]+)(?:,\s*([^\]]+))?\]/g;

export type InlineCitation = {
  id: string;
  locator?: string;
};

export function extractWikiIds(body: string): string[] {
  const ids: string[] = [];
  const pattern = new RegExp(WIKI_RE.source, "g");
  for (const match of body.matchAll(pattern)) {
    ids.push(match[1]);
  }
  return ids;
}

export function extractCitations(body: string): InlineCitation[] {
  const citations: InlineCitation[] = [];
  const seen = new Set<string>();
  const pattern = new RegExp(SRC_RE.source, "g");
  for (const match of body.matchAll(pattern)) {
    const key = `${match[1]}|${match[2] ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    citations.push({ id: match[1], locator: match[2] });
  }
  return citations;
}

export function extractCitationIds(body: string): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const citation of extractCitations(body)) {
    if (seen.has(citation.id)) continue;
    seen.add(citation.id);
    ids.push(citation.id);
  }
  return ids;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function rewriteWikiAndCitations(
  html: string,
  resolve: (id: string) => { url: string; title: string } | undefined,
): { html: string; missing: string[] } {
  const missing: string[] = [];

  let output = html.replace(WIKI_RE, (_all, id: string, label?: string) => {
    const target = resolve(id);
    if (!target) {
      missing.push(id);
      return escapeHtml(label || id);
    }
    const text = escapeHtml(label || target.title);
    return `<a href="${escapeHtml(target.url)}">${text}</a>`;
  });

  let citationIndex = 0;
  const citationNumbers = new Map<string, number>();
  output = output.replace(SRC_RE, (_all, id: string, locator?: string) => {
    const target = resolve(id);
    if (!target) {
      missing.push(id);
      return "";
    }
    if (!citationNumbers.has(id)) {
      citationIndex += 1;
      citationNumbers.set(id, citationIndex);
    }
    const n = citationNumbers.get(id);
    const title = locator
      ? `${target.title}, ${locator}`
      : target.title;
    return `<sup class="cite"><a href="#${escapeHtml(id.replaceAll(":", "-"))}" title="${escapeHtml(title)}">${n}</a></sup>`;
  });

  return { html: output, missing };
}
