# Sources

Sources are YAML files in `content/sources/`. Pages never store raw URLs in frontmatter.

Required fields: `id`, `kind`, `title`, `verified`. Prefer at least one of `url`, `isbn`, `doi`.

Page citations:

- Frontmatter `sources:` — further exploration
- Body `[src:gg:source:…]` and optional locator `[src:gg:source:…, p. 31]`

`npm run verify:links` checks source URLs and is **not** part of the default build.

`npm run report:sources` audits unused records, thin sourcing, missing locators, and duplicate records. Pass `--check-urls` only when investigating. A failed fetch is not permission to delete provenance.

Claim types and evidence discipline: [EVIDENCE.md](EVIDENCE.md). Starting authorities by domain: [SOURCE-ECOSYSTEMS.md](SOURCE-ECOSYSTEMS.md). Prefer editorial judgment over fake numeric trust scores.

Never fabricate a citation to look complete. Omit the claim instead.
