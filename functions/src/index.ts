import { getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { DIFFICULTIES } from './catalogConfig.js'
import type { Difficulty } from './catalogConfig.js'
import type {
  CatalogMetadata,
  CatalogPlace,
  SessionQuestion,
} from './catalogTypes.js'
import { importFindThePlaceCatalog } from './importCatalog.js'
import { createSessionSelections } from './sessionSampler.js'

if (getApps().length === 0) initializeApp()
const firestore = getFirestore()
const REGION = 'asia-east1'
const ROUND_COUNT = 5

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isDifficulty(value: unknown): value is Difficulty {
  return DIFFICULTIES.some((difficulty) => difficulty === value)
}

async function getActiveCatalog() {
  const configSnapshot = await firestore.doc('findThePlace/config').get()
  const activeVersion = configSnapshot.get('activeVersion')
  if (typeof activeVersion !== 'string' || !activeVersion) {
    throw new HttpsError('unavailable', 'The place catalog is not ready.')
  }

  const reference = firestore
    .collection('findThePlaceCatalogs')
    .doc(activeVersion)
  const snapshot = await reference.get()
  const metadata = snapshot.data() as CatalogMetadata | undefined
  if (!metadata || metadata.status !== 'ready') {
    throw new HttpsError('unavailable', 'The place catalog is not ready.')
  }
  return { reference, metadata }
}

function parseSessionRequest(value: unknown) {
  if (!isRecord(value)) {
    throw new HttpsError('invalid-argument', 'A session request is required.')
  }
  if (value.roundCount !== ROUND_COUNT) {
    throw new HttpsError(
      'invalid-argument',
      `Find the Place sessions contain ${ROUND_COUNT} rounds.`
    )
  }
  if (!Array.isArray(value.countryCodes) || value.countryCodes.length === 0) {
    throw new HttpsError('invalid-argument', 'Select at least one country.')
  }
  if (
    !Array.isArray(value.difficulties) ||
    value.difficulties.length === 0
  ) {
    throw new HttpsError('invalid-argument', 'Select at least one difficulty.')
  }

  const countryCodes = Array.from(new Set(value.countryCodes))
  const difficulties = Array.from(new Set(value.difficulties))
  if (!countryCodes.every((code): code is string => typeof code === 'string')) {
    throw new HttpsError('invalid-argument', 'Country codes must be strings.')
  }
  if (!difficulties.every(isDifficulty)) {
    throw new HttpsError('invalid-argument', 'A difficulty is invalid.')
  }
  return { countryCodes, difficulties }
}

function getCountries(metadata: CatalogMetadata) {
  return metadata.continents.flatMap((continent) => continent.countries)
}

function placeDocumentId(
  countryCode: string,
  difficulty: Difficulty,
  rank: number
) {
  return `${countryCode}__${difficulty.toLowerCase()}__${rank}`
}

function toSessionQuestion(place: CatalogPlace): SessionQuestion {
  return {
    id: place.id,
    name: place.name,
    coordinates: place.coordinates,
    difficulty: place.difficulty,
    countryCode: place.countryCode,
    countryName: place.countryName,
    continentName: place.continentName,
    jurisdictionName: place.jurisdictionName,
    administrativePath: place.administrativePath,
    question: place.question,
  }
}

export const getFindThePlaceCatalog = onCall(
  { region: REGION, enforceAppCheck: true, maxInstances: 5 },
  async () => {
    const { metadata } = await getActiveCatalog()
    return {
      version: metadata.version,
      generatedAt: metadata.generatedAt,
      continents: metadata.continents,
    }
  }
)

export const createFindThePlaceSession = onCall(
  { region: REGION, enforceAppCheck: true, maxInstances: 5 },
  async (request) => {
    const { countryCodes, difficulties } = parseSessionRequest(request.data)
    const { reference, metadata } = await getActiveCatalog()
    const countriesByCode = new Map(
      getCountries(metadata).map((country) => [country.code, country])
    )
    const selectedCountries = countryCodes.map((code) => {
      const country = countriesByCode.get(code)
      if (!country) {
        throw new HttpsError('invalid-argument', `Unsupported country: ${code}`)
      }
      return country
    })
    const totalEligible = selectedCountries.reduce(
      (total, country) =>
        total +
        difficulties.reduce(
          (countryTotal, difficulty) =>
            countryTotal + country.counts[difficulty],
          0
        ),
      0
    )
    if (totalEligible < ROUND_COUNT) {
      throw new HttpsError(
        'failed-precondition',
        `At least ${ROUND_COUNT} eligible places are required.`
      )
    }

    const selections = createSessionSelections(
      selectedCountries,
      difficulties,
      ROUND_COUNT
    )
    const selectedReferences = selections.map((selection) =>
      reference
        .collection('places')
        .doc(
          placeDocumentId(
            selection.countryCode,
            selection.difficulty,
            selection.rank
          )
        )
    )

    const snapshots = await firestore.getAll(...selectedReferences)
    const questions = snapshots.map((snapshot) => {
      if (!snapshot.exists) {
        throw new HttpsError('internal', 'A catalog place is missing.')
      }
      return toSessionQuestion(snapshot.data() as CatalogPlace)
    })
    return { catalogVersion: metadata.version, questions }
  }
)

export const refreshFindThePlaceCatalog = onSchedule(
  {
    region: REGION,
    schedule: '0 3 * * 0',
    timeZone: 'UTC',
    timeoutSeconds: 1800,
    memory: '2GiB',
  },
  async () => {
    await importFindThePlaceCatalog(firestore)
  }
)
