# Automatic.css (ACSS)

Apply these rules when the project uses Automatic.css. Min ACSS version: `4.0.0-rc-3`. Official docs: https://docs.automaticcss.com

Topic references live in [acss/](acss/). Read the matching file before styling that area.

## When to use

Load this doc **before** writing or reviewing any markup or CSS. Every styling decision starts with ACSS — tokens and BEM — before custom CSS.

## Is ACSS available?

- ACSS is available when the Etch plugin reports `integrations.acss.version`.
- If `integrations.acss.version` is missing, **do not assume ACSS is available** — fall back to plain CSS per [css.md](css.md).

## Before styling

1. Confirm ACSS is active (see above).
2. Open the matching topic file from the table below.
3. Express the design with tokens + BEM. Write custom CSS only when the topic file says to deviate, or when building a component that needs scoped rules per [css.md](css.md).

## Core rules

- **Trust the tokens.** Assume `--primary`, `--bg-dark`, `--text-light`, `--space-*`, `--h1`, etc. are configured correctly. Use them without verifying hex, px, or clamp values in the DOM.
- **Match intent with tokens, not comp literals.** Translate designs into semantic tokens (`--bg-dark`, `--text-light-muted`, `--space-l`) — never hardcode hex/px from a screenshot or export.
- **Semblance over pixel-perfection.** If the comp has `88px` padding, use the nearest `--space-*` or `--section-space-*`; do not write `to-rem(88px)`.
- **Variable-first, not utility-first.** Prefer `var(--space-m)`, `var(--primary)`, etc. over hard-coded values. BEM for components; utility classes mainly for buttons (see [acss/buttons.md](acss/buttons.md)).
- **Never invent token names.** Only use names documented in [acss/](acss/). For rare one-offs, use a locally-scoped custom property (e.g. `--_gap: to-rem(24px)`) — not a fake ACSS token.
- **Use logical properties** (`max-inline-size`, `padding-block`, `padding-inline`) over physical ones (`max-width`, `padding-top`).
- **Never suggest Tailwind** (classes or workflow).
- **Don't redeclare what's global.** Typography, links, buttons, blockquotes, borders, section spacing, and content width are handled globally — see topic files before overriding.
- **Gap-first, mobile-first.** Prefer `gap` over margin. Sizing tokens are clamp-based and responsive — breakpoints are rarely needed for spacing or type.
- **Reset already exists** (`@layer etch-reset`). Do not write reset CSS. Details: [etch-css-reset.md](etch-css-reset.md).

## Topic index

| Task | Read |
|------|------|
| Spacing, gaps, sections | [acss/spacing.md](acss/spacing.md) |
| Headings, body text | [acss/typography.md](acss/typography.md) |
| Backgrounds, text color, palette | [acss/colors.md](acss/colors.md) |
| Columns, grids, Variable Grid | [acss/grids.md](acss/grids.md) |
| Content width, element width | [acss/widths.md](acss/widths.md) |
| Borders, radius | [acss/borders.md](acss/borders.md) |
| Button markup and styles | [acss/buttons.md](acss/buttons.md) |
| Blockquotes | [acss/blockquotes.md](acss/blockquotes.md) |
| Links | [acss/links.md](acss/links.md) |
| Custom BEM component | Relevant topic(s) above + [css.md](css.md) |

## Quick do / don't

Do

- `gap: var(--content-gap)`, `padding: var(--space-l)`, `color: var(--text-light)`
- `grid-template-columns: var(--grid-3)`
- `max-inline-size: var(--width-60)`
- BEM class names; `btn--primary` for buttons

Don't

- Hardcode `padding: 40px`, `color: #1a1a1a`, or `repeat(3, 1fr)` when a token exists
- Invent token names or verify token values in the DOM before using them
- Manual `padding-block` on `<section>` elements or random container max-widths
- `font-size` on headings/text unless intentionally deviating from global styles

## Related docs

- [css.md](css.md) — custom BEM CSS when ACSS alone is insufficient
- [design.md](design.md) — visual design quality
- [etch.md](etch.md) — Etch workflow
