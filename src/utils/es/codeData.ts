import { getFeatureProperties } from '../geoJsonCodeQuiz'

export const ES_AREA_CODE_MAP: Record<string, string[]> = {
  '91~93': [
    '91',
    '93',
    '920',
    '921',
    '922',
    '923',
    '924',
    '925',
    '926',
    '927',
    '928',
  ],
  '94': ['94', '941', '942', '943', '945', '947', '948', '949'],
  '95': ['95', '950', '953', '956', '957', '958', '959'],
  '96': ['96', '964', '967', '968', '969'],
  '97': ['971', '972', '973', '974', '975', '976', '977', '978', '979'],
  '98': ['98', '980', '981', '982', '983', '986', '987', '988'],
}

export const ES_AREA_CODE_PREFIXES = [
  '91~93',
  '94',
  '95',
  '96',
  '97',
  '98',
] as const

export const ES_AREA_CODES = ES_AREA_CODE_PREFIXES.flatMap((region) =>
  ES_AREA_CODE_MAP[region].map((code) => ({
    id: code,
    label: code,
    region,
  }))
)

const ES_AREA_CODE_IDS = new Set(ES_AREA_CODES.map((code) => code.id))

export function getSpainFeatureCodes(feature: unknown) {
  const rawCode = getFeatureProperties(feature)?.code
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

  const code = String(rawCode).trim()
  return ES_AREA_CODE_IDS.has(code) ? [code] : []
}
