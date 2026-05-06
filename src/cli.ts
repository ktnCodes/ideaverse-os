#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name("ideaverse-os")
  .description(
    "Bootstrap a position-addressed, LLM-agnostic knowledge vault. " +
      "Karpathy's wiki pattern with conversational ingestion baked in."
  )
  .version("0.0.1");

program
  .command("init")
  .description("Scaffold a new ideaverse-OS vault at the given path")
  .argument("[path]", "Target path for the new vault", ".")
  .option("--force", "Skip conflict prompts (overwrite without asking)", false)
  .option("--dry-run", "Show what would be created without writing files", false)
  .action((path: string, options: { force: boolean; dryRun: boolean }) => {
    console.log("Hello, ideaverse-OS");
    console.log(`  target path: ${path}`);
    console.log(`  force:       ${options.force}`);
    console.log(`  dry-run:     ${options.dryRun}`);
    console.log("");
    console.log("Task 1 (tracer slice) will implement actual scaffolding.");
    process.exit(0);
  });

program.parse(process.argv);
