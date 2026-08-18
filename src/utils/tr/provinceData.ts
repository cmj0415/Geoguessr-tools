import { getFeatureProperties } from '../geoJsonCodeQuiz'

const TURKEY_PROVINCES_BY_CODE = [
  ['212', 'İstanbul'],
  ['222', 'Eskişehir'],
  ['224', 'Bursa'],
  ['226', 'Yalova'],
  ['228', 'Bilecik'],
  ['232', 'İzmir'],
  ['236', 'Manisa'],
  ['242', 'Antalya'],
  ['246', 'Isparta'],
  ['248', 'Burdur'],
  ['252', 'Muğla'],
  ['256', 'Aydın'],
  ['258', 'Denizli'],
  ['262', 'Kocaeli'],
  ['264', 'Sakarya'],
  ['266', 'Balıkesir'],
  ['272', 'Afyonkarahisar'],
  ['274', 'Kütahya'],
  ['276', 'Uşak'],
  ['282', 'Tekirdağ'],
  ['284', 'Edirne'],
  ['286', 'Çanakkale'],
  ['288', 'Kırklareli'],
  ['312', 'Ankara'],
  ['318', 'Kırıkkale'],
  ['322', 'Adana'],
  ['324', 'Mersin'],
  ['326', 'Hatay'],
  ['328', 'Osmaniye'],
  ['332', 'Konya'],
  ['338', 'Karaman'],
  ['342', 'Gaziantep'],
  ['344', 'Kahramanmaraş'],
  ['346', 'Sivas'],
  ['348', 'Kilis'],
  ['352', 'Kayseri'],
  ['354', 'Yozgat'],
  ['356', 'Tokat'],
  ['358', 'Amasya'],
  ['362', 'Samsun'],
  ['364', 'Çorum'],
  ['366', 'Kastamonu'],
  ['368', 'Sinop'],
  ['370', 'Karabük'],
  ['372', 'Zonguldak'],
  ['374', 'Bolu'],
  ['376', 'Çankırı'],
  ['378', 'Bartın'],
  ['380', 'Düzce'],
  ['382', 'Aksaray'],
  ['384', 'Nevşehir'],
  ['386', 'Kırşehir'],
  ['388', 'Niğde'],
  ['412', 'Diyarbakır'],
  ['414', 'Şanlıurfa'],
  ['416', 'Adıyaman'],
  ['422', 'Malatya'],
  ['424', 'Elazığ'],
  ['426', 'Bingöl'],
  ['428', 'Tunceli'],
  ['432', 'Van'],
  ['434', 'Bitlis'],
  ['436', 'Muş'],
  ['438', 'Hakkâri'],
  ['442', 'Erzurum'],
  ['446', 'Erzincan'],
  ['452', 'Ordu'],
  ['454', 'Giresun'],
  ['456', 'Gümüşhane'],
  ['458', 'Bayburt'],
  ['462', 'Trabzon'],
  ['464', 'Rize'],
  ['466', 'Artvin'],
  ['472', 'Ağrı'],
  ['474', 'Kars'],
  ['476', 'Iğdır'],
  ['478', 'Ardahan'],
  ['482', 'Mardin'],
  ['484', 'Siirt'],
  ['486', 'Şırnak'],
  ['488', 'Batman'],
] as const

const PROVINCE_BY_CODE = new Map<string, string>(TURKEY_PROVINCES_BY_CODE)
PROVINCE_BY_CODE.set('216', 'İstanbul')

export const TR_PROVINCES = TURKEY_PROVINCES_BY_CODE.map(([, province]) => ({
  id: province,
  label: province,
}))

export const TR_AREA_CODE_MAP: Record<string, string[]> = {
  '2': [],
  '3': [],
  '4': [],
}

for (const code of [...PROVINCE_BY_CODE.keys()].sort()) {
  TR_AREA_CODE_MAP[code[0]].push(code)
}

export const TR_AREA_CODES = Object.entries(TR_AREA_CODE_MAP).flatMap(
  ([region, codes]) =>
    codes.map((code) => ({
      id: code,
      label: code,
      region,
    }))
)

const TR_AREA_CODE_IDS = new Set(TR_AREA_CODES.map((code) => code.id))

function getFeatureCode(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return null

  return String(rawCode).trim()
}

export function getTurkeyProvinceIds(feature: unknown) {
  const code = getFeatureCode(feature)
  if (!code) return []

  const province = PROVINCE_BY_CODE.get(code)
  return province ? [province] : []
}

export function getTurkeyFeatureCodes(feature: unknown) {
  const code = getFeatureCode(feature)
  return code && TR_AREA_CODE_IDS.has(code) ? [code] : []
}
