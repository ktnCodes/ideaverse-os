import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { basename, resolve } from "node:path";
import { detectPlatform, detectShell } from "./platform.js";
import {
  defaultVars,
  loadAndSubstitute,
  loadTemplate,
  type TemplateVars,
} from "./templates.js";
import { planScaffold, type FileWrite, type ScaffoldPlan } from "./plan.js";
import { askConflict, confirm, type ConflictAction } from "./prompt.js";
import { buildPathsJson } from "./paths-json.js";

function renderFile(file: FileWrite, vars: TemplateVars): string {
  if (file.kind === "config" && file.path.endsWith("paths.json")) {
    return buildPathsJson(vars);
  }
  if (file.kind === "skill") {
    // Skills are copied verbatim (no placeholder substitution).
    return loadTemplate(file.templatePath);
  }
  return loadAndSubstitute(file.templatePath, vars);
}

export type InitOptions = {
  /** Skip conflict prompts; overwrite without asking. */
  force: boolean;
  /** Print the plan without writing anything. */
  dryRun: boolean;
};

export type InitResult = {
  vaultRoot: string;
  foldersCreated: number;
  filesWritten: number;
  filesSkipped: number;
  aborted: boolean;
};

export async function init(
  targetPathArg: string,
  options: InitOptions
): Promise<InitResult> {
  const vaultRoot = resolve(targetPathArg);
  const vaultName = basename(vaultRoot);
  const platformTarget = detectPlatform();
  const shell = detectShell();
  const vars = defaultVars({
    vaultName,
    vaultRoot,
    platformTarget,
    shell,
  });

  const plan = planScaffold(vaultRoot);

  printPlanSummary(plan, options);

  if (options.dryRun) {
    return {
      vaultRoot,
      foldersCreated: 0,
      filesWritten: 0,
      filesSkipped: 0,
      aborted: false,
    };
  }

  // Resolve conflicts
  const writeMap = new Map<string, FileWrite>();
  for (const f of plan.files) writeMap.set(f.path, f);

  if (plan.conflicts.length > 0 && !options.force) {
    const proceed = await confirm(
      `\nProceed and resolve ${plan.conflicts.length} conflict(s) one by one?`,
      true
    );
    if (!proceed) {
      console.log("Aborted by user.");
      return {
        vaultRoot,
        foldersCreated: 0,
        filesWritten: 0,
        filesSkipped: 0,
        aborted: true,
      };
    }

    for (let i = 0; i < plan.conflicts.length; i++) {
      const conflict = plan.conflicts[i];
      const remaining = plan.conflicts.length - i;
      let action: ConflictAction = "diff";
      while (action === "diff") {
        action = await askConflict(conflict.path, remaining);
        if (action === "diff") {
          showDiff(conflict, vars);
        }
      }

      if (action === "abort") {
        console.log("Aborted by user.");
        return {
          vaultRoot,
          foldersCreated: 0,
          filesWritten: 0,
          filesSkipped: 0,
          aborted: true,
        };
      }
      if (action === "skip") {
        writeMap.delete(conflict.path);
      }
      // overwrite -> leave in writeMap
    }
  }

  // Create folders
  let foldersCreated = 0;
  for (const folder of plan.folders) {
    mkdirSync(folder, { recursive: true });
    foldersCreated++;
  }

  // Write files
  let filesWritten = 0;
  let filesSkipped = 0;
  for (const file of plan.files) {
    if (!writeMap.has(file.path)) {
      filesSkipped++;
      continue;
    }
    const content = renderFile(file, vars);
    mkdirSync(dirname(file.path), { recursive: true });
    writeFileSync(file.path, content, "utf8");
    filesWritten++;
  }

  printPostSummary({
    vaultRoot,
    foldersCreated,
    filesWritten,
    filesSkipped,
    aborted: false,
  });

  return {
    vaultRoot,
    foldersCreated,
    filesWritten,
    filesSkipped,
    aborted: false,
  };
}

function printPlanSummary(plan: ScaffoldPlan, options: InitOptions): void {
  console.log("");
  console.log(`ideaverse-os init`);
  console.log(`  target:      ${plan.vaultRoot}`);
  console.log(`  folders:     ${plan.folders.length}`);
  console.log(`  files:       ${plan.files.length}`);
  console.log(
    `  conflicts:   ${plan.conflicts.length}${
      plan.conflicts.length > 0 && options.force ? " (force = overwrite all)" : ""
    }`
  );
  console.log(`  mode:        ${options.dryRun ? "DRY-RUN" : "WRITE"}`);
  console.log("");

  if (options.dryRun) {
    console.log("Folders that would be created:");
    for (const f of plan.folders) console.log(`  + ${f}`);
    console.log("\nFiles that would be created:");
    for (const f of plan.files) {
      const marker = plan.conflicts.includes(f) ? "!" : "+";
      console.log(`  ${marker} ${f.path}`);
    }
  }
}

function printPostSummary(result: InitResult): void {
  console.log("");
  console.log("Done.");
  console.log(`  folders created: ${result.foldersCreated}`);
  console.log(`  files written:   ${result.filesWritten}`);
  if (result.filesSkipped > 0) {
    console.log(`  files skipped:   ${result.filesSkipped} (existing)`);
  }
  console.log("");
  console.log(`Next: open ${result.vaultRoot} in your LLM harness and run`);
  console.log("  /ideaverse-os build --phase=compass");
  console.log("");
}

function showDiff(conflict: FileWrite, vars: TemplateVars): void {
  const proposed = renderFile(conflict, vars);
  let existing = "";
  try {
    existing = readFileSync(conflict.path, "utf8");
  } catch {
    existing = "(unreadable)";
  }
  console.log("\n--- existing ---");
  console.log(existing.slice(0, 500) + (existing.length > 500 ? "\n... (truncated)" : ""));
  console.log("\n--- proposed ---");
  console.log(proposed.slice(0, 500) + (proposed.length > 500 ? "\n... (truncated)" : ""));
  console.log("");
}
