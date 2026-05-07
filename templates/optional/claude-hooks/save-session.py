#!/usr/bin/env python3
"""
save-session.py -- ideaverse-os Claude Code hook
Event: Stop
Appends a one-line session summary to today's daily note.

Requires: Python 3.9+, ollama Python package (pip install ollama)
Ollama model: llama3 (or any model you have pulled locally)

Registered via build --phase=optional-layers.
Vault root is substituted during Phase 5 compilation.
"""

import os
import sys
import json
import datetime

VAULT_ROOT = "{{VAULT_ROOT}}"
OLLAMA_MODEL = "llama3"


def daily_note_path() -> str:
    today = datetime.date.today().strftime("%Y-%m-%d")
    return os.path.join(VAULT_ROOT, "70-daily", f"{today}.md")


def summarize(transcript: str) -> str:
    """Ask local Ollama to produce a one-line session summary."""
    try:
        import ollama  # type: ignore

        resp = ollama.chat(
            model=OLLAMA_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Summarize this session in one sentence (max 120 chars). "
                        "Focus on what changed or was decided. No preamble.\n\n"
                        + transcript[:4000]
                    ),
                }
            ],
        )
        return resp["message"]["content"].strip()
    except Exception as exc:
        return f"[session-summary unavailable: {exc}]"


def main() -> None:
    # Claude Code passes session data as JSON on stdin for Stop hooks
    raw = sys.stdin.read().strip()
    transcript = ""
    if raw:
        try:
            data = json.loads(raw)
            # transcript field varies by Claude Code version; try common keys
            transcript = data.get("transcript") or data.get("messages") or raw
            if not isinstance(transcript, str):
                transcript = json.dumps(transcript)
        except json.JSONDecodeError:
            transcript = raw

    summary = summarize(transcript)

    note_path = daily_note_path()
    os.makedirs(os.path.dirname(note_path), exist_ok=True)

    timestamp = datetime.datetime.now().strftime("%H:%M")
    line = f"\n- {timestamp} session: {summary}\n"

    with open(note_path, "a", encoding="utf-8") as f:
        f.write(line)


if __name__ == "__main__":
    main()
