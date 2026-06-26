# Spacing

Load when setting padding, gaps, section rhythm, or vertical/horizontal space between elements. Default: no custom CSS — use tokens. Index: [acss.md](../acss.md).

## Spacing tokens

Use `var(--space-{size})` where `{size}` is `xs`, `s`, `m`, `l`, `xl`, or `xxl`.

Spacing tokens are automatically responsive (clamp-based). **Do not change spacing at breakpoints** — use responsive tokens instead.

For aggressive or specific scaling, use bridge tokens: `var(--space-{large}-to-{small})` (e.g. `var(--space-xxl-to-m)` scales from the max of the first size to the min of the second).

## Section spacing tokens

Use `var(--section-space-{size})` and `var(--section-space-{size}-to-{size})` for block-level section padding.

**Never apply manual `padding-block` or `padding-inline` on `<section>` elements.** ACSS handles section spacing automatically.

## Gutter

Use `var(--gutter)` for inline section padding when you truly need it. This is rare — top-level sections receive gutter automatically.

## Gap-first workflow

Default to flex or grid with `gap`, not margin, for spacing between siblings.

Contextual gap tokens — use these whenever possible:

| Token | Use for |
|-------|---------|
| `var(--content-gap)` | Space between standard content (headings, paragraphs, buttons) |
| `var(--container-gap)` | Space between containers (direct inner child of a section) |
| `var(--grid-gap)` | Space between grid items |

Use margin only when gap cannot work, or as a one-off addition on top of existing gap. Gap tokens may be used with `margin` when that fits the layout.

## Padding

Padding uses spacing tokens (`var(--space-*)`), **never** contextual gap tokens.
