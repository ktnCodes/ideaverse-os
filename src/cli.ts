#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { init } from "./scaffold.js";

// Read the version from package.json at runtime so the CLI always reports
// what was published, not whatever was hardcoded at the time the source
// was last edited. Path: dist/cli.js -> ../package.json.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg: { version: string } = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf8"),
);

const program = new Command();

program
  .name("ideaverse-os")
  .description(
    "Bootstrap a position-addressed, LLM-agnostic knowledge vault. " +
      "Karpathy's wiki pattern with conversational ingestion baked in."
  )
  .version(pkg.version);

program
  .command("init")
  .description("Scaffold a new ideaverse-OS vault at the given path")
  .argument("[path]", "Target path for the new vault", ".")
  .option(
    "--force",
    "Skip conflict prompts (overwrite without asking)",
    false
  )
  .option(
    "--dry-run",
    "Show what would be created without writing files",
    false
  )
  .action(
    async (path: string, options: { force: boolean; dryRun: boolean }) => {
      try {
        const result = await init(path, options);
        process.exit(result.aborted ? 1 : 0);
      } catch (err) {
        console.error("\nError:", err instanceof Error ? err.message : err);
        process.exit(1);
      }
    }
  );

program.parse(process.argv);
