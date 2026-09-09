# Design generation

Generation conventions for ILMASI Digital web projects. Apply during workflow steps 5 and 7 (UI design) when driving the design tool directly.

## When to use

Load this doc when the agent can read and write the design file. Without direct access, translate from static exports per [design-system.md](design-system.md).

## Load the constraints first

Read `design-system/tokens.md` for this project before generating. Not a summary, not a previous project.

It answers three things:

- Which colour scheme is in play.
- Which scale steps exist, and the fluid range.
- **What is switched off.** Disabled options mean the matching utilities do not exist and fail silently.

## Generate only from the system

- **Spacing** — steps on the space scale. No intermediate values.
- **Colour** — palette roles and their shades. No sampled or adjusted hexes.
- **Type** — steps on the type scale, heading levels as defined.
- **Radius, borders, shadows, motion** — the tokens that exist in this build.
- **Breakpoints** — the system's fluid range. Use one only when the layout itself changes.
- **Never invent a value for one section.**

## Consistency over variety

- **Repeat deliberately.** Sections doing the same job look the same.
- The same gap appears in twelve places because it is the same gap.
- When a section feels flat, change content, hierarchy or imagery. Never add a token.

## When the system falls short

1. **Value between steps** — take the nearer step. Do not ask.
2. **Intent achievable another way** — different arrangement, different emphasis, existing token used differently. Prefer this.
3. **System cannot express it** — stop. Report what is missing and what adding it to ACSS would affect.

## Quality gates

- [ ] Every colour is a palette role.
- [ ] Every spacing and type size lands on a step.
- [ ] Nothing depends on a disabled option.
- [ ] No value introduced for a single section.

## Related docs

- [design-system.md](design-system.md) — the hierarchy and the token artefacts
- [design.md](design.md) — visual design quality
- [acss.md](acss.md) — tokens and BEM when the design becomes markup
