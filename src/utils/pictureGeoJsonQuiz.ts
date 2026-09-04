import type L from 'leaflet'
import {
  GEO_JSON_CORRECT_STYLE,
  GEO_JSON_DEFAULT_STYLE,
} from './geoJsonCodeQuiz'

export type PictureGeoJsonQuestion = {
  id: string
  imageUrl: string
  imageAlt: string
  answerIds: readonly string[]
}

export const GEO_JSON_INCORRECT_STYLE: L.PathOptions = {
  color: '#fb7185',
  fillColor: '#f43f5e',
  weight: 3,
  opacity: 1,
  fillOpacity: 0.58,
}

type PictureFeatureStyleState = {
  correctIds: ReadonlySet<string>
  incorrectIds: ReadonlySet<string>
}

export function getPictureFeatureStyle(
  featureIds: readonly string[],
  { correctIds, incorrectIds }: PictureFeatureStyleState
) {
  if (featureIds.some((id) => correctIds.has(id))) {
    return GEO_JSON_CORRECT_STYLE
  }
  if (featureIds.some((id) => incorrectIds.has(id))) {
    return GEO_JSON_INCORRECT_STYLE
  }
  return GEO_JSON_DEFAULT_STYLE
}

export function getRemainingAnswerCount(
  answerIds: readonly string[],
  foundIds: ReadonlySet<string>
) {
  return answerIds.filter((id) => !foundIds.has(id)).length
}

export function isPictureQuestionComplete(
  answerIds: readonly string[],
  foundIds: ReadonlySet<string>
) {
  return (
    answerIds.length > 0 && getRemainingAnswerCount(answerIds, foundIds) === 0
  )
}

export function pickNextPictureQuestionIndex(
  questionCount: number,
  currentIndex: number,
  randomValue = Math.random()
) {
  if (questionCount <= 0) return -1
  if (questionCount === 1) return 0

  const safeRandomValue = Math.min(Math.max(randomValue, 0), 0.999999999)
  const offset = 1 + Math.floor(safeRandomValue * (questionCount - 1))
  return (currentIndex + offset) % questionCount
}
