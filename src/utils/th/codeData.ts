import { getFeatureProperties } from '../geoJsonCodeQuiz'

const THAILAND_AREA_CODE_VALUES = [
  '02',
  '032',
  '034',
  '035',
  '036',
  '037',
  '038',
  '039',
  '042',
  '043',
  '044',
  '045',
  '053',
  '054',
  '055',
  '056',
  '073',
  '074',
  '075',
  '076',
  '077',
] as const

const THAILAND_AREA_CODE_IDS = new Set<string>(THAILAND_AREA_CODE_VALUES)

export const TH_AREA_CODES = THAILAND_AREA_CODE_VALUES.map((code) => ({
  id: code,
  label: code,
}))

export function getThailandFeatureCodes(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return THAILAND_AREA_CODE_IDS.has(code) ? [code] : []
}
