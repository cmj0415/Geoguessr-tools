import { DIFFICULTIES, flattenPlaceData } from './findThePlace'
import type {
  AdministrativeNode,
  ContinentNode,
  Coordinates,
  Difficulty,
  PlaceNode,
  PlaceTreeNode,
  PlayablePlace,
} from './findThePlace'

export type DifficultyCounts = Record<Difficulty, number>

export type FindThePlaceManifestCountry = {
  code: string
  name: string
  counts: DifficultyCounts
  shards: readonly string[]
}

export type FindThePlaceManifestContinent = {
  name: string
  countries: readonly FindThePlaceManifestCountry[]
}

export type FindThePlaceManifest = {
  continents: readonly FindThePlaceManifestContinent[]
}

export const FIND_THE_PLACE_MANIFEST_URL = '/find-the-place/manifest.json'

const shardCache = new Map<string, Promise<PlaceTreeNode>>()

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isDifficulty(value: unknown): value is Difficulty {
  return DIFFICULTIES.some((difficulty) => difficulty === value)
}

function readNonEmptyString(value: unknown, label: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`)
  }
  return value
}

function readDifficultyCounts(value: unknown): DifficultyCounts {
  if (!isRecord(value)) {
    throw new Error('Manifest difficulty counts must be an object.')
  }

  return Object.fromEntries(
    DIFFICULTIES.map((difficulty) => {
      const count = value[difficulty]
      if (!Number.isInteger(count) || Number(count) < 0) {
        throw new Error(
          `Manifest count for ${difficulty} must be a non-negative integer.`
        )
      }
      return [difficulty, Number(count)]
    })
  ) as DifficultyCounts
}

export function parseFindThePlaceManifest(
  value: unknown
): FindThePlaceManifest {
  if (!isRecord(value) || !Array.isArray(value.continents)) {
    throw new Error('The Find the Place manifest has an invalid shape.')
  }

  const countryCodes = new Set<string>()
  const countryNames = new Set<string>()
  const continents = value.continents.map((continentValue) => {
    if (!isRecord(continentValue) || !Array.isArray(continentValue.countries)) {
      throw new Error('Every manifest continent must contain countries.')
    }

    const name = readNonEmptyString(
      continentValue.name,
      'Manifest continent name'
    )
    const countries = continentValue.countries.map((countryValue) => {
      if (!isRecord(countryValue) || !Array.isArray(countryValue.shards)) {
        throw new Error('Every manifest country must contain data shards.')
      }

      const code = readNonEmptyString(
        countryValue.code,
        'Manifest country code'
      )
      const countryName = readNonEmptyString(
        countryValue.name,
        'Manifest country name'
      )
      if (countryCodes.has(code)) {
        throw new Error(`Duplicate manifest country code: ${code}`)
      }
      if (countryNames.has(countryName)) {
        throw new Error(`Duplicate manifest country name: ${countryName}`)
      }
      if (countryValue.shards.length === 0) {
        throw new Error(`Manifest country "${countryName}" has no shards.`)
      }

      const shards = countryValue.shards.map((shardValue) => {
        const shard = readNonEmptyString(shardValue, 'Manifest shard URL')
        if (
          !shard.startsWith('/find-the-place/') ||
          !shard.endsWith('.json') ||
          shard.includes('..')
        ) {
          throw new Error(`Unsafe Find the Place shard URL: ${shard}`)
        }
        return shard
      })

      countryCodes.add(code)
      countryNames.add(countryName)
      return {
        code,
        name: countryName,
        counts: readDifficultyCounts(countryValue.counts),
        shards,
      }
    })

    return { name, countries }
  })

  return { continents }
}

function readCoordinates(value: unknown, placeId: string): Coordinates {
  if (
    !Array.isArray(value) ||
    value.length !== 2 ||
    typeof value[0] !== 'number' ||
    typeof value[1] !== 'number' ||
    !Number.isFinite(value[0]) ||
    !Number.isFinite(value[1]) ||
    value[0] < -90 ||
    value[0] > 90 ||
    value[1] < -180 ||
    value[1] > 180
  ) {
    throw new Error(`Place "${placeId}" has invalid coordinates.`)
  }

  return [value[0], value[1]]
}

export function parsePlaceTreeNode(value: unknown): PlaceTreeNode {
  if (!isRecord(value)) {
    throw new Error('Every place-data node must be an object.')
  }

  const name = readNonEmptyString(value.name, 'Place-data node name')
  if (value.type === 'administrative') {
    if (!Array.isArray(value.children) || value.children.length === 0) {
      throw new Error(`Administrative node "${name}" cannot be empty.`)
    }
    const node: AdministrativeNode = {
      type: 'administrative',
      name,
      children: value.children.map(parsePlaceTreeNode),
    }
    return node
  }

  if (value.type !== 'place') {
    throw new Error(`Place-data node "${name}" has an invalid type.`)
  }

  const id = readNonEmptyString(value.id, 'Place ID')
  if (!isDifficulty(value.difficulty)) {
    throw new Error(`Place "${id}" has an invalid difficulty.`)
  }
  const node: PlaceNode = {
    type: 'place',
    id,
    name,
    coordinates: readCoordinates(value.coordinates, id),
    difficulty: value.difficulty,
  }
  return node
}

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Unable to load Find the Place data (${response.status}).`)
  }
  return response.json() as Promise<unknown>
}

