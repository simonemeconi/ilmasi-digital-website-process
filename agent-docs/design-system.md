# Design system

Design system conventions for ILMASI Digital web projects. Apply after discovery, before the first wireframe, and whenever ACSS settings change.

## When to use

Load this doc before setting up Automatic.css, before initialising the design tool, and before any styling decision that needs a token.

## ACSS first

**Automatic.css is the source of truth.** Everything downstream is initialised from it.

- Initialise the design tool from ACSS tokens. Never the reverse.
- If the design needs a value the system lacks, add it in ACSS, re-export, realign the design tool.
- `design-system/acss-settings.json` is the only system artefact under version control.

## Project files

| File | Role | Read it |
|---|---|---|
| `design-system/acss-settings.json` | Restore and version the configuration | **No** |
| `design-system/tokens.md` | Token inventory | Always |

- **Never read `acss-settings.json` to learn which tokens exist.** It holds configuration, not the resulting variables.
- Write `tokens.md` from the stylesheet ACSS generated on the site. Never from memory.
- Record ACSS version and date at the top of `tokens.md`.
- No compiled CSS in the repo. ACSS generates it on the site.

## The design tool

- **Its HTML/CSS export never enters the codebase.** Read it for layout, hierarchy and proportion only.
- Translate into Etch with ACSS classes and variables.
- A hardcoded value in the final CSS is a defect.
- With direct access to the design file, see [design-generation.md](design-generation.md). Otherwise work from static exports.

## Off-scale values

1. **Value between steps** — take the nearest step. Do not ask.
2. **System lacks the value** — stop. Report what is missing and what changing ACSS would affect.
3. **Component needs bespoke CSS** — write it per [css.md](css.md), with tokens inside the custom rule.

## Colours

- **The OKLCH triple is the truth.** `color-*` hex and `-h`/`-s`/`-l` fields are HSL-era leftovers; ACSS neither reads nor updates them.
- **Write the base triple**: `primary-l-oklch`, `primary-c-oklch`, `primary-h-oklch`. Generate the fields with `node tools/check-colors.js primary=#b18832`.
- **Never write the shades.** Every `-hover-`, `-light-`, `-dark-` and `-ultra-` field is derived by ACSS.

### Writing colours

1. Write the base triples into `acss-settings.json`, shades left at zero.
2. Import into ACSS.
3. **Open ACSS settings and save.** This derives the shades; importing alone does not.
4. Verify in devtools, then re-export and commit.

```js
['', '-hover', '-light', '-ultra-light', '-dark', '-ultra-dark'].forEach(s =>
  console.log('--primary' + s,
    getComputedStyle(document.documentElement).getPropertyValue('--primary' + s)));
```

Every line must carry chroma. `oklch(0.85 0 0)` means the save has not happened.

### Unified lightness

- **Keep it on by default.** Preview with `node tools/check-colors.js` before committing.
- Turn it off only when hex values are contractual — registered mark, brand manual. With it off, write each colour's own lightness.
- Decide this in discovery.

## Setup sequence

1. Import `design-system/acss-settings.json`.
2. Set the colour scheme for this project.
3. Write the brand colour triples, re-import, save, verify the shades.
4. Set the fonts.
5. Re-export the settings and commit.
6. Write `tokens.md` from the generated stylesheet.

Wireframe only after this.

## Quality gates

- [ ] `tokens.md` written from the generated stylesheet, with version and date.
- [ ] Shades resolved with chroma in devtools.
- [ ] No hardcoded values in the final CSS.
- [ ] Settings re-exported and committed after every ACSS change.

## Related docs

- [design-generation.md](design-generation.md) — generating designs inside the system
- [acss.md](acss.md) — tokens and BEM while styling
- [css.md](css.md) — when custom CSS is warranted
- [discovery.md](discovery.md) — where brand colours and constraints are captured
