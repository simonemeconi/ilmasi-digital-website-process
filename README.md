# Gearyco Agentic Web Design

Agent documentation for Gearyco web projects. Harness-agnostic instructions that any AI coding tool can follow via `AGENTS.md`.

## Recommended stack

Gearyco Agentic Web Design is built for WordPress with:

- **[Automatic.css](https://automaticcss.com/)** — CSS framework and design tokens for consistent, maintainable styling. [Purchase a license](https://automaticcss.com/pricing/)
- **[Etch](https://etchwp.com/)** — Visual development environment with direct access to HTML, CSS, and components. [Purchase a license](https://etchwp.com/pricing/)

## Install into a project

From any project directory:

```bash
npx gearyco-agentic-web-design
```

Or specify a target directory:

```bash
npx gearyco-agentic-web-design ./my-wordpress-site
```

This copies `AGENTS.md` and `agent-docs/` into the target and creates an empty `discovery/` folder. Your AI coding tool reads `AGENTS.md` and loads the referenced docs — no harness-specific skill folders required.

Use `--force` to overwrite existing files:

```bash
npx gearyco-agentic-web-design --force
```

## Start a project

After installing, open the project in your AI coding tool and say:

```
start discovery
```

The agent runs a guided 7-phase discovery interview (stakeholder, business, audience, competitors, scope, brand, proof), grilling you for specifics and pushing back on vague answers. It writes everything to `discovery/brief.md`, which becomes the source of truth for copywriting, wireframing, and design. See [agent-docs/discovery.md](agent-docs/discovery.md) for the full playbook.

## Structure

```
├── AGENTS.md       # Entry point — workflow, stack, doc index
└── agent-docs/     # Reference docs loaded by workflow step
    ├── discovery.md    # Guided discovery interview (step 1)
    ├── copywriting.md
    ├── design.md
    ├── acss.md
    ├── acss/           # ACSS topic references (spacing, colors, grids, …)
    ├── css.md
    ├── etch.md
    ├── etch-css-reset.md
    └── html.md
```

## Development

Test the CLI locally before publishing:

```bash
node bin/cli.js /tmp/test-project
```

Publish to npm:

```bash
npm publish
```

## Usage (manual)

You can also copy or symlink `AGENTS.md` and `agent-docs/` into a client project by hand.
