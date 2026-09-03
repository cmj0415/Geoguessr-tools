import { getFeatureProperties } from '../geoJsonCodeQuiz'

const VIETNAM_AREA_CODE_VALUES = [
  '24',
  '28',
  '203',
  '204',
  '205',
  '206',
  '207',
  '208',
  '209',
  '210',
  '211',
  '212',
  '213',
  '214',
  '215',
  '216',
  '218',
  '219',
  '220',
  '221',
  '222',
  '225',
  '226',
  '227',
  '228',
  '229',
  '232',
  '233',
  '234',
  '235',
  '236',
  '237',
  '238',
  '239',
  '251',
  '252',
  '254',
  '255',
  '256',
  '257',
  '258',
  '259',
  '260',
  '261',
  '262',
  '263',
  '269',
  '270',
  '271',
  '272',
  '273',
  '274',
  '275',
  '276',
  '277',
  '290',
  '291',
  '292',
  '293',
  '294',
  '296',
  '297',
  '299',
]

export const VN_AREA_CODES = VIETNAM_AREA_CODE_VALUES.map((code) => ({
  id: code,
  label: code,
}))

const VN_AREA_CODE_IDS = new Set<string>(VIETNAM_AREA_CODE_VALUES)

export function getVietnamAreaCodeIds(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return VN_AREA_CODE_IDS.has(code) ? [code] : []
}
