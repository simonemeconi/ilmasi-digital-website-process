# Hardening

**Phase two — in-house.** Runs immediately after the site is deployed to the
real environment and before it is public. Read `build/environment.md` first.

Primary source: [Hardening WordPress](https://developer.wordpress.org/advanced-administration/security/hardening/),
WordPress Advanced Administration Handbook. Prefer it, and the sources it links
in its own *See Also*, over general security blogs — most of which are written
to sell a plugin.

## The frame

The official guidance is explicit about this and it is worth repeating before
any list of measures: security is **risk reduction, not risk elimination.** A
perfectly secure system is not a thing to reach. The goal is to apply the
controls that are reasonable for this site, reduce the entry points, and limit
what a successful attack can reach.

That frame matters practically. It licenses saying "not for this project"
without pretending the site is unprotected, and it rules out the checklist
mentality where every switch gets flipped because a switch exists.

Three ideas run through everything below:

- **Limit access** — fewer entry points.
- **Contain damage** — assume something gets through, and reduce what it
  reaches.
- **Be prepared** — backups, and knowing what the installation should look like.

## Why now

After deploy, before public. Both halves matter.

Before deploy there is no real environment to harden — file permissions, server
configuration and access controls are properties of the server, not of the
build. After the site is public, mistakes are expensive: several measures here
can break things, and the classic example is in the official guidance itself —
password-protecting `/wp-admin/` can break `admin-ajax.php`, which plenty of
plugins depend on. Finding that with no traffic and no client watching is the
whole point of the timing.

## Read the environment first

Open `build/environment.md`. One line decides the shape of everything else:
**who patches the server.**

| Recorded | What it means here |
|---|---|
| Provider patches | Server-level work is theirs. Ask what they cover, then focus on the application |
| We patch | Server hardening is ours as well as the application's |
| Shared hosting | Neighbours on the same server are part of your risk. Ask what isolation the host provides |

Ask only what the file does not already record, and write answers back into it.

| Unknown | Ask | What it decides |
|---|---|---|
| Web server | Which web server? | Whether rules go in `.htaccess` or the server block |
| SSH / WP-CLI | Do we have shell access? | Whether permissions and updates can be scripted |
| Static IP or VPN | Do we reach the site from a fixed address? | Whether the login surface can be closed by IP |
| Installed plugins | What is installed? | Unused plugins are removed, not deactivated |

## Where responsibility ends

The host is responsible for the infrastructure. It is not responsible for the
application installed on it. Most compromises trace back to the application,
not the server — outdated plugins and weak credentials, not exotic exploits.

So the ordering below is deliberate: the boring items come first because they
prevent most of what actually happens.

## Keep it current

The single most effective measure, and the least interesting.

- WordPress core, plugins and themes on current versions. When a vulnerability
  is fixed, the information needed to exploit it is public — old versions are
  more exposed for exactly that reason.
- Automatic updates are available and should be used unless something specific
  argues against them. If they are disabled, there must be a named person and a
  cadence, recorded in [backup-maintenance.md](backup-maintenance.md).
- **Delete unused plugins and themes. Deactivated is not removed** — the code
  is still on disk and still reachable.
- Install only from the WordPress.org repository or vendors with a real name
  behind them. Never core from anywhere but wordpress.org.

## Accounts and access

- No account named `admin`, `webmaster`, or the site name. These are tried
  first.
- Strong generated passwords. Not a dictionary word in any language, not a
  permutation of the site or company name.
- **Two-step authentication** on every account that can reach the dashboard.
- Least privilege by role: an editor does not need administrator. Review the
  user list at handover and remove anyone who no longer needs access.
- SFTP, never plain FTP. Plain FTP sends the password in the clear.
- Admin sessions over HTTPS, without exception.

## Login surface

Two attack shapes dominate: crafted requests aimed at known vulnerabilities in
outdated code, and brute-force password guessing. The second is what this
section addresses.

Options, strongest first:

1. **Restrict by IP** where a static address or a VPN makes it possible. The
   login page simply is not reachable from anywhere else. This is the strongest
   option and the one that depends most on the environment.
2. **Server-side password protection** on `/wp-admin/` — a second layer that
   bots hit before they reach WordPress at all. Configure it properly:
   protecting the directory naively breaks `admin-ajax.php`.
3. **Rate limiting** at the application level, when neither of the above fits.

Whichever is used, test the admin area properly afterwards — logging in is not
enough. Exercise the block editor, media uploads and any form that posts back.

## Configuration

- **Disable file editing from the dashboard.** `define( 'DISALLOW_FILE_EDIT',
  true );` in `wp-config.php`. Dashboard file editing is the first tool an
  attacker reaches for once inside, because it is direct code execution.
- Restrict `wp-config.php` so only the owner and the web server can read it,
  and deny direct web access to it at the server level.
- Prefer plugins that do not execute arbitrary code stored in the database. A
  custom page template that calls a function is the safer shape.

## File permissions

Directories `755`, files `644` is the ordinary baseline. The rule underneath:
files should be writable by the account that owns them, and only writable by
the web server where WordPress genuinely needs to write — which is
`wp-content/`, not `wp-admin/` or `wp-includes/`.

With shell access this is two commands; the official guidance gives them. Note
that WordPress's own automatic updates run as the file owner and normalise
permissions to those values, so fighting them is pointless.

## Firewall

Three places a firewall can sit, and they are not equivalent:

- **Before the server** — a reverse proxy that filters traffic before it
  reaches the host, and usually acts as a CDN too. Strongest position; costs a
  DNS change and a dependency.
- **At the server** — a WAF such as ModSecurity, filtering before PHP runs.
  Requires the server to be ours.
- **In WordPress** — a plugin filtering as WordPress loads. Weakest position,
  since the request has already arrived, but the easiest to add.

Choose one. Two firewalls at different layers are defensible; two plugin
firewalls are not — see the one-job-one-owner rule in
[performance.md](performance.md), which applies here as well.

## Logging and monitoring

Prevention is not sufficient, so the question becomes how quickly a problem is
noticed.

- Server logs answer what happened and when. They are what makes an incident
  reconstructable rather than a guess.
- File integrity monitoring catches the traces an attack leaves on disk. If the
  server is ours, a host-based monitor is the fuller answer; otherwise a plugin
  that watches for changed files is a reasonable floor.
- Monitor executable file types first — `.php` above all. Watching everything
  produces noise, and noise gets ignored.

## Obscurity

Renaming the administrative account, changing the table prefix, hiding the
WordPress version. The official guidance is direct about the status of these:
obscurity is **an unsound primary strategy**, though it may help at the margin.

Treat them as they are. They are cheap and can be done, but doing them instead
of the sections above is the mistake. A site with a renamed admin account and
an outdated plugin is not hardened.

## Backups are part of this

A hardening pass that does not end in a tested restore is incomplete. Backups
are what turn a compromise from a catastrophe into a bad afternoon, and dated
snapshots are what make it possible to go back to a pre-compromise state when
the compromise is found weeks later.

Covered in [backup-maintenance.md](backup-maintenance.md), and the restore has
to be tested, not merely configured.

## Before moving on

- Admin area fully exercised after the login restrictions, not just logged into.
- Forms submit and transactional mail arrives.
- Unused plugins and themes deleted, not deactivated.
- User list reviewed, two-step authentication on every dashboard account.
- The measures applied are recorded in `build/environment.md`, so the next
  person is not reverse-engineering them.

## Quick do / don't

Do

- Read `build/environment.md` first, and write back what you had to ask
- Update, then delete what is unused, before anything more interesting
- Close the login surface by IP where the environment allows it
- Test the admin area properly after restricting it
- Record what was applied

Don't

- Treat this as a checklist to run to the end
- Reach for obscurity measures in place of updates and access control
- Run two firewall plugins
- Password-protect `/wp-admin/` without handling `admin-ajax.php`
- Call it done without a tested restore

## Related docs

- [deployment.md](deployment.md) — the step before, where the environment is recorded
- [backup-maintenance.md](backup-maintenance.md) — backups, updates, the restore test
- [performance.md](performance.md) — same environment file, one-job-one-owner
- [privacy-compliance.md](privacy-compliance.md) — data handling, a different concern
