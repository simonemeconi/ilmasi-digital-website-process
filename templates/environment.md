<!--
  Phase two, in-house. Lives in build/, not in discovery/ — nothing here
  involves the client.

  Fill this once, at deploy, when the environment is actually known.
  performance.md, hardening.md and backup-maintenance.md all read it, so
  nothing here should have to be asked twice.

  Unknown is a valid answer. Write "unknown" rather than guessing — a guess
  here silently drives the wrong plugin choice three steps later.
-->

# Environment

| | |
|---|---|
| Project | `[project name]` |
| Recorded | `[YYYY-MM-DD]` |
| Site URL | `[https://…]` |

## Hosting

| | |
|---|---|
| Provider | `[name]` |
| Type | `[shared | managed WordPress | managed VPS | self-managed VPS]` |
| Data location | `[country — relevant to privacy-compliance.md]` |
| Who patches the server | `[provider | us]` |

## Server

| | |
|---|---|
| Web server | `[LiteSpeed | OpenLiteSpeed | Apache | Nginx | unknown]` |
| PHP version | `[e.g. 8.3]` |
| Server-side page cache | `[yes — name | no]` |
| Object cache available | `[Redis | Memcached | none]` |
| CDN | `[name | none]` |

<!--
  Web server is the single most consequential line in this file: it decides the
  cache layer in performance.md. "unknown" is honest; a wrong answer here
  produces double caching and purge failures that are hard to trace back.
-->

## Access

| | |
|---|---|
| SSH | `[yes | no]` |
| WP-CLI | `[yes | no]` |
| SFTP | `[yes | no]` |
| Staging environment | `[yes — how it syncs | no]` |
| DNS managed at | `[registrar / provider]` |

## Mail

| | |
|---|---|
| Transactional mail | `[SMTP provider | server mail | unknown]` |
| Sending domain authenticated | `[SPF/DKIM/DMARC status]` |

## Plugins

<!--
  What is actually installed, not what was planned. Note anything that overlaps
  with another plugin's job — that overlap is a defect to resolve, not a
  redundancy to keep.
-->

| Plugin | Job it owns | Notes |
|---|---|---|
| `[name]` | `[e.g. asset optimisation]` | |

## Constraints

<!--
  Anything that rules an option out: a client who will not accept a CDN, a
  provider that blocks object cache, a legacy integration that pins PHP.
-->

`[none recorded]`
