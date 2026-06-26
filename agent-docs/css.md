# CSS

Stylesheet conventions for Gearyco Agentic Web Design web projects. Apply during workflow step 5 (Development) and any CSS review.

## When to use

Load this doc when writing or reviewing CSS for pages, sections, components, and overrides.

## ACSS first

**Always use [acss.md](acss.md).** Load the index first, then the relevant topic file in [acss/](acss/) before styling that area. ACSS tokens and BEM come before custom CSS.

## Vanilla CSS

- Write **vanilla CSS** only. No preprocessors, CSS-in-JS, or utility-class frameworks beyond ACSS.
- Prefer ACSS custom properties and variables. Do not duplicate token values ACSS already defines.
- Keep specificity flat. Avoid `!important` unless overriding third-party styles with no alternative.

## BEM naming

- Use **BEM**: `block`, `block__element`, `block--modifier`.
- **Minimize modifier classes.** Prefer a data attribute on the block or element when the variation is structural or contextual (see below).
- One block per component. Element names describe role, not appearance (`card__title`, not `card__bold-text`).

## Data attributes for variations

- Default to **custom data attributes** for style modifications when they make sense (e.g. `[data-size="small"]`, `[data-variant="featured"]`).
- Scope selectors to the block: `.card[data-size="small"]`, not global `[data-size="small"]` unless the pattern is truly global.
- Match attribute values to what is set in HTML. Do not invent values the markup does not use.

## Nesting

- Use **native CSS nesting** to keep related rules together under their block selector.
- Nest elements and state under the block; do not nest blocks inside blocks.
- Limit nesting depth to what aids readability — if selectors exceed three levels, flatten.

```css
.card {
  /* block styles */

  &__title { /* element */ }

  &[data-size="small"] { /* variation via data attribute */ }

  &:hover { /* pseudo */ }
}
```

## Layout and units

- Prefer `rem` for typography and spacing; `ch` for readable line lengths; `%`/`fr`/`minmax()` for layout.
- Use `gap` for sibling spacing inside flex and grid containers.
- Respect [design.md](design.md) for spacing rhythm, color, and motion rules.
- Respect [acss.md](acss.md) and [acss/](acss/) for tokens and topic rules — never override the ACSS system with raw values.
