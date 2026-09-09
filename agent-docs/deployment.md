# Deployment

Deployment conventions for ILMASI Digital web projects. Apply during workflow step 9 (Deploy to production) and step 15 (Go-live).

## When to use

Load this doc when moving the build to the real server, and again at the DNS cutover.

## Two states

**Production and public are separate.** Step 9 puts the site on the real server; step 15 makes it findable. Steps 10 to 14 run in between.

| | Step 9 — production | Step 15 — public |
|---|---|---|
| Real server | Yes | Yes |
| Reachable by the world | No | Yes |
| Search engines | Discouraged | Allowed |
| DNS | Unchanged | Cut over |
| Old site | Still live | Redirected |

The site is never handed over. It stays under agency management.

## Step 9 — into production

### Record the environment

**First task, not last.** Fill `build/environment.md` from the server as it actually is, not from the hosting plan.

- Write `unknown` where something is genuinely unknown. Never guess.
- Steps 10, 12 and 14 all read this file.

### Discourage search engines

- Turn it on, and confirm it is in effect rather than ticked.
- **Write down that it is on.** It gets its own line on the go-live checklist.

### Propagate the design system

- Import `design-system/acss-settings.json`, then **save in ACSS** — see [design-system.md](design-system.md).
- Verify against `design-system/tokens.md`, not by looking at the site.
- If settings changed during the build and the export was not refreshed, fix it now.

### Gates before step 10

- [ ] Renders correctly on the production PHP version.
- [ ] Forms submit and transactional mail arrives in an inbox.
- [ ] Permalinks set, inner pages resolve.
- [ ] HTTPS in force, no mixed content.
- [ ] Search engines discouraged, and recorded.

## The redirect map

Built at step 13, activated at step 15.

- **Inventory the old URLs while the old site is reachable.** After the cutover it cannot be crawled.
- Map one to one, to the closest equivalent. **Never to the homepage.**
- Old URLs with no equivalent are a content question. Raise them.
- Check for chains and loops.

## Step 15 — go-live

### Before the cutover

- **Lower the DNS TTL hours or a day ahead**, not at the moment of the change.
- Confirm a restore has been tested — see [backup-maintenance.md](backup-maintenance.md).
- Agree a window. Not Friday afternoon.

### The cutover

1. Cut DNS over.
2. **Remove the search engine discouragement.**
3. Activate the redirect map.
4. Verify HTTPS on the live domain, with a certificate for the final hostname.
5. Check propagation from more than one network.

### After

- **Re-run the consent scan.** The step 11 scan does not carry over — see [privacy-compliance.md](privacy-compliance.md).
- Submit the sitemap to Search Console, property verified on the live domain.
- Take a performance baseline on the public site — see [performance.md](performance.md).
- Walk the site in a clean profile: consent banner, one form, one internal link, one redirected URL.
- Tell the client it is live.

## Related docs

- [design-system.md](design-system.md) — what travels to production, and how
- [hardening.md](hardening.md) — step 10, next to read the environment
- [privacy-compliance.md](privacy-compliance.md) — the scan to repeat
- [seo.md](seo.md) — where the redirect map is built
- [backup-maintenance.md](backup-maintenance.md) — the restore test the cutover depends on
