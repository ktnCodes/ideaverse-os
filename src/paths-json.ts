import type { TemplateVars } from "./templates.js";

/**
 * Build paths.json content programmatically. Avoids the brittleness of
 * string-substituting Windows paths into a JSON template (where backslashes
 * would be interpreted as JSON escape sequences and break parsing).
 */
export function buildPathsJson(vars: TemplateVars): string {
  const obj = {
    _schema: "ideaverse-os paths v1",
    _target: vars.PLATFORM_TARGET,
    _lastUpdated: `${vars.TODAY} (init)`,
    _doc:
      "Single source of truth for paths used across skills. Skills with hardcoded paths " +
      "should read this file and substitute fieldName placeholders into commands. " +
      "To support a new platform (Mac, Linux, or work-Win), either swap this file's " +
      "contents on that machine, or add a platforms.{name} block and have skills detect " +
      "platform via uname / $OSTYPE / vault_root probing.",
    _consumedBy: [
      "60-skills/ideaverse-os",
      "60-skills/cortex-compile",
      "60-skills/cortex-lint",
      "60-skills/cortex-connect",
      "60-skills/web-clip-report",
      "60-skills/yt-light-research",
    ],
    vaultRoot: vars.VAULT_ROOT_ABSOLUTE,
    shell: vars.SHELL,
    platforms: {
      wsl: {
        _target: "wsl-linux",
        _doc:
          "WSL paths if you use this vault from a Linux WSL terminal. Skills should " +
          "detect platform via uname and read this block when on Linux. Fill in if " +
          "relevant; leave as null otherwise.",
        vaultRoot: null,
        workspaceRoot: null,
        shell: "bash",
      },
    },
  };
  return JSON.stringify(obj, null, 2) + "\n";
}
