import { getFeatureProperties } from '../geoJsonCodeQuiz'

const ROMANIA_COUNTY_DATA = [
  ['Alba', 'Alba'],
  ['Arad', 'Arad'],
  ['Arges', 'Argeș'],
  ['Bacau', 'Bacău'],
  ['Bihor', 'Bihor'],
  ['Bistrita-Nasaud', 'Bistrița-Năsăud'],
  ['Botosani', 'Botoșani'],
  ['Braila', 'Brăila'],
  ['Brasov', 'Brașov'],
  ['Bucuresti', 'București'],
  ['Buzau', 'Buzău'],
  ['Calarasi', 'Călărași'],
  ['Caras-Severin', 'Caraș-Severin'],
  ['Cluj', 'Cluj'],
  ['Constanta', 'Constanța'],
  ['Covasna', 'Covasna'],
  ['Dambovita', 'Dâmbovița'],
  ['Dolj', 'Dolj'],
  ['Galati', 'Galați'],
  ['Giurgiu', 'Giurgiu'],
  ['Gorj', 'Gorj'],
  ['Harghita', 'Harghita'],
  ['Hunedoara', 'Hunedoara'],
  ['Ialomita', 'Ialomița'],
  ['Iasi', 'Iași'],
  ['Ilfov', 'Ilfov'],
  ['Maramures', 'Maramureș'],
  ['Mehedinti', 'Mehedinți'],
  ['Mures', 'Mureș'],
  ['Neamt', 'Neamț'],
  ['Olt', 'Olt'],
  ['Prahova', 'Prahova'],
  ['Salaj', 'Sălaj'],
  ['Satu Mare', 'Satu Mare'],
  ['Sibiu', 'Sibiu'],
  ['Suceava', 'Suceava'],
  ['Teleorman', 'Teleorman'],
  ['Timis', 'Timiș'],
  ['Tulcea', 'Tulcea'],
  ['Valcea', 'Vâlcea'],
  ['Vaslui', 'Vaslui'],
  ['Vrancea', 'Vrancea'],
] as const

const COUNTY_BY_SOURCE_NAME = new Map<string, string>(ROMANIA_COUNTY_DATA)

export const RO_COUNTIES = ROMANIA_COUNTY_DATA.map(([, county]) => ({
  id: county,
  label: county,
}))

export function getRomaniaCountyIds(feature: unknown) {
  const rawCounty = getFeatureProperties(feature)?.shapeName
  if (typeof rawCounty !== 'string') return []

  const county = COUNTY_BY_SOURCE_NAME.get(rawCounty.trim())
  return county ? [county] : []
}
