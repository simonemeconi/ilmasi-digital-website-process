# Design generation

**Phase one — with the client.** How to produce a design when the agent can
drive the design tool directly. Read this after
[design-system.md](design-system.md) and before generating anything visual.

## The idea

Snapping stray values back onto the scale is repair work. If the design is
generated inside the system in the first place, there is nothing to repair —
every spacing, colour and type size is a system value because no other values
were ever available.

That only works if the constraints are loaded **before** generating. An agent
that designs first and reconciles afterwards produces a design the system
almost fits, which is the worst of both.

## Two modes

Which one applies depends on the harness, not on the project.

**Direct access.** The agent can read and write the design file — through MCP
or any equivalent bridge. Generate under the constraints below. This is the
mode this document is written for.

**Static exports.** The agent can only see images or exported markup. It cannot
generate; it reads layout, hierarchy and proportion, and translates. The
constraints still govern the translation, and
[design-system.md](design-system.md) governs what may be carried across — which
is the design's structure, never its CSS.

## Before generating

Load `design-system/tokens.md`. Not a summary of it, not a recollection of a
previous project: the file, for this project.

It answers three questions that change what can be drawn:

- Which colour scheme is in play — a single-scheme project halves the palette.
- Which scale steps exist, and what the fluid range is.
- **What is switched off.** Disabled options mean the matching utilities were
  never generated. A design built on them looks fine in the design tool and
  cannot be built.

## Constraints

Generate only from what the system offers.

- **Spacing** — steps on the space scale. No intermediate values, no eyeballed
  gaps.
- **Colour** — roles from the generated palette and their shades. Not "a
  slightly warmer version of the primary".
- **Type** — steps on the type scale, and the heading levels as they are
  defined. Size is chosen by picking a step, not by picking a number.
- **Radius, borders, shadows, motion** — the defined tokens, whatever exists in
  this build.
- **Breakpoints** — the system's fluid range. Most spacing and type needs no
  breakpoint at all; reach for one only when the layout itself changes.

**No new value is invented for one section.** A section that needs a value the
system lacks is the signal to stop and raise it — see "When the system falls
short" below — not to add the value locally.

## Consistency over variety

This is the constraint that fights the generator's instincts, so it needs
stating plainly.

A generator varies. Left alone it will reach for a different accent on the
third section, a slightly tighter gap in the testimonials, one more heading
weight — because sameness reads as unfinished to something optimising for
interest. A design system asks for the opposite: **deliberate repetition.**
Sections that do the same job look the same. The same gap appears in twelve
places because it is the same gap.

When a section feels flat, the fix is content, hierarchy or imagery — not a
new token. Reaching for a new value to make a section interesting is the
failure mode this document exists to prevent.

## When the system falls short

Three responses, and only the third involves stopping.

1. **The value sits between steps.** Take the nearer step. No approval needed.
2. **The intent is achievable another way.** A different arrangement, a
   different emphasis, an existing token used differently. Prefer this.
3. **The system genuinely cannot express it.** Stop and say so: what is
   missing, what adding it to ACSS would change elsewhere. Changing the
   configuration mid-project needs explicit approval, and the design tool would
   have to be realigned afterwards.

## After generating

Before handing the design over, confirm three things.

- Every colour used is a palette role — not a sampled hex.
- Every spacing and type size lands on a step.
- Nothing depends on a disabled option.

A design that passes translates into Etch with classes and variables. One that
does not will produce hardcoded values later, when the pressure to just ship
the section is higher.

## Quick do / don't

Do

- Load `tokens.md` for this project before generating anything
- Repeat the same values across sections that do the same job
- Take the nearest step when a value falls between two
- Stop and raise it when the system cannot express the intent

Don't

- Generate first and reconcile with the system afterwards
- Introduce a value for one section
- Vary spacing or colour to make a section feel less repetitive
- Design against utilities that this build has switched off

## Related docs

- [design-system.md](design-system.md) — the hierarchy and the token artefacts
- [design.md](design.md) — visual design quality
- [acss.md](acss.md) — token and BEM rules when the design becomes markup
