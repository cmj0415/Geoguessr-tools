import { getFeatureProperties } from '../geoJsonCodeQuiz'
import { parseCountryPictureManifest } from '../pictureGeoJsonQuiz'

const ANSWER_URL = '/miscellaneous/eu_pedestrian_sign/answer.json'
const IMAGE_DIRECTORY = '/miscellaneous/eu_pedestrian_sign'

export function parseEuropePedestrianSignManifest(value: unknown) {
  return parseCountryPictureManifest(value, {
    idPattern: /^sign-\d{2}$/,
    imageDirectory: IMAGE_DIRECTORY,
    imageAltPrefix: 'Pedestrian crossing sign',
    manifestName: 'pedestrian sign',
  })
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
