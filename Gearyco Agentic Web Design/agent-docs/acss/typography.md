# Typography

Load when styling headings, body text, or custom typographic elements. Default: no custom CSS — global styles handle it. Index: [acss.md](../acss.md).

## Global styles (do not redeclare)

Headings and text are styled globally. Do not write custom CSS unless the element looks fundamentally different from defaults.

Handled globally — no manual CSS needed:

- Size (automatically responsive)
- Line height, font family, color, weight
- Letter spacing, font style, text transform, text wrap

**Do not set `font-size` on headings or paragraphs** unless intentionally deviating.

**Do not adjust type at breakpoints** — tokens are already responsive.

## Heading sizes

| Token | Use |
|-------|-----|
| `var(--h1)` … `var(--h6)` | Heading scale |

Jump sizing: `var(--h{large}-to-h{small})` (e.g. `var(--h1-to-h4)`). Use sparingly — only when necessary.

## Text sizes

| Token | Use |
|-------|-----|
| `var(--text-xxl)` | Largest body scale |
| `var(--text-xl)` | |
| `var(--text-l)` | |
| `var(--text-m)` | Default body |
| `var(--text-s)` | |
| `var(--text-xs)` | Smallest |

Jump sizing: `var(--text-{large}-to-text-{small})` (e.g. `var(--text-xxl-to-text-m)`). Use sparingly.

## Custom typography overrides

When custom typography must connect to global styles, use style tokens:

- Headings: `var(--heading-font-weight)`, `var(--heading-font-family)`, etc.
- Text: `var(--text-line-height)`, `var(--text-font-family)`, etc.

Pattern: `--heading-{property}` and `--text-{property}`. Only for limited, intentional deviations.
