import { getFeatureProperties } from '../geoJsonCodeQuiz'

const RUSSIA_FEDERAL_SUBJECT_NAMES = [
  'Adygea',
  'Altai',
  'Altai Krai',
  'Amur',
  'Arkhangelsk',
  'Astrakhan',
  'Bashkortostan',
  'Belgorod',
  'Bryansk',
  'Buryatia',
  'Chechnya',
  'Chelyabinsk',
  'Chukotka',
  'Chuvashia',
  'Dagestan',
  'Ingushetia',
  'Irkutsk',
  'Ivanovo',
  'Jewish',
  'Kabardino-Balkaria',
  'Kaliningrad',
  'Kalmykia',
  'Kaluga',
  'Kamchatka',
  'Karachay-Cherkessia',
  'Karelia',
  'Kemerovo',
  'Khabarovsk',
  'Khakassia',
  'Khanty-Mansi',
  'Kirov',
  'Komi',
  'Kostroma',
  'Krasnodar',
  'Krasnoyarsk',
  'Kurgan',
  'Kursk',
  'Leningrad',
  'Lipetsk',
  'Magadan',
  'Mari El',
  'Mordovia',
  'Moscow',
  'Moscow (Oblast)',
  'Murmansk',
  'Nenets',
  'Nizhny Novgorod',
  'North Ossetia–Alania',
  'Novgorod',
  'Novosibirsk',
  'Omsk',
  'Orenburg',
  'Oryol',
  'Penza',
  'Perm Krai',
  'Primorsky Krai',
  'Pskov',
  'Rostov',
  'Ryazan',
  'Saint Petersburg',
  'Sakha',
  'Sakhalin',
  'Samara',
  'Saratov',
  'Smolensk',
  'Stavropol',
  'Sverdlovsk',
  'Tambov',
  'Tatarstan',
  'Tomsk',
  'Tula',
  'Tuva',
  'Tver',
  'Tyumen',
  'Udmurtia',
  'Ulyanovsk',
  'Vladimir',
  'Volgograd',
  'Vologda',
  'Voronezh',
  'Yamalo-Nenets',
  'Yaroslavl',
  'Zabaykalsky',
]

export const RU_FEDERAL_SUBJECTS = RUSSIA_FEDERAL_SUBJECT_NAMES.map(
  (federalSubject) => ({
    id: federalSubject,
    label: federalSubject,
  })
)

const RU_FEDERAL_SUBJECT_IDS = new Set(
  RU_FEDERAL_SUBJECTS.map((federalSubject) => federalSubject.id)
)

export function getRussiaFederalSubjectIds(feature: unknown) {
  const federalSubject = getFeatureProperties(feature)?.fed_name
  if (typeof federalSubject !== 'string') return []

  const normalizedFederalSubject = federalSubject.trim()
  return RU_FEDERAL_SUBJECT_IDS.has(normalizedFederalSubject)
    ? [normalizedFederalSubject]
    : []
}
