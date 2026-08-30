import { getFeatureProperties } from '../geoJsonCodeQuiz'

const TAIWAN_COUNTIES = [
  'Changhua County',
  'Chiayi',
  'Chiayi County',
  'Hsinchu',
  'Hsinchu County',
  'Hualien County',
  'Kaohsiung',
  'Keelung',
  'Kinmen',
  'Matsu Islands',
  'Miaoli County',
  'Nantou County',
  'New Taipei',
  'Penghu',
  'Pingtung County',
  'Taichung',
  'Tainan',
  'Taipei',
  'Taitung County',
  'Taoyuan',
  'Yilan County',
  'Yunlin County',
] as const

const TAIWAN_COUNTY_IDS = new Set<string>(TAIWAN_COUNTIES)

export const TW_COUNTIES = TAIWAN_COUNTIES.map((county) => ({
  id: county,
  label: county,
}))

export function getTaiwanCountyIds(feature: unknown) {
  const rawCounty = getFeatureProperties(feature)?.county
  if (typeof rawCounty !== 'string') return []

  const county = rawCounty.trim()
  return TAIWAN_COUNTY_IDS.has(county) ? [county] : []
}
