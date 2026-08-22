import AdmZip from 'adm-zip'
import type { Firestore } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions'
import OpenCC from 'opencc-js'
import {
  MINIMUM_POPULATION,
  PLAYABLE_FEATURE_CODES,
  POOL_CONFIGURATIONS,
  difficultyForRank,
} from './catalogConfig.js'
import type { PoolConfiguration } from './catalogConfig.js'
import type {
  CatalogContinent,
  CatalogMetadata,
  CatalogPlace,
  DifficultyCounts,
} from './catalogTypes.js'

const GEONAMES_DUMP_URL = 'https://download.geonames.org/export/dump'
const JAPANESE_SCRIPT_PATTERN =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u
const HAN_SCRIPT_PATTERN = /\p{Script=Han}/u
const HANGUL_SCRIPT_PATTERN = /\p{Script=Hangul}/u
const LOCALIZED_SOURCE_COUNTRY_CODES = ['JP', 'KR', 'TW', 'HK', 'MO'] as const
const ALLOWED_ALTERNATE_NAME_LANGUAGES = new Set([
  'en',
  'ja',
  'ko',
  'yue',
  'zh',
  'zh-HK',
  'zh-Hant',
  'zh-MO',
  'zh-TW',
])
const ADMINISTRATION_NAME_OVERRIDES = new Map([['RU.29', 'Kemerovo Oblast']])
const toTaiwanTraditional = OpenCC.Converter({ from: 'cn', to: 'tw' })
const toHongKongTraditional = OpenCC.Converter({ from: 'cn', to: 'hk' })

type LocalizationConfiguration = {
  languages: readonly string[]
  scriptPattern: RegExp
  normalize?: (value: string) => string
}

const LOCALIZATION_BY_POOL: Readonly<
  Record<string, LocalizationConfiguration>
> = {
  jp: { languages: ['ja'], scriptPattern: JAPANESE_SCRIPT_PATTERN },
  kr: { languages: ['ko'], scriptPattern: HANGUL_SCRIPT_PATTERN },
  tw: {
    languages: ['zh-TW', 'zh-Hant', 'zh'],
    scriptPattern: HAN_SCRIPT_PATTERN,
    normalize: toTaiwanTraditional,
  },
  hk: {
    languages: ['zh-Hant', 'zh-HK', 'zh-TW', 'yue', 'zh'],
    scriptPattern: HAN_SCRIPT_PATTERN,
    normalize: toHongKongTraditional,
  },
  mo: {
    languages: ['zh-Hant', 'zh-MO', 'zh-TW', 'yue', 'zh'],
    scriptPattern: HAN_SCRIPT_PATTERN,
    normalize: toHongKongTraditional,
  },
}

function normalizeLocalizedName(poolCode: string, value: string) {
  return LOCALIZATION_BY_POOL[poolCode]?.normalize?.(value) ?? value
}

type AdminName = { id: string; name: string }

type AlternateName = {
  name: string
  language: string
  preferred: boolean
  short: boolean
  colloquial: boolean
  historic: boolean
}

type GeoNamesRecord = {
  id: string
  name: string
  asciiName: string
  latitude: number
  longitude: number
  featureClass: string
  featureCode: string
  countryCode: string
  admin1Code: string
  admin2Code: string
  population: number
}

export type CandidatePlace = GeoNamesRecord & {
  displayName: string
  administrativePath: string[]
  jurisdictionName: string
}

type SourceData = {
  records: GeoNamesRecord[]
  alternateNames: Map<string, AlternateName[]>
}

export type ImportSummary = {
  version: string
  placeCount: number
  countryCount: number
}

async function mapWithConcurrency<T, Result>(
  values: readonly T[],
  concurrency: number,
  mapper: (value: T) => Promise<Result>
) {
  const results = new Array<Result>(values.length)
  let nextIndex = 0
  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex
      nextIndex += 1
      const value = values[index]
      if (value !== undefined) results[index] = await mapper(value)
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, worker)
  )
  return results
}

function normalizeKey(value: string) {
  return value.normalize('NFKC').trim().toLocaleLowerCase()
}

