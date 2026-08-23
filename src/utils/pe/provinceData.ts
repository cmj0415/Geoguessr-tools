import { getFeatureProperties } from '../geoJsonCodeQuiz'

const PERU_PROVINCE_DATA = [
  ['Amazonas', 'Amazonas'],
  ['Ancash', 'Áncash'],
  ['Apurimac', 'Apurímac'],
  ['Arequipa', 'Arequipa'],
  ['Ayacucho', 'Ayacucho'],
  ['Cajamarca', 'Cajamarca'],
  ['Callao', 'Callao'],
  ['Cusco', 'Cusco'],
  ['Huancavelica', 'Huancavelica'],
  ['Huanuco', 'Huánuco'],
  ['Ica', 'Ica'],
  ['Junin', 'Junín'],
  ['La Libertad', 'La Libertad'],
  ['Lambayeque', 'Lambayeque'],
  ['Lima', 'Lima'],
  ['Loreto', 'Loreto'],
  ['Madre de Dios', 'Madre de Dios'],
  ['Moquegua', 'Moquegua'],
  ['Pasco', 'Pasco'],
  ['Piura', 'Piura'],
  ['Puno', 'Puno'],
  ['San Martin', 'San Martín'],
  ['Tacna', 'Tacna'],
  ['Tumbes', 'Tumbes'],
  ['Ucayali', 'Ucayali'],
] as const

const PROVINCE_BY_SOURCE_NAME = new Map<string, string>(PERU_PROVINCE_DATA)

export const PE_PROVINCES = PERU_PROVINCE_DATA.map(([, province]) => ({
  id: province,
  label: province,
}))

export function getPeruProvinceIds(feature: unknown) {
  const rawProvince = getFeatureProperties(feature)?.province
  if (typeof rawProvince !== 'string') return []

  const province = PROVINCE_BY_SOURCE_NAME.get(rawProvince.trim())
  return province ? [province] : []
}
