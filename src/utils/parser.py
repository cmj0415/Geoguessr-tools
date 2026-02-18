#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import json
import xml.etree.ElementTree as ET
from collections import OrderedDict

def strip_ns(tag: str) -> str:
    """Turn '{namespace}tag' into 'tag'."""
    if '}' in tag:
        return tag.split('}', 1)[1]
    return tag

def parse_svg(svg_path: str) -> OrderedDict:
    tree = ET.parse(svg_path)
    root = tree.getroot()

    result: OrderedDict[str, list[str]] = OrderedDict()

    # Iterate all <g> that has a class attribute
    for g in root.iter():
        if strip_ns(g.tag) != "g":
            continue

        province = g.attrib.get("province")
        if not province:
            continue

        # You said province name is in <g class="ProvinceName">
        # If there are multiple classes, we keep the first as the key by default.
        if not province:
            continue

        # Collect all descendant elements under this <g> that have class attribute
        counties: list[str] = []
        seen = set()

        for node in g.iter():
            if node is g:
                continue
            # Most of your targets are <path class="CountyName" ... />
            # But this also works if it's <polygon>, <rect>, etc.
            cls = node.attrib.get("regency")
            if not cls:
                continue
            if cls not in seen:
                seen.add(cls)
                counties.append(cls)

        # Only add if we found children classes
        if counties:
            result[province] = counties

    return result

def main():
    ap = argparse.ArgumentParser(description="Parse SVG <g class=...> to province->counties mapping.")
    ap.add_argument("svg", help="Input SVG file path")
    ap.add_argument("-o", "--out", default="", help="Output file path (default: stdout)")
    ap.add_argument("--js", action="store_true", help="Output as JS object literal instead of JSON")
    args = ap.parse_args()

    mapping = parse_svg(args.svg)

    if args.js:
        # JS object literal string
        # (still valid JSON-ish, but without quotes requirement differences)
        s = "{\n" + ",".join(
            f'  "{k}": {json.dumps(v, ensure_ascii=False)}' for k, v in mapping.items()
        ) + "\n}\n"
    else:
        s = json.dumps(mapping, ensure_ascii=False, indent=2) + "\n"

    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(s)
    else:
        print(s, end="")

if __name__ == "__main__":
    main()