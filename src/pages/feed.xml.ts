import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { fileIdToUrl } from "../lib/paths";

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("https://gourmetgastronomer.com");
  const pages = await getCollection("pages");
  const items = [...pages]
    .sort((a, b) => (b.data.updated ?? "").localeCompare(a.data.updated ?? ""))
    .slice(0, 30);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Gourmet Gastronomer</title>
    <link>${origin}</link>
    <description>Recently updated entries from the Gourmet Gastronomer encyclopedia.</description>
    ${items
      .map((entry) => {
        const url = new URL(fileIdToUrl(entry.id), origin).href;
        return `<item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(entry.data.summary)}</description>
      ${entry.data.updated ? `<pubDate>${new Date(entry.data.updated).toUTCString()}</pubDate>` : ""}
    </item>`;
      })
      .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
