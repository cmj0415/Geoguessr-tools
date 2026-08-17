export type LabelPoint = {
  x: number
  y: number
}

export type ProjectedPolygon = LabelPoint[][]

export type PreparedLabelFeature = {
  candidates: LabelPoint[]
  fallback: LabelPoint
  width: number
  height: number
  area: number
}

type Rectangle = {
  left: number
  right: number
  top: number
  bottom: number
}

type PolylabelCell = {
  x: number
  y: number
  halfSize: number
  distance: number
  maximum: number
}

const LABEL_GAP = 6
const COLLISION_GRID_SIZE = 32
const MAX_CANDIDATE_RADIUS = 256

function squaredDistanceToSegment(
  point: LabelPoint,
  start: LabelPoint,
  end: LabelPoint
) {
  let x = start.x
  let y = start.y
  let dx = end.x - x
  let dy = end.y - y

  if (dx !== 0 || dy !== 0) {
    const ratio =
      ((point.x - x) * dx + (point.y - y) * dy) / (dx * dx + dy * dy)
    if (ratio > 1) {
      x = end.x
      y = end.y
    } else if (ratio > 0) {
      x += dx * ratio
      y += dy * ratio
    }
  }

  dx = point.x - x
  dy = point.y - y
  return dx * dx + dy * dy
}

function isPointInRing(point: LabelPoint, ring: LabelPoint[]) {
  let inside = false

  for (
    let index = 0, previous = ring.length - 1;
    index < ring.length;
    previous = index++
  ) {
    const currentPoint = ring[index]
    const previousPoint = ring[previous]
    const crossesRay =
      currentPoint.y > point.y !== previousPoint.y > point.y &&
      point.x <
        ((previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)) /
          (previousPoint.y - currentPoint.y) +
          currentPoint.x
    if (crossesRay) inside = !inside
  }

  return inside
}

export function isPointInProjectedPolygon(
  point: LabelPoint,
  polygon: ProjectedPolygon
) {
  if (!polygon[0] || !isPointInRing(point, polygon[0])) return false
  return polygon.slice(1).every((hole) => !isPointInRing(point, hole))
}

function getPointToPolygonDistance(
  point: LabelPoint,
  polygon: ProjectedPolygon
) {
  let minimumSquaredDistance = Infinity

  polygon.forEach((ring) => {
    for (
      let index = 0, previous = ring.length - 1;
      index < ring.length;
      previous = index++
    ) {
      minimumSquaredDistance = Math.min(
        minimumSquaredDistance,
        squaredDistanceToSegment(point, ring[index], ring[previous])
      )
    }
  })

  const distance = Math.sqrt(minimumSquaredDistance)
  return isPointInProjectedPolygon(point, polygon) ? distance : -distance
}

function createCell(
  x: number,
  y: number,
  halfSize: number,
  polygon: ProjectedPolygon
): PolylabelCell {
  const distance = getPointToPolygonDistance({ x, y }, polygon)
  return {
    x,
    y,
    halfSize,
    distance,
    maximum: distance + halfSize * Math.SQRT2,
  }
}

class MaximumHeap {
  private cells: PolylabelCell[] = []

  get size() {
    return this.cells.length
  }

  push(cell: PolylabelCell) {
    this.cells.push(cell)
    let index = this.cells.length - 1

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (this.cells[parentIndex].maximum >= cell.maximum) break
      this.cells[index] = this.cells[parentIndex]
      index = parentIndex
    }
    this.cells[index] = cell
  }

  pop() {
    const top = this.cells[0]
    const last = this.cells.pop()
    if (!last || this.cells.length === 0) return top

    let index = 0
    while (true) {
      const left = index * 2 + 1
      const right = left + 1
      if (left >= this.cells.length) break
      const largerChild =
        right < this.cells.length &&
        this.cells[right].maximum > this.cells[left].maximum
          ? right
          : left
      if (this.cells[largerChild].maximum <= last.maximum) break
      this.cells[index] = this.cells[largerChild]
      index = largerChild
    }
    this.cells[index] = last
    return top
  }
}

