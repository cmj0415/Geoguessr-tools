import type { ScriptReference } from '../translationPractice'

export const RUSSIAN_SCRIPT_REFERENCE = {
  title: 'Russian alphabet',
  description:
    'These practical readings match the English spellings used in the place-name quiz. Context can change how a letter is represented.',
  sections: [
    {
      title: 'Letters',
      description: 'Uppercase and lowercase forms are shown together.',
      items: [
        { symbol: 'А а', romanizations: ['a'] },
        { symbol: 'Б б', romanizations: ['b'] },
        { symbol: 'В в', romanizations: ['v'] },
        { symbol: 'Г г', romanizations: ['g'] },
        { symbol: 'Д д', romanizations: ['d'] },
        {
          symbol: 'Е е',
          romanizations: ['e', 'ye'],
          note: 'Usually ye at the beginning of a word or after a vowel, ъ, or ь; often e after a consonant.',
        },
        {
          symbol: 'Ё ё',
          romanizations: ['yo'],
          note: 'The dots are often omitted in ordinary Russian text, where е may be printed instead.',
        },
        { symbol: 'Ж ж', romanizations: ['zh'] },
        { symbol: 'З з', romanizations: ['z'] },
        { symbol: 'И и', romanizations: ['i'] },
        {
          symbol: 'Й й',
          romanizations: ['y', 'i'],
          note: 'A short i sound, commonly represented by y in place names.',
        },
        { symbol: 'К к', romanizations: ['k'] },
        { symbol: 'Л л', romanizations: ['l'] },
        { symbol: 'М м', romanizations: ['m'] },
        { symbol: 'Н н', romanizations: ['n'] },
        {
          symbol: 'О о',
          romanizations: ['o'],
          note: 'Unstressed о may sound closer to a, but established spellings normally retain o.',
        },
        { symbol: 'П п', romanizations: ['p'] },
        { symbol: 'Р р', romanizations: ['r'] },
        { symbol: 'С с', romanizations: ['s'] },
        { symbol: 'Т т', romanizations: ['t'] },
        { symbol: 'У у', romanizations: ['u'] },
        { symbol: 'Ф ф', romanizations: ['f'] },
        { symbol: 'Х х', romanizations: ['kh'] },
        { symbol: 'Ц ц', romanizations: ['ts'] },
        { symbol: 'Ч ч', romanizations: ['ch'] },
        { symbol: 'Ш ш', romanizations: ['sh'] },
        { symbol: 'Щ щ', romanizations: ['shch'] },
        {
          symbol: 'Ъ ъ',
          romanizations: [],
          note: 'The hard sign separates a consonant from a following iotated vowel.',
        },
        {
          symbol: 'Ы ы',
          romanizations: ['y'],
          note: 'A vowel without a direct English equivalent.',
        },
        {
          symbol: 'Ь ь',
          romanizations: [],
          note: 'The soft sign usually softens the preceding consonant and has no independent sound.',
        },
        { symbol: 'Э э', romanizations: ['e'] },
        {
          symbol: 'Ю ю',
          romanizations: ['yu', 'u'],
          note: 'Usually yu initially or after a vowel, ъ, or ь; it can follow a consonant as u while marking softness.',
        },
        {
          symbol: 'Я я',
          romanizations: ['ya', 'ia'],
          note: 'Usually ya initially or after a vowel, ъ, or ь; some established spellings use ia after a consonant.',
        },
      ],
    },
  ],
} satisfies ScriptReference
