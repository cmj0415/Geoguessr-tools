import { getFeatureProperties } from '../geoJsonCodeQuiz'

export function getEuropeAdminCountryIds(feature: unknown) {
  const code = getFeatureProperties(feature)?.code
  return typeof code === 'string' && /^[a-z]{2}$/.test(code) ? [code] : []
}

export function getEuropeAdminCountryLabel(feature: unknown) {
  const country = getFeatureProperties(feature)?.admin
  return typeof country === 'string' && country.trim().length > 0
    ? country.trim()
    : null
}
