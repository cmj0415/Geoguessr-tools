import { parseCountryPictureManifest } from '../pictureGeoJsonQuiz'

const ANSWER_URL = '/miscellaneous/eu_chevron/answer.json'
const IMAGE_DIRECTORY = '/miscellaneous/eu_chevron'

export function parseEuropeChevronManifest(value: unknown) {
  return parseCountryPictureManifest(value, {
    idPattern: /^ch-\d{2}$/,
    imageDirectory: IMAGE_DIRECTORY,
    imageAltPrefix: 'Road chevron',
    manifestName: 'chevron',
  })
}

export async function loadEuropeChevronQuestions(signal: AbortSignal) {
  const response = await fetch(ANSWER_URL, { signal })
  if (!response.ok) throw new Error('Unable to load the question set.')
  return parseEuropeChevronManifest(await response.json())
}