function getRingBounds(ring: LabelPoint[]) {
  return ring.reduce(
    (bounds, point) => ({
      left: Math.min(bounds.left, point.x),
      right: Math.max(bounds.right, point.x),
      top: Math.min(bounds.top, point.y),
      bottom: Math.max(bounds.bottom, point.y),
    }),
    { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity }
  )
}

function getRingArea(ring: LabelPoint[]) {
  let area = 0
  for (
    let index = 0, previous = ring.length - 1;
    index < ring.length;
    previous = index++
  ) {
    area += ring[previous].x * ring[index].y - ring[index].x * ring[previous].y
  }
  return Math.abs(area / 2)
}

function getCentroidCell(polygon: ProjectedPolygon) {
  const ring = polygon[0]
  let areaFactor = 0
  let x = 0
  let y = 0

  for (
    let index = 0, previous = ring.length - 1;
    index < ring.length;
    previous = index++
  ) {
    const factor =
      ring[previous].x * ring[index].y - ring[index].x * ring[previous].y
    x += (ring[previous].x + ring[index].x) * factor
    y += (ring[previous].y + ring[index].y) * factor
    areaFactor += factor * 3
  }

  if (areaFactor === 0) return createCell(ring[0].x, ring[0].y, 0, polygon)
  return createCell(x / areaFactor, y / areaFactor, 0, polygon)
}

export function findInteriorLabelPoint(
  polygon: ProjectedPolygon,
  precision = 4
) {
  const bounds = getRingBounds(polygon[0])
  const width = bounds.right - bounds.left
  const height = bounds.bottom - bounds.top
  const cellSize = Math.min(width, height)
  if (cellSize <= 0) return polygon[0][0]

  const heap = new MaximumHeap()
  const halfSize = cellSize / 2
  for (let x = bounds.left; x < bounds.right; x += cellSize) {
    for (let y = bounds.top; y < bounds.bottom; y += cellSize) {
      heap.push(createCell(x + halfSize, y + halfSize, halfSize, polygon))
    }
  }

  let bestCell = getCentroidCell(polygon)
  const boundsCell = createCell(
    (bounds.left + bounds.right) / 2,
    (bounds.top + bounds.bottom) / 2,
    0,
    polygon
  )
  if (boundsCell.distance > bestCell.distance) bestCell = boundsCell

  let iterations = 0
  while (heap.size > 0 && iterations < 10000) {
    const cell = heap.pop()
    if (!cell) break
    iterations += 1

    if (cell.distance > bestCell.distance) bestCell = cell
    if (cell.maximum - bestCell.distance <= precision) continue

    const nextHalfSize = cell.halfSize / 2
    heap.push(
      createCell(
        cell.x - nextHalfSize,
        cell.y - nextHalfSize,
        nextHalfSize,
        polygon
      )
    )
    heap.push(
      createCell(
        cell.x + nextHalfSize,
        cell.y - nextHalfSize,
        nextHalfSize,
        polygon
      )
    )
    heap.push(
      createCell(
        cell.x - nextHalfSize,
        cell.y + nextHalfSize,
        nextHalfSize,
        polygon
      )
    )
    heap.push(
      createCell(
        cell.x + nextHalfSize,
        cell.y + nextHalfSize,
        nextHalfSize,
        polygon
      )
    )
  }

  return { x: bestCell.x, y: bestCell.y }
}

function orientation(first: LabelPoint, second: LabelPoint, third: LabelPoint) {
  const value =
    (second.y - first.y) * (third.x - second.x) -
    (second.x - first.x) * (third.y - second.y)
  if (Math.abs(value) < 1e-9) return 0
  return value > 0 ? 1 : 2
}

function segmentsIntersect(
  firstStart: LabelPoint,
  firstEnd: LabelPoint,
  secondStart: LabelPoint,
  secondEnd: LabelPoint
) {
  const firstOrientation = orientation(firstStart, firstEnd, secondStart)
  const secondOrientation = orientation(firstStart, firstEnd, secondEnd)
  const thirdOrientation = orientation(secondStart, secondEnd, firstStart)
  const fourthOrientation = orientation(secondStart, secondEnd, firstEnd)
  return (
    firstOrientation !== secondOrientation &&
    thirdOrientation !== fourthOrientation
  )
}

