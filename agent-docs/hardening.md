# Hardening

Security conventions for ILMASI Digital web projects. Apply during workflow step 10 (Hardening), after deploy and before the site is public.

## When to use

Load this doc once the site runs on the real server. Read `build/environment.md` first.

## Sources

Use [Hardening WordPress](https://developer.wordpress.org/advanced-administration/security/hardening/) and the sources in its own *See Also*. Do not configure from general security blogs.

## Read the environment first

**Who patches the server** decides the shape of this step.

| Recorded | Scope here |
|---|---|
| Provider patches | Ask what they cover, then focus on the application |
| We patch | Server and application both |
| Shared hosting | Ask what isolation the host provides |

Ask only what the file does not record, and write answers back into it.

| Unknown | Ask | Decides |
|---|---|---|
| Web server | Which web server? | `.htaccess` or server block |
| SSH / WP-CLI | Shell access? | Whether permissions and updates can be scripted |
| Static IP or VPN | Fixed address to reach the site? | Whether the login surface can be closed by IP |
| Installed plugins | What is installed? | What gets removed |

## Keep it current

- Core, plugins and themes on current versions.
- Use automatic updates unless something specific argues against them. If disabled, record a named cadence in [backup-maintenance.md](backup-maintenance.md).
- **Delete unused plugins and themes. Deactivated is not removed.**
- Install only from wordpress.org or vendors with a name behind them. Core from wordpress.org only.

## Accounts and access

- No account named `admin`, `webmaster`, or the site name.
- Strong generated passwords.
- **Two-step authentication on every account that can reach the dashboard.**
- Least privilege by role. Review the user list and remove anyone who no longer needs access.
- SFTP, never plain FTP.
- Admin over HTTPS, without exception.

## Login surface

Strongest first:

1. **Restrict by IP** where a static address or VPN allows it.
2. **Server-side password protection** on `/wp-admin/`. Configure it so `admin-ajax.php` still works.
3. **Rate limiting** at the application level.

After restricting, **exercise the admin area**: block editor, media uploads, any form that posts back. Logging in is not a test.

## Configuration

- `define( 'DISALLOW_FILE_EDIT', true );` in `wp-config.php`.
- Restrict `wp-config.php` to owner and web server, and deny direct web access at server level.
- Prefer plugins that do not execute arbitrary code stored in the database.

## File permissions

- Directories `755`, files `644`.
- Writable by the web server only where WordPress needs to write — `wp-content/`, not `wp-admin/` or `wp-includes/`.
- Automatic updates run as the file owner and normalise to those values.

## Firewall

Choose **one** position:

- **Before the server** — reverse proxy, filters before the host. Strongest.
- **At the server** — WAF such as ModSecurity. Requires the server to be ours.
- **In WordPress** — plugin, filters as WordPress loads. Weakest.

Two firewalls at different layers is defensible. **Two plugin firewalls is not.**

## Logging and monitoring

- Keep server logs. They are what makes an incident reconstructable.
- File integrity monitoring: host-based where the server is ours, otherwise a plugin watching for changed files.
- **Monitor executable file types first — `.php` above all.**

## Obscurity

Renaming the admin account, changing the table prefix, hiding the version: **secondary measures only.** Never in place of updates and access control.

## Quality gates

- [ ] Admin area exercised after the login restrictions.
- [ ] Forms submit and transactional mail arrives.
- [ ] Unused plugins and themes deleted, not deactivated.
- [ ] User list reviewed, two-step authentication on every dashboard account.
- [ ] Measures applied recorded in `build/environment.md`.
- [ ] A restore has been tested — see [backup-maintenance.md](backup-maintenance.md).

## Related docs

- [deployment.md](deployment.md) — step 9, where the environment is recorded
- [backup-maintenance.md](backup-maintenance.md) — backups, updates, the restore test
- [performance.md](performance.md) — same environment file, one job one owner
- [privacy-compliance.md](privacy-compliance.md) — step 11, data handling rather than security
