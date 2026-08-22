import { getApps, initializeApp } from 'firebase/app'
import {
  ReCaptchaEnterpriseProvider,
  initializeAppCheck,
} from 'firebase/app-check'
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from 'firebase/functions'
import { DIFFICULTIES } from './findThePlace'
import type {
  Coordinates,
  Difficulty,
  PlayablePlace,
} from './findThePlace'

export type DifficultyCounts = Record<Difficulty, number>

export type FindThePlaceManifestCountry = {
  code: string
  name: string
  counts: DifficultyCounts
}

export type FindThePlaceManifestContinent = {
  name: string
  countries: readonly FindThePlaceManifestCountry[]
}

export type FindThePlaceManifest = {
  version: string
  generatedAt: string
  continents: readonly FindThePlaceManifestContinent[]
}

type SessionRequest = {
  countryCodes: string[]
  difficulties: Difficulty[]
  roundCount: 5
}

type SessionResponse = {
  catalogVersion: string
  questions: PlayablePlace[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readNonEmptyString(value: unknown, label: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`)
  }
  return value
}

function isDifficulty(value: unknown): value is Difficulty {
  return DIFFICULTIES.some((difficulty) => difficulty === value)
}

function readDifficultyCounts(value: unknown): DifficultyCounts {
  if (!isRecord(value)) {
    throw new Error('Catalog difficulty counts must be an object.')
  }
  return Object.fromEntries(
    DIFFICULTIES.map((difficulty) => {
      const count = value[difficulty]
      if (!Number.isInteger(count) || Number(count) < 0) {
        throw new Error(`Catalog count for ${difficulty} is invalid.`)
      }
      return [difficulty, Number(count)]
    })
  ) as DifficultyCounts
}

export function parseFindThePlaceManifest(
  value: unknown
): FindThePlaceManifest {
  if (!isRecord(value) || !Array.isArray(value.continents)) {
    throw new Error('The Find the Place catalog has an invalid shape.')
  }
  const version = readNonEmptyString(value.version, 'Catalog version')
  const generatedAt = readNonEmptyString(
    value.generatedAt,
    'Catalog generation date'
  )
  const countryCodes = new Set<string>()
  const countryNames = new Set<string>()
  const continents = value.continents.map((continentValue) => {
    if (!isRecord(continentValue) || !Array.isArray(continentValue.countries)) {
      throw new Error('Every catalog continent must contain countries.')
    }
    const name = readNonEmptyString(
      continentValue.name,
      'Catalog continent name'
    )
    const countries = continentValue.countries.map((countryValue) => {
      if (!isRecord(countryValue)) {
        throw new Error('Every catalog country must be an object.')
      }
      const code = readNonEmptyString(countryValue.code, 'Catalog country code')
      const countryName = readNonEmptyString(
        countryValue.name,
        'Catalog country name'
      )
      if (countryCodes.has(code) || countryNames.has(countryName)) {
        throw new Error(`Duplicate catalog country: ${countryName}`)
      }
      countryCodes.add(code)
      countryNames.add(countryName)
      return {
        code,
        name: countryName,
        counts: readDifficultyCounts(countryValue.counts),
      }
    })
    return { name, countries }
  })
  return { version, generatedAt, continents }
}

function readCoordinates(value: unknown): Coordinates {
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
    throw new Error('A session question has invalid coordinates.')
  }
  return [value[0], value[1]]
}

function parsePlayablePlace(value: unknown): PlayablePlace {
  if (!isRecord(value) || !Array.isArray(value.administrativePath)) {
    throw new Error('A session question has an invalid shape.')
  }
  if (!isDifficulty(value.difficulty)) {
    throw new Error('A session question has an invalid difficulty.')
  }
  const administrativePath = value.administrativePath.map((name) =>
    readNonEmptyString(name, 'Administrative name')
  )
  return {
    type: 'place',
    id: readNonEmptyString(value.id, 'Place ID'),
    name: readNonEmptyString(value.name, 'Place name'),
    coordinates: readCoordinates(value.coordinates),
    difficulty: value.difficulty,
    countryCode: readNonEmptyString(value.countryCode, 'Country code'),
    countryName: readNonEmptyString(value.countryName, 'Country name'),
    continentName: readNonEmptyString(value.continentName, 'Continent name'),
    jurisdictionName: readNonEmptyString(
      value.jurisdictionName,
      'Jurisdiction name'
    ),
    administrativePath,
    question: readNonEmptyString(value.question, 'Question'),
  }
}

function parseSessionResponse(value: unknown): SessionResponse {
  if (!isRecord(value) || !Array.isArray(value.questions)) {
    throw new Error('The Find the Place session has an invalid shape.')
  }
  const questions = value.questions.map(parsePlayablePlace)
  if (questions.length !== 5) {
    throw new Error('A Find the Place session must contain five questions.')
  }
  if (new Set(questions.map((question) => question.id)).size !== 5) {
    throw new Error('A Find the Place session contains duplicate questions.')
  }
  return {
    catalogVersion: readNonEmptyString(
      value.catalogVersion,
      'Session catalog version'
    ),
    questions,
  }
}

const firebaseApp =
  getApps()[0] ??
  initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:
      import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'geoguessr-9ui2',
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  })

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY
if (recaptchaSiteKey) {
  if (import.meta.env.DEV && import.meta.env.VITE_APP_CHECK_DEBUG === 'true') {
    const debugGlobal = globalThis as typeof globalThis & {
      FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean
    }
    debugGlobal.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true,
  })
}

const functions = getFunctions(firebaseApp, 'asia-east1')
const emulatorAddress = import.meta.env.VITE_FIREBASE_FUNCTIONS_EMULATOR
if (emulatorAddress) {
  const [host, portValue] = emulatorAddress.split(':')
  const port = Number(portValue)
  if (host && Number.isInteger(port)) {
    connectFunctionsEmulator(functions, host, port)
  }
}

const getCatalog = httpsCallable<undefined, unknown>(
  functions,
  'getFindThePlaceCatalog'
)
const createSession = httpsCallable<SessionRequest, unknown>(
  functions,
  'createFindThePlaceSession'
)

export async function loadFindThePlaceManifest() {
  const response = await getCatalog()
  return parseFindThePlaceManifest(response.data)
}

export async function createFindThePlaceSession(
  countryCodes: ReadonlySet<string>,
  difficulties: ReadonlySet<Difficulty>
) {
  const response = await createSession({
    countryCodes: Array.from(countryCodes),
    difficulties: Array.from(difficulties),
    roundCount: 5,
  })
  return parseSessionResponse(response.data).questions
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
