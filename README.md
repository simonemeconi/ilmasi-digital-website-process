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

This copies `AGENTS.md` and `agent-docs/` into the target and scaffolds `discovery/brief.md` (an empty discovery brief stub). Your AI coding tool reads `AGENTS.md` and loads the referenced docs — no harness-specific skill folders required.

Use `--force` to overwrite existing files:

```bash
npx gearyco-agentic-web-design --force
```

## Start a project

After installing, open the project in your AI coding tool and say:

```
start discovery
```

The agent runs a guided 7-phase discovery interview (project goal, business, audience, competitors, pages, brand, proof) focused purely on marketing, copy, and design inputs, grilling you for specifics and pushing back on vague answers. It fills in `discovery/brief.md` as it goes — the file is created at install time so discovery progress is always checkable — and that brief becomes the source of truth for copywriting, wireframing, and design. See [agent-docs/discovery.md](agent-docs/discovery.md) for the full playbook.

## Structure

```
├── AGENTS.md       # Entry point — workflow, stack, doc index
├── templates/      # Files scaffolded into projects
│   └── discovery-brief.md   # Stub copied to discovery/brief.md on install
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

### Releasing

Publishing to npm is automated. A GitHub Actions workflow (`.github/workflows/publish.yml`) runs on every push to `main` and publishes only when the version in `package.json` is new. To cut a release:

```bash
npm version patch   # bumps version + creates a git tag (use minor/major as needed)
git push --follow-tags
```

The workflow checks npm, sees the new version, and publishes it. Pushes without a version bump are ignored (no error).

**One-time setup:** add an npm automation token as a repo secret named `NPM_TOKEN` (npm → Access Tokens → Generate → Automation; then GitHub repo → Settings → Secrets and variables → Actions → New repository secret).

To publish manually instead:

```bash
npm publish
```

## Usage (manual)

You can also copy or symlink `AGENTS.md` and `agent-docs/` into a client project by hand.
