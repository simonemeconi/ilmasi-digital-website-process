# Performance

**Phase two — in-house.** Workflow step 10, after the site is live in the real
environment and after privacy and compliance are in place. There is no client
in the room for this: write and reason as you would to another developer. Read
`build/environment.md` before anything else here.

## Why this comes after compliance

Consent management changes which scripts load and when. Tuning delay, defer and
unused-CSS rules against a page that has no consent banner yet means tuning
them twice — and the second pass happens under pressure, close to launch.

## Read the environment first

Open `build/environment.md`. The web server line decides most of this
document.

If a needed line is missing or reads `unknown`, ask — one question, not a
questionnaire — and **write the answer back into the file**. The next document
that needs it should not have to ask again.

What to ask, and only when it is not already recorded:

| Unknown | Ask | What it decides |
|---|---|---|
| Web server | Which web server is running? | The cache layer, entirely |
| Server-side cache | Does the host cache pages already? | Whether a page cache plugin is used at all |
| Object cache | Is Redis or Memcached available? | Whether a persistent object cache is worth adding |
| Installed plugins | What is already installed? | Which jobs already have an owner |

## Two layers

Performance work splits into a baseline that is always the same and a cache
layer that depends on the server.

### Baseline — always

Perfmatters, on every project. It removes what WordPress loads and does not
need, and it does it the same way regardless of host: emoji and embed scripts,
the heartbeat, per-page script control, local font hosting, lazy loading,
preloading.

None of this is a checklist to apply blind. **Which scripts to disable comes
from `discovery/brief.md`.** A site with comments disabled does not need
comment scripts; a brochure site has no cart to keep in fragments; a site with
no video embeds does not need embed handling. The brief is phase one's output
and it is the input here: read it, then go through the settings group by group
and say what each one does for *this* site.

Go at the pace of someone applying the settings as you go — one group at a
time, waiting for confirmation before the next. A single list of forty toggles
gets skimmed and half-applied.

The agent produces the decisions and the settings to apply. It cannot click in
wp-admin. Where a plugin exposes WP-CLI and the environment records CLI access,
give the commands instead of the clicks.

### Cache layer — depends on the server

| Environment | Page cache | Notes |
|---|---|---|
| LiteSpeed / OpenLiteSpeed | LiteSpeed Cache | Server-level cache, the reason to choose it |
| Apache / Nginx | FlyingPress | WP Rocket is the simpler alternative |
| Host caches server-side | None in a plugin | Frontend optimisation only |

On a host that already caches server-side, enabling a plugin page cache gives
two caches that do not know about each other. Purges stop working
predictably, and the symptom — stale content that clears eventually, sometimes
— is one of the hardest things to diagnose after the fact.

## LiteSpeed Cache needs a LiteSpeed server

This one is worth stating plainly because the plugin is popular and the
constraint is not obvious from its name.

The page caching in LiteSpeed Cache requires a LiteSpeed or OpenLiteSpeed
server. On Apache or Nginx the plugin still installs and still offers a long
list of switches — database cleanup, minification, CDN, browser cache, object
cache, lazy load, image optimisation — but the part that makes it worth having
is inert. What remains overlaps almost entirely with Perfmatters.

That is overlap, not complementarity.

## One job, one owner

The general rule the above is an instance of: **every optimisation job belongs
to exactly one plugin.** Asset optimisation, lazy loading, font handling,
database cleanup, image conversion — pick the owner, and switch the job off
everywhere else.

Two plugins doing the same job rarely fail loudly. They produce a site that
works in most browsers most of the time, and an intermittent fault nobody can
reproduce. Record the owner of each job in the environment file's plugin table.

## Object cache

Worth adding when the environment records Redis or Memcached as available, and
not otherwise. It helps most on sites with real query load; on a small brochure
site the gain is modest and the added moving part is not free.

If the host provides it, use the host's recommended client. Do not install a
second object cache plugin alongside one the host already manages.

## The consent banner will fight the cache

Complianz and cache plugins interfere with each other, and the failure mode is
consent that appears to work and does not.

- Consent scripts must be excluded from delay and defer.
- Unused-CSS removal can strip the banner's own styles.
- Cache crawlers warm pages in a state that does not match a real visitor's
  consent.

Set the exclusions when the cache layer is configured, not later, and verify
with a real first visit in a clean browser profile. See
[privacy-compliance.md](privacy-compliance.md).

## Images

**Not settled.** Format, sizing and conversion responsibility — plugin, host,
or build step — is an open decision. Until it is made, do not silently assign
image optimisation to whichever plugin happens to offer it; note it in the
environment file's plugin table and raise it.

## Measuring

Take a baseline before changing anything and after, and again once the site is
public at step 13. Staging numbers do not transfer: different caching,
different DNS, often different hardware.

Keep lab data and field data apart. Lab data is reproducible and diagnostic;
field data is what visitors actually experienced, and it is the one that
matters. A score that improves while field data does not has improved nothing.

Do not tune for the score. The metrics are a proxy for how the site feels, and
proxies can be gamed in ways that make the real experience worse.

## Quick do / don't

Do

- Read `environment.md` first, and write back anything you had to ask
- Choose the cache layer from the web server, not from habit
- Decide which scripts to disable from the brief, one group at a time
- Set consent exclusions while configuring the cache, not after
- Measure again once the site is public

Don't

- Run a page cache plugin on top of a host that already caches
- Leave two plugins owning the same optimisation job
- Copy a settings profile from another project
- Add an object cache the environment does not offer
- Optimise before the consent banner exists

## Related docs

- [privacy-compliance.md](privacy-compliance.md) — step 9, and the exclusions
- [deployment.md](deployment.md) — step 8, where the environment is recorded
- [hardening.md](hardening.md) — same environment file, different decisions
