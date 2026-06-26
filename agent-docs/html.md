# HTML

Markup conventions for Gearyco Agentic Web Design web projects. Apply during workflow step 5 (Development) and any markup review.

## When to use

Load this doc when writing or reviewing HTML for pages, sections, components, and templates.

## Semantic structure

- Use semantic elements first: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `figcaption`, `button`, `ul`/`ol`/`li`.
- Reach for `div` only when no semantic element fits.
- One `h1` per page. Do not skip heading levels.

## Accessibility

- Every interactive control needs an accessible name (visible label, `aria-label`, or `aria-labelledby`).
- Every meaningful image needs descriptive `alt` text. Decorative images use `alt=""`.
- Use native elements for their built-in behavior (`button` for actions, `a` for navigation, `input` + `label` for forms).
- Add ARIA only when native semantics are insufficient. Do not override native roles.

## Class and attribute hooks

- Apply **BEM block and element** classes in markup (e.g. `card`, `card__title`). Avoid modifier classes in HTML when a data attribute can express the variation instead.
- Prefer **custom data attributes** for variations and state hooks (e.g. `data-size="small"`, `data-layout="horizontal"`). Keep values lowercase and kebab-case.
- Do not use classes or data attributes purely for JavaScript when they also serve styling — one hook, one purpose.

## Content patterns

- Links use descriptive text. Avoid "click here" or "read more" without context.
- Lists contain only `li` (or script-supporting) children. Tables are for tabular data, not layout.
- Forms group related fields with `fieldset`/`legend` when it aids comprehension.
