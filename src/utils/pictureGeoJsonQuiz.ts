import type L from 'leaflet'
import {
  GEO_JSON_CORRECT_STYLE,
  GEO_JSON_DEFAULT_STYLE,
} from './geoJsonCodeQuiz'

export type PictureGeoJsonQuestion = {
  id: string
  imageUrl: string
  imageAlt: string
  answerIds: readonly string[]
}

type CountryPictureManifestEntry = {
  country: string[]
  note: string
}

type ParseCountryPictureManifestOptions = {
  idPattern: RegExp
  imageDirectory: string
  imageAltPrefix: string
  manifestName: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseCountryPictureEntry(
  id: string,
  value: unknown
): CountryPictureManifestEntry {
  if (!isRecord(value) || !Array.isArray(value.country)) {
    throw new Error(`Question ${id} has an invalid answer entry.`)
  }

  const country = value.country.map((code) => {
    if (typeof code !== 'string' || !/^[a-z]{2}$/.test(code)) {
      throw new Error(`Question ${id} has an invalid country code.`)
    }
    return code
  })
  if (country.length === 0 || new Set(country).size !== country.length) {
    throw new Error(`Question ${id} needs unique country answers.`)
  }
  if (typeof value.note !== 'string' || value.note.trim().length === 0) {
    throw new Error(`Question ${id} needs an image description.`)
  }

  return { country, note: value.note.trim() }
}

export function parseCountryPictureManifest(
  value: unknown,
  {
    idPattern,
    imageDirectory,
    imageAltPrefix,
    manifestName,
  }: ParseCountryPictureManifestOptions
): PictureGeoJsonQuestion[] {
  if (!isRecord(value)) {
    throw new Error(`The ${manifestName} question manifest is invalid.`)
  }

  const questions = Object.entries(value).map(([id, rawEntry]) => {
    if (!idPattern.test(id)) throw new Error(`Question ID ${id} is invalid.`)
    const entry = parseCountryPictureEntry(id, rawEntry)
    return {
      id,
      imageUrl: `${imageDirectory}/${id}.png`,
      imageAlt: `${imageAltPrefix}: ${entry.note}`,
      answerIds: entry.country,
    }
  })

  if (questions.length === 0) {
    throw new Error(`No ${manifestName} questions are available.`)
  }
  return questions.sort((left, right) => left.id.localeCompare(right.id))
}

export const GEO_JSON_INCORRECT_STYLE: L.PathOptions = {
  color: '#fb7185',
  fillColor: '#f43f5e',
  weight: 3,
  opacity: 1,
  fillOpacity: 0.58,
}

type PictureFeatureStyleState = {
  correctIds: ReadonlySet<string>
  incorrectIds: ReadonlySet<string>
}

export function getPictureFeatureStyle(
  featureIds: readonly string[],
  { correctIds, incorrectIds }: PictureFeatureStyleState
) {
  if (featureIds.some((id) => correctIds.has(id))) {
    return GEO_JSON_CORRECT_STYLE
  }
  if (featureIds.some((id) => incorrectIds.has(id))) {
    return GEO_JSON_INCORRECT_STYLE
  }
  return GEO_JSON_DEFAULT_STYLE
}

export function getRemainingAnswerCount(
  answerIds: readonly string[],
  foundIds: ReadonlySet<string>
) {
  return answerIds.filter((id) => !foundIds.has(id)).length
}

export function isPictureQuestionComplete(
  answerIds: readonly string[],
  foundIds: ReadonlySet<string>
) {
  return (
    answerIds.length > 0 && getRemainingAnswerCount(answerIds, foundIds) === 0
  )
}

export function pickNextPictureQuestionIndex(
  questionCount: number,
  currentIndex: number,
  randomValue = Math.random()
) {
  if (questionCount <= 0) return -1
  if (questionCount === 1) return 0

  const safeRandomValue = Math.min(Math.max(randomValue, 0), 0.999999999)
  const offset = 1 + Math.floor(safeRandomValue * (questionCount - 1))
  return (currentIndex + offset) % questionCount
}
