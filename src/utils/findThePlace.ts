export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const

export type Difficulty = (typeof DIFFICULTIES)[number]

export type Coordinates = readonly [latitude: number, longitude: number]

export type PlaceNode = {
  type: 'place'
  id: string
  name: string
  coordinates: Coordinates
  difficulty: Difficulty
}

export type PlayablePlace = PlaceNode & {
  countryCode: string
  countryName: string
  continentName: string
  jurisdictionName: string
  administrativePath: readonly string[]
  question: string
}

export type RoundResult = {
  place: PlayablePlace
  guessedCoordinates: Coordinates
  distanceKm: number
  elapsedSeconds: number
  score: number
}

export type GamePhase =
  | { name: 'setup' }
  | { name: 'guessing'; roundIndex: number; startedAt: number }
  | { name: 'review'; roundIndex: number; result: RoundResult }
  | { name: 'results' }

const EARTH_RADIUS_KM = 6371.0088
const TIME_DECAY_SECONDS = 300
const DISTANCE_DECAY_KM = 1000
const FULL_SCORE_DISTANCE_KM = 10
const MAX_ROUND_SCORE = 5000

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

export function calculateDistanceKm(from: Coordinates, to: Coordinates) {
  const [fromLatitude, fromLongitude] = from.map(degreesToRadians)
  const [toLatitude, toLongitude] = to.map(degreesToRadians)
  const latitudeDelta = toLatitude - fromLatitude
  const longitudeDelta = toLongitude - fromLongitude
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) ** 2

  return (
    2 *
    EARTH_RADIUS_KM *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  )
}

export function calculateRoundScore(
  elapsedSeconds: number,
  distanceKm: number
) {
  const safeElapsedSeconds = Math.max(0, elapsedSeconds)
  const safeEffSeconds = Math.max(0, safeElapsedSeconds - 5)
  const safeDistanceKm = Math.max(0, distanceKm)
  const distancePenalty =
    Math.max(safeDistanceKm, FULL_SCORE_DISTANCE_KM) - FULL_SCORE_DISTANCE_KM
  const score = Math.round(
    MAX_ROUND_SCORE *
      Math.exp(-safeEffSeconds / TIME_DECAY_SECONDS) *
      Math.exp(-distancePenalty / DISTANCE_DECAY_KM)
  )

  return Math.min(MAX_ROUND_SCORE, Math.max(0, score))
}

export function formatDistance(distanceKm: number) {
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`
  return `${distanceKm.toFixed(1)} km`
}

export function formatTime(elapsedSeconds: number) {
  return `${elapsedSeconds.toFixed(1)}s`
}
