# ILMASI Digital Website Process

Agent instructions for ILMASI Digital web projects. Load the referenced docs in `agent-docs/` at the workflow steps listed below.

<!--
  Based on gearyco-agentic-web-design by Kevin Geary (MIT).
  Modified: two-phase workflow, search research, design system contract, and the
  deployment, security, privacy, performance, SEO and maintenance steps.
-->

## Overview

A standard operating procedure for building WordPress sites with Etch and Automatic.css. One source of truth, any harness.

## Two phases

**Phase one — with the client.** Discovery, search research, copy, wireframes, design, approvals. Output lands in `discovery/`.

**Phase two — in-house.** Development, deployment, security, compliance, performance, SEO, backups, go-live. **No client in the room** — reason and write as to another developer. Output lands in `build/`.

`design-system/` sits between them: decided with the client, applied in-house.

The site is not handed over at launch. It stays under agency management, so phase two has no client-facing step.

## Workflow

Phase one — with the client:

| | Step | Doc |
|---|---|---|
| 1 | Business & brand discovery | [discovery.md](agent-docs/discovery.md) |
| 2 | Search research | [search-research.md](agent-docs/search-research.md) |
| 3 | Copywriting | [copywriting.md](agent-docs/copywriting.md), [form.md](agent-docs/form.md) |
| 4 | Home page wireframe & copy | [design.md](agent-docs/design.md) |
| 5 | Home page UI design | [design.md](agent-docs/design.md), [design-generation.md](agent-docs/design-generation.md) |
| 6 | Remaining wireframes | [design.md](agent-docs/design.md) |
| 7 | Remaining UI screens | [design.md](agent-docs/design.md), [design-generation.md](agent-docs/design-generation.md) |

Phase two — in-house:

| | Step | Doc |
|---|---|---|
| 8 | Development | [etch.md](agent-docs/etch.md), [acss.md](agent-docs/acss.md), [html.md](agent-docs/html.md), [css.md](agent-docs/css.md), [form.md](agent-docs/form.md) |
| 9 | Deploy to production | [deployment.md](agent-docs/deployment.md) |
| 10 | Hardening | [hardening.md](agent-docs/hardening.md) |
| 11 | Privacy & compliance | [privacy-compliance.md](agent-docs/privacy-compliance.md) |
| 12 | Performance | [performance.md](agent-docs/performance.md) |
| 13 | SEO | [seo.md](agent-docs/seo.md) |
| 14 | Backup & maintenance | [backup-maintenance.md](agent-docs/backup-maintenance.md) |
| 15 | Go-live | [deployment.md](agent-docs/deployment.md) |

Set up the design system after discovery and before the first wireframe — see [design-system.md](agent-docs/design-system.md).

## Sequence rules

Do not reorder these.

- **Search research before the copy.** Research afterwards can only adjust wording.
- **Production and public are separate states.** Step 9 puts the site on the real server; step 15 makes it findable.
- **Hardening before the site is public.** Its measures can break things.
- **Compliance before performance.** Cache rules are tuned against the consent banner.
- **Backups before go-live.** The cutover is when a restore might be needed.

## Getting started: Discovery

Every project begins with a guided discovery interview. When the user says `start discovery`, `/discovery`, "begin discovery", or asks to kick off a new project, load and follow [agent-docs/discovery.md](agent-docs/discovery.md) and run the interview to completion.

Do not skip ahead to copywriting, wireframing, or design until the discovery brief at `discovery/brief.md` is complete and the user has approved it. If a brief already exists, resume it rather than starting over.

## Project Environment & Stack

- **Paper or Figma** — wireframing & design
- **WordPress or Etch Studio** — platform
- **Etch (https://docs.etchwp.com)** — development tool
- **Automatic.css (https://docs.automaticcss.com)** — design system & CSS framework
- **SEOPress** — SEO, redirects, structured data
- **Perfmatters** — asset optimisation baseline
- **Complianz** — consent management
- **WS Form** — forms
- **WPVivid** — backup and restore

## Project files

Created once per project, never overwritten. Read them before asking the user anything they might already answer, and write back anything you had to ask.

| File | Holds | Read by |
|---|---|---|
| `discovery/brief.md` | Discovery answers, page structure, intents | Everything downstream |
| `discovery/controller.md` | Controller identity and processing facts | Step 11 |
| `design-system/acss-settings.json` | ACSS configuration, for restore and versioning | **Nobody** |
| `design-system/tokens.md` | Token inventory | Every styling and design step |
| `build/environment.md` | Server, hosting, access, plugins | Steps 10, 12, 14 |

**Never read `acss-settings.json` to find out which tokens exist.** It holds configuration, not the resulting variables. `tokens.md` is the working document.

## Tools

`tools/check-colors.js` converts brand hex values to the OKLCH fields for the ACSS settings and previews where each colour lands under unified lightness.

```
node tools/check-colors.js primary=#b18832 secondary=#1c1930
```

## Language Conventions

Load and follow [agent-docs/language.md](agent-docs/language.md) before any client-facing output. All client interaction happens in Italian; the docs in `agent-docs/` are the source of the reasoning, not a script to translate word for word.

## Design System Conventions

Load and follow [agent-docs/design-system.md](agent-docs/design-system.md) after discovery, before the first wireframe, and whenever ACSS settings change.

- **Automatic.css is the source of truth.** Initialise the design tool from ACSS tokens, never the reverse.
- **The design tool's HTML/CSS export never enters the codebase.** Read it for layout, hierarchy and proportion; translate into Etch with classes and variables.
- A hardcoded value in the final CSS is a defect.

Load [agent-docs/design-generation.md](agent-docs/design-generation.md) when generating designs rather than translating them.

## Code Conventions

Load and follow [agent-docs/html.md](agent-docs/html.md), [agent-docs/css.md](agent-docs/css.md), [agent-docs/acss.md](agent-docs/acss.md), the relevant files in [agent-docs/acss/](agent-docs/acss/), [agent-docs/etch.md](agent-docs/etch.md), and [agent-docs/etch-css-reset.md](agent-docs/etch-css-reset.md) during development and any markup or stylesheet review.

## Ownership

- **Each decision has one owner.** Search research owns the page inventory and intents. Copywriting owns the words, including titles and meta descriptions. Step 13 implements them and does not rewrite them.
- **Each optimisation job has one plugin.** Record the owner of each job in `build/environment.md`.
