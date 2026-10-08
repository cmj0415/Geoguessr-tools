import places from './places.json'
import { getFeatureProperties } from '../geoJsonCodeQuiz'

type HindiDistrict = {
  englishForm: string
  hindiForm: string
}

export const CORE_HINDI_STATES = [
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Madhya Pradesh',
  'Rajasthan',
  'Uttar Pradesh',
  'Uttarakhand',
] as const

const STATE_NAMES_BY_SOURCE: Record<string, string> = {
  BIHAR: 'Bihar',
  CHHATTISGARH: 'Chhattisgarh',
  DELHI: 'Delhi',
  HARYANA: 'Haryana',
  'HIMACHAL PRADESH': 'Himachal Pradesh',
  JHARKHAND: 'Jharkhand',
  'MADHYA PRADESH': 'Madhya Pradesh',
  RAJASTHAN: 'Rajasthan',
  'UTTAR PRADESH': 'Uttar Pradesh',
  UTTARAKHAND: 'Uttarakhand',
}

const DISTRICTS_WITHOUT_CURRENT_GEOMETRY = new Set([
  'Delhi\0Central North',
  'Delhi\0Old Delhi',
  'Delhi\0Outer North',
  'Haryana\0Hansi',
])

function getStateFromNote(note: string) {
  return note.match(/^State: ([^.]+)\./)?.[1] ?? null
}

function createDistrictId(state: string, englishForm: string) {
  return `${state}:${englishForm}`
}

export const IN_HINDI_DISTRICT_MAP: Record<string, HindiDistrict[]> =
  Object.fromEntries(
    CORE_HINDI_STATES.map((state) => [
      state,
      places
        .filter(
          (place) =>
            getStateFromNote(place.note) === state &&
            !DISTRICTS_WITHOUT_CURRENT_GEOMETRY.has(`${state}\0${place.answer}`)
        )
        .map((place) => ({
          englishForm: place.answer,
          hindiForm: place.prompt,
        })),
    ])
  )

IN_HINDI_DISTRICT_MAP.Delhi.push({
  englishForm: 'Shahdara',
  hindiForm: 'शाहदरा',
})

export const IN_HINDI_DISTRICTS = Object.entries(IN_HINDI_DISTRICT_MAP).flatMap(
  ([region, districts]) =>
    districts.map(({ englishForm, hindiForm }) => ({
      id: createDistrictId(region, englishForm),
      label: hindiForm,
      searchLabel: englishForm,
      region,
    }))
)

const IN_HINDI_DISTRICT_IDS = new Set(
  IN_HINDI_DISTRICTS.map((district) => district.id)
)

export function getIndiaHindiDistrictIds(feature: unknown) {
  const properties = getFeatureProperties(feature)
  const sourceState = properties?.STATE_UT
  const englishForm = properties?.english_form
  if (typeof sourceState !== 'string' || typeof englishForm !== 'string') {
    return []
  }

  const state = STATE_NAMES_BY_SOURCE[sourceState]
  if (!state) return []

  const id = createDistrictId(state, englishForm)
  return IN_HINDI_DISTRICT_IDS.has(id) ? [id] : []
}
