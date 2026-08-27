import { getFeatureProperties } from '../geoJsonCodeQuiz'

const INDIA_STATE_NAMES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const

export const IN_STATES = INDIA_STATE_NAMES.map((state) => ({
  id: state,
  label: state,
}))

const IN_STATE_IDS = new Set<string>(INDIA_STATE_NAMES)

export function getIndiaStateIds(feature: unknown) {
  const rawState = getFeatureProperties(feature)?.shapeName
  if (typeof rawState !== 'string') return []

  const state = rawState.trim()
  return IN_STATE_IDS.has(state) ? [state] : []
}
