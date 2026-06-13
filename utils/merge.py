#!/usr/bin/env python3

import argparse
import json
import math
import sys
from pathlib import Path
from typing import Any


Point = list[float]


def load_linestring(path: Path) -> list[Point]:
    try:
        with path.open(encoding="utf-8") as geojson_file:
            geojson: Any = json.load(geojson_file)
    except OSError as error:
        raise ValueError(f"cannot read {path}: {error}") from error
    except json.JSONDecodeError as error:
        raise ValueError(f"{path} is not valid JSON: {error}") from error

    if not isinstance(geojson, dict) or geojson.get("type") != "Feature":
        raise ValueError(f"{path}: input must be a GeoJSON Feature")

    geometry = geojson.get("geometry")
    if not isinstance(geometry, dict) or geometry.get("type") != "LineString":
        raise ValueError(f"{path}: feature geometry must be a LineString")

    coordinates = geometry.get("coordinates")
    if not isinstance(coordinates, list) or len(coordinates) < 2:
        raise ValueError(f"{path}: LineString must contain at least two coordinates")

    for coordinate in coordinates:
        if (
            not isinstance(coordinate, list)
            or len(coordinate) < 2
            or any(
                not isinstance(value, (int, float))
                or isinstance(value, bool)
                or not math.isfinite(value)
                for value in coordinate
            )
        ):
            raise ValueError(f"{path}: LineString contains an invalid coordinate")

    return coordinates


def merge_lines(lines: list[list[Point]]) -> list[Point]:
    ring: list[Point] = []

    for line in lines:
        if ring and ring[-1] == line[0]:
            ring.extend(line[1:])
        else:
            ring.extend(line)

    if ring[0] != ring[-1]:
        ring.append(ring[0])

    if len(ring) < 4:
        raise ValueError(
            "merged polygon ring must contain at least three points plus its closure"
        )

    return ring


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Merge GeoJSON LineString features, in argument order, into one "
            "Polygon feature."
        )
    )
    parser.add_argument(
        "geojson_files",
        type=Path,
        nargs="+",
        help="LineString GeoJSON files in polygon boundary order",
    )
    return parser


def main() -> int:
    args = build_parser().parse_args()

    try:
        lines = [load_linestring(path) for path in args.geojson_files]
        ring = merge_lines(lines)
    except ValueError as error:
        print(f"merge.py: error: {error}", file=sys.stderr)
        return 1

    feature = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [ring],
        },
    }
    json.dump(feature, sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
