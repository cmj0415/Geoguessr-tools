import { getFeatureProperties } from '../geoJsonCodeQuiz'

const ARGENTINA_PROVINCE_DATA = [
  ['Buenos Aires', 'Buenos Aires'],
  ['Catamarca', 'Catamarca'],
  ['Chaco', 'Chaco'],
  ['Chubut', 'Chubut'],
  ['Ciudad de Buenos Aires', 'Ciudad Autónoma de Buenos Aires'],
  ['Córdoba', 'Córdoba'],
  ['Corrientes', 'Corrientes'],
  ['Entre Ríos', 'Entre Ríos'],
  ['Formosa', 'Formosa'],
  ['Jujuy', 'Jujuy'],
  ['La Pampa', 'La Pampa'],
  ['La Rioja', 'La Rioja'],
  ['Mendoza', 'Mendoza'],
  ['Misiones', 'Misiones'],
  ['Neuquén', 'Neuquén'],
  ['Río negro', 'Río Negro'],
  ['Salta', 'Salta'],
  ['San Juan', 'San Juan'],
  ['San Luis', 'San Luis'],
  ['Santa Cruz', 'Santa Cruz'],
  ['Santa Fe', 'Santa Fe'],
  ['Santiago del Estero', 'Santiago del Estero'],
  ['Tierra del Fuego', 'Tierra del Fuego'],
  ['Tucumán', 'Tucumán'],
] as const

const PROVINCE_BY_SOURCE_NAME = new Map<string, string>(ARGENTINA_PROVINCE_DATA)

export const AR_PROVINCES = ARGENTINA_PROVINCE_DATA.map(([, province]) => ({
  id: province,
  label: province,
}))

export function getArgentinaProvinceIds(feature: unknown) {
  const rawProvince = getFeatureProperties(feature)?.province
  if (typeof rawProvince !== 'string') return []

  const province = PROVINCE_BY_SOURCE_NAME.get(rawProvince.trim())
  return province ? [province] : []
}
