import { getFeatureProperties } from '../geoJsonCodeQuiz'

export const PH_MAP: Record<string, string[]> = {
  Luzon: [
    'Abra',
    'Albay',
    'Apayao',
    'Aurora',
    'Bataan',
    'Batanes',
    'Batangas',
    'Benguet',
    'Bulacan',
    'Cagayan',
    'Camarines Norte',
    'Camarines Sur',
    'Catanduanes',
    'Cavite',
    'Ifugao',
    'Ilocos Norte',
    'Ilocos Sur',
    'Isabela',
    'Kalinga',
    'La Union',
    'Laguna',
    'Manila',
    'Marinduque',
    'Masbate',
    'Mountain Province',
    'Nueva Ecija',
    'Nueva Vizcaya',
    'Occidental Mindoro',
    'Oriental Mindoro',
    'Palawan',
    'Pampanga',
    'Pangasinan',
    'Quezon',
    'Quirino',
    'Rizal',
    'Romblon',
    'Sorsogon',
    'Tarlac',
    'Zambales',
  ],
  Visayas: [
    'Aklan',
    'Antique',
    'Biliran',
    'Bohol',
    'Capiz',
    'Cebu',
    'Eastern Samar',
    'Guimaras',
    'Iloilo',
    'Leyte',
    'Negros Occidental',
    'Negros Oriental',
    'Northern Samar',
    'Samar',
    'Siquijor',
    'Southern Leyte',
  ],
  Mindanao: [
    'Agusan del Norte',
    'Agusan del Sur',
    'Basilan',
    'Bukidnon',
    'Camiguin',
    'Cotabato',
    'Davao de Oro',
    'Davao del Norte',
    'Davao del Sur',
    'Davao Occidental',
    'Davao Oriental',
    'Dinagat Islands',
    'Lanao del Norte',
    'Lanao del Sur',
    'Maguindanao del Norte',
    'Maguindanao del Sur',
    'Misamis Occidental',
    'Misamis Oriental',
    'Sarangani',
    'South Cotabato',
    'Sultan Kudarat',
    'Sulu',
    'Surigao del Norte',
    'Surigao del Sur',
    'Tawi-Tawi',
    'Zamboanga del Norte',
    'Zamboanga del Sur',
    'Zamboanga Sibugay',
  ],
}

export const PH_PROVINCES = Object.entries(PH_MAP).flatMap(
  ([region, provinces]) =>
    provinces.map((province) => ({
      id: province,
      label: province,
      region,
    }))
)

const PH_PROVINCE_IDS = new Set(PH_PROVINCES.map((province) => province.id))

export function getPhilippinesProvinceIds(feature: unknown) {
  const province = getFeatureProperties(feature)?.province
  if (typeof province !== 'string') return []

  const normalizedProvince = province.trim()
  return PH_PROVINCE_IDS.has(normalizedProvince) ? [normalizedProvince] : []
}
