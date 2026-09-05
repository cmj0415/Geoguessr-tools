export type ChevronColorScheme =
  | 'white-blue'
  | 'yellow-blue'
  | 'white-black'
  | 'black-white'
  | 'yellow-black'
  | 'white-red'
  | 'red-white'
  | 'red-yellow'

export type ChevronGuideImage = {
  fileName: string
  alt: string
  caption?: string
}

export type ChevronGuideEntry = {
  id: string
  title: string
  scheme: ChevronColorScheme
  countries: string
  description: string
  images: readonly ChevronGuideImage[]
}

export const EUROPE_CHEVRON_GUIDE: readonly ChevronGuideEntry[] = [
  {
    id: 'white-blue',
    title: 'White on blue',
    scheme: 'white-blue',
    countries: 'France, Spain, Andorra',
    description:
      'Spain almost always uses two or four arrows rather than a single arrow. In France, the number of arrows can vary from one to five.',
    images: [
      {
        fileName: 'ch-02.png',
        alt: 'White road chevron on a blue background',
      },
    ],
  },
  {
    id: 'yellow-blue',
    title: 'Yellow on blue',
    scheme: 'yellow-blue',
    countries: 'Sweden',
    description:
      'This design is unique to Sweden in the quiz. Fading or strong sunlight can sometimes make the yellow arrow appear white.',
    images: [
      {
        fileName: 'ch-09.png',
        alt: 'Swedish yellow road chevron on a blue background',
      },
    ],
  },
  {
    id: 'white-black',
    title: 'White on black',
    scheme: 'white-black',
    countries: 'Spain, Switzerland, Italy, United Kingdom, Albania, Greece',
    description:
      'Spain again tends to use multiple arrows. A yellow border around this color scheme is a highly specific clue for Jersey.',
    images: [
      {
        fileName: 'ch-01.png',
        alt: 'White road chevron on a black background',
        caption: 'Standard design',
      },
      {
        fileName: 'ch-10.png',
        alt: 'Jersey white-on-black road chevron with a yellow border',
        caption: 'Jersey yellow border',
      },
    ],
  },
  {
    id: 'black-white',
    title: 'Black on white',
    scheme: 'black-white',
    countries: 'Serbia, Kosovo, Montenegro, North Macedonia, Slovenia',
    description:
      'This design appears across the western Balkans. It is less common in Slovenia than in the other listed countries.',
    images: [
      {
        fileName: 'ch-11.png',
        alt: 'Black road chevron on a white background',
      },
    ],
  },
  {
    id: 'yellow-black',
    title: 'Yellow on black',
    scheme: 'yellow-black',
    countries: 'Iceland, Ireland, Norway, Finland, Portugal, Luxembourg',
    description:
      'The arrow often appears orange rather than bright yellow, especially in real imagery.',
    images: [
      {
        fileName: 'ch-07.png',
        alt: 'Yellow road chevron on a black background',
      },
    ],
  },
  {
    id: 'white-red',
    title: 'White on red',
    scheme: 'white-red',
    countries: 'Austria, Hungary, Albania, Russia, Ukraine, Estonia',
    description:
      'A bright white arrow over a solid red field points toward this group of central and eastern European countries.',
    images: [
      {
        fileName: 'ch-04.png',
        alt: 'White road chevron on a red background',
      },
    ],
  },
  {
    id: 'red-white',
    title: 'Red on white',
    scheme: 'red-white',
    countries:
      'Netherlands, Belgium, Germany, Denmark, Czechia, Poland, Slovenia, Croatia, Bosnia and Herzegovina, Albania, North Macedonia, Bulgaria, Romania, Turkey, Cyprus, Lithuania, Latvia',
    description:
      'This is Europe’s most widespread design. Romania sometimes adds a yellow border, while Lithuania commonly adds a red border around a single-arrow chevron.',
    images: [
      {
        fileName: 'ch-03.png',
        alt: 'Red road chevron on a white background',
        caption: 'Standard design',
      },
      {
        fileName: 'ch-05.png',
        alt: 'Romanian red-on-white road chevron with a yellow border',
        caption: 'Romanian yellow border',
      },
      {
        fileName: 'ch-06.png',
        alt: 'Lithuanian red-on-white road chevron with a red border',
        caption: 'Lithuanian red border',
      },
    ],
  },
  {
    id: 'red-yellow',
    title: 'Red on yellow',
    scheme: 'red-yellow',
    countries: 'Austria, Slovakia, Croatia, Montenegro, San Marino',
    description:
      'The yellow background separates this smaller country group from the more common red-on-white family.',
    images: [
      {
        fileName: 'ch-08.png',
        alt: 'Red road chevron on a yellow background',
      },
    ],
  },
]

export const OTHER_CONTINENT_CHEVRON_NOTES = [
  'Most countries in the Americas use black-on-yellow chevrons. Brazil instead uses yellow on black, like Portugal, while Argentina uses red on white.',
  'South Africa uses red on white. Australia uses white on black and black on yellow, which can help distinguish the two countries.',
  'The Philippines uses white on red, a design not seen in Malaysia, Thailand, or Indonesia.',
] as const

export const REGIONAL_CHEVRON_EXCEPTIONS = [
  'In Turkey, yellow-on-black chevrons appear mainly in Kars and Balıkesir provinces, while black-on-yellow chevrons are mainly found north of Izmir.',
  'In Spain, red-on-white chevrons strongly indicate Murcia.',
] as const
