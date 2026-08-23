import { getFeatureProperties } from '../geoJsonCodeQuiz'
import { TURKEY_DISTRICTS_BY_PROVINCE } from './districts.generated'

export const TR_PROVINCE_DIVISIONS: Record<string, string[]> = {
  Marmara: [
    'Balıkesir',
    'Bilecik',
    'Bursa',
    'Çanakkale',
    'Edirne',
    'İstanbul',
    'Kırklareli',
    'Kocaeli',
    'Sakarya',
    'Tekirdağ',
    'Yalova',
  ],
  Aegean: [
    'Afyonkarahisar',
    'Aydın',
    'Denizli',
    'İzmir',
    'Kütahya',
    'Manisa',
    'Muğla',
    'Uşak',
  ],
  Mediterranean: [
    'Adana',
    'Antalya',
    'Burdur',
    'Hatay',
    'Isparta',
    'Kahramanmaraş',
    'Mersin',
    'Osmaniye',
  ],
  'Central Anatolia': [
    'Aksaray',
    'Ankara',
    'Çankırı',
    'Eskişehir',
    'Karaman',
    'Kayseri',
    'Kırıkkale',
    'Kırşehir',
    'Konya',
    'Nevşehir',
    'Niğde',
    'Sivas',
    'Yozgat',
  ],
  'Black Sea': [
    'Amasya',
    'Artvin',
    'Bartın',
    'Bayburt',
    'Bolu',
    'Çorum',
    'Düzce',
    'Giresun',
    'Gümüşhane',
    'Karabük',
    'Kastamonu',
    'Ordu',
    'Rize',
    'Samsun',
    'Sinop',
    'Tokat',
    'Trabzon',
    'Zonguldak',
  ],
  'Eastern Anatolia': [
    'Ağrı',
    'Ardahan',
    'Bingöl',
    'Bitlis',
    'Elazığ',
    'Erzincan',
    'Erzurum',
    'Hakkâri',
    'Iğdır',
    'Kars',
    'Malatya',
    'Muş',
    'Tunceli',
    'Van',
  ],
  'Southeastern Anatolia': [
    'Adıyaman',
    'Batman',
    'Diyarbakır',
    'Gaziantep',
    'Kilis',
    'Mardin',
    'Siirt',
    'Şanlıurfa',
    'Şırnak',
  ],
}

const districtNameCounts = new Map<string, number>()
for (const districts of Object.values(TURKEY_DISTRICTS_BY_PROVINCE)) {
  for (const district of districts) {
    districtNameCounts.set(
      district,
      (districtNameCounts.get(district) ?? 0) + 1
    )
  }
}

function getTurkeyDistrictId(province: string, district: string) {
  return `${province}:${district}`
}

export const TR_DISTRICTS = Object.entries(
  TURKEY_DISTRICTS_BY_PROVINCE
).flatMap(([province, districts]) =>
  districts.map((district) => ({
    id: getTurkeyDistrictId(province, district),
    label:
      (districtNameCounts.get(district) ?? 0) > 1
        ? `${district} (${province})`
        : district,
    region: province,
  }))
)

const TR_DISTRICT_IDS = new Set(TR_DISTRICTS.map((district) => district.id))

export function getTurkeyDistrictIds(feature: unknown) {
  const properties = getFeatureProperties(feature)
  const rawProvince = properties?.province
  const rawDistrict = properties?.district
  if (typeof rawProvince !== 'string' || typeof rawDistrict !== 'string') {
    return []
  }

  const districtId = getTurkeyDistrictId(rawProvince.trim(), rawDistrict.trim())
  return TR_DISTRICT_IDS.has(districtId) ? [districtId] : []
}
