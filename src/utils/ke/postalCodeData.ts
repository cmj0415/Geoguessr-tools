import { getFeatureProperties } from '../geoJsonCodeQuiz'

export const KE_POSTAL_CODES = [
  '0',
  '101',
  '102',
  '103',
  '104',
  '201',
  '202',
  '203',
  '204',
  '205',
  '206',
  '301',
  '302',
  '303',
  '304',
  '305',
  '306',
  '401',
  '402',
  '403',
  '404',
  '405',
  '406',
  '501',
  '502',
  '503',
  '504',
  '601',
  '602',
  '603',
  '604',
  '605/607',
  '701',
  '702',
  '703',
  '801',
  '802',
  '803',
  '804',
  '805',
  '901',
  '902/904',
  '903',
]

export const KE_POSTAL_CODE_ITEMS = KE_POSTAL_CODES.map((code) => ({
  id: code,
  label: code,
}))

const KE_POSTAL_CODE_IDS = new Set<string>(KE_POSTAL_CODES)

export function getKenyaPostalCodeIds(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return KE_POSTAL_CODE_IDS.has(code) ? [code] : []
}
