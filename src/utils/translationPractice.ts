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

export type ScriptReferenceItem = {
  symbol: string
  romanizations: string[]
  note?: string
}

export type ScriptReferenceSection = {
  title: string
  description?: string
  items: ScriptReferenceItem[]
}

export type ScriptReference = {
  title: string
  description?: string
  sections: ScriptReferenceSection[]
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
