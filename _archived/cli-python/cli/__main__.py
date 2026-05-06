"""CLI entry point for ideaverse-setup."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from .scaffold import scaffold_vault


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(
        prog="ideaverse-setup",
        description="Bootstrap an LLM-ready Obsidian vault with structured routing, "
                    "identity dossier, and daily workflow.",
    )
    parser.add_argument(
        "vault_path",
        type=Path,
        help="Absolute path where the vault should be created.",
    )
    parser.add_argument(
        "--name",
        default="MyIdeaverse",
        help="Display name for the vault (default: MyIdeaverse).",
    )
    parser.add_argument(
        "--user",
        required=True,
        help="Your name (used in routing files and me.md).",
    )
    parser.add_argument(
        "--no-fonts",
        action="store_true",
        help="Skip font download and installation.",
    )

    args = parser.parse_args(argv)

    vault = args.vault_path.resolve()
    vault.mkdir(parents=True, exist_ok=True)

    scaffold_vault(
        vault=vault,
        user_name=args.user,
        vault_name=args.name,
        install_fonts=not args.no_fonts,
    )


if __name__ == "__main__":
    main()
