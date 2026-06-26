# Blockquotes

Load when adding testimonials or quoted content. Default: global styling — no custom CSS. Index: [acss.md](../acss.md).

Blockquote styling is global. Custom CSS is only needed for intentional variants via locally-scoped override variables.

## Required DOM structure

```html
<figure>
  <blockquote cite="https://example.com/source">
    <p>The only thing we have to fear is fear itself.</p>
  </blockquote>
  <figcaption>— Franklin D. Roosevelt, <cite>First Inaugural Address</cite></figcaption>
</figure>
```

## Custom variants (override variables only)

```css
.testimonial-blockquote {
  --blockquote-background: var(--primary-ultra-light);
  --blockquote-border-color: var(--primary);
  --blockquote-border-width: 0 0 0 4px;
  --blockquote-padding: var(--space-l);
  --blockquote-text-font-style: italic;
}
```

Apply the class to the blockquote wrapper element.

## Override token reference

**Main:** `--blockquote-padding`, `--blockquote-gap`, `--blockquote-border-width`, `--blockquote-border-style`, `--blockquote-border-color`, `--blockquote-border-radius`, `--blockquote-background`, `--blockquote-box-shadow`, `--blockquote-max-inline-size`

**Text** (on `<p>` inside blockquote): `--blockquote-text-color`, `--blockquote-text-font-family`, `--blockquote-text-font-style`, `--blockquote-text-font-size`, `--blockquote-text-font-weight`, `--blockquote-text-line-height`, `--blockquote-text-align`, `--blockquote-text-transform`

**Footer:** `--blockquote-footer-padding`, `--blockquote-footer-margin-block`, `--blockquote-footer-font-family`, `--blockquote-footer-font-size`, `--blockquote-footer-font-weight`, `--blockquote-footer-font-style`, `--blockquote-footer-line-height`, `--blockquote-footer-text-transform`, `--blockquote-footer-color`

**Cite:** `--blockquote-cite-font-size`, `--blockquote-cite-font-weight`, `--blockquote-cite-font-style`, `--blockquote-cite-line-height`, `--blockquote-cite-text-transform`, `--blockquote-cite-color`