export async function loadFindThePlaceManifest(signal?: AbortSignal) {
  return parseFindThePlaceManifest(
    await fetchJson(FIND_THE_PLACE_MANIFEST_URL, signal)
  )
}

export function getCountryDivisions(manifest: FindThePlaceManifest) {
  return Object.fromEntries(
    manifest.continents.map((continent) => [
      continent.name,
      continent.countries.map((country) => country.name),
    ])
  )
}

export function getCountryCodesByName(manifest: FindThePlaceManifest) {
  return Object.fromEntries(
    manifest.continents.flatMap((continent) =>
      continent.countries.map((country) => [country.name, country.code])
    )
  )
}

export function getAllCountryCodes(manifest: FindThePlaceManifest) {
  return new Set(
    manifest.continents.flatMap((continent) =>
      continent.countries.map((country) => country.code)
    )
  )
}

export function countEligibleManifestPlaces(
  manifest: FindThePlaceManifest,
  selectedCountryCodes: ReadonlySet<string>,
  selectedDifficulties: ReadonlySet<Difficulty>
) {
  return manifest.continents.reduce(
    (total, continent) =>
      total +
      continent.countries.reduce((countryTotal, country) => {
        if (!selectedCountryCodes.has(country.code)) return countryTotal
        return (
          countryTotal +
          DIFFICULTIES.reduce(
            (difficultyTotal, difficulty) =>
              difficultyTotal +
              (selectedDifficulties.has(difficulty)
                ? country.counts[difficulty]
                : 0),
            0
          )
        )
      }, 0),
    0
  )
}

function loadPlaceShard(url: string) {
  const cached = shardCache.get(url)
  if (cached) return cached

  const request = fetchJson(url)
    .then(parsePlaceTreeNode)
    .catch((error: unknown) => {
      shardCache.delete(url)
      throw error
    })
  shardCache.set(url, request)
  return request
}

export async function loadSelectedPlaceData(
  manifest: FindThePlaceManifest,
  selectedCountryCodes: ReadonlySet<string>
): Promise<PlayablePlace[]> {
  const loadedContinents = await Promise.all(
    manifest.continents.map(async (continent) => {
      const selectedCountries = continent.countries.filter((country) =>
        selectedCountryCodes.has(country.code)
      )
      if (selectedCountries.length === 0) return null

      const loadedContinent: ContinentNode = {
        name: continent.name,
        countries: await Promise.all(
          selectedCountries.map(async (country) => ({
            code: country.code,
            name: country.name,
            children: await Promise.all(country.shards.map(loadPlaceShard)),
          }))
        ),
      }
      return loadedContinent
    })
  )
  const continents = loadedContinents.filter(
    (continent): continent is ContinentNode => continent !== null
  )

  const places = flattenPlaceData(continents)
  for (const continent of manifest.continents) {
    for (const country of continent.countries) {
      if (!selectedCountryCodes.has(country.code)) continue

      for (const difficulty of DIFFICULTIES) {
        const actualCount = places.filter(
          (place) =>
            place.countryCode === country.code &&
            place.difficulty === difficulty
        ).length
        if (actualCount !== country.counts[difficulty]) {
          throw new Error(
            `Manifest count does not match loaded data for ${country.name} (${difficulty}).`
          )
        }
      }
    }
  }

  return places
}
