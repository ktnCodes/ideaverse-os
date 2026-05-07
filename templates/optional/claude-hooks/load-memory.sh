#!/usr/bin/env bash
# load-memory.sh -- ideaverse-os Claude Code hook
# Event: UserPromptSubmit
# Injects a compact summary of the lean 6 files before every prompt.
# Keeps the LLM grounded in identity, priorities, and workflow on every turn.
#
# Registered via build --phase=optional-layers.
# Vault root is substituted during Phase 5 compilation.
#
# NOTE: This outputs to stdout. Claude Code's UserPromptSubmit hook prepends
# stdout to the user's prompt. Keep output lean -- large injections slow responses.

VAULT_ROOT="{{VAULT_ROOT}}"
OS_DIR="$VAULT_ROOT/00-agentic-OS"

# Inject memory.md only if it exists and is non-empty
if [[ -s "$OS_DIR/memory.md" ]]; then
  echo "--- memory (auto-injected) ---"
  # Only recent entries: last 30 lines to stay lean
  tail -30 "$OS_DIR/memory.md"
  echo "--- end memory ---"
fi
