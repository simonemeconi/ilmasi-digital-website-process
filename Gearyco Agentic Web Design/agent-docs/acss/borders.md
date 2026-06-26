# Borders

Load when adding borders or border radius to a component. Default: global border system handles most cases. Index: [acss.md](../acss.md).

## Radius

Always use `var(--radius)` for border radius.

## Default border

Use `var(--border)` whenever you need a border.

```css
.box {
  border: var(--border);
  border-radius: var(--radius);
}
```

## Granular border tokens

When mixing custom and global border properties:

| Token | Property |
|-------|----------|
| `var(--border-size)` | Width |
| `var(--border-style)` | Style |
| `var(--border-color-light)` | Color on light backgrounds |
| `var(--border-color-dark)` | Color on dark backgrounds |
