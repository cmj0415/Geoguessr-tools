import { getFeatureProperties } from '../geoJsonCodeQuiz'

const ECUADOR_PROVINCE_DATA = [
  ['Azuay', 'Azuay', 'A'],
  ['Bolívar', 'Bolívar', 'B'],
  ['Cañar', 'Cañar', 'U'],
  ['Carchi', 'Carchi', 'C'],
  ['Chimborazo', 'Chimborazo', 'H'],
  ['Cotopaxi', 'Cotopaxi', 'X'],
  ['El Oro', 'El Oro', 'O'],
  ['Esmeraldas', 'Esmeraldas', 'E'],
  ['Guayas', 'Guayas', 'G'],
  ['Imbabura', 'Imbabura', 'I'],
  ['Loja', 'Loja', 'L'],
  ['Los Ríos', 'Los Ríos', 'R'],
  ['Manabi', 'Manabí', 'M'],
  ['Morona Santiago', 'Morona Santiago', 'V'],
  ['Napo', 'Napo', 'N'],
  ['Orellana', 'Orellana', 'Q'],
  ['Pastaza', 'Pastaza', 'S'],
  ['Pichincha', 'Pichincha', 'P'],
  ['Santa Elena', 'Santa Elena', 'Y'],
  [
    'Santo Domingo de los Tsáchilas',
    'Santo Domingo de los Tsáchilas',
    'J',
  ],
  ['Sucumbios', 'Sucumbíos', 'K'],
  ['Tungurahua', 'Tungurahua', 'T'],
  ['Zamora Chinchipe', 'Zamora Chinchipe', 'Z'],
] as const

const PROVINCE_BY_SOURCE_NAME = new Map<string, string>(
  ECUADOR_PROVINCE_DATA.map(([sourceName, province]) => [sourceName, province])
)

export const EC_PROVINCES = ECUADOR_PROVINCE_DATA.map(([, province]) => ({
  id: province,
  label: province,
}))

export const EC_TAXI_LETTERS = ECUADOR_PROVINCE_DATA.map(
  ([, , taxiLetter]) => ({
    id: taxiLetter,
    label: taxiLetter,
  })
).sort((first, second) => first.id.localeCompare(second.id))

const EC_TAXI_LETTER_IDS = new Set<string>(
  EC_TAXI_LETTERS.map((taxiLetter) => taxiLetter.id)
)

export function getEcuadorProvinceIds(feature: unknown) {
  const rawProvince = getFeatureProperties(feature)?.province
  if (typeof rawProvince !== 'string') return []

  const province = PROVINCE_BY_SOURCE_NAME.get(rawProvince.trim())
  return province ? [province] : []
}

export function getEcuadorTaxiLetterIds(feature: unknown) {
  const rawTaxiLetter = getFeatureProperties(feature)?.taxi
  if (typeof rawTaxiLetter !== 'string') return []

  const taxiLetter = rawTaxiLetter.trim().toUpperCase()
  return EC_TAXI_LETTER_IDS.has(taxiLetter) ? [taxiLetter] : []
}
