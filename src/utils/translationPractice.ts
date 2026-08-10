export type TranslationSegment = {
  source: string
  reading: string
  components?: string[]
}

export type TranslationPracticeEntry = {
  prompt: string
  answer: string
  alternativeAnswers?: string[]
  segments?: TranslationSegment[]
  note?: string | null
}

export function normalizeTranslationAnswer(value: string) {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
}

export function pickNextTranslationIndex(
  entryCount: number,
  currentIndex: number
) {
  if (entryCount <= 1) return 0

  const nextIndex = Math.floor(Math.random() * (entryCount - 1))
  return nextIndex >= currentIndex ? nextIndex + 1 : nextIndex
}
