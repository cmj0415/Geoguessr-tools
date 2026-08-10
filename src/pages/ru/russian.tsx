import TranslationPractice from '../../components/TranslationPractice'
import places from '../../utils/ru/places.json'
import { RUSSIAN_SCRIPT_REFERENCE } from '../../utils/ru/scriptReference'
import type { TranslationPracticeEntry } from '../../utils/translationPractice'

const RUSSIAN_PLACES: TranslationPracticeEntry[] = places

export default function Russian() {
  return (
    <TranslationPractice
      title="Russian Practice"
      sourceLanguage="ru"
      entries={RUSSIAN_PLACES}
      itemCountLabel="places"
      scriptReference={RUSSIAN_SCRIPT_REFERENCE}
    />
  )
}
