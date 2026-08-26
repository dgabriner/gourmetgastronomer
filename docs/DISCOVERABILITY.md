# Discoverability

How Gourmet Gastronomer becomes visited and cited without becoming a recipe-SEO site.

The model is a specialist encyclopedia: unique, source-backed answers that are legally and mechanically easy to quote. Google traffic, human citations, and AI citations are consequences of that. They are not a separate marketing layer.

See [VISION.md](VISION.md), [EDITORIAL.md](EDITORIAL.md), and [BENCHMARKS.md](BENCHMARKS.md). Do not add share walls, comments, newsletter popups, Google Analytics, FAQ schema spam, mass-generated stubs, or Wikipedia linkspam.

## License

Original encyclopedia prose, site copy, and original diagrams are **CC BY 4.0**. Attribution is the product.

- Legal code: <https://creativecommons.org/licenses/by/4.0/>
- Public page: `/reuse/`
- Repo: `LICENSE`

Third-party sources remain under their own copyright. We license only our words.

CC BY-NC would block journalists, Wikipedia, and cookbooks. CC BY-SA adds share-alike friction for publishers without helping citation. Do not change the license to chase a platform.

**How to attribute:** title, canonical URL, `gg:` id, and the page `updated` date when citing a specific version.

## What this site already does

Canonical HTTPS URLs, sitemap, RSS, robots, JSON-LD, wiki links, numbered citations, Pagefind, public Method / Editorial / Corrections pages, inbound “Connected from,” and `llms.txt`.

Infrastructure is not the hotspot. Citation-magnet pages are. Deepen those with `.cursor/skills/research-topic` and `.cursor/skills/deepen-page`. Never set `status: reviewed`.

## HTTPS (DreamHost)

Canonical URLs are `https://gourmetgastronomer.com` ([`src/lib/jsonld.ts`](../src/lib/jsonld.ts)). HTTP serves the encyclopedia (200). HTTPS is a different, broken vhost:

- TLS: untrusted certificate chain (`SEC_E_UNTRUSTED_ROOT` — not a public CA / Let’s Encrypt).
- Content: DreamHost’s “Site not found” placeholder, not `dist/`.

Do **not** add a sitewide HTTP→HTTPS rewrite in `public/.htaccess` until a trusted certificate is in place **and** HTTPS serves the same files as HTTP. Check:

- `https://gourmetgastronomer.com/` returns 200 with the Gourmet Gastronomer homepage (not “Site not found”)
- one article (for example `/baking/desired-dough-temperature/`)
- `/sitemap-index.xml`
- `/robots.txt`
- `/llms.txt`

No certificate warnings in `curl -sI https://gourmetgastronomer.com/`.

### Fix on DreamHost

1. Panel → **Manage Domains** → `gourmetgastronomer.com`.
2. Enable **Secure hosting** / Let’s Encrypt.
3. Point the HTTPS document root at the **same** directory as HTTP (the folder that receives `dist/`). The HTTPS vhost is currently an empty/default site.
4. Wait until the certificate is issued by a public CA. Confirm:

```sh
curl -sI https://gourmetgastronomer.com/
curl -sI https://gourmetgastronomer.com/baking/desired-dough-temperature/
```

HSTS is later, after HTTPS has been stable. The repo `.htaccess` does not force HTTPS.

## Search Console

After HTTPS returns 200:

1. [Google Search Console](https://search.google.com/search-console) → add `https://gourmetgastronomer.com/` as a URL-prefix property.
2. Verification: set `GSC_VERIFICATION` at **build** time to the token Google shows (the `content` value of `google-site-verification`). Rebuild and deploy. The meta tag is emitted from `src/layouts/Base.astro` only when that env var is set. Do not invent a token or commit one.
3. Submit `https://gourmetgastronomer.com/sitemap-index.xml`.
4. Optional: Bing Webmaster Tools, same sitemap.

Do not add Google Analytics. Search Console is enough to know whether the encyclopedia is being found.

## Off-site entity (after HTTPS)

1. Wikidata item for the *organization* (name, official website, instance of website / online encyclopedia). No invented identifiers. Once a QID exists, add `https://www.wikidata.org/wiki/Q…` to `sameAs` in `organizationJsonLd()` in [`src/lib/jsonld.ts`](../src/lib/jsonld.ts).
2. Keep `/feed.xml`. Do not build a newsletter product.
3. **Do not** create a Wikipedia article about Gourmet Gastronomer until independent notability exists. **Do not** add this site to Wikipedia external-link lists.
4. When a mechanism page is stronger than Wikipedia, improve Wikipedia from the **same primary sources** as a good citizen. This encyclopedia remains the deeper practical page. Wikipedia may cite GG later if it looks like a specialist encyclopedia with editorial control — that takes reviewed pages plus independent coverage, not outreach.
5. Earn links by being the page bakers, teachers, and journalists actually use.

## Citation magnets

Deepen canonical IDs. Do not mass-generate. Prefer questions the open web handles badly:

- Desired dough temperature, friction factor, baker’s percentage
- Bulk fermentation, levain vs starter, San Francisco sourdough
- Pectin / gel set, fermentation, food safety (NCHFP/extension only for process times)
- Bay Area atlas nodes, sourced and thin

On-page habits (already in [EDITORIAL.md](EDITORIAL.md)): the `summary` defines the thing; named sources in prose; self-contained sections; observation and failure modes.

## Success

- HTTPS 200; Search Console impressions and queries
- Other sites quoting with CC BY attribution or the on-page citation
- Spot-check Perplexity / ChatGPT answers for DDT-class queries
- Inbound links to mechanism pages, not homepage vanity

Early traffic will be small. Specialist encyclopedias compound from citable depth, not posting volume.
