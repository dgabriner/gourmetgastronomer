import type { APIRoute } from "astro";

const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Anthropic-User",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
] as const;

const getRobotsTxt = (sitemapURL: URL) => {
  const explicit = AI_AGENTS.map(
    (agent) => `User-agent: ${agent}\nAllow: /\n`,
  ).join("\n");
  return `${explicit}
User-agent: *
Allow: /
Sitemap: ${sitemapURL.href}
`;
};

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
