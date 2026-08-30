import { getFeatureProperties } from '../geoJsonCodeQuiz'

const JAPAN_AREA_CODE_VALUES = [
  '03',
  '06',
  '011',
  '012',
  '013',
  '014',
  '015',
  '016',
  '017',
  '018',
  '019',
  '022',
  '023',
  '024',
  '025',
  '026',
  '027',
  '028',
  '029',
  '042',
  '043',
  '044',
  '045',
  '046',
  '047',
  '048',
  '049',
  '052',
  '053',
  '054',
  '055',
  '056',
  '057',
  '058',
  '059',
  '072',
  '073',
  '074',
  '075',
  '076',
  '077',
  '078',
  '079',
  '082',
  '083',
  '084',
  '085',
  '086',
  '087',
  '088',
  '089',
  '092',
  '093',
  '094',
  '095',
  '096',
  '097',
  '098',
  '099',
] as const

export const JP_AREA_CODES = JAPAN_AREA_CODE_VALUES.map((code) => ({
  id: code,
  label: code,
}))

const JP_AREA_CODE_IDS = new Set<string>(JAPAN_AREA_CODE_VALUES)

export function getJapanFeatureCodes(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return JP_AREA_CODE_IDS.has(code) ? [code] : []
}
