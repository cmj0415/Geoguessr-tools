import type { PoleCoordinates, PoleGridGeometry } from '../poleNumbers'

export type HokkaidoPoleQuestionPool = {
  version: 1
  codes: string[]
}

const HOKKAIDO_MAJOR_BLOCKS = new Set([
  '20',
  '21',
  '23',
  '29',
  '30',
  '31',
  '32',
  '33',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '61',
  '62',
  '63',
  '64',
  '65',
  '71',
  '72',
  '80',
  '81',
  '82',
])
const HOKKAIDO_POLE_CODE_PATTERN = /^\d{2}[0-7]{2}$/

function toWgs84(
  tokyoLatitude: number,
  tokyoLongitude: number
): PoleCoordinates {
  return [
    tokyoLatitude -
      0.00010695 * tokyoLatitude +
      0.000017464 * tokyoLongitude +
      0.0046017,
    tokyoLongitude -
      0.000046038 * tokyoLatitude -
      0.000083043 * tokyoLongitude +
      0.01004,
  ]
}

function getMajorBlockOrigin(code: string) {
  const latitudeMeshIndex = 60 + Number(code[0])
  const longitudeDigit = Number(code[1])
  const longitudeMeshIndex =
    longitudeDigit === 9 ? 30 + longitudeDigit : 40 + longitudeDigit

  return {
    south: latitudeMeshIndex / 1.5,
    west: 100 + longitudeMeshIndex,
  }
}

function toPolygon(
  south: number,
  west: number,
  latitudeSpan: number,
  longitudeSpan: number
) {
  return [
    toWgs84(south, west),
    toWgs84(south, west + longitudeSpan),
    toWgs84(south + latitudeSpan, west + longitudeSpan),
    toWgs84(south + latitudeSpan, west),
  ]
}

export function isHokkaidoPoleNumberCode(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    HOKKAIDO_POLE_CODE_PATTERN.test(value) &&
    HOKKAIDO_MAJOR_BLOCKS.has(value.slice(0, 2))
  )
}

export function parseHokkaidoPoleQuestionPool(
  value: unknown
): HokkaidoPoleQuestionPool {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Invalid Hokkaido pole-number question pool.')
  }

  const candidate = value as { version?: unknown; codes?: unknown }
  if (candidate.version !== 1 || !Array.isArray(candidate.codes)) {
    throw new Error('Unsupported Hokkaido pole-number question pool.')
  }

  const codes = candidate.codes.filter(isHokkaidoPoleNumberCode)
  if (
    codes.length !== candidate.codes.length ||
    new Set(codes).size !== codes.length
  ) {
    throw new Error('The Hokkaido pole-number question pool is invalid.')
  }

  return { version: 1, codes }
}

export function getHokkaidoPoleGridGeometry(code: string): PoleGridGeometry {
  if (!isHokkaidoPoleNumberCode(code)) {
    throw new Error(`Invalid Hokkaido pole-number code: ${code}`)
  }

  const { south: sectorSouth, west: sectorWest } =
    getMajorBlockOrigin(code)
  const northIndex = Number(code[2])
  const eastIndex = Number(code[3])
  const cellSouth = sectorSouth + northIndex / 12
  const cellWest = sectorWest + eastIndex / 8
  const cellLatitudeSpan = 1 / 12
  const cellLongitudeSpan = 1 / 8

  return {
    center: toWgs84(
      cellSouth + cellLatitudeSpan / 2,
      cellWest + cellLongitudeSpan / 2
    ),
    cell: toPolygon(
      cellSouth,
      cellWest,
      cellLatitudeSpan,
      cellLongitudeSpan
    ),
    sector: toPolygon(sectorSouth, sectorWest, 2 / 3, 1),
  }
}
