export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const

export type Difficulty = (typeof DIFFICULTIES)[number]

export type PoolConfiguration = {
  code: string
  name: string
  continent: string
  sourceCountryCodes: readonly string[]
  primaryCountryCode: string
  dependencyLabels?: Readonly<Record<string, string>>
  jurisdictionLabels?: Readonly<Record<string, string>>
}

function pool(
  continent: string,
  code: string,
  name: string,
  sourceCountryCodes: readonly string[] = [code.toUpperCase()],
  options: Pick<
    PoolConfiguration,
    'primaryCountryCode' | 'dependencyLabels' | 'jurisdictionLabels'
  > = { primaryCountryCode: sourceCountryCodes[0] ?? code.toUpperCase() }
): PoolConfiguration {
  return { continent, code, name, sourceCountryCodes, ...options }
}

export const POOL_CONFIGURATIONS: readonly PoolConfiguration[] = [
  pool('Asia', 'jp', 'Japan'),
  pool('Asia', 'kr', 'South Korea'),
  pool('Asia', 'mn', 'Mongolia'),
  pool('Asia', 'kz', 'Kazakhstan'),
  pool('Asia', 'kg', 'Kyrgyzstan'),
  pool('Asia', 'tw', 'Taiwan'),
  pool('Asia', 'hk', 'Hong Kong'),
  pool('Asia', 'mo', 'Macau'),
  pool('Asia', 'ph', 'Philippines'),
  pool('Asia', 'my', 'Malaysia'),
  pool('Asia', 'id', 'Indonesia'),
  pool('Asia', 'vn', 'Vietnam'),
  pool('Asia', 'la', 'Laos'),
  pool('Asia', 'th', 'Thailand'),
  pool('Asia', 'sg', 'Singapore'),
  pool('Asia', 'bd', 'Bangladesh'),
  pool('Asia', 'in', 'India'),
  pool('Asia', 'lk', 'Sri Lanka'),
  pool('Asia', 'bt', 'Bhutan'),
  pool('Asia', 'np', 'Nepal'),
  pool('Asia', 'ae', 'United Arab Emirates'),
  pool('Asia', 'om', 'Oman'),
  pool('Asia', 'qa', 'Qatar'),
  pool('Asia', 'il-ps', 'Israel and Palestine', ['IL', 'PS'], {
    primaryCountryCode: 'IL',
    jurisdictionLabels: { IL: 'Israel', PS: 'Palestine' },
  }),
  pool('Asia', 'jo', 'Jordan'),
  pool('Asia', 'lb', 'Lebanon'),
  pool('Asia', 'tr', 'Turkey'),
  pool('Asia', 'ge', 'Georgia'),

  pool('Europe', 'al', 'Albania'),
  pool('Europe', 'ad', 'Andorra'),
  pool('Europe', 'at', 'Austria'),
  pool('Europe', 'be', 'Belgium'),
  pool('Europe', 'ba', 'Bosnia and Herzegovina'),
  pool('Europe', 'bg', 'Bulgaria'),
  pool('Europe', 'hr', 'Croatia'),
  pool('Europe', 'cy', 'Cyprus'),
  pool('Europe', 'cz', 'Czechia'),
  pool('Europe', 'dk', 'Denmark', ['DK', 'FO'], {
    primaryCountryCode: 'DK',
    dependencyLabels: { FO: 'Faroe Islands' },
  }),
  pool('Europe', 'ee', 'Estonia'),
  pool('Europe', 'fi', 'Finland', ['FI', 'AX'], {
    primaryCountryCode: 'FI',
    dependencyLabels: { AX: 'Åland' },
  }),
  pool('Europe', 'fr', 'France'),
  pool('Europe', 'de', 'Germany'),
  pool('Europe', 'gr', 'Greece'),
  pool('Europe', 'hu', 'Hungary'),
  pool('Europe', 'is', 'Iceland'),
  pool('Europe', 'ie', 'Ireland'),
  pool('Europe', 'it', 'Italy'),
  pool('Europe', 'xk', 'Kosovo'),
  pool('Europe', 'lv', 'Latvia'),
  pool('Europe', 'li', 'Liechtenstein'),
  pool('Europe', 'lt', 'Lithuania'),
  pool('Europe', 'lu', 'Luxembourg'),
  pool('Europe', 'mt', 'Malta'),
  pool('Europe', 'mc', 'Monaco'),
  pool('Europe', 'me', 'Montenegro'),
  pool('Europe', 'nl', 'Netherlands'),
  pool('Europe', 'mk', 'North Macedonia'),
  pool('Europe', 'no', 'Norway', ['NO', 'SJ'], {
    primaryCountryCode: 'NO',
    dependencyLabels: { SJ: 'Svalbard and Jan Mayen' },
  }),
  pool('Europe', 'pl', 'Poland'),
  pool('Europe', 'pt', 'Portugal'),
  pool('Europe', 'ro', 'Romania'),
  pool('Europe', 'ru', 'Russia'),
  pool('Europe', 'sm', 'San Marino'),
  pool('Europe', 'rs', 'Serbia'),
  pool('Europe', 'sk', 'Slovakia'),
  pool('Europe', 'si', 'Slovenia'),
  pool('Europe', 'es', 'Spain'),
  pool('Europe', 'se', 'Sweden'),
  pool('Europe', 'ch', 'Switzerland'),
  pool('Europe', 'ua', 'Ukraine'),
  pool('Europe', 'gb', 'United Kingdom', ['GB', 'GG', 'IM', 'JE', 'GI'], {
    primaryCountryCode: 'GB',
    dependencyLabels: {
      GG: 'Guernsey',
      IM: 'Isle of Man',
      JE: 'Jersey',
      GI: 'Gibraltar',
    },
  }),
  pool('Europe', 'va', 'Vatican City'),

  pool('Americas', 'ca', 'Canada'),
  pool(
    'Americas',
    'us',
    'USA',
    ['US', 'PR', 'VI', 'GU', 'MP', 'AS'],
    {
      primaryCountryCode: 'US',
      dependencyLabels: {
        PR: 'Puerto Rico',
        VI: 'U.S. Virgin Islands',
        GU: 'Guam',
        MP: 'Northern Mariana Islands',
        AS: 'American Samoa',
      },
    }
  ),
  pool('Americas', 'mx', 'Mexico'),
  pool('Americas', 'gt', 'Guatemala'),
  pool('Americas', 'cr', 'Costa Rica'),
  pool('Americas', 'pa', 'Panama'),
  pool('Americas', 'co', 'Colombia'),
  pool('Americas', 'ec', 'Ecuador'),
  pool('Americas', 'pe', 'Peru'),
  pool('Americas', 'bo', 'Bolivia'),
  pool('Americas', 'cl', 'Chile'),
  pool('Americas', 'ar', 'Argentina'),
  pool('Americas', 'br', 'Brazil'),
  pool('Americas', 'uy', 'Uruguay'),
  pool('Americas', 'py', 'Paraguay'),
  pool('Americas', 'cw', 'Curaçao'),
  pool('Americas', 'do', 'Dominican Republic'),

  pool('Africa', 'tn', 'Tunisia'),
  pool('Africa', 'sn', 'Senegal'),
  pool('Africa', 'gh', 'Ghana'),
  pool('Africa', 'ng', 'Nigeria'),
  pool('Africa', 'ke', 'Kenya'),
  pool('Africa', 'ug', 'Uganda'),
  pool('Africa', 'rw', 'Rwanda'),
  pool('Africa', 'za', 'South Africa'),
  pool('Africa', 'ls', 'Lesotho'),
  pool('Africa', 'sz', 'Eswatini'),
  pool('Africa', 'na', 'Namibia'),
  pool('Africa', 'st', 'São Tomé and Príncipe'),

  pool('Oceania', 'au', 'Australia'),
  pool('Oceania', 'nz', 'New Zealand'),
  pool('Arctic', 'gl', 'Greenland'),
]

export const PLAYABLE_FEATURE_CODES = new Set([
  'PPL',
  'PPLA',
  'PPLA2',
  'PPLA3',
  'PPLA4',
  'PPLC',
])

export const MINIMUM_POPULATION = 10_000

export function difficultyForRank(rank: number, total: number): Difficulty {
  if (total < 1 || rank < 0 || rank >= total) {
    throw new Error('Difficulty rank is outside the pool.')
  }
  if (total === 1) return 'Easy'
  if (total === 2) return rank === 0 ? 'Easy' : 'Hard'

  const easyCount = Math.max(1, Math.round(total * 0.25))
  const mediumCount = Math.max(1, Math.round(total * 0.375))
  if (rank < easyCount) return 'Easy'
  if (rank < easyCount + mediumCount) return 'Medium'
  return 'Hard'
}
