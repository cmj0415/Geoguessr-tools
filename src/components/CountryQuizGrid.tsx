import { CountryCard } from './CountryCard.tsx'
import QuizCardLink from './QuizCardLink.tsx'

type QuizLink = {
  label: string
  to: string
}

type CountryQuizGroup = {
  countryName: string
  flag: string
  quizzes: QuizLink[]
}

const COUNTRY_QUIZ_GROUPS: CountryQuizGroup[] = [
  {
    countryName: 'Argentina',
    flag: '🇦🇷',
    quizzes: [{ label: 'Province Quiz', to: '/ar/provinces' }],
  },
  {
    countryName: 'Bangladesh',
    flag: '🇧🇩',
    quizzes: [
      { label: 'District Quiz', to: '/bd/districts' },
      { label: 'Translation Practice', to: '/bd/bengali' },
    ],
  },
  {
    countryName: 'Brazil',
    flag: '🇧🇷',
    quizzes: [{ label: 'Area Code Quiz', to: '/br/area-codes' }],
  },
  {
    countryName: 'Chile',
    flag: '🇨🇱',
    quizzes: [{ label: 'Region Quiz', to: '/cl/regions' }],
  },
  {
    countryName: 'Colombia',
    flag: '🇨🇴',
    quizzes: [{ label: 'Department Quiz', to: '/co/departments' }],
  },
  {
    countryName: 'Ecuador',
    flag: '🇪🇨',
    quizzes: [
      { label: 'Province Quiz', to: '/ec/provinces' },
      { label: 'Taxi First Letter Quiz', to: '/ec/taxi-letters' },
    ],
  },
  {
    countryName: 'France',
    flag: '🇫🇷',
    quizzes: [{ label: 'Department Quiz', to: '/fr/departments' }],
  },
  {
    countryName: 'Germany',
    flag: '🇩🇪',
    quizzes: [
      { label: 'State Quiz', to: '/de/states' },
      { label: 'District Quiz', to: '/de/districts' },
      { label: 'Area Code Quiz', to: '/de/area-codes' },
    ],
  },
  {
    countryName: 'India',
    flag: '🇮🇳',
    quizzes: [{ label: 'State Quiz', to: '/in/states' }],
  },
  {
    countryName: 'Indonesia',
    flag: '🇮🇩',
    quizzes: [{ label: 'Kabupatens Quiz', to: '/id/regencies' }],
  },
  {
    countryName: 'Italy',
    flag: '🇮🇹',
    quizzes: [{ label: 'Province Quiz', to: '/it/provinces' }],
  },
  {
    countryName: 'Japan',
    flag: '🇯🇵',
    quizzes: [
      { label: 'Prefecture Quiz', to: '/jp/prefectures' },
      { label: 'Area Code Quiz', to: '/jp/area-codes' },
      {
        label: 'Hokkaido Pole Number Quiz',
        to: '/jp/hokkaido-pole-numbers',
      },
    ],
  },
  {
    countryName: 'Kenya',
    flag: '🇰🇪',
    quizzes: [
      { label: 'County Quiz', to: '/ke/counties' },
      { label: 'Postal Code Quiz', to: '/ke/postal-codes' },
    ],
  },
  {
    countryName: 'Mexico',
    flag: '🇲🇽',
    quizzes: [
      { label: 'Area Code Quiz', to: '/mx/area-codes' },
      { label: 'Postal Code Quiz', to: '/mx/postal-codes' },
    ],
  },
  {
    countryName: 'New Zealand',
    flag: '🇳🇿',
    quizzes: [{ label: 'Region Quiz', to: '/nz/regions' }],
  },
  {
    countryName: 'Nigeria',
    flag: '🇳🇬',
    quizzes: [{ label: 'State Quiz', to: '/ng/states' }],
  },
  {
    countryName: 'Peru',
    flag: '🇵🇪',
    quizzes: [{ label: 'Province Quiz', to: '/pe/provinces' }],
  },
  {
    countryName: 'Paraguay',
    flag: '🇵🇾',
    quizzes: [{ label: 'Department Quiz', to: '/py/departments' }],
  },
  {
    countryName: 'Romania',
    flag: '🇷🇴',
    quizzes: [{ label: 'County Quiz', to: '/ro/counties' }],
  },
  {
    countryName: 'Russia',
    flag: '🇷🇺',
    quizzes: [
      { label: 'Area Code Quiz', to: '/ru/area-codes' },
      { label: 'Federal Subject Quiz', to: '/ru/federal-subjects' },
      { label: 'Translation Practice', to: '/ru/russian' },
    ],
  },
  {
    countryName: 'South Africa',
    flag: '🇿🇦',
    quizzes: [
      { label: 'Province Quiz', to: '/za/provinces' },
      { label: 'Area Code Quiz', to: '/za/area-codes' },
    ],
  },
  {
    countryName: 'Spain',
    flag: '🇪🇸',
    quizzes: [
      { label: 'Province Quiz', to: '/es/provinces' },
      { label: 'Area Code Quiz', to: '/es/area-codes' },
      {
        label: 'Provincial Road Prefix Quiz',
        to: '/es/provincial-road-prefixes',
      },
    ],
  },
  {
    countryName: 'The Philippines',
    flag: '🇵🇭',
    quizzes: [{ label: 'Province Quiz', to: '/ph/provinces' }],
  },
  {
    countryName: 'Taiwan',
    flag: '🇹🇼',
    quizzes: [
      { label: 'County Quiz', to: '/tw/counties' },
      { label: 'Area Code Quiz', to: '/tw/area-codes' },
      { label: 'Pole Number Quiz', to: '/tw/pole-numbers' },
    ],
  },
  {
    countryName: 'Thailand',
    flag: '🇹🇭',
    quizzes: [
      {
        label: 'Province Quiz (Thai abbreviation)',
        to: '/th/province-abbreviations',
      },
      {
        label: 'Province Quiz (English full name)',
        to: '/th/provinces',
      },
      { label: 'Area Code Quiz', to: '/th/area-codes' },
    ],
  },
  {
    countryName: 'Turkey',
    flag: '🇹🇷',
    quizzes: [
      { label: 'Province Quiz', to: '/tr/provinces' },
      { label: 'District Quiz', to: '/tr/districts' },
      { label: 'Area Code Quiz', to: '/tr/area-codes' },
    ],
  },
  {
    countryName: 'United States',
    flag: '🇺🇸',
    quizzes: [{ label: 'Area Code Quiz', to: '/us/area-codes' }],
  },
  {
    countryName: 'Uruguay',
    flag: '🇺🇾',
    quizzes: [{ label: 'Department Quiz', to: '/uy/departments' }],
  },
  {
    countryName: 'Vietnam',
    flag: '🇻🇳',
    quizzes: [
      { label: 'Province Quiz (Post 2025)', to: '/vn/provinces-post-2025' },
      { label: 'Province Quiz (Pre 2025)', to: '/vn/provinces-pre-2025' },
      { label: 'Area Code Quiz', to: '/vn/area-codes' },
    ],
  },
]

export function CountryQuizGrid() {
  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
      {COUNTRY_QUIZ_GROUPS.map(({ countryName, flag, quizzes }) => (
        <CountryCard
          key={countryName}
          countryName={countryName}
          flag={<span>{flag}</span>}
        >
          {quizzes.map(({ label, to }) => (
            <QuizCardLink key={to} label={label} to={to} />
          ))}
        </CountryCard>
      ))}
    </div>
  )
}
