#!/usr/bin/env python3
"""Build deduplicated asset manifest from Resources/webflow/ exports.

Maps each image in *_files/ folders to a canonical path under assets/webflow/
(one file per SHA-256 hash). Does not modify Resources/.

Usage:
  python3 scripts/build-asset-manifest.py
  python3 scripts/build-asset-manifest.py --copy   # also copy unique files into assets/
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEBFLOW = ROOT / "Resources" / "webflow"
MANIFEST_PATH = ROOT / "assets" / "manifest.json"
IMG_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif", ".ico"}


def is_export_asset(path: Path) -> bool:
    if path.suffix.lower() not in IMG_EXT:
        return False
    return any(part.endswith("_files") for part in path.parts)


def file_hash(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def build_manifest() -> dict:
    entries: dict[str, dict] = {}
    lookup: dict[str, dict] = {}

    for path in sorted(WEBFLOW.rglob("*")):
        if not path.is_file() or not is_export_asset(path):
            continue

        data = path.read_bytes()
        digest = file_hash(data)
        source = path.relative_to(ROOT).as_posix()

        if digest not in entries:
            dest = f"assets/webflow/{digest[:8]}/{path.name}"
            entries[digest] = {
                "hash": digest,
                "size": len(data),
                "dest": dest,
                "sources": [source],
            }
        else:
            entries[digest]["sources"].append(source)

        lookup[source] = {"hash": digest, "dest": entries[digest]["dest"]}

    unique = list(entries.values())
    duplicate_savings = sum(e["size"] * (len(e["sources"]) - 1) for e in unique)

    return {
        "generated_from": "Resources/webflow/",
        "total_unique": len(unique),
        "total_references": len(lookup),
        "duplicate_savings_bytes": duplicate_savings,
        "assets": sorted(unique, key=lambda e: e["dest"]),
        "lookup": lookup,
    }


def copy_assets(manifest: dict) -> int:
    copied = 0
    for entry in manifest["assets"]:
        dest = ROOT / entry["dest"]
        if dest.exists():
            continue
        src = ROOT / entry["sources"][0]
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        copied += 1
    return copied


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--copy",
        action="store_true",
        help="Copy unique assets into assets/webflow/ (idempotent)",
    )
    args = parser.parse_args()

    if not WEBFLOW.is_dir():
        print(f"Missing {WEBFLOW}", file=sys.stderr)
        return 1

    manifest = build_manifest()
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    savings_kb = manifest["duplicate_savings_bytes"] // 1024
    print(
        f"Wrote {MANIFEST_PATH.relative_to(ROOT)} — "
        f"{manifest['total_unique']} unique, "
        f"{manifest['total_references']} references, "
        f"~{savings_kb}KB duplicate savings"
    )

    if args.copy:
        n = copy_assets(manifest)
        print(f"Copied {n} new files into assets/webflow/")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
