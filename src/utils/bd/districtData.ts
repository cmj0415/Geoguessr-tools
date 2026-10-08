import { getFeatureProperties } from '../geoJsonCodeQuiz'
import places from './places.json'

const DISTRICT_NAME_ALIASES: Record<string, string> = {
  Chapainababganj: 'Chapainawabganj',
}

const BENGALI_NAMES_BY_ENGLISH = new Map(
  places.flatMap((place) =>
    [place.answer, ...place.alternativeAnswers].map(
      (englishForm) => [englishForm, place.prompt] as const
    )
  )
)

function getBengaliDistrictName(englishForm: string) {
  const lookupName = DISTRICT_NAME_ALIASES[englishForm] ?? englishForm
  const bengaliForm = BENGALI_NAMES_BY_ENGLISH.get(lookupName)
  if (!bengaliForm) {
    throw new Error(`Missing Bengali district name for ${englishForm}.`)
  }
  return bengaliForm
}

export const BD_DISTRICT_MAP: Record<string, string[]> = {
  Barishal: [
    'Barguna',
    'Barishal',
    'Bhola',
    'Jhalokati',
    'Patuakhali',
    'Pirojpur',
  ],
  Chattogram: [
    'Bandarban',
    'Brahmanbaria',
    'Chandpur',
    'Chattogram',
    "Cox's Bazar",
    'Cumilla',
    'Feni',
    'Khagrachhari',
    'Lakshmipur',
    'Noakhali',
    'Rangamati',
  ],
  Dhaka: [
    'Dhaka',
    'Faridpur',
    'Gazipur',
    'Gopalganj',
    'Kishoreganj',
    'Madaripur',
    'Manikganj',
    'Munshiganj',
    'Narayanganj',
    'Narsingdi',
    'Rajbari',
    'Shariatpur',
    'Tangail',
  ],
  Khulna: [
    'Bagerhat',
    'Chuadanga',
    'Jashore',
    'Jhenaidah',
    'Khulna',
    'Kushtia',
    'Magura',
    'Meherpur',
    'Narail',
    'Satkhira',
  ],
  Mymensingh: ['Jamalpur', 'Mymensingh', 'Netrakona', 'Sherpur'],
  Rajshahi: [
    'Bogura',
    'Chapainababganj',
    'Joypurhat',
    'Naogaon',
    'Natore',
    'Pabna',
    'Rajshahi',
    'Sirajganj',
  ],
  Rangpur: [
    'Dinajpur',
    'Gaibandha',
    'Kurigram',
    'Lalmonirhat',
    'Nilphamari',
    'Panchagarh',
    'Rangpur',
    'Thakurgaon',
  ],
  Sylhet: ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'],
}

export const BD_DISTRICTS = Object.entries(BD_DISTRICT_MAP).flatMap(
  ([region, districts]) =>
    districts.map((district) => ({
      id: district,
      label: getBengaliDistrictName(district),
      searchLabel: district,
      region,
    }))
)

const BD_DISTRICT_IDS = new Set(BD_DISTRICTS.map((district) => district.id))

export function getBangladeshDistrictIds(feature: unknown) {
  const district = getFeatureProperties(feature)?.district
  if (typeof district !== 'string') return []

  const normalizedDistrict = district.trim()
  return BD_DISTRICT_IDS.has(normalizedDistrict) ? [normalizedDistrict] : []
}
