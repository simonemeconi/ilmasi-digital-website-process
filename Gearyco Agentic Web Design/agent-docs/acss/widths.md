# Widths

Load when constraining element or container width. Default: content width is automatic — don't set it manually. Index: [acss.md](../acss.md).

## Content width

Content width spans from the left edge of content to the right on viewports large enough not to compress it.

In ACSS + Etch, direct children of `<section>` get content width automatically. **Do not set this manually** unless deviating intentionally.

When you must reference it: `var(--content-width)`.

**Do not set random max widths on containers** unless clearly different from the site content width — arbitrary values create inconsistency.

## Element width tokens

Preset widths: `var(--width-{size})` where `{size}` is `10`–`90` in increments of 10 (e.g. `var(--width-60)`).

Pattern:

```css
.element {
  inline-size: 100%;
  max-inline-size: var(--width-60);
}
```

Use width tokens whenever possible. Custom values only when no token fits.
