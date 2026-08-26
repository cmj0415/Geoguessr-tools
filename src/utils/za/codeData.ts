import { getFeatureProperties } from '../geoJsonCodeQuiz'

const SOUTH_AFRICA_AREA_CODE_VALUES = [
  '010',
  '011',
  '012',
  '013',
  '014',
  '015',
  '016',
  '017',
  '018',
  '021',
  '022',
  '023',
  '027',
  '028',
  '031',
  '032',
  '033',
  '034',
  '035',
  '036',
  '039',
  '041',
  '042',
  '043',
  '044',
  '045',
  '046',
  '047',
  '048',
  '049',
  '051',
  '053',
  '054',
  '056',
  '057',
  '058',
] as const

export const ZA_AREA_CODES = SOUTH_AFRICA_AREA_CODE_VALUES.map((code) => ({
  id: code,
  label: code,
}))

const ZA_AREA_CODE_IDS = new Set<string>(SOUTH_AFRICA_AREA_CODE_VALUES)

export function getSouthAfricaFeatureCodes(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  return String(rawCode)
    .split('/')
    .flatMap((value) => {
      const code = value.trim()
      return ZA_AREA_CODE_IDS.has(code) ? [code] : []
    })
}
