<!--
  Fill this from the stylesheet ACSS generated on the site — never from memory.
  A token name that sounds right and does not exist fails silently.

  Read it from the generated ACSS stylesheet, or inspect the computed custom
  properties on :root in devtools.

  Delete the rows that do not apply. An inventory listing things this project
  does not have is worse than a short one.
-->

# Design tokens

| | |
|---|---|
| Project | `[project name]` |
| ACSS version | `[e.g. 4.0.1]` |
| Inventory taken | `[YYYY-MM-DD]` |

Written from the generated stylesheet. If a token is needed that is not listed
here, it does not exist — see [design-system.md](../agent-docs/design-system.md)
before adding one.

## Colour scheme

**`[light only | dark only | light and dark]`**

<!--
  This goes first because it decides which colour utilities resolve at all.
  On a single-scheme project, the opposite scheme's utilities are dead weight
  and using them produces invisible text.
-->

## Palette

| Role | Variable | Value | Notes |
|---|---|---|---|
| Primary | `--primary` | `[#hex]` | |
| Secondary | `--secondary` | `[#hex]` | |
| Tertiary | `--tertiary` | `[#hex]` | |
| Accent | `--accent` | `[#hex]` | |
| Base | `--base` | `[#hex]` | |
| Neutral | `--neutral` | `[#hex]` | |

Each brand colour carries the shade suffixes `-hover`, `-light`, `-semi-light`,
`-ultra-light`, `-dark`, `-semi-dark`, `-ultra-dark`.

Semantic: `--danger`, `--info`, `--success`, `--warning` — same suffixes.

Fixed: `--white`, `--black`, `--text-dark`, `--text-light`, `--text-dark-muted`,
`--text-light-muted`.

**Unified brand lightness:** `[on at L 0.xx | off]`
<!--
  If off, say why — a registered mark, a brand manual. Someone will ask later.
  If on, the hex values above are what ACSS resolved to, not what the client
  supplied. Note the originals if they differ.
-->

## Typography

| | |
|---|---|
| Heading font | `[family]` |
| Body font | `[family]` |
| Text scale | `[e.g. 1.333]` |
| Heading scale | `[e.g. 1.333]` |
| Mobile text scale | `[e.g. 1.2]` |
| Base text size (desktop) | `[e.g. 18px]` |

Text: `--text-xs` `--text-s` `--text-m` `--text-l` `--text-xl` `--text-xxl`
Headings: `--h1` … `--h6`

## Spacing

| | |
|---|---|
| Space scale | `[e.g. 1.5]` |
| Base space | `[e.g. 30px]` |
| Gutter | `[e.g. 16 → 80]` |

Space: `--space-xs` … `--space-xl`
Sections: `--section-space-xs` … `--section-space-xxl`
Gaps: `--content-gap`, `--container-gap`, `--grid-gap`, `--paragraph-spacing`

## Fluid range

Everything clamp-based scales between `[e.g. 360px]` and `[e.g. 1366px]`.
Breakpoints are rarely needed for spacing or type.

## Other tokens

| Group | Variables |
|---|---|
| Radius | `--radius`, `--radius-s` |
| Borders | `--border-color-light`, `--border-color-dark`, `--border-style`, `--border-width` |
| Focus | `--focus-color` |
| Icons | `--icon-size-xs` … `--icon-size-2xl` |
| Motion | `--ease-smooth`, `--ease-snappy`, `--ease-gentle`, `--ease-bouncy`, `--ease-elastic`, `--transition-duration`, `--transition-timing` |

## Class families worth knowing

<!--
  These are the ones an agent does not guess. Confirm each exists in this build
  before listing it — availability depends on which options are enabled.
-->

- **Section spacing that shifts across the viewport** — `.section--xl-to-m`,
  `.section--xxl-to-xs`, `.section--l-to-s` and siblings. One class scales the
  section between two steps as the viewport changes. Reach for these before
  writing responsive spacing by hand.
- **Escaping the content column** — `.content--feature`,
  `.content--feature-max`, `.content--full`, `.content--full-safe`. Widen an
  element out of its column without a wrapper. The instinct to nest a div is
  the wrong one here.
- **Widths** — `.width--10` … `.width--90`.
- **Animation** — `on-enter--*`, `on-visible--*`, `on-exit--*`, `on-hover--*`,
  with `--stagger` for sequences. `prefers-reduced-motion` is already handled;
  do not add a fallback.
- **Utility** — `.is-bg`, `.smart-spacing`, `.unrelate`.

## Switched off

<!--
  The most useful section in this file. A disabled option means the matching
  utility classes were never generated. Using one produces no error, no warning,
  and no styling.
-->

| Option | Consequence |
|---|---|
| `[e.g. option-forms: off]` | `[form utility classes do not exist]` |
| `[e.g. option-gaps: off]` | `[gap utility classes do not exist]` |
| `[e.g. option-radius-sizes: off]` | `[only --radius and --radius-s exist]` |
| `[e.g. option-transition-classes: off]` | `[transition utilities do not exist]` |
| `[e.g. secondary-clr: off]` | `[.text--secondary and .bg--secondary do not exist]` |

## Project notes

<!--
  Anything specific to this build: a bespoke component that owns a token, a
  deliberate deviation and its reason, a colour the client vetoed.
-->

`[none yet]`
