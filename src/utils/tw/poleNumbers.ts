import proj4 from 'proj4'
import type { PoleCoordinates, PoleGridGeometry } from '../poleNumbers'

export {
  calculateAverageAccuracy,
  calculatePoleAccuracy,
  calculatePoleDistanceKm,
  formatPoleAccuracy,
  formatPoleDistance,
  shufflePoleCodes,
} from '../poleNumbers'
export type { PoleCoordinates, PoleGridGeometry } from '../poleNumbers'

export type PoleQuestionPool = {
  version: 1
  codes: string[]
}

export type PoleGridOrigin = {
  id: string
  label: string
  coordinates: PoleCoordinates
}

type ProjectedPoint = readonly [easting: number, northing: number]

type ProjectionId = 'mainland' | 'penghu' | 'kinmen' | 'matsu'

type SectorDefinition = {
  baseline: ProjectedPoint
  projection: ProjectionId
}

const WGS84 = '+proj=longlat +datum=WGS84 +no_defs'
const PROJECTIONS: Record<ProjectionId, string> = {
  mainland:
    '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=249172 +y_0=207 +ellps=WGS84 +units=m +no_defs',
  penghu:
    '+proj=tmerc +lat_0=0 +lon_0=119 +k=0.9999 +x_0=249172 +y_0=207 +ellps=WGS84 +units=m +no_defs',
  kinmen:
    '+proj=tmerc +lat_0=0 +lon_0=117 +k=0.9996 +x_0=-42160 +y_0=-205 +ellps=intl +towgs84=-637,-549,-203 +units=m +no_defs',
  matsu:
    '+proj=tmerc +lat_0=0 +lon_0=117 +k=0.9996 +x_0=-279825 +y_0=20830 +ellps=intl +towgs84=-637,-549,-203 +units=m +no_defs',
}

const SECTORS = {
  A: { baseline: [170000, 2750000], projection: 'mainland' },
  B: { baseline: [250000, 2750000], projection: 'mainland' },
  C: { baseline: [330000, 2750000], projection: 'mainland' },
  D: { baseline: [170000, 2700000], projection: 'mainland' },
  E: { baseline: [250000, 2700000], projection: 'mainland' },
  F: { baseline: [330000, 2700000], projection: 'mainland' },
  G: { baseline: [170000, 2650000], projection: 'mainland' },
  H: { baseline: [250000, 2650000], projection: 'mainland' },
  J: { baseline: [90000, 2600000], projection: 'mainland' },
  K: { baseline: [170000, 2600000], projection: 'mainland' },
  L: { baseline: [250000, 2600000], projection: 'mainland' },
  M: { baseline: [90000, 2550000], projection: 'mainland' },
  N: { baseline: [170000, 2550000], projection: 'mainland' },
  O: { baseline: [250000, 2550000], projection: 'mainland' },
  P: { baseline: [90000, 2500000], projection: 'mainland' },
  Q: { baseline: [170000, 2500000], projection: 'mainland' },
  R: { baseline: [250000, 2500000], projection: 'mainland' },
  S: { baseline: [10000, 2894000], projection: 'matsu' },
  T: { baseline: [170000, 2450000], projection: 'mainland' },
  U: { baseline: [250000, 2450000], projection: 'mainland' },
  V: { baseline: [170000, 2400000], projection: 'mainland' },
  W: { baseline: [250000, 2400000], projection: 'mainland' },
  X: { baseline: [275000, 2614000], projection: 'penghu' },
  Y: { baseline: [275000, 2564000], projection: 'penghu' },
  Z: { baseline: [10000, 2675800], projection: 'kinmen' },
} as const satisfies Record<string, SectorDefinition>

export const POLE_GRID_LETTERS = Object.keys(SECTORS)
const POLE_CODE_PATTERN = /^([A-HJ-Z])(\d{2})(\d{2})$/

function getSector(letter: string): SectorDefinition {
  const sector = (SECTORS as Record<string, SectorDefinition>)[letter]
  if (!sector) throw new Error(`Unsupported pole-grid letter: ${letter}`)
  return sector
}

function toWgs84(point: ProjectedPoint, projection: ProjectionId) {
  const [longitude, latitude] = proj4(PROJECTIONS[projection], WGS84, [
    point[0],
    point[1],
  ]) as number[]
  return [latitude, longitude] as const
}

function toPolygon(
  west: number,
  south: number,
  width: number,
  height: number,
  projection: ProjectionId
) {
  return [
    toWgs84([west, south], projection),
    toWgs84([west + width, south], projection),
    toWgs84([west + width, south + height], projection),
    toWgs84([west, south + height], projection),
  ]
}

function getCellSouthwest(
  letter: string,
  eastIndex: number,
  northIndex: number
) {
  const sector = getSector(letter)
  const normalizedEastIndex =
    letter === 'Z' ? 50 + ((eastIndex + 50) % 100) : eastIndex

  return {
    point: [
      sector.baseline[0] + normalizedEastIndex * 800,
      sector.baseline[1] + northIndex * 500,
    ] as ProjectedPoint,
    sector,
  }
}

export function isPoleNumberCode(value: unknown): value is string {
  return typeof value === 'string' && POLE_CODE_PATTERN.test(value)
}

export function parsePoleQuestionPool(value: unknown): PoleQuestionPool {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Invalid pole-number question pool.')
  }

  const candidate = value as { version?: unknown; codes?: unknown }
  if (candidate.version !== 1 || !Array.isArray(candidate.codes)) {
    throw new Error('Unsupported pole-number question pool.')
  }

  const codes = candidate.codes.filter(isPoleNumberCode)
  if (
    codes.length !== candidate.codes.length ||
    new Set(codes).size !== codes.length
  ) {
    throw new Error('The pole-number question pool contains invalid codes.')
  }

  return { version: 1, codes }
}

export function getPoleGridGeometry(code: string): PoleGridGeometry {
  const match = POLE_CODE_PATTERN.exec(code)
  if (!match) throw new Error(`Invalid pole-number code: ${code}`)

  const [, letter, rawEastIndex, rawNorthIndex] = match
  const eastIndex = Number(rawEastIndex)
  const northIndex = Number(rawNorthIndex)
  const { point, sector } = getCellSouthwest(letter, eastIndex, northIndex)
  const [west, south] = point
  const sectorWest =
    letter === 'Z'
      ? sector.baseline[0] + (eastIndex < 50 ? 80000 : 0)
      : sector.baseline[0]

  return {
    center: toWgs84([west + 400, south + 250], sector.projection),
    cell: toPolygon(west, south, 800, 500, sector.projection),
    sector: toPolygon(
      sectorWest,
      sector.baseline[1],
      80000,
      50000,
      sector.projection
    ),
  }
}

export function getPoleGridOrigins(): PoleGridOrigin[] {
  const origins = POLE_GRID_LETTERS.filter((letter) => letter !== 'Z').map(
    (letter) => {
      const sector = getSector(letter)
      return {
        id: letter,
        label: `${letter}0000`,
        coordinates: toWgs84(sector.baseline, sector.projection),
      }
    }
  )
  const zSector = getSector('Z')

  return [
    ...origins,
    {
      id: 'Z-west',
      label: 'Z5000',
      coordinates: toWgs84(
        [zSector.baseline[0] + 40000, zSector.baseline[1]],
        zSector.projection
      ),
    },
    {
      id: 'Z-east',
      label: 'Z0000',
      coordinates: toWgs84(
        [zSector.baseline[0] + 80000, zSector.baseline[1]],
        zSector.projection
      ),
    },
  ]
}
