import { getFeatureProperties } from '../geoJsonCodeQuiz'
import { TH_PROVINCE_ABBREVIATIONS } from './provinceAbbreviationData'

export const TH_PROVINCES = [
  ...TH_PROVINCE_ABBREVIATIONS.map((province) => ({
    id: province.id,
    label: province.id.replace(/ Province$/, ''),
  })),
  { id: 'Bangkok', label: 'Bangkok' },
]

const TH_PROVINCE_IDS = new Set<string>(
  TH_PROVINCES.map((province) => province.id)
)

export function getThailandProvinceIds(feature: unknown) {
  const rawProvince = getFeatureProperties(feature)?.shapeName
  if (typeof rawProvince !== 'string') return []

  const province = rawProvince.trim()
  return TH_PROVINCE_IDS.has(province) ? [province] : []
}
