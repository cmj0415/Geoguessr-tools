export type PoleCoordinates = readonly [latitude: number, longitude: number]

export type PoleGridGeometry = {
  center: PoleCoordinates
  cell: PoleCoordinates[]
  sector: PoleCoordinates[]
}

export type PoleRoundResult = {
  guessedCoordinates: PoleCoordinates
  geometry: PoleGridGeometry
  distanceKm: number
  accuracy: number
}

const EARTH_RADIUS_KM = 6371.0088
const ACCURACY_DECAY_KM = 50

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

export function calculatePoleDistanceKm(
  from: PoleCoordinates,
  to: PoleCoordinates
) {
  const fromLatitude = degreesToRadians(from[0])
  const fromLongitude = degreesToRadians(from[1])
  const toLatitude = degreesToRadians(to[0])
  const toLongitude = degreesToRadians(to[1])
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

export function calculatePoleAccuracy(distanceKm: number) {
  return 100 * Math.exp(-Math.max(0, distanceKm) / ACCURACY_DECAY_KM)
}

export function calculateAverageAccuracy(accuracies: readonly number[]) {
  if (accuracies.length === 0) return null
  return (
    accuracies.reduce((total, accuracy) => total + accuracy, 0) /
    accuracies.length
  )
}

export function formatPoleAccuracy(accuracy: number | null) {
  return accuracy === null ? '—' : `${accuracy.toFixed(1)}%`
}

export function formatPoleDistance(distanceKm: number) {
  return distanceKm < 1
    ? `${Math.round(distanceKm * 1000)} m`
    : `${distanceKm.toFixed(1)} km`
}

export function shufflePoleCodes(codes: readonly string[]) {
  const shuffledCodes = [...codes]
  for (let index = shuffledCodes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffledCodes[index], shuffledCodes[swapIndex]] = [
      shuffledCodes[swapIndex],
      shuffledCodes[index],
    ]
  }
  return shuffledCodes
}
