# Gearyco Agentic Web Design

Agent documentation for Gearyco web projects. Harness-agnostic instructions that any AI coding tool can follow via `AGENTS.md`.

## Recommended stack

Gearyco Agentic Web Design is built for WordPress with:

- **[Automatic.css](https://automaticcss.com/)** — CSS framework and design tokens for consistent, maintainable styling. [Purchase a license](https://automaticcss.com/pricing/)
- **[Etch](https://etchwp.com/)** — Visual development environment with direct access to HTML, CSS, and components. [Purchase a license](https://etchwp.com/pricing/)

## Structure

```
Gearyco Agentic Web Design/
├── AGENTS.md       # Entry point — workflow, stack, doc index
└── agent-docs/     # Reference docs loaded by workflow step
    ├── copywriting.md
    ├── design.md
    ├── acss.md
    ├── acss/           # ACSS topic references (spacing, colors, grids, …)
    ├── css.md
    ├── etch.md
    ├── etch-css-reset.md
    ├── html.md
```

## Usage

Copy or symlink `Gearyco Agentic Web Design/AGENTS.md` and `Gearyco Agentic Web Design/agent-docs/` into a client project. The agent reads `AGENTS.md` and loads the referenced docs — no harness-specific skill folders required.
