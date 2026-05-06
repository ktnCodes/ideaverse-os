import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export type TemplateVars = {
  USER_NAME: string;
  VAULT_NAME: string;
  TODAY: string;
  PLATFORM_TARGET: string;
  VAULT_ROOT_ABSOLUTE: string;
  SHELL: string;
};

export function substitute(template: string, vars: TemplateVars): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{{${key}}}`, value);
  }
  return out;
}

export function packageRoot(): string {
  return join(__dirname, "..");
}

export function loadTemplate(relativePath: string): string {
  const path = join(packageRoot(), "templates", relativePath);
  return readFileSync(path, "utf8");
}

export function loadAndSubstitute(
  relativePath: string,
  vars: TemplateVars
): string {
  return substitute(loadTemplate(relativePath), vars);
}

export function defaultVars(args: {
  vaultName: string;
  vaultRoot: string;
  platformTarget: string;
  shell: string;
}): TemplateVars {
  return {
    USER_NAME: "user",
    VAULT_NAME: args.vaultName,
    TODAY: new Date().toISOString().slice(0, 10),
    PLATFORM_TARGET: args.platformTarget,
    VAULT_ROOT_ABSOLUTE: args.vaultRoot,
    SHELL: args.shell,
  };
}
