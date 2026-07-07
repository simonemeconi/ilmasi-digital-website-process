#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

const FILES = ["AGENTS.md"];
const DIRS = ["agent-docs"];

function printHelp() {
  console.log(`
gearyco-agentic-web-design — install Gearyco agent docs into a project

Usage:
  npx gearyco-agentic-web-design [directory] [options]

Options:
  --force, -f    Overwrite existing AGENTS.md or agent-docs/
  --help, -h     Show this help message

Examples:
  npx gearyco-agentic-web-design
  npx gearyco-agentic-web-design ./my-wordpress-site
  npx gearyco-agentic-web-design --force
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

  return conflicts;
}

function copyPackageFiles(target, force) {
  mkdirSync(target, { recursive: true });

  for (const file of FILES) {
    const source = join(packageRoot, file);
    const dest = join(target, file);

    if (existsSync(dest) && !force) {
      continue;
    }

    cpSync(source, dest);
  }

  for (const dir of DIRS) {
    const source = join(packageRoot, dir);
    const dest = join(target, dir);

    if (existsSync(dest) && !force) {
      continue;
    }

    cpSync(source, dest, { recursive: true });
  }
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

  const discoveryDir = join(target, "discovery");
  mkdirSync(discoveryDir, { recursive: true });

  // brief.md holds the user's discovery answers, so it is never overwritten,
  // even with --force. --force only refreshes the shipped docs.
  const briefDest = join(discoveryDir, "brief.md");
  const briefExisted = existsSync(briefDest);
  if (!briefExisted) {
    cpSync(join(packageRoot, "templates", "discovery-brief.md"), briefDest);
  }

  const docCount = countAgentDocs();
  console.log(`Installed Gearyco Agentic Web Design to ${target}`);
  console.log(`  AGENTS.md`);
  console.log(`  agent-docs/ (${docCount} reference docs)`);
  console.log(`  discovery/brief.md ${briefExisted ? "(kept)" : "(created)"}`);
  console.log("\nYour AI coding tool will pick up AGENTS.md automatically.");
  console.log("Next step: open your AI coding tool and say  start discovery");
}

main();
