# Grids

Load when building columns, card grids, or structural layout. Prefer grid over flexbox for structure. Index: [acss.md](../acss.md).

Use `gap: var(--grid-gap)` on grid layouts.

## Standard symmetrical grids

```css
grid-template-columns: var(--grid-{count});
```

Available: `var(--grid-1)` through `var(--grid-12)`.

```css
/* Bad */
grid-template-columns: repeat(3, 1fr);

/* Good */
grid-template-columns: var(--grid-3);
```

## Standard non-symmetrical grids

```css
grid-template-columns: var(--grid-{ratio});
```

Available: `var(--grid-1-2)`, `var(--grid-1-3)`, `var(--grid-2-1)`, `var(--grid-2-3)`, `var(--grid-3-1)`, `var(--grid-3-2)`.

Use in mobile-first media queries to reduce CSS.

```css
/* Bad */
grid-template-columns: 1fr 2fr;

/* Good */
grid-template-columns: var(--grid-1-2);
```

## Responsive layouts (mobile-first)

Default to mobile-first `min-width` queries, not `max-width` overrides.

```css
/* Bad */
.bad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

/* Good */
.good-grid {
  display: grid;
  @media (min-width: to-rem(768px)) {
    grid-template-columns: var(--grid-3);
  }
}
```

## Variable Grid

Auto-stacks when items hit a minimum width — responds to content, not device breakpoints.

Use when column count is flexible and stacking by min item width makes sense.

```css
.my-variable-grid {
  --min: to-rem(350px);
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(min(var(--min), 100%), 1fr));
  grid-template-rows: 1fr;
  gap: var(--grid-gap, 1em);
}
```
