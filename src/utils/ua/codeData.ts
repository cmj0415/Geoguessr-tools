import { getFeatureProperties } from '../geoJsonCodeQuiz'

const UKRAINE_AREA_CODE_VALUES = [
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '41',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '61',
  '62',
  '64',
  '65',
  '69',
] as const

const UKRAINE_AREA_CODE_IDS = new Set<string>(UKRAINE_AREA_CODE_VALUES)

export const UA_AREA_CODES = UKRAINE_AREA_CODE_VALUES.map((code) => ({
  id: code,
  label: code,
}))

export function getUkraineFeatureCodes(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return UKRAINE_AREA_CODE_IDS.has(code) ? [code] : []
}
