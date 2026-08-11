import { getFeatureProperties } from '../geoJsonCodeQuiz'

const NIGERIA_STATE_NAMES = [
  'Abia',
  'Abuja',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

export const NG_STATES = NIGERIA_STATE_NAMES.map((state) => ({
  id: state,
  label: state,
}))

const NG_STATE_IDS = new Set(NG_STATES.map((state) => state.id))

export function getNigeriaStateIds(feature: unknown) {
  const state = getFeatureProperties(feature)?.statename
  if (typeof state !== 'string') return []

  const normalizedState = state.trim()
  return NG_STATE_IDS.has(normalizedState) ? [normalizedState] : []
}
