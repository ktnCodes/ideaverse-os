#!/usr/bin/env node
/**
 * diff-detect.mjs
 *
 * Compare a lean file against its proposed lock file and print a line diff.
 * Exits 0 if identical, 1 if different or lock file is missing.
 *
 * Usage:
 *   node diff-detect.mjs <lean-file.md> [lock-file.md]
 *
 * If lock-file is omitted, infers <lean-file>.lock.md in the same directory.
 *
 * Example (run from vault root):
 *   node 60-skills/ideaverse-os/scripts/diff-detect.mjs \
 *     00-agentic-OS/user.md
 */

import { readFileSync } from "node:fs";
import process from "node:process";

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log("Usage: node diff-detect.mjs <lean-file.md> [lock-file.md]");
  console.log("  Compares the current lean file to its lock file.");
  console.log("  Exit 0 = identical.  Exit 1 = different or lock missing.");
  process.exit(0);
}

const leanPath = args[0];
const lockPath = args[1] ?? leanPath + ".lock.md";

function tryRead(path) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

const leanContent = tryRead(leanPath);
const lockContent = tryRead(lockPath);

if (leanContent === null) {
  console.error(`ERROR: lean file not found: ${leanPath}`);
  process.exit(1);
}

if (lockContent === null) {
  console.log(`No lock file found: ${lockPath}`);
  console.log(`The phase has not been run yet, or the lock was already promoted.`);
  console.log(`Run /ideaverse-os build --phase=<phase> to create a lock file.`);
  process.exit(1);
}

if (leanContent === lockContent) {
  console.log(`Identical -- lean file matches lock file. No changes.`);
  process.exit(0);
}

// Minimal LCS line diff -- good enough for lean files (<200 lines each)
const leanLines = leanContent.split("\n");
const lockLines = lockContent.split("\n");

console.log(`--- ${leanPath}  (current)`);
console.log(`+++ ${lockPath}  (proposed)`);
console.log("");

const ops = lcsBacktrack(leanLines, lockLines);
let hasChange = false;
for (const op of ops) {
  if (op.type === "remove") {
    process.stdout.write(`- ${op.text}\n`);
    hasChange = true;
  } else if (op.type === "add") {
    process.stdout.write(`+ ${op.text}\n`);
    hasChange = true;
  } else {
    process.stdout.write(`  ${op.text}\n`);
  }
}

if (hasChange) {
  console.log("");
  console.log("The proposed lock differs from the current lean file.");
  console.log("Review the diff above, then confirm [y]es / [n]o / [m]erge in your harness.");
  process.exit(1);
} else {
  // Whitespace-only diff (content equal but split differently) -- treat as identical
  console.log("Identical (whitespace only).");
  process.exit(0);
}

/**
 * Compute a Myers-style diff via LCS backtrack.
 * O(m*n) -- acceptable for lean files.
 */
function lcsBacktrack(a, b) {
  const m = a.length;
  const n = b.length;

  // Build LCS table
  const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // Backtrack to recover ops
  const ops = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      ops.push({ type: "same", text: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      ops.push({ type: "add", text: b[j - 1] });
      j--;
    } else {
      ops.push({ type: "remove", text: a[i - 1] });
      i--;
    }
  }

  return ops.reverse();
}
