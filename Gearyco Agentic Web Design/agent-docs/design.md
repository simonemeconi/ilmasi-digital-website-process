# Design

Design conventions for Gearyco Agentic Web Design web projects. Inspired by [Impeccable](https://github.com/pbakaus/impeccable). Apply on every design pass.

## When to use

Load this doc during workflow steps 3–4 (Wireframing, UI Design) and any visual review or polish pass before development.

## Pass/fail: the AI slop test

If someone could look at the interface and say "AI made that" without hesitation, it failed. Avoid category reflexes ("healthcare → white + teal", "finance → navy + gold", "SaaS → dark blue dashboard"). The answer should come from the project's audience, scene, and brand — not the domain.

## Absolute bans

Rewrite any element that uses these patterns:

- **Side-stripe borders** — colored `border-left`/`border-right` >1px on cards, alerts, or list items
- **Gradient text** — `background-clip: text` with gradients; use solid color, weight, or size instead
- **Glassmorphism as default** — decorative blur/glass cards
- **Hero-metric template** — big number + small label + gradient accent + stat row
- **Identical card grids** — repeated icon + heading + text tiles
- **Modal as first thought** — prefer inline or progressive disclosure
- **Nested cards** — never nest cards inside cards
- **Overused fonts** — Inter, DM Sans, Space Grotesk, Outfit, Plus Jakarta Sans, and other training-data defaults (see Impeccable reflex-reject list for brand work)
- **Pure black/white** — never `#000` or `#fff`; tint neutrals toward the brand hue
- **Gray text on colored backgrounds** — use a darker shade of the background or transparency
- **Bounce/elastic easing** — feels dated; use exponential ease-out curves

## Color

- Use **OKLCH** (not HSL). Reduce chroma as lightness approaches 0 or 100.
- Tint every neutral toward the brand hue (chroma 0.005–0.01 is enough).
- Pick a **color strategy** before picking colors:
  - **Restrained** — tinted neutrals + one accent ≤10% (product default)
  - **Committed** — one saturated color on 30–60% of surface (brand default)
  - **Full palette** — 3–4 named roles used deliberately
  - **Drenched** — the surface IS the color (heroes, campaigns)
- Accent color works because it's rare. Don't spread it everywhere.
- Meet **WCAG AA** contrast: 4.5:1 body text, 3:1 large text and UI components.

## Theme (light vs dark)

Never default to dark "because it looks cool" or light "to be safe." Write one concrete scene sentence first: who uses this, where, under what light, in what mood. The sentence must force the answer.

## Typography

- Cap body line length at **65–75ch**.
- Hierarchy through **scale + weight** with ≥1.25 ratio between steps; avoid flat scales (14/15/16/18px).
- Light text on dark backgrounds: bump line-height 0.05–0.1, add slight letter-spacing, optionally step weight up one notch.
- One well-chosen font family in multiple weights often beats two competing typefaces.
- Brand/marketing surfaces: browse real catalogs and reject reflex picks; vary fonts across projects.

## Layout & spacing

- Use a **4pt spacing base** (4, 8, 12, 16, 24, 32, 48, 64, 96px); vary spacing for rhythm.
- **Cards are the lazy answer** — use only when content is truly distinct and actionable.
- Don't wrap everything in a container; most things don't need one.
- Prefer `gap` over margins for sibling spacing.
- Use `repeat(auto-fit, minmax(280px, 1fr))` for responsive grids without breakpoint sprawl.
- Hierarchy through 2–3 dimensions at once: size, weight, color, position, and whitespace.

## Motion

- Don't animate CSS layout properties (`width`, `height`, `top`, etc.).
- Ease out with **exponential curves** (ease-out-quart/quint/expo).
- Motion should convey state, not decorate. Product UI: 150–250ms transitions.

## Copy

- Every word earns its place. No restated headings, no intros that repeat the title.
- **No em dashes** — use commas, colons, semicolons, periods, or parentheses.

## Register

Identify before designing:

- **Brand** (landing pages, marketing, portfolio) — design IS the product; commit to a POV, use imagery, allow bolder color and type.
- **Product** (dashboards, tools, admin) — design SERVES the task; favor system fonts, predictable grids, consistent components, and restrained color.
