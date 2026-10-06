import TranslationPractice from '../../components/TranslationPractice'
import places from '../../utils/in/places.json'
import { HINDI_SCRIPT_REFERENCE } from '../../utils/in/scriptReference'
import type { TranslationPracticeEntry } from '../../utils/translationPractice'

const HINDI_DISTRICTS: TranslationPracticeEntry[] = places

export default function Hindi() {
  return (
    <TranslationPractice
      title="Hindi Practice"
      sourceLanguage="hi"
      entries={HINDI_DISTRICTS}
      itemCountLabel="districts"
      componentLabel="Conjunct"
      scriptReference={HINDI_SCRIPT_REFERENCE}
    />
  )
}
