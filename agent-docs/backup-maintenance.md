# Backup and maintenance

Backup and maintenance conventions for ILMASI Digital web projects. Apply during workflow step 14 (Backup & maintenance), the last step before go-live.

## When to use

Load this doc before the cutover, and whenever the maintenance routine is reviewed. Read `build/environment.md` first.

## The requirement

Not "backups are configured". **A restore has been performed and verified.**

## Verify by restoring

- **Restore to a scratch destination and open the result.** Not the file listing — the site.
- Check the front page, an inner page, an image from the media library, and one database-backed item such as a form entry or a menu.
- **Record the date of the test.** Repeat after any significant change to hosting or plugins.

## Coverage

Both halves, or it is not a backup.

- **Database** — content, settings, users, and the ACSS configuration.
- **Files** — uploads above all, plus themes and custom code. Core and plugins are re-downloadable; uploads are not.

WPVivid handles this. Docs: [docs.wpvivid.com](https://docs.wpvivid.com/).

- **Destination off the server**, recorded in `build/environment.md`.
- **Dated snapshots, not a single rolling copy.**

## Frequency

| Site | Schedule |
|---|---|
| Brochure site, edited rarely | Weekly, plus a manual backup before any change |
| Regular publishing | Daily |
| Forms or bookings held in WordPress | Daily minimum |

Record the choice and the reason.

## Before any change

**Take a manual backup before every core update, plugin update or structural edit.**

## Maintenance routine

The site stays under agency management. Write down what the routine is.

- **Updates** — automatic where safe and enabled, per [hardening.md](hardening.md). Where off, a named cadence and a backup before each pass.
- **After every update pass, check the site**: front page, a form, one page using a plugin that changed.
- **Uptime monitoring** at minimum.
- **Track expiries** — certificate, domain, plugin licences.
- **Test forms and transactional mail periodically.** Send a real submission and read it in an inbox.
- **Restore test on a schedule.**

## Data outside WordPress

Form submissions held only in the WordPress database are as fragile as the database. Where enquiries matter, route them to an inbox or CRM as well.

Anywhere data goes is a recipient — see [privacy-compliance.md](privacy-compliance.md).

## Quality gates

- [ ] Backup running on a schedule chosen for this site.
- [ ] Destination off the server, recorded.
- [ ] Dated snapshots retained.
- [ ] **A restore performed, the restored site opened and checked, date recorded.**
- [ ] Update cadence decided and written down.
- [ ] Uptime monitoring active.
- [ ] Expiry dates noted for certificate, domain and licences.

## Related docs

- [deployment.md](deployment.md) — step 15, which depends on the restore test
- [hardening.md](hardening.md) — step 10, where updates are a security measure
- [privacy-compliance.md](privacy-compliance.md) — step 11, where data destinations are disclosed
- [form.md](form.md) — submission routing
