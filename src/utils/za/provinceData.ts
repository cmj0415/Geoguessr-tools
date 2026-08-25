import { getFeatureProperties } from '../geoJsonCodeQuiz'

const SOUTH_AFRICA_PROVINCE_DATA = [
  ['Eastern Cape', 'Eastern Cape'],
  ['Free State', 'Free State'],
  ['Gauteng', 'Gauteng'],
  ['KwaZulu-Natal', 'KwaZulu-Natal'],
  ['Limpopo', 'Limpopo'],
  ['Mpumalanga', 'Mpumalanga'],
  ['North West', 'North West'],
  ['Nothern Cape', 'Northern Cape'],
  ['Western Cape', 'Western Cape'],
] as const

const PROVINCE_BY_SOURCE_NAME = new Map<string, string>(
  SOUTH_AFRICA_PROVINCE_DATA
)

export const ZA_PROVINCES = SOUTH_AFRICA_PROVINCE_DATA.map(([, province]) => ({
  id: province,
  label: province,
}))

export function getSouthAfricaProvinceIds(feature: unknown) {
  const rawProvince = getFeatureProperties(feature)?.province
  if (typeof rawProvince !== 'string') return []

  const province = PROVINCE_BY_SOURCE_NAME.get(rawProvince.trim())
  return province ? [province] : []
}
