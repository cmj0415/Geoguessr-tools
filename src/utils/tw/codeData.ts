import { getFeatureProperties } from '../geoJsonCodeQuiz'

const TAIWAN_AREA_CODE_VALUES = [
  '02',
  '033',
  '034',
  '035',
  '037',
  '038',
  '039',
  '0422/0423/0424/0427',
  '0425',
  '0426',
  '047',
  '048',
  '049',
  '052',
  '053',
  '055',
  '056',
  '057',
  '062/063',
  '065',
  '066',
  '067',
  '069',
  '07',
  '082',
  '08362',
  '08365',
  '08367',
  '087',
  '088',
  '089',
] as const

const TAIWAN_AREA_CODE_IDS = new Set<string>(TAIWAN_AREA_CODE_VALUES)

export const TW_AREA_CODES = TAIWAN_AREA_CODE_VALUES.map((code) => ({
  id: code,
  label: code,
}))

export function getTaiwanFeatureCodes(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return TAIWAN_AREA_CODE_IDS.has(code) ? [code] : []
}
