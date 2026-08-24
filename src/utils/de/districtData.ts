import { getFeatureProperties } from '../geoJsonCodeQuiz'
import {
  GERMANY_DISTRICTS_BY_REGIERUNGSBEZIRK,
  GERMANY_REGIERUNGSBEZIRKE_BY_STATE,
} from './districts.generated'

export const DE_REGIERUNGSBEZIRK_DIVISIONS: Record<string, string[]> =
  Object.fromEntries(
    Object.entries(GERMANY_REGIERUNGSBEZIRKE_BY_STATE).map(
      ([state, regions]) => [state, [...regions]]
    )
  )

export const DE_DISTRICTS = Object.entries(
  GERMANY_DISTRICTS_BY_REGIERUNGSBEZIRK
).flatMap(([region, districts]) =>
  districts.map((district) => ({
    id: district,
    label: district,
    region,
  }))
)

const DE_DISTRICT_IDS = new Set<string>(
  DE_DISTRICTS.map((district) => district.id)
)

export function getGermanyDistrictIds(feature: unknown) {
  const rawDistrict = getFeatureProperties(feature)?.district
  if (typeof rawDistrict !== 'string') return []

  const district = rawDistrict.trim()
  return DE_DISTRICT_IDS.has(district) ? [district] : []
}
