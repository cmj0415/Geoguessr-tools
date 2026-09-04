import { getFeatureProperties } from '../geoJsonCodeQuiz'
import type { PictureGeoJsonQuestion } from '../pictureGeoJsonQuiz'

const ANSWER_URL = '/miscellaneous/eu_pedestrian_sign/answer.json'
const IMAGE_DIRECTORY = '/miscellaneous/eu_pedestrian_sign'

type AnswerManifestEntry = {
  country: string[]
  note: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseAnswerEntry(id: string, value: unknown): AnswerManifestEntry {
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

export function parseEuropePedestrianSignManifest(
  value: unknown
): PictureGeoJsonQuestion[] {
  if (!isRecord(value)) {
    throw new Error('The pedestrian sign question manifest is invalid.')
  }

  const questions = Object.entries(value).map(([id, rawEntry]) => {
    if (!/^sign-\d{2}$/.test(id)) {
      throw new Error(`Question ID ${id} is invalid.`)
    }
    const entry = parseAnswerEntry(id, rawEntry)
    return {
      id,
      imageUrl: `${IMAGE_DIRECTORY}/${id}.png`,
      imageAlt: `Pedestrian crossing sign: ${entry.note}`,
      answerIds: entry.country,
    }
  })

  if (questions.length === 0) {
    throw new Error('No pedestrian sign questions are available.')
  }
  return questions.sort((left, right) => left.id.localeCompare(right.id))
}

export async function loadEuropePedestrianSignQuestions(signal: AbortSignal) {
  const response = await fetch(ANSWER_URL, { signal })
  if (!response.ok) throw new Error('Unable to load the question set.')
  return parseEuropePedestrianSignManifest(await response.json())
}

export function getEuropeCountryIds(feature: unknown) {
  const code = getFeatureProperties(feature)?.code
  return typeof code === 'string' && /^[a-z]{2}$/.test(code) ? [code] : []
}

export function getEuropeCountryLabel(feature: unknown) {
  const country = getFeatureProperties(feature)?.country
  return typeof country === 'string' && country.trim().length > 0
    ? country.trim()
    : null
}
