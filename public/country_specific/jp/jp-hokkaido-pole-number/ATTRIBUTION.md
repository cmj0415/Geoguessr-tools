# Hokkaido Pole Number Data Attribution

The land-qualified question pool in `cells.json` was generated from the
Hokkaido feature in the project's `public/jpprefecture.geojson` map. Detached
features belonging to the Russian-administered Northern Territories were
excluded from the pool.

Hokkaido Electric Power Network documents the six two-digit pairs displayed on
its pole plates:

- https://www.hepco.co.jp/network/electric_life/service/location_info/index.html

The grid hierarchy, Tokyo Datum coordinates, and approximate Tokyo Datum to
WGS84 conversion formulas follow this technical reference:

- https://haiden.x0.com/denkangikyo/technical/pole-number-calc.php
