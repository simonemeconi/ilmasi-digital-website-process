# Colors

Load when setting backgrounds, text color, borders, or accents. Default: contextual tokens first, palette second. Index: [acss.md](../acss.md).

All colors use `var(--token-name)` with no prefix or suffix.

Prefer **contextual colors** for backgrounds and foregrounds. Use **palette colors** when contextual tokens won't achieve the desired outcome.

## Palette colors

| Token family | Role |
|--------------|------|
| `var(--primary)` | Main action/brand color |
| `var(--secondary)` | Secondary brand color |
| `var(--tertiary)` | Third brand option |
| `var(--accent)` | Sparingly used accent |
| `var(--base)` | Widespread background/foreground |
| `var(--neutral)` | Blacks, whites, greys |

## Constant colors

- `var(--white)` — pure white
- `var(--black)` — pure black

For grey shades, use **neutral** palette tokens — not contextual colors.

## Palette shades

Every palette color supports shades via `var(--{color}-{shade})`:

- `ultra-dark`, `dark`, `semi-dark`, `semi-light`, `light`, `ultra-light`
- `hover` — reserved for hover effects

Example: `var(--primary-ultra-light)`, `var(--primary-dark)`.

## Semantic colors

`var(--success)`, `var(--danger)`, `var(--warning)`, `var(--info)` — each with generated shades like palette colors.

## Contextual colors

Use whenever possible. Site owner maps these to common UI scenarios:

| Token | Typical use |
|-------|-------------|
| `var(--body-bg-color)` | Website background (rarely needed directly) |
| `var(--bg-ultra-light)` | Light surfaces |
| `var(--bg-light)` | Light surfaces |
| `var(--bg-ultra-dark)` | Dark surfaces |
| `var(--bg-dark)` | Dark surfaces |
| `var(--text-light)` | Text on dark backgrounds |
| `var(--text-light-muted)` | Muted text on dark |
| `var(--text-dark)` | Text on light backgrounds |
| `var(--text-dark-muted)` | Muted text on light |

**Need white?** Use `var(--white)`, not a contextual token. **Need black?** Use `var(--black)`.
