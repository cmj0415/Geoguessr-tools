import { parseCountryPictureManifest } from '../pictureGeoJsonQuiz'

const ANSWER_URL = '/miscellaneous/eu_bollard/answer.json'
const IMAGE_DIRECTORY = '/miscellaneous/eu_bollard'

export function parseEuropeBollardManifest(value: unknown) {
  return parseCountryPictureManifest(value, {
    idPattern: /^b\d{2}$/,
    imageDirectory: IMAGE_DIRECTORY,
    imageAltPrefix: 'European roadside bollard',
    manifestName: 'bollard',
    noteRequired: false,
  })
}

export async function loadEuropeBollardQuestions(signal: AbortSignal) {
  const response = await fetch(ANSWER_URL, { signal })
  if (!response.ok) throw new Error('Unable to load the question set.')
  return parseEuropeBollardManifest(await response.json())
}
