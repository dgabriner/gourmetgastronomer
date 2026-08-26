import { marked, Renderer } from "marked";
import {
  rewriteWikiAndCitations,
  extractCitations,
  extractCitationIds,
} from "./wikilinks";
import type { GraphNode, GraphSource } from "./graph";

export function headingPlainText(raw: string): string {
  return raw.replace(/\[\[([^\]]+)\]\]/g, (_, inner: string) => {
    const label = inner.includes("|") ? inner.split("|")[1] : inner;
    return label.replace(/^gg:[a-z]+:/, "");
  });
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const renderer = new Renderer();
renderer.heading = function heading({ tokens, depth, text }) {
  const html = this.parser.parseInline(tokens);
  const id = slugify(headingPlainText(text));
  return `<h${depth} id="${id}">${html} <a class="permalink" href="#${id}" aria-label="Permalink to this heading">#</a></h${depth}>\n`;
};

marked.use({ gfm: true, breaks: false, renderer });

export type Heading = { depth: number; slug: string; text: string };

export function headingsFromMarkdown(body: string): Heading[] {
  const headings: Heading[] = [];
  for (const line of body.split(/\r?\n/)) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const text = headingPlainText(match[2]);
    headings.push({
      depth: match[1].length,
      slug: slugify(text),
      text,
    });
  }
  return headings;
}

export function renderBody(
  body: string,
  resolve: (id: string) => { url: string; title: string } | undefined,
): string {
  const rawHtml = marked.parse(body, { async: false }) as string;
  return rewriteWikiAndCitations(rawHtml, resolve).html;
}

export function citedAndFurther(
  node: GraphNode,
  sourcesById: Map<string, GraphSource>,
): {
  cited: { source: GraphSource; locators: string[] }[];
  further: GraphSource[];
} {
  const inline = extractCitations(node.body);
  const citedIds = extractCitationIds(node.body);
  const cited = citedIds
    .map((id) => {
      const source = sourcesById.get(id);
      if (!source) return null;
      const locators = inline
        .filter((item) => item.id === id && item.locator)
        .map((item) => item.locator!) ;
      return { source, locators };
    })
    .filter((item): item is { source: GraphSource; locators: string[] } =>
      Boolean(item),
    );

  const further = node.data.sources
    .filter((id) => !citedIds.includes(id))
    .map((id) => sourcesById.get(id))
    .filter((item): item is GraphSource => Boolean(item));

  return { cited, further };
}

export function resolverFromMaps(
  byGgId: Map<string, GraphNode>,
  sourcesById: Map<string, GraphSource>,
) {
  return (id: string) => {
    const page = byGgId.get(id);
    if (page) return { url: page.url, title: page.data.title };
    const source = sourcesById.get(id);
    if (source) {
      return {
        url: `#${id.replaceAll(":", "-")}`,
        title: source.data.title,
      };
    }
    return undefined;
  };
}
