import type { ScriptReference } from '../translationPractice'

export const TH_PROVINCE_ABBREVIATION_SCRIPT_REFERENCE = {
  title: 'Thai province abbreviation letters',
  description:
    'Provincial-road abbreviations use Thai consonants as compact sound clues. Several Thai letters share the same Latin reading, so learn the shapes as well as their approximate sounds.',
  sections: [
    {
      title: 'Letters used in the quiz',
      description:
        'These are the only Thai characters that appear in the 76 province abbreviations.',
      items: [
        {
          symbol: 'อ',
          romanizations: ['a', 'e', 'u'],
          note: 'A consonant carrier used when a syllable begins with a vowel; the exact vowel depends on the province name.',
        },
        { symbol: 'ก', romanizations: ['k'] },
        { symbol: 'ข', romanizations: ['kh'] },
        { symbol: 'ค', romanizations: ['kh'] },
        { symbol: 'ง', romanizations: ['ng'] },
        { symbol: 'จ', romanizations: ['ch'] },
        { symbol: 'ฉ', romanizations: ['ch'] },
        { symbol: 'ช', romanizations: ['ch'] },
        { symbol: 'ฎ', romanizations: ['t'] },
        { symbol: 'ฐ', romanizations: ['th'] },
        { symbol: 'ด', romanizations: ['d'] },
        { symbol: 'ต', romanizations: ['t'] },
        { symbol: 'ท', romanizations: ['th'] },
        { symbol: 'ธ', romanizations: ['th'] },
        { symbol: 'น', romanizations: ['n'] },
        { symbol: 'บ', romanizations: ['b'] },
        { symbol: 'ป', romanizations: ['p'] },
        { symbol: 'พ', romanizations: ['ph'] },
        { symbol: 'ภ', romanizations: ['ph'] },
        { symbol: 'ม', romanizations: ['m'] },
        { symbol: 'ย', romanizations: ['y'] },
        { symbol: 'ร', romanizations: ['r'] },
        { symbol: 'ล', romanizations: ['l'] },
        { symbol: 'ว', romanizations: ['w'] },
        { symbol: 'ศ', romanizations: ['s'] },
        { symbol: 'ส', romanizations: ['s'] },
        { symbol: 'ห', romanizations: ['h'] },
      ],
    },
  ],
} satisfies ScriptReference