function getLabelRectangle(point: LabelPoint, width: number, height: number) {
  return {
    left: point.x - width / 2,
    right: point.x + width / 2,
    top: point.y - height / 2,
    bottom: point.y + height / 2,
  }
}

function isPointInRectangle(point: LabelPoint, rectangle: Rectangle) {
  return (
    point.x > rectangle.left &&
    point.x < rectangle.right &&
    point.y > rectangle.top &&
    point.y < rectangle.bottom
  )
}

export function doesLabelFitPolygon(
  point: LabelPoint,
  width: number,
  height: number,
  polygon: ProjectedPolygon
) {
  const rectangle = getLabelRectangle(
    point,
    width + LABEL_GAP,
    height + LABEL_GAP
  )
  const corners = [
    { x: rectangle.left, y: rectangle.top },
    { x: rectangle.right, y: rectangle.top },
    { x: rectangle.right, y: rectangle.bottom },
    { x: rectangle.left, y: rectangle.bottom },
  ]
  if (corners.some((corner) => !isPointInProjectedPolygon(corner, polygon))) {
    return false
  }

  const rectangleEdges = corners.map((corner, index) => [
    corner,
    corners[(index + 1) % corners.length],
  ])
  for (const ring of polygon) {
    if (ring.some((ringPoint) => isPointInRectangle(ringPoint, rectangle))) {
      return false
    }
    for (
      let index = 0, previous = ring.length - 1;
      index < ring.length;
      previous = index++
    ) {
      if (
        rectangleEdges.some(([start, end]) =>
          segmentsIntersect(start, end, ring[previous], ring[index])
        )
      ) {
        return false
      }
    }
  }

  return true
}

function getCandidatePoints(origin: LabelPoint, width: number, height: number) {
  const points = [origin]
  const step = Math.max(24, Math.min(width, height) + LABEL_GAP)
  const diagonalFactor = Math.SQRT1_2

  for (let radius = step; radius <= MAX_CANDIDATE_RADIUS; radius += step) {
    points.push(
      { x: origin.x, y: origin.y - radius },
      { x: origin.x + radius, y: origin.y },
      { x: origin.x, y: origin.y + radius },
      { x: origin.x - radius, y: origin.y },
      {
        x: origin.x + radius * diagonalFactor,
        y: origin.y - radius * diagonalFactor,
      },
      {
        x: origin.x + radius * diagonalFactor,
        y: origin.y + radius * diagonalFactor,
      },
      {
        x: origin.x - radius * diagonalFactor,
        y: origin.y + radius * diagonalFactor,
      },
      {
        x: origin.x - radius * diagonalFactor,
        y: origin.y - radius * diagonalFactor,
      }
    )
  }

  return points
}

export function prepareLabelFeature(
  polygons: ProjectedPolygon[],
  width: number,
  height: number
): PreparedLabelFeature {
  const polygonOptions = polygons
    .map((polygon) => ({
      polygon,
      area: getRingArea(polygon[0]),
      interiorPoint: findInteriorLabelPoint(
        polygon,
        Math.max(4, Math.min(width, height) / 4)
      ),
    }))
    .sort((left, right) => right.area - left.area)
  const candidates = polygonOptions.flatMap(({ polygon, interiorPoint }) =>
    getCandidatePoints(interiorPoint, width, height).filter((point) =>
      doesLabelFitPolygon(point, width, height, polygon)
    )
  )

  return {
    candidates,
    fallback: polygonOptions[0].interiorPoint,
    width,
    height,
    area: polygonOptions.reduce((total, option) => total + option.area, 0),
  }
}

function getGridKey(x: number, y: number) {
  return `${x}:${y}`
}

