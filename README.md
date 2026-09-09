# ILMASI Digital Website Process

Agent documentation for ILMASI Digital WordPress projects. Harness-agnostic
instructions that any AI coding tool can follow via `AGENTS.md`.

## Credit

This project is a fork of
[gearyco-agentic-web-design](https://github.com/kevingeary/gearyco-agentic-web-design)
by Kevin Geary, released under the MIT license. The discovery, copywriting,
design, ACSS, CSS, Etch and HTML docs are his work and remain largely as
written.

Added here: a language convention for Italian client work, a documented design
system contract between Automatic.css and the design tool, the deployment,
privacy, performance, SEO and maintenance steps that the original workflow
named but did not document, a neutral ACSS blueprint, and a color-check tool.
See [LICENSE](LICENSE).

## Recommended stack

Built for WordPress with:

- **[Automatic.css](https://automaticcss.com/)** — CSS framework and design
  tokens. [Purchase a license](https://automaticcss.com/pricing/)
- **[Etch](https://etchwp.com/)** — visual development environment with direct
  access to HTML, CSS and components. [Purchase a license](https://etchwp.com/pricing/)

## Install into a project

From any project directory:

```
npx ilmasi-digital-website-process
```

Or specify a target directory:

```
npx ilmasi-digital-website-process ./my-wordpress-site
```

Use `--force` to refresh the shipped docs and tools:

```
npx ilmasi-digital-website-process --force
```

`--force` never touches `discovery/brief.md` or anything under
`design-system/`. Those become the project's own files the moment they are
created.

## Start a project

After installing, open the project in your AI coding tool and say:

```
start discovery
```

The agent runs a guided discovery interview and writes the answers to
`discovery/brief.md`, which becomes the source of truth for copywriting,
wireframing and design. See [agent-docs/discovery.md](agent-docs/discovery.md).

## Structure

What ships in the package:

```
├── AGENTS.md              # Entry point — workflow, stack, doc index
├── bin/
│   ├── cli.js             # Installer
│   └── check-colors.js    # OKLCH preview under ACSS unified lightness
├── templates/             # Seeds for the project's own files
│   ├── discovery-brief.md
│   ├── acss-blueprint.json
│   └── tokens.md
└── agent-docs/            # Reference docs loaded by workflow step
```

What lands in the project:

```
├── AGENTS.md
├── agent-docs/
├── tools/
│   └── check-colors.js    # Refreshed by --force
├── discovery/             # Phase one — with the client
│   └── brief.md
├── design-system/         # The bridge between the phases
│   ├── acss-settings.json
│   └── tokens.md
└── build/                 # Phase two — in-house
    └── environment.md
```

Everything outside `agent-docs/` and `tools/` is created once and never
overwritten, not even with `--force`.

## Two phases

The workflow splits in two, and the folders mirror it.

**Phase one, with the client** — discovery, copy, wireframes, design, and the
approvals that go with them. Output lands in `discovery/`.

**Phase two, in-house** — development, deployment, compliance, performance,
hardening, SEO, backups and go-live. Output lands in `build/`.

`design-system/` sits between them: decided with the client, applied in-house.
The site is not handed over at launch — it stays under agency management, so
phase two has no client-facing step.

## The design system contract

Automatic.css is the source of truth. The design tool is initialised from ACSS
tokens, never the other way round. Its HTML/CSS export is read for layout,
hierarchy and proportion — it does not enter the codebase. Every value in the
final CSS resolves to an ACSS variable; a hardcoded value is a defect.

See [agent-docs/design-system.md](agent-docs/design-system.md).

## Checking brand colors

ACSS can unify the lightness of every brand color to a single value, which
gives the palette even visual weight and predictable contrast. Before
committing to it, preview where each color lands:

```
node tools/check-colors.js primary=#32a2c1 secondary=#1c1930
```

## Development

Test the CLI locally before publishing:

```
node bin/cli.js /tmp/test-project
```

## Usage (manual)

You can also copy `AGENTS.md`, `agent-docs/` and `tools/` into a project by
hand.
