import { getFeatureProperties } from '../geoJsonCodeQuiz'

const UNAVAILABLE_GERMANY_CODES = new Set([31, 32])

export const DE_AVAILABLE_CODES = Array.from(
  { length: 80 },
  (_, index) => index + 20
)
  .filter((code) => !UNAVAILABLE_GERMANY_CODES.has(code))
  .map(String)

export function getGermanyFeatureCodes(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.PREFIX2
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return /^\d{2}$/.test(code) ? [code] : []
}
