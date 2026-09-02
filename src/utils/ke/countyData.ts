import { getFeatureProperties } from '../geoJsonCodeQuiz'

export const KE_COUNTIES = [
  { id: 'Baringo', label: 'Baringo' },
  { id: 'Bomet', label: 'Bomet' },
  { id: 'Bungoma', label: 'Bungoma' },
  { id: 'Busia', label: 'Busia' },
  { id: 'Elgeyo-Marakwet', label: 'Elgeyo-Marakwet' },
  { id: 'Embu', label: 'Embu' },
  { id: 'Garissa', label: 'Garissa' },
  { id: 'Homa Bay', label: 'Homa Bay' },
  { id: 'Isiolo', label: 'Isiolo' },
  { id: 'Kajiado', label: 'Kajiado' },
  { id: 'Kakamega', label: 'Kakamega' },
  { id: 'Kericho', label: 'Kericho' },
  { id: 'Kiambu', label: 'Kiambu' },
  { id: 'Kilifi', label: 'Kilifi' },
  { id: 'Kirinyaga', label: 'Kirinyaga' },
  { id: 'Kisii', label: 'Kisii' },
  { id: 'Kisumu', label: 'Kisumu' },
  { id: 'Kitui', label: 'Kitui' },
  { id: 'Kwale', label: 'Kwale' },
  { id: 'Laikipia', label: 'Laikipia' },
  { id: 'Lamu', label: 'Lamu' },
  { id: 'Machakos', label: 'Machakos' },
  { id: 'Makueni', label: 'Makueni' },
  { id: 'Mandera', label: 'Mandera' },
  { id: 'Marsabit', label: 'Marsabit' },
  { id: 'Meru', label: 'Meru' },
  { id: 'Migori', label: 'Migori' },
  { id: 'Mombasa', label: 'Mombasa' },
  { id: "Murang'a", label: "Murang'a" },
  { id: 'Nairobi', label: 'Nairobi' },
  { id: 'Nakuru', label: 'Nakuru' },
  { id: 'Nandi', label: 'Nandi' },
  { id: 'Narok', label: 'Narok' },
  { id: 'Nyamira', label: 'Nyamira' },
  { id: 'Nyandarua', label: 'Nyandarua' },
  { id: 'Nyeri', label: 'Nyeri' },
  { id: 'Samburu', label: 'Samburu' },
  { id: 'Siaya', label: 'Siaya' },
  { id: 'Taita Taveta', label: 'Taita Taveta' },
  { id: 'Tana River', label: 'Tana River' },
  { id: 'Tharaka', label: 'Tharaka Nithi' },
  { id: 'Trans Nzoia', label: 'Trans Nzoia' },
  { id: 'Turkana', label: 'Turkana' },
  { id: 'Uasin Gishu', label: 'Uasin Gishu' },
  { id: 'Vihiga', label: 'Vihiga' },
  { id: 'Wajir', label: 'Wajir' },
  { id: 'West Pokot', label: 'West Pokot' },
]

const KE_COUNTY_IDS = new Set<string>(KE_COUNTIES.map((county) => county.id))

export function getKenyaCountyIds(feature: unknown) {
  const rawCounty = getFeatureProperties(feature)?.county
  if (typeof rawCounty !== 'string') return []

  const county = rawCounty.trim()
  return KE_COUNTY_IDS.has(county) ? [county] : []
}
