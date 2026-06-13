#!/usr/bin/env python3

import argparse
import json
import math
import sys
from pathlib import Path
from typing import Any


Point = list[float]


def parse_point(value: str) -> Point:
    try:
        point = json.loads(value)
    except json.JSONDecodeError as error:
        raise argparse.ArgumentTypeError(
            f"{value!r} is not a valid JSON point"
        ) from error

    if (
        not isinstance(point, list)
        or len(point) != 2
        or any(
            not isinstance(coordinate, (int, float))
            or isinstance(coordinate, bool)
            or not math.isfinite(coordinate)
            for coordinate in point
        )
    ):
        raise argparse.ArgumentTypeError(
            f"{value!r} must have the form [lng, lat] with finite numbers"
        )

    return point


def load_exterior_ring(path: Path) -> list[Point]:
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
    if not isinstance(geometry, dict) or geometry.get("type") != "Polygon":
        raise ValueError("input feature geometry must be a Polygon")

    coordinates = geometry.get("coordinates")
    if (
        not isinstance(coordinates, list)
        or not coordinates
        or not isinstance(coordinates[0], list)
    ):
        raise ValueError("polygon must contain an exterior ring")

    ring = coordinates[0]
    for coordinate in ring:
        if (
            not isinstance(coordinate, list)
            or len(coordinate) < 2
            or any(
                not isinstance(value, (int, float))
                or isinstance(value, bool)
                or not math.isfinite(value)
                for value in coordinate[:2]
            )
        ):
            raise ValueError("polygon ring contains an invalid coordinate")

    if len(ring) >= 2 and ring[0] == ring[-1]:
        ring = ring[:-1]

    if len(ring) < 3:
        raise ValueError("polygon exterior ring must contain at least 3 vertices")

    return ring


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
    ring: list[Point], start: Point, end: Point, pass_through: Point
) -> list[Point]:
    start_index = nearest_index(ring, start)
    end_index = nearest_index(ring, end)
    pass_index = nearest_index(ring, pass_through)

    if start_index == end_index:
        raise ValueError("point1 and point2 snap to the same polygon vertex")
    if pass_index in (start_index, end_index):
        raise ValueError(
            "point3 snaps to an endpoint and therefore does not select a unique path"
        )

    forward_path, forward_indices = path_between(
        ring, start_index, end_index, step=1
    )
    backward_path, backward_indices = path_between(
        ring, start_index, end_index, step=-1
    )

    if pass_index in forward_indices:
        return forward_path
    if pass_index in backward_indices:
        return backward_path

    raise ValueError("point3 does not lie on either path between the endpoints")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Extract a path along a GeoJSON polygon boundary. Points are snapped "
            "to polygon vertices using Manhattan distance."
        )
    )
    parser.add_argument("geojson_file", type=Path)
    parser.add_argument("point1", type=parse_point, help='start point, e.g. "[-83,29]"')
    parser.add_argument("point2", type=parse_point, help='end point, e.g. "[-82,30]"')
    parser.add_argument(
        "point3", type=parse_point, help='pass-through point, e.g. "[-81,29]"'
    )
    return parser


def main() -> int:
    args = build_parser().parse_args()

    try:
        ring = load_exterior_ring(args.geojson_file)
        coordinates = extract_line(ring, args.point1, args.point2, args.point3)
    except ValueError as error:
        print(f"extract.py: error: {error}", file=sys.stderr)
        return 1

    feature = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "LineString",
            "coordinates": coordinates,
        },
    }
    json.dump(feature, sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
