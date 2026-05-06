import { platform } from "node:os";

export type PlatformTarget =
  | "windows-personal"
  | "macos"
  | "linux"
  | "wsl";

export type Shell = "powershell" | "cmd" | "bash" | "zsh" | "sh";

export function detectPlatform(): PlatformTarget {
  const p = platform();
  if (p === "win32") return "windows-personal";
  if (p === "darwin") return "macos";
  if (p === "linux") {
    if (process.env.WSL_DISTRO_NAME) return "wsl";
    return "linux";
  }
  return "linux";
}

export function detectShell(): Shell {
  if (platform() === "win32") {
    const comspec = process.env.ComSpec ?? "";
    if (comspec.toLowerCase().includes("powershell")) return "powershell";
    return "powershell";
  }
  const sh = process.env.SHELL ?? "";
  if (sh.endsWith("zsh")) return "zsh";
  if (sh.endsWith("bash")) return "bash";
  return "sh";
}
