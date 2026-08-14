import { getFeatureProperties } from '../geoJsonCodeQuiz'

const SPAIN_PROVINCE_NAMES = [
  'Albacete',
  'Alicante',
  'Almería',
  'Asturias',
  'Badajoz',
  'Baleares',
  'Barcelona',
  'Bizkaia',
  'Burgos',
  'Cantabria',
  'Castellón',
  'Ceuta',
  'Ciudad Real',
  'Cuenca',
  'Cáceres',
  'Cádiz',
  'Córdoba',
  'Gerona',
  'Gipuzkoa',
  'Granada',
  'Guadalajara',
  'Huelva',
  'Huesca',
  'Jaén',
  'La Coruña',
  'La Rioja',
  'Las Palmas',
  'León',
  'Lugo',
  'Lérida',
  'Madrid',
  'Melilla',
  'Murcia',
  'Málaga',
  'Navarra',
  'Orense',
  'Palencia',
  'Pontevedra',
  'Salamanca',
  'Santa Cruz de Tenerife',
  'Segovia',
  'Sevilla',
  'Soria',
  'Tarragona',
  'Teruel',
  'Toledo',
  'Valencia',
  'Valladolid',
  'Zamora',
  'Zaragoza',
  'Álava',
  'Ávila',
]

const SPAIN_PROVINCIAL_ROAD_PREFIXES = [
  'A',
  'AB',
  'AC/DP',
  'AL/ALP',
  'AS',
  'AV',
  'B/BV/BP',
  'BA',
  'BI',
  'BU',
  'CA',
  'CA/S',
  'CC',
  'CO/CP/CV',
  'CR',
  'CUV',
  'CV',
  'CV/CHE',
  'EI/PM/PMV',
  'EP/PO',
  'FV',
  'GA',
  'GC',
  'GI/GIV/GIP',
  'GM/CV',
  'GR',
  'GU',
  'HI',
  'HU',
  'HU/HF/HV',
  'JA/JV/JF',
  'LE',
  'LL/LV/LP',
  'LP',
  'LR',
  'LU',
  'LZ',
  'M',
  'MA',
  'Ma',
  'Me',
  'NA',
  'OU',
  'P/PP',
  'RM/MU',
  'SA',
  'SE',
  'SG',
  'SO',
  'T/TV/TP',
  'TE',
  'TF',
  'TO',
  'VA/VP',
  'ZA',
]

export const ES_PROVINCES = SPAIN_PROVINCE_NAMES.map((province) => ({
  id: province,
  label: province,
}))

export const ES_PROVINCIAL_ROAD_PREFIXES = SPAIN_PROVINCIAL_ROAD_PREFIXES.map(
  (prefix) => ({
    id: prefix,
    label: prefix,
  })
)

const ES_PROVINCE_IDS = new Set(ES_PROVINCES.map((province) => province.id))
const ES_PROVINCIAL_ROAD_PREFIX_IDS = new Set(
  ES_PROVINCIAL_ROAD_PREFIXES.map((prefix) => prefix.id)
)

export function getSpainProvinceIds(feature: unknown) {
  const province = getFeatureProperties(feature)?.name
  if (typeof province !== 'string') return []

  const normalizedProvince = province.trim()
  return ES_PROVINCE_IDS.has(normalizedProvince) ? [normalizedProvince] : []
}

export function getSpainProvincialRoadPrefixIds(feature: unknown) {
  const rawPrefix = getFeatureProperties(feature)?.provincial_road
  if (typeof rawPrefix !== 'string') return []

  const prefix = rawPrefix.trim()
  return ES_PROVINCIAL_ROAD_PREFIX_IDS.has(prefix) ? [prefix] : []
}
