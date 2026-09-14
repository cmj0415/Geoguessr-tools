import { getFeatureProperties } from '../geoJsonCodeQuiz'

const UKRAINE_OBLAST_DATA = [
  ['Autonomous Republic of Crimea', 'Autonomous Republic of Crimea'],
  ['Cherkasy Oblast', 'Cherkasy Oblast'],
  ['Chernihiv Oblast', 'Chernihiv Oblast'],
  ['Chernivtsi Oblast', 'Chernivtsi Oblast'],
  ['Dnipropetrovsk Oblast', 'Dnipropetrovsk Oblast'],
  ['Donetsk Oblast', 'Donetsk Oblast'],
  ['Ivano-Frankivsk Oblast', 'Ivano-Frankivsk Oblast'],
  ['Kharkiv Oblast', 'Kharkiv Oblast'],
  ['Kherson Oblast', 'Kherson Oblast'],
  ['Khmelnytskyi Oblast', 'Khmelnytskyi Oblast'],
  ['Kirovohrad Oblast', 'Kirovohrad Oblast'],
  ['Kyiv', 'Kyiv'],
  ['Kyiv Oblast', 'Kyiv Oblast'],
  ['Luhansk Oblast', 'Luhansk Oblast'],
  ['Lviv Oblast', 'Lviv Oblast'],
  ['Mykolaiv Oblast', 'Mykolaiv Oblast'],
  ['Odessa Oblast', 'Odesa Oblast'],
  ['Poltava Oblast', 'Poltava Oblast'],
  ['Rivne Oblast', 'Rivne Oblast'],
  ['Sevastopol', 'Sevastopol'],
  ['Sumy Oblast', 'Sumy Oblast'],
  ['Ternopil Oblast', 'Ternopil Oblast'],
  ['Vinnytsia Oblast', 'Vinnytsia Oblast'],
  ['Volyn Oblast', 'Volyn Oblast'],
  ['Zakarpattia Oblast', 'Zakarpattia Oblast'],
  ['Zaporizhia Oblast', 'Zaporizhzhia Oblast'],
  ['Zhytomyr Oblast', 'Zhytomyr Oblast'],
] as const

const OBLAST_BY_SOURCE_NAME = new Map<string, string>(UKRAINE_OBLAST_DATA)

export const UA_OBLASTS = UKRAINE_OBLAST_DATA.map(([, oblast]) => ({
  id: oblast,
  label: oblast,
}))

export function getUkraineOblastIds(feature: unknown) {
  const rawOblast = getFeatureProperties(feature)?.shapeName
  if (typeof rawOblast !== 'string') return []

  const oblast = OBLAST_BY_SOURCE_NAME.get(rawOblast.trim())
  return oblast ? [oblast] : []
}
