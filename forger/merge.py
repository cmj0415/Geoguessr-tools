#!/usr/bin/env python3

import argparse
import json
import math
import re
import sys
from pathlib import Path
from typing import Any


Point = list[float]
SCRIPT_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = SCRIPT_DIR / "out"
RESULT_PATH = SCRIPT_DIR / "res.geojson"
NUMBERED_GEOJSON = re.compile(r"^(\d+)\.geojson$")


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


def find_numbered_lines(directory: Path) -> list[Path]:
    try:
        entries = list(directory.iterdir())
    except OSError as error:
        raise ValueError(f"cannot read {directory}: {error}") from error

    numbered_paths: list[tuple[int, Path]] = []
    seen_numbers: dict[int, Path] = {}

    for path in entries:
        if not path.is_file():
            continue

        match = NUMBERED_GEOJSON.fullmatch(path.name)
        if not match:
            continue

        number = int(match.group(1))
        if number in seen_numbers:
            raise ValueError(
                f"{path} and {seen_numbers[number]} have the same numeric filename"
            )

        seen_numbers[number] = path
        numbered_paths.append((number, path))

    if not numbered_paths:
        raise ValueError(f"{directory} contains no numerically named GeoJSON files")

    numbered_paths.sort(key=lambda item: item[0])
    return [path for _, path in numbered_paths]


def build_parser() -> argparse.ArgumentParser:
    return argparse.ArgumentParser(
        description=(
            "Merge numerically named LineString files from out/ into res.geojson."
        )
    )


def main() -> int:
    build_parser().parse_args()

    try:
        paths = find_numbered_lines(OUTPUT_DIR)
        lines = [load_linestring(path) for path in paths]
        ring = merge_lines(lines)

        feature = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [ring],
            },
        }

        with RESULT_PATH.open("w", encoding="utf-8") as output_file:
            json.dump(feature, output_file, indent=2)
            output_file.write("\n")
    except ValueError as error:
        print(f"merge.py: error: {error}", file=sys.stderr)
        return 1
    except OSError as error:
        print(f"merge.py: error: cannot write {RESULT_PATH}: {error}", file=sys.stderr)
        return 1

    print(RESULT_PATH)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
