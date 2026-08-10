import TranslationPractice from '../../components/TranslationPractice'
import places from '../../utils/bd/places.json'
import type { TranslationPracticeEntry } from '../../utils/translationPractice'

const BENGALI_PLACES: TranslationPracticeEntry[] = places

export default function Bengali() {
  return (
    <TranslationPractice
      title="Bengali Practice"
      sourceLanguage="bn"
      entries={BENGALI_PLACES}
      itemCountLabel="places"
      componentLabel="Conjunct"
    />
  )
}
