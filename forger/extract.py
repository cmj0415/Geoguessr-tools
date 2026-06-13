#!/usr/bin/env python3

import argparse
import json
import math
import sys
from pathlib import Path
from typing import Any


Point = list[float]
SCRIPT_DIR = Path(__file__).resolve().parent
POLYGON_PATH = SCRIPT_DIR / "in" / "p.geojson"
LINE_PATH = SCRIPT_DIR / "in" / "l.geojson"
OUTPUT_DIR = SCRIPT_DIR / "out"


def validate_point(value: Any, source: Path) -> Point:
    if (
        not isinstance(value, list)
        or len(value) < 2
        or any(
            not isinstance(coordinate, (int, float))
            or isinstance(coordinate, bool)
            or not math.isfinite(coordinate)
            for coordinate in value
        )
    ):
        raise ValueError(
            f"{source}: coordinates must contain at least two finite numbers"
        )

    return value


def load_feature(path: Path) -> dict[str, Any]:
    try:
        with path.open(encoding="utf-8") as geojson_file:
            geojson: Any = json.load(geojson_file)
    except OSError as error:
        raise ValueError(f"cannot read {path}: {error}") from error
    except json.JSONDecodeError as error:
        raise ValueError(f"{path} is not valid JSON: {error}") from error

    if not isinstance(geojson, dict) or geojson.get("type") != "Feature":
        raise ValueError(f"{path}: input must be a GeoJSON Feature")

    return geojson


def load_exterior_ring(path: Path) -> list[Point]:
    geojson = load_feature(path)

    geometry = geojson.get("geometry")
    if not isinstance(geometry, dict) or geometry.get("type") != "Polygon":
        raise ValueError(f"{path}: feature geometry must be a Polygon")

    coordinates = geometry.get("coordinates")
    if (
        not isinstance(coordinates, list)
        or not coordinates
        or not isinstance(coordinates[0], list)
    ):
        raise ValueError(f"{path}: polygon must contain an exterior ring")

    ring = coordinates[0]
    for coordinate in ring:
        validate_point(coordinate, path)

    if len(ring) >= 2 and ring[0] == ring[-1]:
        ring = ring[:-1]

    if len(ring) < 3:
        raise ValueError(
            f"{path}: polygon exterior ring must contain at least 3 vertices"
        )

    return ring


def load_guide_points(path: Path) -> tuple[Point, Point, Point]:
    geojson = load_feature(path)

    geometry = geojson.get("geometry")
    if not isinstance(geometry, dict) or geometry.get("type") != "LineString":
        raise ValueError(f"{path}: feature geometry must be a LineString")

    coordinates = geometry.get("coordinates")
    if not isinstance(coordinates, list) or len(coordinates) != 3:
        raise ValueError(
            f"{path}: guide LineString must contain exactly 3 coordinates"
        )

    start, middle, end = (
        validate_point(coordinate, path) for coordinate in coordinates
    )
    return start, middle, end


def nearest_index(ring: list[Point], point: Point) -> int:
    lng, lat = point
    return min(
        range(len(ring)),
        key=lambda index: abs(ring[index][0] - lng) + abs(ring[index][1] - lat),
    )


def path_between(
    ring: list[Point], start_index: int, end_index: int, step: int
) -> tuple[list[Point], list[int]]:
    path = [ring[start_index]]
    indices = [start_index]
    index = start_index

    while index != end_index:
        index = (index + step) % len(ring)
        path.append(ring[index])
        indices.append(index)

    return path, indices


def extract_line(
    ring: list[Point], start: Point, middle: Point, end: Point
) -> list[Point]:
    start_index = nearest_index(ring, start)
    end_index = nearest_index(ring, end)
    middle_index = nearest_index(ring, middle)

    if start_index == end_index:
        raise ValueError("start and end points snap to the same polygon vertex")
    if middle_index in (start_index, end_index):
        raise ValueError(
            "middle point snaps to an endpoint and does not select a unique path"
        )

    forward_path, forward_indices = path_between(
        ring, start_index, end_index, step=1
    )
    backward_path, backward_indices = path_between(
        ring, start_index, end_index, step=-1
    )

    if middle_index in forward_indices:
        return forward_path
    if middle_index in backward_indices:
        return backward_path

    raise ValueError("middle point does not lie on either path between the endpoints")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Extract a polygon boundary path using in/p.geojson and the "
            "three-point guide in in/l.geojson."
        )
    )
    parser.add_argument(
        "number",
        type=int,
        help="output number; the result is written to out/<number>.geojson",
    )
    return parser


def main() -> int:
    args = build_parser().parse_args()

    try:
        if args.number < 0:
            raise ValueError("output number must be non-negative")

        ring = load_exterior_ring(POLYGON_PATH)
        start, middle, end = load_guide_points(LINE_PATH)
        coordinates = extract_line(ring, start, middle, end)

        feature = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": coordinates,
            },
        }

        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        output_path = OUTPUT_DIR / f"{args.number}.geojson"
        with output_path.open("w", encoding="utf-8") as output_file:
            json.dump(feature, output_file, indent=2)
            output_file.write("\n")
    except ValueError as error:
        print(f"extract.py: error: {error}", file=sys.stderr)
        return 1
    except OSError as error:
        print(f"extract.py: error: cannot write output: {error}", file=sys.stderr)
        return 1

    print(output_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