function distinctNames(names: readonly (string | undefined)[]) {
  const seen = new Set<string>()
  return names.filter((name): name is string => {
    if (!name?.trim()) return false
    const key = normalizeKey(name)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function parseGeoNames(
  value: string,
  allowedCountryCodes?: ReadonlySet<string>
): GeoNamesRecord[] {
  const records: GeoNamesRecord[] = []
  let lineStart = 0
  while (lineStart < value.length) {
    const nextNewline = value.indexOf('\n', lineStart)
    const lineEnd = nextNewline === -1 ? value.length : nextNewline
    const columns = value.slice(lineStart, lineEnd).split('\t')
    lineStart = lineEnd + 1
    const countryCode = columns[8] ?? ''
    const population = Number(columns[14])
    if (
      allowedCountryCodes &&
      (!allowedCountryCodes.has(countryCode) ||
        population <= MINIMUM_POPULATION ||
        columns[6] !== 'P' ||
        !PLAYABLE_FEATURE_CODES.has(columns[7] ?? ''))
    ) {
      continue
    }
    records.push({
      id: columns[0] ?? '',
      name: columns[1] ?? '',
      asciiName: columns[2] ?? '',
      latitude: Number(columns[4]),
      longitude: Number(columns[5]),
      featureClass: columns[6] ?? '',
      featureCode: columns[7] ?? '',
      countryCode,
      admin1Code: columns[10] ?? '',
      admin2Code: columns[11] ?? '',
      population,
    })
  }
  return records
}

function parseAdminNames(value: string) {
  return new Map<string, AdminName>(
    value
      .trim()
      .split('\n')
      .map((line) => {
        const [code = '', name = '', , id = ''] = line.split('\t')
        return [
          code,
          { id, name: ADMINISTRATION_NAME_OVERRIDES.get(code) ?? name },
        ]
      })
  )
}

function parseAlternateNames(value: string) {
  const namesById = new Map<string, AlternateName[]>()
  for (const line of value.trim().split('\n')) {
    const columns = line.split('\t')
    const geoNamesId = columns[1]
    const language = columns[2]
    const name = columns[3]
    if (!geoNamesId || !language || !name) continue
    if (!ALLOWED_ALTERNATE_NAME_LANGUAGES.has(language)) continue

    const names = namesById.get(geoNamesId) ?? []
    names.push({
      name,
      language,
      preferred: columns[4] === '1',
      short: columns[5] === '1',
      colloquial: columns[6] === '1',
      historic: columns[7] === '1',
    })
    namesById.set(geoNamesId, names)
  }
  return namesById
}

function selectLocalizedName(
  names: readonly AlternateName[] | undefined,
  languages: string | readonly string[],
  scriptPattern?: RegExp
) {
  const languageOrder = typeof languages === 'string' ? [languages] : languages
  for (const language of languageOrder) {
    const candidates = (names ?? []).filter(
      (candidate) =>
        candidate.language === language &&
        !candidate.colloquial &&
        !candidate.historic &&
        (!scriptPattern || scriptPattern.test(candidate.name))
    )
    candidates.sort(
      (first, second) =>
        Number(second.preferred) - Number(first.preferred) ||
        Number(second.short) - Number(first.short) ||
        first.name.length - second.name.length ||
        first.name.localeCompare(second.name)
    )
    if (candidates[0]) return candidates[0].name
  }
  return undefined
}

async function download(url: string, attempts = 3): Promise<Buffer> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(120_000),
      headers: { 'user-agent': 'geoguessr-tools-catalog-importer/1.0' },
    })
    if (!response.ok) {
      throw new Error(`GeoNames returned ${response.status} for ${url}.`)
    }
    return Buffer.from(await response.arrayBuffer())
  } catch (error: unknown) {
    if (attempts <= 1) throw error
    logger.warn('Retrying GeoNames download.', {
      url,
      attemptsRemaining: attempts - 1,
    })
    return download(url, attempts - 1)
  }
}

function unzipText(buffer: Buffer, preferredFileName?: string) {
  const entries = new AdmZip(buffer)
    .getEntries()
    .filter((entry) => !entry.isDirectory && entry.entryName.endsWith('.txt'))
  const entry =
    entries.find((candidate) => candidate.entryName === preferredFileName) ??
    entries[0]
  if (!entry)
    throw new Error('The GeoNames archive did not contain a text file.')
  return entry.getData().toString('utf8')
}

function getAdministrationName(
  administration: AdminName | undefined,
  sourceData: SourceData,
  localization: LocalizationConfiguration | undefined
) {
  if (!administration) return undefined
  if (!localization) {
    return (
      selectLocalizedName(
        sourceData.alternateNames.get(administration.id),
        'en'
      ) ?? administration.name
    )
  }
  const localizedName = selectLocalizedName(
    sourceData.alternateNames.get(administration.id),
    localization.languages,
    localization.scriptPattern
  )
  return (
    localizedName && (localization.normalize?.(localizedName) ?? localizedName)
  )
}

