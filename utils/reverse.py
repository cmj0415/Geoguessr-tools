#!/usr/bin/env python3

import argparse
import json
import sys
from pathlib import Path
from typing import Any


def load_linestring_feature(path: Path) -> dict[str, Any]:
    try:
        with path.open(encoding="utf-8") as geojson_file:
            geojson: Any = json.load(geojson_file)
    except OSError as error:
        raise ValueError(f"cannot read {path}: {error}") from error
    except json.JSONDecodeError as error:
        raise ValueError(f"{path} is not valid JSON: {error}") from error

    if not isinstance(geojson, dict) or geojson.get("type") != "Feature":
        raise ValueError("input must be a GeoJSON Feature")

    geometry = geojson.get("geometry")
    if not isinstance(geometry, dict) or geometry.get("type") != "LineString":
        raise ValueError("input feature geometry must be a LineString")

    coordinates = geometry.get("coordinates")
    if not isinstance(coordinates, list) or len(coordinates) < 2:
        raise ValueError("LineString must contain at least two coordinates")

    for coordinate in coordinates:
        if not isinstance(coordinate, list) or len(coordinate) < 2:
            raise ValueError("LineString contains an invalid coordinate")

    return geojson


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Reverse the coordinate order of a GeoJSON LineString feature."
    )
    parser.add_argument("geojson_file", type=Path)
    return parser


def main() -> int:
    args = build_parser().parse_args()

    try:
        feature = load_linestring_feature(args.geojson_file)
    except ValueError as error:
        print(f"reverse.py: error: {error}", file=sys.stderr)
        return 1

    feature["geometry"]["coordinates"].reverse()
    json.dump(feature, sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
