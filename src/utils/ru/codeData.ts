import { getFeatureProperties } from '../geoJsonCodeQuiz'

export const RU_AREA_CODE_MAP: Record<string, string[]> = {
  '3': [
    '301',
    '302',
    '341',
    '342',
    '343',
    '345',
    '346',
    '347',
    '349',
    '351',
    '352',
    '353',
    '381',
    '382',
    '383',
    '384',
    '385',
    '388',
    '390',
    '391',
    '394',
    '395',
  ],
  '4': [
    '401',
    '411',
    '413',
    '415',
    '416',
    '421',
    '423',
    '424',
    '426',
    '427',
    '471',
    '472',
    '473',
    '474',
    '475',
    '481',
    '482',
    '483',
    '484',
    '485',
    '486',
    '487',
    '491',
    '492',
    '493',
    '494',
    '495',
    '496',
    '498',
    '499',
  ],
  '8': [
    '811',
    '812',
    '813',
    '814',
    '815',
    '816',
    '817',
    '818',
    '820',
    '821',
    '831',
    '833',
    '834',
    '835',
    '836',
    '841',
    '842',
    '843',
    '844',
    '845',
    '846',
    '847',
    '848',
    '851',
    '855',
    '861',
    '862',
    '863',
    '865',
    '866',
    '867',
    '871',
    '872',
    '873',
    '877',
    '878',
    '879',
  ],
}

export const RU_AREA_CODES = Object.entries(RU_AREA_CODE_MAP).flatMap(
  ([region, codes]) =>
    codes.map((code) => ({
      id: code,
      label: code,
      region,
    }))
)

const RU_AREA_CODE_IDS = new Set(RU_AREA_CODES.map((code) => code.id))

export function getRussiaFeatureCodes(feature: unknown) {
  const rawCodes = getFeatureProperties(feature)?.code
  if (!Array.isArray(rawCodes)) return []

  return rawCodes.flatMap((rawCode) => {
    if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return []

    const code = String(rawCode).trim()
    return RU_AREA_CODE_IDS.has(code) ? [code] : []
  })
}
