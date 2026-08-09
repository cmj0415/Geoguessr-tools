import { getFeatureProperties } from '../geoJsonCodeQuiz'

export function formatCode(value: number) {
  return String(value).padStart(2, '0')
}

export const AVAILABLE_CODES = Array.from(
  { length: 99 },
  (_, index) => index + 1
)
  .filter((code) => code < 17 || code > 19)
  .map(formatCode)

export function getMexicoFeatureCodes(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.d_cp
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return /^\d+$/.test(code) ? [code.padStart(2, '0')] : []
}
