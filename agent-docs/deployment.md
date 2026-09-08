# Deployment

**Phase two — in-house.** Two separate moments, and the distance between them
is the point: step 8 puts the site into production, step 14 makes it public.
Everything from step 9 to 13 happens in between, on the real environment.

The client returns at step 14 for handover. Until then this is internal work.

## Two moments, not one

Treating "deploy" as a single event is the most common way a launch goes badly.
Production and public are different states, and separating them buys the thing
that makes the rest of phase two possible: a site running on the real server,
with the real PHP version, the real cache and the real mail path, that nobody
can find yet.

Compliance, performance, hardening, SEO and backups all need the real
environment to be configured against. None of them need an audience.

| | Step 8 — production | Step 14 — public |
|---|---|---|
| Runs on the real server | Yes | Yes |
| Reachable by the world | No | Yes |
| Search engines | Discouraged | Allowed |
| DNS | Unchanged, still points at the old site | Cut over |
| Old site | Still live | Redirected |

## Step 8 — into production

### Record the environment

This is where `build/environment.md` gets filled in, and it is the first task,
not the last. Every document from here on reads it: hardening asks who patches
the server, performance asks which web server is running, backups ask where
snapshots go.

Fill it from what is actually true on the server, not from the hosting plan's
marketing page. Where something is genuinely unknown, write `unknown` — a guess
here quietly drives a wrong decision three steps later, and nobody traces it
back.

### Keep it out of the index

The site is on a real domain or subdomain now, which means it can be found.
Discourage search engines, and confirm it is actually in effect rather than
just ticked.

**Write down that it is on.** Forgetting to reverse this at go-live is the
single most common launch defect, and it is invisible: the site works
perfectly, and simply never appears in search. It belongs on the go-live
checklist as its own line, not as part of a general "check the settings" step.

### Propagating the design system

The ACSS configuration and the Etch components have to travel from wherever the
build happened to production. Two rules:

- The ACSS settings arrive by importing `design-system/acss-settings.json`,
  then **saving in ACSS** — see [design-system.md](design-system.md). Importing
  alone leaves derived values unresolved.
- After propagating, verify against `design-system/tokens.md` rather than by
  looking at the site. A site that looks right can still be missing a shade
  that only appears on a hover state nobody clicked.

If the configuration was changed during the build and the export was not
refreshed, fix that now. The versioned file is the one that will be restored
one day.

### What must be true before step 9

- The site renders correctly on the production server, on the production PHP
  version.
- Forms submit, and transactional mail actually arrives — not "the plugin
  reports success". Send one and read it in an inbox.
- Permalinks are set and inner pages resolve.
- HTTPS is in force, without mixed-content warnings.
- Search engines are discouraged, and this is written down.

## The redirect map

Prepared at step 11 with SEO, activated at step 14. It gets its own section
here because it is **the thing most often forgotten in a rebuild**, and the
cost is asymmetric: every old URL that dies without a destination is a page of
accumulated search equity thrown away, and the loss shows up weeks later when
nobody is still thinking about the launch.

Where a site is replacing an existing one:

- Take an inventory of the old URLs before the old site goes away. Once DNS has
  moved, crawling it is no longer possible.
- Map each one to its closest equivalent. Not the homepage — a redirect to the
  homepage is a 404 with extra steps.
- Old URLs with no equivalent are a content decision, not a technical one.
  Raise them.

## Step 14 — go-live

### Before the cutover

- **Lower the DNS TTL in advance.** Hours or a day ahead, not at the moment of
  the change. A TTL still set to 24 hours means a bad cutover cannot be
  reversed quickly, and that is precisely when reversing quickly matters.
- Confirm a restore has been tested — see
  [backup-maintenance.md](backup-maintenance.md). A backup that exists and has
  never been restored is a belief, not a safeguard.
- Agree a window. Not Friday afternoon.

### The cutover

1. Cut DNS over.
2. **Remove the search engine discouragement.** Its own step, deliberately.
3. Activate the redirect map.
4. Verify HTTPS resolves on the live domain, including the certificate for the
   final hostname — a certificate issued for the staging host will fail here.
5. Check propagation from more than one network before declaring it done.

### After

- **Run the consent scan again.** The one from step 9 was taken against a
  staging site with different scripts and different hostnames; it does not
  transfer. See [privacy-compliance.md](privacy-compliance.md).
- Submit the sitemap to Search Console and confirm the property is verified on
  the live domain.
- Take a performance baseline on the public site. Staging numbers were for
  diagnosis; these are the real ones — see [performance.md](performance.md).
- Walk the site as a first-time visitor in a clean browser profile: consent
  banner, one form, one internal link, one old URL that should redirect.

## Handover

The client's second appearance, and the part most likely to be rushed because
the technical work is finished.

- Credentials, delivered through something other than email.
- What they can safely change, and what they should not touch. Be specific:
  "edit page text yes, install plugins no" is useful; "be careful" is not.
- A short walkthrough of the tasks they will actually perform, done live rather
  than written.
- The maintenance arrangement in writing — who updates, how often, who to
  contact when something breaks. If there is no arrangement, say so explicitly,
  because "nobody is watching this" is information the client needs.

## Quick do / don't

Do

- Fill `build/environment.md` first, from the server as it actually is
- Keep production and public as separate states
- Inventory the old URLs while the old site is still reachable
- Lower the DNS TTL before the cutover, not during
- Re-run the consent scan and the performance baseline once public

Don't

- Treat deploy and launch as one event
- Leave search engine discouragement off the go-live checklist
- Redirect orphaned URLs to the homepage
- Cut over without a tested restore
- Trust a staging consent scan or a staging performance number

## Related docs

- [design-system.md](design-system.md) — what travels to production, and how
- [hardening.md](hardening.md) — step 9, the next thing that reads the environment
- [privacy-compliance.md](privacy-compliance.md) — the scan that must be repeated
- [seo.md](seo.md) — where the redirect map is built
- [backup-maintenance.md](backup-maintenance.md) — the restore test the cutover depends on
