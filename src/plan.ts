import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

export const BUNDLED_SKILLS = [
  "ideaverse-os",
  "ideaverse-capture",
  "cortex-compile",
  "cortex-connect",
  "cortex-lint",
  "web-clip-report",
  "yt-light-research",
] as const;

function walkDir(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walkDir(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

export const SKELETON_FOLDERS = [
  "00-agentic-OS",
  "10-cortex",
  "40-raw",
  "50-research-library",
  "60-skills",
  "70-daily",
  "80-visualization",
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
  /** Type of file. "skill" files are copied without placeholder substitution. */
  kind: "lean" | "router" | "config" | "skill";
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

  // Skill files are dropped at TWO locations inside the scaffolded vault:
  //   1. 60-skills/<skill>/   -- harness-agnostic vault-resident copy.
  //                                      LLMs that read CLAUDE.md/AGENTS.md/etc.
  //                                      discover and follow the SKILL.md instructions.
  //   2. .claude/skills/<skill>/      -- Claude Code's project-local skill discovery.
  //                                      Enables the `/<skill>` slash command when
  //                                      Claude Code is run from this vault directory.
  //                                      Has no effect on Cursor/Aider/Codex/Gemini
  //                                      (they ignore .claude/).
  // Both copies are byte-identical. Two locations, one source of truth.
  const SKILL_TARGET_BASES = ["60-skills", ".claude/skills"] as const;

  const skillFiles: FileWrite[] = [];
  for (const skill of BUNDLED_SKILLS) {
    const skillRoot = join(PACKAGE_ROOT, "templates", "bundled-skills", skill);
    if (!existsSync(skillRoot)) continue;
    for (const abs of walkDir(skillRoot)) {
      const rel = relative(
        join(PACKAGE_ROOT, "templates"),
        abs
      ); // e.g., "bundled-skills/ideaverse-os/SKILL.md"
      const insideSkill = relative(skillRoot, abs); // e.g., "SKILL.md" or "reference/build-compass.md"
      for (const base of SKILL_TARGET_BASES) {
        skillFiles.push({
          path: join(target, base, skill, insideSkill),
          templatePath: rel.replaceAll("\\", "/"),
          kind: "skill",
        });
      }
    }
  }

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
    ...skillFiles,
  ];

  const conflicts = files.filter((f) => existsSync(f.path));

  return { vaultRoot: target, folders, files, conflicts };
}
