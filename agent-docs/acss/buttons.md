# Buttons

Load when adding or styling buttons. Default: utility classes — no custom CSS. Index: [acss.md](../acss.md).

Buttons are the main ACSS exception to the BEM/variable-first rule. **Always default to utility classes** before writing CSS.

## Utility classes

Base pattern: `btn--{color}`

```html
<a class="btn--primary" href="#">Get started</a>
```

Outline variant — combine with a color class:

```html
<a class="btn--primary btn--outline" href="#">Learn more</a>
```

Size variants: `btn--xs`, `btn--s`, `btn--l`, `btn--xl`, `btn--xxl`

**Always use `btn--primary` (or another color utility) instead of writing primary button CSS.**

### Available color utilities

```
.btn--primary          .btn--primary-light       .btn--primary-dark
.btn--secondary        .btn--secondary-light     .btn--secondary-dark
.btn--tertiary         .btn--tertiary-light      .btn--tertiary-dark
.btn--accent           .btn--accent-light        .btn--accent-dark
.btn--base             .btn--base-light          .btn--base-dark
.btn--neutral          .btn--neutral-light       .btn--neutral-dark
```

## Custom button CSS (rare)

Only when utility classes cannot achieve the design. Reference global button tokens:

```
--btn-padding-block          --btn-padding-inline
--btn-min-width              --btn-width
--btn-line-height            --btn-font-size
--btn-font-weight            --btn-font-family
--btn-font-style             --btn-text-decoration
--btn-text-decoration-hover  --btn-letter-spacing
--btn-text-transform         --btn-border-width
--btn-border-style           --btn-border-radius
--btn-radius                 --btn-justify-content
--btn-align-items            --btn-text-align
```
