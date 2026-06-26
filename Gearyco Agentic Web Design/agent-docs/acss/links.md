# Links

Load when styling links outside global defaults. Default: no custom CSS — global link styling handles it. Index: [acss.md](../acss.md).

Link styling is global. Do not write custom link CSS unless the link needs a deliberate variant (e.g. nav link, footer link, button-adjacent link).

## When custom link CSS is allowed

- The link sits in a component with a non-default color context and global link colors clash
- You need a scoped variant (e.g. `.site-footer a`) while retaining global link behavior elsewhere

Override via link tokens on a scoped selector — do not hardcode colors.

```css
.site-footer__nav a {
  --link-color: var(--text-light-muted);
  --link-color-hover: var(--text-light);
}
```

## Link tokens

| Token | Use |
|-------|-----|
| `var(--link-color)` | Default link color |
| `var(--link-color-hover)` | Hover color |
| `var(--link-transition)` | Transition |
| `var(--link-decoration)` | Text decoration |
| `var(--link-decoration-hover)` | Hover decoration |
| `var(--link-underline-offset)` | Underline offset |
| `var(--link-weight)` | Font weight |
