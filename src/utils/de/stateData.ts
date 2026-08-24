import { getFeatureProperties } from '../geoJsonCodeQuiz'

const GERMANY_STATE_NAMES = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
] as const

export const DE_STATES = GERMANY_STATE_NAMES.map((state) => ({
  id: state,
  label: state,
}))

const DE_STATE_IDS = new Set<string>(GERMANY_STATE_NAMES)

export function getGermanyStateIds(feature: unknown) {
  const rawState = getFeatureProperties(feature)?.state
  if (typeof rawState !== 'string') return []

  const state = rawState.trim()
  return DE_STATE_IDS.has(state) ? [state] : []
}
