# SEO

SEO conventions for ILMASI Digital web projects. Apply during workflow step 13 (SEO), after performance and before backups.

## When to use

Load this doc for technical implementation and the redirect map.

## Scope

**Technical implementation and the redirect map. Nothing else.**

- This step does not decide what pages are about. That was step 2 — see [search-research.md](search-research.md).
- **This step does not write titles or meta descriptions.** Step 3 wrote them — see [copywriting.md](copywriting.md).
- Read `discovery/brief.md` for the page intents. If copy and intent disagree, report it. Do not fix it here.

## SEOPress

Docs: [seopress.org/support/guides/](https://www.seopress.org/support/guides/). Configure from the guides, not from memory. Where `build/environment.md` records WP-CLI, script it.

On a rebuild, check which SEO plugin the old site used. SEOPress migrates settings from the common ones in one step, preserving per-page titles and descriptions.

Set, in order of consequence:

- **Metadata as written at step 3.** Transfer titles and descriptions into the plugin, per page. Template anything the copy did not cover individually. **A page that carries the site and has no hand-written metadata is a step 3 gap to report, not a text to improvise.**
- **Canonicals**, and robots directives where a page should not be indexed. Be sparing.
- **XML sitemap**, plus an HTML sitemap where the site is large enough to benefit.
- **Structured data** for what the site actually is, using the address, hours and service area recorded in discovery.
- **Search Console.** Connect here; verify the property and submit the sitemap on the live domain after the cutover — see [deployment.md](deployment.md).

Heading order, semantic elements and image alternative text come from the build — see [html.md](html.md). Verify, do not rebuild.

## The redirect map

Built here. **Activated at step 15, not now.**

1. **Inventory the old URLs while the old site is reachable.** After the cutover it cannot be crawled.
2. **Map one to one, to the closest equivalent. Never to the homepage.**
3. Old URLs with no equivalent are a content question. Raise them.
4. Check for chains and loops.
5. **Test the map against the full list**, not by spot checks.

Turn on 404 logging for the first weeks after launch.

## Agent readiness

SEOPress PRO 9.8 adds an Agent Readiness toggle: plain-text page versions and a standardised `/llms.txt`. [Guide](https://www.seopress.org/support/guides/agent-readiness/).

- Turn it on.
- **Do not present it as a traffic source.** SEOPress note that most models do not currently rely on `llms.txt` in any standardised way.
- The AI crawler robots rules stay **off by default and remain the client's decision.** Content-Signal states usage preferences without blocking access and is usually the better instrument.

## Quality gates

- [ ] Step 3 metadata in the plugin on every page that carries the site, templates covering the rest.
- [ ] No unintended `noindex`; site-wide discouragement still on until step 15.
- [ ] Redirect map complete, tested, **not active**.
- [ ] Structured data validated.
- [ ] Search Console connected, verification and sitemap scheduled post-cutover.
- [ ] 404 logging on.

## Related docs

- [search-research.md](search-research.md) — step 2, where the intents were decided
- [copywriting.md](copywriting.md) — step 3, which owns the metadata text
- [deployment.md](deployment.md) — where the map is activated
- [html.md](html.md) — the markup this step verifies
