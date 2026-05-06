import { existsSync } from "node:fs";
import { join } from "node:path";

export const SKELETON_FOLDERS = [
  "00-agentic-OS",
  "10-cortex",
  "40-raw",
  "50-research-library",
  "60-skills/_shared",
  "70-daily",
  "80-visualization",
  "90-copilot",
  "99-archive",
] as const;

export const LEAN_FILES = [
  "soul.md",
  "me.md",
  "user.md",
  "compass.md",
  "memory.md",
  "runbook.md",
] as const;

export const ROUTER_FILES = [
  "CLAUDE.md",
  "GEMINI.md",
  "AGENTS.md",
  ".cursorrules",
  "AIDER_CONVENTIONS.md",
] as const;

export type FileWrite = {
  /** Absolute target path */
  path: string;
  /** Source template path relative to templates/ */
  templatePath: string;
  /** "lean" | "router" | "config" */
  kind: "lean" | "router" | "config";
};

export type ScaffoldPlan = {
  vaultRoot: string;
  folders: string[];
  files: FileWrite[];
  /** Files that already exist at target -- conflicts to resolve */
  conflicts: FileWrite[];
};

/**
 * Compute the full set of folders + files that init would create at `target`.
 * Identifies conflicts (existing files we'd overwrite).
 */
export function planScaffold(target: string): ScaffoldPlan {
  const folders = SKELETON_FOLDERS.map((rel) => join(target, rel));

  const files: FileWrite[] = [
    ...LEAN_FILES.map<FileWrite>((name) => ({
      path: join(target, "00-agentic-OS", name),
      templatePath: `lean-files/${name}.tmpl`,
      kind: "lean",
    })),
    ...ROUTER_FILES.map<FileWrite>((name) => ({
      path: join(target, name),
      templatePath: `router-files/${name}.tmpl`,
      kind: "router",
    })),
    {
      path: join(target, "00-agentic-OS", "paths.json"),
      templatePath: "paths.json.tmpl",
      kind: "config",
    },
    {
      path: join(target, ".gitignore"),
      templatePath: ".gitignore.tmpl",
      kind: "config",
    },
  ];

  const conflicts = files.filter((f) => existsSync(f.path));

  return { vaultRoot: target, folders, files, conflicts };
}
