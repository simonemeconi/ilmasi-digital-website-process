# Performance

Performance conventions for ILMASI Digital web projects. Apply during workflow step 12 (Performance), after compliance and before SEO.

## When to use

Load this doc once the consent banner is installed. Read `build/environment.md` first.

## Read the environment first

The web server line decides the cache layer. Ask only what the file does not record, and **write answers back into it.**

| Unknown | Ask | Decides |
|---|---|---|
| Web server | Which web server? | The cache layer |
| Server-side cache | Does the host cache pages? | Whether a page cache plugin is used at all |
| Object cache | Redis or Memcached available? | Whether to add a persistent object cache |
| Installed plugins | What is installed? | Which jobs already have an owner |

## Baseline — always

Perfmatters on every project. Docs: [perfmatters.io/docs/](https://perfmatters.io/docs/). Every toggle links its own page.

- **Which scripts to disable comes from `discovery/brief.md`.** A site with comments closed needs no comment scripts; a brochure site has no cart fragments.
- **Go one group at a time, waiting for confirmation.** A list of forty toggles gets half-applied.
- Produce the decisions and the settings. Where the environment records WP-CLI, give commands instead of clicks.

## Cache layer — by server

| Environment | Page cache | Note |
|---|---|---|
| LiteSpeed / OpenLiteSpeed | LiteSpeed Cache | Server-level cache |
| Apache / Nginx | FlyingPress | WP Rocket is the simpler alternative |
| Host caches server-side | **None in a plugin** | Frontend optimisation only |

**LiteSpeed Cache page caching requires a LiteSpeed server.** On Apache or Nginx only the optimisation functions remain, and those overlap almost entirely with Perfmatters.

## One job, one owner

**Every optimisation job belongs to exactly one plugin.** Asset optimisation, lazy loading, font handling, database cleanup, image conversion — pick the owner and switch the job off everywhere else.

Record the owner of each job in `build/environment.md`.

## Object cache

- Add it only when the environment records Redis or Memcached as available.
- Use the host's recommended client. **Never a second object cache plugin alongside one the host manages.**

## Consent banner conflicts

Set these when the cache layer is configured, not later.

- Exclude consent scripts from delay and defer.
- Check unused-CSS removal is not stripping the banner's styles.
- Account for cache crawlers warming pages in a consent state no visitor has.

Verify with a real first visit in a clean profile. See [privacy-compliance.md](privacy-compliance.md).

## Images

**Not settled.** Format, sizing and conversion ownership is an open decision. Do not assign image optimisation to whichever plugin offers it — note it in the plugin table and raise it.

## Measuring

- Baseline before and after, and again once public at step 15. **Staging numbers do not transfer.**
- Keep lab data and field data apart. Field data is the one that matters.
- **Do not tune for the score.**

## Quality gates

- [ ] Cache layer chosen from the web server.
- [ ] No page cache plugin on a host that already caches server-side.
- [ ] One owner per optimisation job, recorded.
- [ ] Consent exclusions set and verified in a clean profile.
- [ ] Baseline taken, and scheduled again for step 15.

## Related docs

- [privacy-compliance.md](privacy-compliance.md) — step 11, and the exclusions
- [deployment.md](deployment.md) — step 9, where the environment is recorded
- [hardening.md](hardening.md) — same environment file, different decisions
