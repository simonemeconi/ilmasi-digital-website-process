#!/usr/bin/env node

// ILMASI Digital Website Process
//
// Based on gearyco-agentic-web-design by Kevin Geary (MIT).
// Modified to copy tools/ into the target project and to seed design-system/.

import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

const FILES = ["AGENTS.md"];
const DIRS = ["agent-docs"];

// Executable helpers. Copied into the project because npx does not leave the
// package behind — without this the agent has no path to run them from.
// Shipped code, so --force refreshes them.
const TOOLS = [
  { from: join("bin", "check-colors.js"), to: join("tools", "check-colors.js") },
];

// Seeds become the project's own files. Created once, never overwritten, not
// even with --force: they hold the answers and settings for this specific
// project. --force only refreshes the shipped docs and tools.
//
// They land in three folders that mirror the two project phases:
// discovery/ is phase one, with the client. build/ is phase two, in-house.
// design-system/ is the bridge — decided with the client, applied in-house.
const SEEDS = [
  {
    from: join("templates", "discovery-brief.md"),
    to: join("discovery", "brief.md"),
    label: "discovery/brief.md",
  },
  {
    from: join("templates", "controller.md"),
    to: join("discovery", "controller.md"),
    label: "discovery/controller.md",
  },
  {
    from: join("templates", "environment.md"),
    to: join("build", "environment.md"),
    label: "build/environment.md",
  },
  {
    from: join("templates", "acss-blueprint.json"),
    to: join("design-system", "acss-settings.json"),
    label: "design-system/acss-settings.json",
  },
  {
    from: join("templates", "tokens.md"),
    to: join("design-system", "tokens.md"),
    label: "design-system/tokens.md",
  },
];

function printHelp() {
  console.log(`
ilmasi-digital-website-process — install the ILMASI agent docs into a project

Usage:
  npx ilmasi-digital-website-process [directory] [options]

Options:
  --force, -f    Overwrite existing AGENTS.md, agent-docs/ or tools/
  --help, -h     Show this help message

Examples:
  npx ilmasi-digital-website-process
  npx ilmasi-digital-website-process ./my-wordpress-site
  npx ilmasi-digital-website-process --force
`);
}

function parseArgs(argv) {
  const options = { force: false, help: false, target: process.cwd() };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--force" || arg === "-f") {
      options.force = true;
    } else if (!arg.startsWith("-")) {
      options.target = resolve(arg);
    } else {
      console.error(`Unknown option: ${arg}`);
      printHelp();
      process.exit(1);
    }
  }

  return options;
}

function listConflicts(target) {
  const conflicts = [];

  for (const file of FILES) {
    if (existsSync(join(target, file))) {
      conflicts.push(file);
    }
  }

  for (const dir of DIRS) {
    if (existsSync(join(target, dir))) {
      conflicts.push(`${dir}/`);
    }
  }

  for (const tool of TOOLS) {
    if (existsSync(join(target, tool.to))) {
      conflicts.push(tool.to);
    }
  }

  // Seeds are deliberately absent here: they are never overwritten, so their
  // presence is not a conflict and must not block the install.

  return conflicts;
}

function copyPackageFiles(target, force) {
  mkdirSync(target, { recursive: true });

  for (const file of FILES) {
    const dest = join(target, file);

    if (existsSync(dest) && !force) {
      continue;
    }

    cpSync(join(packageRoot, file), dest);
  }

  for (const dir of DIRS) {
    const dest = join(target, dir);

    if (existsSync(dest) && !force) {
      continue;
    }

    cpSync(join(packageRoot, dir), dest, { recursive: true });
  }

  for (const tool of TOOLS) {
    const dest = join(target, tool.to);

    if (existsSync(dest) && !force) {
      continue;
    }

    mkdirSync(dirname(dest), { recursive: true });
    cpSync(join(packageRoot, tool.from), dest);
  }
}

function copySeeds(target) {
  const results = [];

  for (const seed of SEEDS) {
    const source = join(packageRoot, seed.from);

    // A seed whose template has not been written yet is skipped rather than
    // fatal, so the CLI stays usable while the package is still growing.
    if (!existsSync(source)) {
      results.push({ label: seed.label, state: "not shipped yet" });
      continue;
    }

    const dest = join(target, seed.to);
    const existed = existsSync(dest);

    if (!existed) {
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(source, dest);
    }

    results.push({ label: seed.label, state: existed ? "kept" : "created" });
  }

  return results;
}

function countAgentDocs() {
  const docsDir = join(packageRoot, "agent-docs");
  let count = 0;

  for (const entry of readdirSync(docsDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".md")) {
      count += 1;
    } else if (entry.isDirectory()) {
      for (const nested of readdirSync(join(docsDir, entry.name))) {
        if (nested.endsWith(".md")) {
          count += 1;
        }
      }
    }
  }

  return count;
}

function main() {
  const { force, help, target } = parseArgs(process.argv.slice(2));

  if (help) {
    printHelp();
    return;
  }

  const conflicts = listConflicts(target);

  if (conflicts.length > 0 && !force) {
    console.error("Installation blocked — the following already exist:");
    for (const conflict of conflicts) {
      console.error(`  ${conflict}`);
    }
    console.error("\nRe-run with --force to overwrite.");
    process.exit(1);
  }

  copyPackageFiles(target, force);
  const seeded = copySeeds(target);

  const docCount = countAgentDocs();
  console.log(`Installed ILMASI Digital Website Process to ${target}`);
  console.log(`  AGENTS.md`);
  console.log(`  agent-docs/ (${docCount} reference docs)`);
  for (const tool of TOOLS) {
    console.log(`  ${tool.to}`);
  }
  for (const { label, state } of seeded) {
    console.log(`  ${label} (${state})`);
  }
  console.log("\nYour AI coding tool will pick up AGENTS.md automatically.");
  console.log("Next step: open your AI coding tool and say  start discovery");
}

main();