function createCandidates(
  configuration: PoolConfiguration,
  sourceCountryCode: string,
  sourceData: SourceData,
  admin1Names: ReadonlyMap<string, AdminName>,
  admin2Names: ReadonlyMap<string, AdminName>
) {
  const localization = LOCALIZATION_BY_POOL[configuration.code]
  const dependencyLabel = configuration.dependencyLabels?.[sourceCountryCode]
  const jurisdictionName =
    configuration.jurisdictionLabels?.[sourceCountryCode] ?? configuration.name

  return sourceData.records
    .filter(
      (record) =>
        record.featureClass === 'P' &&
        PLAYABLE_FEATURE_CODES.has(record.featureCode) &&
        record.population > MINIMUM_POPULATION &&
        Number.isFinite(record.latitude) &&
        record.latitude >= -90 &&
        record.latitude <= 90 &&
        Number.isFinite(record.longitude) &&
        record.longitude >= -180 &&
        record.longitude <= 180
    )
    .map((record): CandidatePlace | undefined => {
      const localizedName = selectLocalizedName(
        sourceData.alternateNames.get(record.id),
        localization?.languages ?? 'en',
        localization?.scriptPattern
      )
      const displayName = localizedName
        ? normalizeLocalizedName(configuration.code, localizedName)
        : localization
          ? undefined
          : record.name
      if (!displayName) {
        return undefined
      }

      const admin1 = getAdministrationName(
        admin1Names.get(`${sourceCountryCode}.${record.admin1Code}`),
        sourceData,
        localization
      )
      if (localization && record.admin1Code && !admin1) return undefined
      const admin2 = getAdministrationName(
        admin2Names.get(
          `${sourceCountryCode}.${record.admin1Code}.${record.admin2Code}`
        ),
        sourceData,
        localization
      )
      const administrativePath = distinctNames([
        admin2,
        admin1,
        dependencyLabel,
      ]).filter((name) => normalizeKey(name) !== normalizeKey(displayName))

      return {
        ...record,
        displayName,
        administrativePath,
        jurisdictionName,
      }
    })
    .filter((candidate): candidate is CandidatePlace => Boolean(candidate))
}

export function buildPoolPlaces(
  configuration: PoolConfiguration,
  candidates: readonly CandidatePlace[]
): CatalogPlace[] {
  const seenNames = new Set<string>()
  const selected = [...candidates]
    .sort(
      (first, second) =>
        second.population - first.population ||
        Number(first.id) - Number(second.id)
    )
    .filter((candidate) => {
      const key = [
        candidate.countryCode,
        candidate.admin1Code,
        normalizeKey(candidate.displayName),
      ].join(':')
      if (seenNames.has(key)) return false
      seenNames.add(key)
      return true
    })

  const nextTierRank: DifficultyCounts = { Easy: 0, Medium: 0, Hard: 0 }
  return selected.map((candidate, rank) => {
    const difficulty = difficultyForRank(rank, selected.length)
    const tierRank = nextTierRank[difficulty]++
    const question = distinctNames([
      candidate.displayName,
      ...candidate.administrativePath,
      candidate.jurisdictionName,
    ]).join(', ')
    return {
      id: `geonames-${candidate.id}`,
      name: candidate.displayName,
      coordinates: [candidate.latitude, candidate.longitude],
      population: candidate.population,
      difficulty,
      countryCode: configuration.code,
      countryName: configuration.name,
      continentName: configuration.continent,
      jurisdictionName: candidate.jurisdictionName,
      administrativePath: candidate.administrativePath,
      question,
      sourceCountryCode: candidate.countryCode,
      sourceGeoNamesId: candidate.id,
      tierRank,
    }
  })
}

function countDifficulties(places: readonly CatalogPlace[]): DifficultyCounts {
  const counts: DifficultyCounts = { Easy: 0, Medium: 0, Hard: 0 }
  for (const place of places) counts[place.difficulty] += 1
  return counts
}

function buildContinents(
  placesByPool: ReadonlyMap<string, readonly CatalogPlace[]>
) {
  const continents = new Map<string, CatalogContinent>()
  for (const configuration of POOL_CONFIGURATIONS) {
    const places = placesByPool.get(configuration.code) ?? []
    if (places.length === 0) continue
    const continent = continents.get(configuration.continent) ?? {
      name: configuration.continent,
      countries: [],
    }
    continent.countries.push({
      code: configuration.code,
      name: configuration.name,
      counts: countDifficulties(places),
    })
    continents.set(configuration.continent, continent)
  }
  return Array.from(continents.values())
}

function placeDocumentId(place: CatalogPlace) {
  return `${place.countryCode}__${place.difficulty.toLowerCase()}__${place.tierRank}`
}

async function removeObsoleteCatalogs(
  firestore: Firestore,
  activeVersion: string
) {
  const snapshots = await firestore.collection('findThePlaceCatalogs').get()
  const readyVersions = snapshots.docs
    .filter((snapshot) => snapshot.get('status') === 'ready')
    .sort((first, second) =>
      String(second.get('generatedAt')).localeCompare(
        String(first.get('generatedAt'))
      )
    )
  const retained = new Set([
    activeVersion,
    ...readyVersions.slice(0, 2).map((snapshot) => snapshot.id),
  ])
  await Promise.all(
    snapshots.docs
      .filter((snapshot) => !retained.has(snapshot.id))
      .map((snapshot) => firestore.recursiveDelete(snapshot.ref))
  )
}

