# Design system

The design system is defined before anything is designed, and it is defined in
Automatic.css. Read this doc after discovery and before the first wireframe.

**This is the bridge between the two phases.** Colours, fonts and scales are
decided with the client in phase one; the ACSS configuration is applied
in-house in phase two. `design-system/` belongs to neither and travels between
them — which is why it is versioned and why drift in it is expensive.

## The hierarchy

**ACSS is the source of truth.** Not the design file, not the export, not the
comp. Everything downstream is initialised from ACSS.

- The design tool is set up from ACSS tokens. Never the other way round.
- If the design needs a value the system cannot express, the fix is in ACSS:
  add it there, re-export, realign the design tool. A design the system cannot
  express is a design to correct, not a reason to leave the system.
- The ACSS settings JSON is the only system artefact under version control.

## The two artefacts

Every project carries a `design-system/` folder with two files that look
similar and are not interchangeable.

| File | Role | Read by the agent |
|------|------|-------------------|
| `acss-settings.json` | Restore and version the ACSS configuration | **No** |
| `tokens.md` | Distilled inventory of what to use | Yes, always |

**Never read `acss-settings.json` to find out which tokens exist.** It holds
the *configuration* (`text-scale: 1.333`, `base-text-desk: 18`), not the
resulting variables (`--text-l`, `--space-m`, `--h3`). It runs to thousands of
keys, most of them derived colour triples, and reading it burns context to
answer a question it does not answer. It exists so a configuration can be
restored and so changes to it show up in a diff.

`tokens.md` is the working document: the palette, the scales, the fluid range,
the class families that are easy to miss — the `--*-to-*` section variants, the
content-grid escapes — and, most usefully, **the list of what is switched off**.
A disabled option means the matching utility classes do not exist. Using them
fails silently.

ACSS generates the stylesheet on the site, so there is no compiled CSS in the
repo and none is wanted: a committed copy would drift from the running site
within a week. But `tokens.md` must still be written from what ACSS actually
generated — read the generated stylesheet on the site, or inspect the computed
custom properties in devtools. **A token inventory written from memory produces
plausible names that do not exist**, and the failure is silent. Note the ACSS
version and the date at the top of `tokens.md`.

## When ACSS settings change

Re-export the JSON, update `tokens.md` if the change added or removed anything,
and commit both alongside the change. A settings file that no longer matches
the running site is worse than no settings file: it will be restored one day
and quietly undo work.

## The design tool

The design tool is for reading layout, hierarchy and proportion. Its output is
a reference, not a source.

**Its HTML/CSS export never enters the codebase.** This is the single rule most
likely to be broken, because pasting the export is the fastest-looking path and
it produces markup that renders correctly on first load. It also produces
hardcoded values that no longer respond to the system: change a token later and
the pasted section does not move.

Translate the design into Etch using ACSS classes and variables. A hardcoded
value in the final CSS is a defect, whatever it renders like.

If the agent can reach the design file directly (via MCP or equivalent),
constrain generation at the source rather than fixing it afterwards — see
[design-generation.md](design-generation.md). Otherwise work from static
exports and translate.

## Three situations, three responses

The rule is: *every value in the CSS resolves to an ACSS variable*. What that
means in practice depends on what you hit.

1. **A value falls between scale steps.** The comp has `88px` of padding and
   the scale offers `80` and `96`. Snap to the nearest step and move on. Do not
   ask; this is normal translation, not a decision.

2. **The system genuinely lacks the value.** Stop. Changing the ACSS
   configuration mid-project shifts everything already built and requires
   explicit approval. Say what is missing and what it would change.

3. **A component needs bespoke CSS.** Write it, scoped and BEM, per
   [css.md](css.md) — with tokens inside the custom rule. Custom CSS is not
   permission to hardcode.

## Colours

The colour fields in the ACSS JSON are not what they appear to be.

ACSS 4 is natively OKLCH. The `color-*` hex fields and the `-h`/`-s`/`-l`
fields are **HSL-era leftovers.** ACSS neither reads them nor updates them: a
settings file can say `color-primary: "#32a2c1"` while the live colour is an
entirely different hue. **The OKLCH triple is the truth.**

Each brand role has one base triple — `primary-l-oklch`, `primary-c-oklch`,
`primary-h-oklch` — and a set of derived shades. The split matters:

- **The base triple is written.** Collect brand hex values during discovery and
  convert them: `node tools/check-colors.js primary=#b18832` prints the fields
  ready to paste, including a `color-*` hex that agrees with the triple.
- **The shades are never written.** Every `-hover-`, `-light-`, `-dark-` and
  `-ultra-` field is derived. ACSS gamut-maps them against a wider space than
  sRGB; hand-computed values will be close and wrong.

### Writing colours into the settings

1. Write the base triples into `acss-settings.json`, leaving the shades at zero.
2. Import the file into ACSS.
3. **Open the ACSS settings and save.** This is not a formality — this is the
   step that derives the shades.
4. Re-export and commit.

Step 3 is the one to get wrong. After importing, the site looks correct: base
colours render, and only the shades are grey. Anyone who imports, glances at
the primary and moves on ships a site that breaks on hover states and light
backgrounds. Verify in devtools before trusting it:

```js
['', '-hover', '-light', '-ultra-light', '-dark', '-ultra-dark'].forEach(s =>
  console.log('--primary' + s,
    getComputedStyle(document.documentElement).getPropertyValue('--primary' + s)));
```

Every line should carry chroma. A shade reading `oklch(0.85 0 0)` means the save
has not happened.

### Unified lightness

ACSS can force every brand colour to a single lightness (0.65 by default).
Because OKLCH lightness tracks perceived brightness, this gives the palette
even visual weight and contrast that holds across the whole palette rather than
colour by colour.

The cost is that source hex values move. Preview before committing:

```
node tools/check-colors.js primary=#32a2c1 secondary=#1c1930
```

**This is a discovery decision, not a build-time discovery.** Keep the option
on by default. Turn it off only when the exact hex values are contractual — a
registered mark, a brand manual. Find that out while asking about the brand,
not when the client says the blue is not their blue.

## Starting a project

1. Import `design-system/acss-settings.json` into ACSS. It ships neutral:
   greyed palette, no fonts, no project-specific selectors, scales and spacing
   already set.
2. Set the colour scheme for this project — it is deliberately left empty.
3. Write the brand colour triples and re-import, having settled unified
   lightness. Save in ACSS and check the shades resolved.
4. Set the fonts.
5. Export the settings back into `design-system/acss-settings.json` and commit.
6. Write `tokens.md` from the stylesheet ACSS generated on the site, not from
   memory.

Only then wireframe.

## Quick do / don't

Do

- Read `tokens.md` first; check the generated stylesheet when it is silent
- Snap off-scale values to the nearest step without asking
- Write brand colour base triples, then import and save in ACSS
- Re-export the JSON and refresh `tokens.md` after any settings change

Don't

- Read `acss-settings.json` to learn which tokens exist
- Write or extend `tokens.md` from memory instead of from the generated CSS
- Paste design-tool CSS into the project
- Hardcode a value because the design asked for it
- Edit derived colour values by hand
- Change ACSS configuration mid-project without approval

## Related docs

- [design-generation.md](design-generation.md) — generating designs inside the system
- [acss.md](acss.md) — token and BEM rules while styling
- [css.md](css.md) — when custom CSS is warranted
- [discovery.md](discovery.md) — where brand colours and constraints are captured
