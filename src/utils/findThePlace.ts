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

export type AdministrativeNode = {
  type: 'administrative'
  name: string
  children: readonly PlaceTreeNode[]
}

export type PlaceTreeNode = AdministrativeNode | PlaceNode

export type CountryNode = {
  code: string
  name: string
  children: readonly PlaceTreeNode[]
}

export type ContinentNode = {
  name: string
  countries: readonly CountryNode[]
}

export type PlayablePlace = PlaceNode & {
  countryCode: string
  countryName: string
  continentName: string
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

function assertNonEmpty(value: string, label: string) {
  if (value.trim().length === 0) throw new Error(`${label} cannot be empty.`)
}

function assertCoordinates(coordinates: Coordinates, placeId: string) {
  const [latitude, longitude] = coordinates

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error(`Place "${placeId}" has invalid coordinates.`)
  }
}

export function flattenPlaceData(
  continents: readonly ContinentNode[]
): PlayablePlace[] {
  const places: PlayablePlace[] = []
  const placeIds = new Set<string>()
  const countryCodes = new Set<string>()

  function visitNode(
    node: PlaceTreeNode,
    continent: ContinentNode,
    country: CountryNode,
    administrativePath: readonly string[]
  ) {
    assertNonEmpty(node.name, 'Node name')

    if (node.type === 'administrative') {
      if (node.children.length === 0) {
        throw new Error(`Administrative node "${node.name}" cannot be empty.`)
      }

      node.children.forEach((child) =>
        visitNode(child, continent, country, [...administrativePath, node.name])
      )
      return
    }

    assertNonEmpty(node.id, 'Place ID')
    assertCoordinates(node.coordinates, node.id)
    if (!DIFFICULTIES.some((difficulty) => difficulty === node.difficulty)) {
      throw new Error(`Place "${node.id}" has an invalid difficulty.`)
    }
    if (placeIds.has(node.id)) {
      throw new Error(`Duplicate place ID: ${node.id}`)
    }

    placeIds.add(node.id)
    const reversedPath = [...administrativePath].reverse()
    places.push({
      ...node,
      countryCode: country.code,
      countryName: country.name,
      continentName: continent.name,
      administrativePath: reversedPath,
      question: [node.name, ...reversedPath, country.name].join(', '),
    })
  }

  continents.forEach((continent) => {
    assertNonEmpty(continent.name, 'Continent name')
    if (continent.countries.length === 0) {
      throw new Error(`Continent "${continent.name}" cannot be empty.`)
    }

    continent.countries.forEach((country) => {
      assertNonEmpty(country.code, 'Country code')
      assertNonEmpty(country.name, 'Country name')
      if (countryCodes.has(country.code)) {
        throw new Error(`Duplicate country code: ${country.code}`)
      }
      if (country.children.length === 0) {
        throw new Error(`Country "${country.name}" cannot be empty.`)
      }

      countryCodes.add(country.code)
      country.children.forEach((node) =>
        visitNode(node, continent, country, [])
      )
    })
  })

  return places
}

export function getEligiblePlaces(
  places: readonly PlayablePlace[],
  countryCodes: ReadonlySet<string>,
  difficulties: ReadonlySet<Difficulty>
) {
  return places.filter(
    (place) =>
      countryCodes.has(place.countryCode) && difficulties.has(place.difficulty)
  )
}

function getRandomIndex(length: number, random: () => number) {
  const value = random()
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new Error('Random function must return a value from 0 up to 1.')
  }
  return Math.floor(value * length)
}

export function createSessionQuestions(
  eligiblePlaces: readonly PlayablePlace[],
  roundCount = 5,
  random: () => number = Math.random
) {
  if (!Number.isInteger(roundCount) || roundCount < 1) {
    throw new Error('Round count must be a positive integer.')
  }
  if (eligiblePlaces.length < roundCount) {
    throw new Error(`At least ${roundCount} eligible places are required.`)
  }

  const placesByCountry = new Map<string, PlayablePlace[]>()
  eligiblePlaces.forEach((place) => {
    const countryPlaces = placesByCountry.get(place.countryCode) ?? []
    countryPlaces.push(place)
    placesByCountry.set(place.countryCode, countryPlaces)
  })

  const questions: PlayablePlace[] = []
  while (questions.length < roundCount) {
    const availableCountries = Array.from(placesByCountry.entries()).filter(
      ([, countryPlaces]) => countryPlaces.length > 0
    )
    const [, countryPlaces] =
      availableCountries[getRandomIndex(availableCountries.length, random)]
    const placeIndex = getRandomIndex(countryPlaces.length, random)
    const [place] = countryPlaces.splice(placeIndex, 1)
    questions.push(place)
  }

  return questions
}

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
