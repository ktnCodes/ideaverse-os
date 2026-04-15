"""Font download and installation utilities."""

from __future__ import annotations

import platform
import shutil
import tempfile
import zipfile
from pathlib import Path

import requests


def _download_file(url: str, dest: Path) -> Path:
    """Download a file from *url* to *dest*. Returns the destination path."""
    resp = requests.get(url, timeout=60, allow_redirects=True)
    resp.raise_for_status()
    dest.write_bytes(resp.content)
    return dest


def _install_font_file(font_path: Path) -> None:
    """Copy a single .ttf file into the system font directory."""
    system = platform.system()
    if system == "Windows":
        fonts_dir = Path("C:/Windows/Fonts")
    elif system == "Darwin":
        fonts_dir = Path.home() / "Library" / "Fonts"
    else:
        fonts_dir = Path.home() / ".local" / "share" / "fonts"

    fonts_dir.mkdir(parents=True, exist_ok=True)
    dest = fonts_dir / font_path.name
    if not dest.exists():
        shutil.copy2(font_path, dest)
        print(f"  Installed {font_path.name}")
    else:
        print(f"  Already installed: {font_path.name}")


def install_ttf_urls(name: str, urls: list[str]) -> None:
    """Download TTF files from direct URLs and install them."""
    print(f"\n  Downloading {name}...")
    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        for url in urls:
            if url.endswith(".zip"):
                _install_from_zip(name, url, tmp_path)
            else:
                fname = url.rsplit("/", 1)[-1]
                local = _download_file(url, tmp_path / fname)
                _install_font_file(local)


def _install_from_zip(name: str, url: str, tmp_path: Path) -> None:
    """Download a zip archive, extract, and install all .ttf files matching *name*."""
    zip_path = tmp_path / "fonts.zip"
    _download_file(url, zip_path)
    extract_dir = tmp_path / "extracted"
    with zipfile.ZipFile(zip_path) as zf:
        zf.extractall(extract_dir)

    # For iA Writer Quattro S, look for the Quattro directory
    installed = 0
    for ttf in extract_dir.rglob("*.ttf"):
        if "Quattro" in ttf.parent.name or "Quattro" in ttf.name:
            _install_font_file(ttf)
            installed += 1

    # Fallback: if nothing matched the Quattro filter, install all ttfs
    if installed == 0:
        for ttf in extract_dir.rglob("*.ttf"):
            _install_font_file(ttf)


def install_all_fonts(font_urls: dict[str, list[str]]) -> None:
    """Install all fonts defined in the config."""
    print("\nInstalling fonts...")
    for name, urls in font_urls.items():
        install_ttf_urls(name, urls)
    print("\nFont installation complete.")
    print("Restart Obsidian after installation for fonts to take effect.")
