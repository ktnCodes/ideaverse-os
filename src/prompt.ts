import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

export type ConflictAction = "overwrite" | "skip" | "abort" | "diff";

export async function ask(question: string): Promise<string> {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(question);
    return answer.trim();
  } finally {
    rl.close();
  }
}

export async function askConflict(
  filePath: string,
  conflictsRemaining: number
): Promise<ConflictAction> {
  const remaining =
    conflictsRemaining > 1 ? ` (${conflictsRemaining} conflicts left)` : "";
  while (true) {
    const answer = (
      await ask(
        `\nCONFLICT: ${filePath}${remaining}\n  [o]verwrite  [s]kip  [a]bort  [d]iff -> `
      )
    ).toLowerCase();

    if (answer === "o" || answer === "overwrite") return "overwrite";
    if (answer === "s" || answer === "skip") return "skip";
    if (answer === "a" || answer === "abort") return "abort";
    if (answer === "d" || answer === "diff") return "diff";

    console.log("  -> please type one of: o, s, a, d");
  }
}

export async function confirm(
  question: string,
  defaultYes = true
): Promise<boolean> {
  const hint = defaultYes ? "[Y/n]" : "[y/N]";
  const answer = (await ask(`${question} ${hint} -> `)).toLowerCase();
  if (answer === "") return defaultYes;
  return answer === "y" || answer === "yes";
}