export async function importFindThePlaceCatalog(
  firestore: Firestore
): Promise<ImportSummary> {
  const generatedAt = new Date().toISOString()
  const version = generatedAt.replace(/[^0-9]/g, '')
  const catalogReference = firestore
    .collection('findThePlaceCatalogs')
    .doc(version)
  await catalogReference.set({ version, generatedAt, status: 'building' })

  try {
    const [admin1Text, admin2Text, citiesArchive, localizedNames] =
      await Promise.all([
        download(`${GEONAMES_DUMP_URL}/admin1CodesASCII.txt`).then((buffer) =>
          buffer.toString('utf8')
        ),
        download(`${GEONAMES_DUMP_URL}/admin2Codes.txt`).then((buffer) =>
          buffer.toString('utf8')
        ),
        download(`${GEONAMES_DUMP_URL}/cities500.zip`),
        Promise.all(
          LOCALIZED_SOURCE_COUNTRY_CODES.map(async (countryCode) => {
            const archive = await download(
              `${GEONAMES_DUMP_URL}/alternatenames/${countryCode}.zip`
            )
            return [
              countryCode,
              parseAlternateNames(unzipText(archive, `${countryCode}.txt`)),
            ] as const
          })
        ),
      ])
    const admin1Names = parseAdminNames(admin1Text)
    const admin2Names = parseAdminNames(admin2Text)
    const allowedCountryCodes = new Set(
      POOL_CONFIGURATIONS.flatMap(
        (configuration) => configuration.sourceCountryCodes
      )
    )
    const records = parseGeoNames(
      unzipText(citiesArchive, 'cities500.txt'),
      allowedCountryCodes
    )
    const recordsByCountry = new Map<string, GeoNamesRecord[]>()
    for (const record of records) {
      const countryRecords = recordsByCountry.get(record.countryCode) ?? []
      countryRecords.push(record)
      recordsByCountry.set(record.countryCode, countryRecords)
    }
    const localizedAlternateNames = new Map<
      string,
      Map<string, AlternateName[]>
    >(localizedNames)
    const emptyAlternateNames = new Map<string, AlternateName[]>()
    const generatedPools = await mapWithConcurrency(
      POOL_CONFIGURATIONS,
      4,
      async (configuration) => {
        const candidates: CandidatePlace[] = []
        for (const sourceCountryCode of configuration.sourceCountryCodes) {
          const sourceData: SourceData = {
            records: recordsByCountry.get(sourceCountryCode) ?? [],
            alternateNames:
              localizedAlternateNames.get(sourceCountryCode) ??
              emptyAlternateNames,
          }
          candidates.push(
            ...createCandidates(
              configuration,
              sourceCountryCode,
              sourceData,
              admin1Names,
              admin2Names
            )
          )
        }
        const places = buildPoolPlaces(configuration, candidates)
        logger.info('Prepared Find the Place pool.', {
          code: configuration.code,
          places: places.length,
        })
        return [configuration.code, places] as const
      }
    )
    const placesByPool = new Map(
      generatedPools.filter(([, places]) => places.length > 0)
    )

    const continents = buildContinents(placesByPool)
    const placeCount = Array.from(placesByPool.values()).reduce(
      (total, places) => total + places.length,
      0
    )
    if (placeCount < 5) throw new Error('The generated catalog is too small.')

    const bulkWriter = firestore.bulkWriter()
    bulkWriter.onWriteError((error) => error.failedAttempts < 3)
    for (const places of placesByPool.values()) {
      for (const place of places) {
        bulkWriter.set(
          catalogReference.collection('places').doc(placeDocumentId(place)),
          place
        )
      }
    }
    await bulkWriter.close()

    const metadata: CatalogMetadata = {
      version,
      generatedAt,
      continents,
      placeCount,
      status: 'ready',
    }
    await catalogReference.set(metadata)
    await firestore.runTransaction(async (transaction) => {
      transaction.set(firestore.doc('findThePlace/config'), {
        activeVersion: version,
        updatedAt: generatedAt,
      })
    })
    await removeObsoleteCatalogs(firestore, version)
    return {
      version,
      placeCount,
      countryCount: continents.reduce(
        (total, continent) => total + continent.countries.length,
        0
      ),
    }
  } catch (error: unknown) {
    await catalogReference.set(
      {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown import error',
      },
      { merge: true }
    )
    throw error
  }
}

export const catalogInternals = {
  parseGeoNames,
  parseAdminNames,
  parseAlternateNames,
  selectLocalizedName,
  normalizeLocalizedName,
  countDifficulties,
  placeDocumentId,
}