function getRectangleGridKeys(rectangle: Rectangle) {
  const minX = Math.floor(rectangle.left / COLLISION_GRID_SIZE)
  const maxX = Math.floor(rectangle.right / COLLISION_GRID_SIZE)
  const minY = Math.floor(rectangle.top / COLLISION_GRID_SIZE)
  const maxY = Math.floor(rectangle.bottom / COLLISION_GRID_SIZE)
  const keys: string[] = []

  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      keys.push(getGridKey(x, y))
    }
  }
  return keys
}

function rectanglesOverlap(left: Rectangle, right: Rectangle) {
  return !(
    left.right + LABEL_GAP <= right.left ||
    left.left >= right.right + LABEL_GAP ||
    left.bottom + LABEL_GAP <= right.top ||
    left.top >= right.bottom + LABEL_GAP
  )
}

export function placePreparedLabelFeatures(features: PreparedLabelFeature[]) {
  const placements = features.map<LabelPoint>(() => ({ x: 0, y: 0 }))
  const rectangles: Rectangle[] = []
  const rectangleGrid = new Map<string, number[]>()
  const orderedIndices = features
    .map((_, index) => index)
    .sort(
      (left, right) =>
        features[left].candidates.length - features[right].candidates.length ||
        features[left].area - features[right].area ||
        left - right
    )

  orderedIndices.forEach((featureIndex) => {
    const feature = features[featureIndex]
    const possiblePoints =
      feature.candidates.length > 0 ? feature.candidates : [feature.fallback]
    const point =
      possiblePoints.find((candidate) => {
        const rectangle = getLabelRectangle(
          candidate,
          feature.width,
          feature.height
        )
        const collisionIndices = new Set<number>()
        getRectangleGridKeys(rectangle).forEach((key) => {
          rectangleGrid
            .get(key)
            ?.forEach((index) => collisionIndices.add(index))
        })
        return Array.from(collisionIndices).every(
          (index) => !rectanglesOverlap(rectangle, rectangles[index])
        )
      }) ?? possiblePoints[0]

    placements[featureIndex] = point
    const rectangle = getLabelRectangle(point, feature.width, feature.height)
    const rectangleIndex = rectangles.push(rectangle) - 1
    getRectangleGridKeys(rectangle).forEach((key) => {
      const indices = rectangleGrid.get(key) ?? []
      indices.push(rectangleIndex)
      rectangleGrid.set(key, indices)
    })
  })

  return placements
}

export function getProjectedPolygons(
  feature: unknown,
  project: (latitude: number, longitude: number) => LabelPoint
) {
  if (typeof feature !== 'object' || feature === null) return []
  const geometry = (feature as { geometry?: unknown }).geometry
  if (typeof geometry !== 'object' || geometry === null) return []
  const typedGeometry = geometry as { type?: unknown; coordinates?: unknown }

  const projectRing = (ring: unknown) => {
    if (!Array.isArray(ring)) return []
    return ring.flatMap((position) => {
      if (!Array.isArray(position)) return []
      const [longitude, latitude] = position
      if (typeof longitude !== 'number' || typeof latitude !== 'number')
        return []
      return [project(latitude, longitude)]
    })
  }
  const projectPolygon = (polygon: unknown) => {
    if (!Array.isArray(polygon)) return []
    return polygon.map(projectRing).filter((ring) => ring.length >= 3)
  }

  if (typedGeometry.type === 'Polygon') {
    const polygon = projectPolygon(typedGeometry.coordinates)
    return polygon.length > 0 ? [polygon] : []
  }
  if (
    typedGeometry.type === 'MultiPolygon' &&
    Array.isArray(typedGeometry.coordinates)
  ) {
    return typedGeometry.coordinates
      .map(projectPolygon)
      .filter((polygon) => polygon.length > 0)
  }
  return []
}

export function getSelectedAnswerLabels(
  featureIds: string[],
  selectedIds: ReadonlySet<string>,
  labelsById: ReadonlyMap<string, string>
) {
  const labels = new Set<string>()
  featureIds.forEach((id) => {
    if (!selectedIds.has(id)) return
    const label = labelsById.get(id)
    if (label) labels.add(label)
  })
  return Array.from(labels)
}
