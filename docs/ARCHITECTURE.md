# Architecture

Canonical stack, locked from current official docs (Astro 7, Pagefind 1.5, Cursor rules).

## Runtime shape

- Git-canonical Markdown and YAML in `content/`
- Astro 7 static HTML (`output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'`)
- Content Layer collections in `src/content.config.ts` with `glob()` and `deferRender: true`
- Zod schemas in `src/lib/schema.ts` (via `astro/zod`)
- Pagefind 1.5 Component UI, indexed after `astro build`
- Deploy: upload `dist/` to Apache (DreamHost). No Node on the server.

## Why not the alternatives

- **Starlight** is a documentation theme. Wrong genre.
- **Eleventy** is simpler but weaker at typed content-through-templates.
- **Hugo** is fast; Go templates are a poor fit for this ID/schema workflow.

## URLs

Filesystem path under `content/` is the URL. `baking/sourdough/starter.md` → `/baking/sourdough/starter/`. Collection `id` is that path; the Gourmet Gastronomer graph ID is frontmatter `id`.

## JavaScript

Article pages ship with no required JS. Search loads Pagefind only on `/search/`. Mobile menu is `<details>`.

## Hosting notes

`public/.htaccess` copies into `dist/`. Do not force HTTPS until the certificate is valid. Canonical URLs still use `https://gourmetgastronomer.com`.
