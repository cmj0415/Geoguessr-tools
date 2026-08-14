import { getFeatureProperties } from '../geoJsonCodeQuiz'

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
      label: district,
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
