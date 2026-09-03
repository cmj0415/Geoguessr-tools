import { getFeatureProperties } from '../geoJsonCodeQuiz'

const NEW_ZEALAND_REGION_DATA = [
  ['Auckland', 'Auckland'],
  ['Bay of Plenty', 'Bay of Plenty'],
  ['Canterbury', 'Canterbury'],
  ['Gisborne', 'Gisborne'],
  ["Hawke's Bay", "Hawke's Bay"],
  ['Manawatu-Wanganui', 'Manawatū-Whanganui'],
  ['Marlborough', 'Marlborough'],
  ['Nelson', 'Nelson'],
  ['Northland', 'Northland'],
  ['Otago', 'Otago'],
  ['Southland', 'Southland'],
  ['Taranaki', 'Taranaki'],
  ['Tasman', 'Tasman'],
  ['Waikato', 'Waikato'],
  ['Wellington', 'Wellington'],
  ['West Coast', 'West Coast'],
] as const

const REGION_BY_SOURCE_NAME = new Map<string, string>(NEW_ZEALAND_REGION_DATA)

export const NZ_REGIONS = NEW_ZEALAND_REGION_DATA.map(([, region]) => ({
  id: region,
  label: region,
}))

export function getNewZealandRegionIds(feature: unknown) {
  const rawRegion = getFeatureProperties(feature)?.region
  if (typeof rawRegion !== 'string') return []

  const region = REGION_BY_SOURCE_NAME.get(rawRegion.trim())
  return region ? [region] : []
}
