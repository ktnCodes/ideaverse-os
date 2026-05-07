#!/usr/bin/env bash
# session-start.sh -- ideaverse-os Claude Code hook
# Event: SessionStart
# Prints the current compass.md top-priority line into the session banner
# so every new session opens with the active priority filter visible.
#
# Registered via build --phase=optional-layers.
# Vault root is substituted during Phase 5 compilation.

VAULT_ROOT="{{VAULT_ROOT}}"
COMPASS="$VAULT_ROOT/00-agentic-OS/compass.md"

if [[ -f "$COMPASS" ]]; then
  echo "=== compass: this week ==="
  # Print from "### This week" through the next blank line or next heading
  awk '/^### This week/{p=1} p && /^---/{exit} p{print}' "$COMPASS" | head -10
  echo "=========================="
fi
