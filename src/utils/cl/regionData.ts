import { getFeatureProperties } from '../geoJsonCodeQuiz'

const CHILE_REGION_DATA = [
  ['Antofagasta', 'Antofagasta'],
  ['Arica and Parinacota', 'Arica y Parinacota'],
  ['Atacama', 'Atacama'],
  ['Aysén', 'Aysén'],
  ['Coquimbo', 'Coquimbo'],
  ['Araucanía', 'La Araucanía'],
  ['Los Lagos', 'Los Lagos'],
  ['Los Ríos', 'Los Ríos'],
  ['Magallanes', 'Magallanes'],
  ['Ñuble', 'Ñuble'],
  ['Tarapacá', 'Tarapacá'],
  ['Valparaíso', 'Valparaíso'],
  ['Biobío', 'Biobío'],
  ["O'Higgins", "O'Higgins"],
  ['Maule', 'Maule'],
  ['Metropolitan', 'Metropolitana de Santiago'],
] as const

const REGION_BY_SOURCE_NAME = new Map<string, string>(CHILE_REGION_DATA)

export const CL_REGIONS = CHILE_REGION_DATA.map(([, region]) => ({
  id: region,
  label: region,
}))

export function getChileRegionIds(feature: unknown) {
  const rawRegion = getFeatureProperties(feature)?.region
  if (typeof rawRegion !== 'string') return []

  const region = REGION_BY_SOURCE_NAME.get(rawRegion.trim())
  return region ? [region] : []
}
