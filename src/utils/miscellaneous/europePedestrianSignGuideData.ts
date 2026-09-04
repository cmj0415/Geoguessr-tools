export type PedestrianSignGuideImage = {
  fileName: string
  alt: string
  caption?: string
}

export type PedestrianSignGuideExample = {
  title: string
  keyDetail: string
  description: string
  images: readonly PedestrianSignGuideImage[]
}

export type PedestrianSignGuideFrequency = {
  label: string
  countries: string
}

export type PedestrianSignGuideGroup = {
  id: string
  title: string
  description?: string
  note?: string
  frequencies?: readonly PedestrianSignGuideFrequency[]
  examples: readonly PedestrianSignGuideExample[]
}

export type PedestrianSignGuideCategory = {
  id: string
  title: string
  description?: string
  groups: readonly PedestrianSignGuideGroup[]
}

export const EUROPE_PEDESTRIAN_SIGN_GUIDE: readonly PedestrianSignGuideCategory[] =
  [
    {
      id: 'stripe',
      title: 'Stripe',
      description:
        'The figure walks over a conventional zebra crossing. This is the largest and most varied category.',
      groups: [
        {
          id: 'three-stripes',
          title: '3 stripes',
          description:
            'Within Europe, this pattern appears in Lithuania, Estonia, Ukraine, and Russia.',
          note: 'Outside this guide’s European scope, similar three-stripe signs also appear in several post-Soviet countries, including Kazakhstan, Kyrgyzstan, and Georgia.',
          examples: [
            {
              title: 'Lithuania, Ukraine, Russia',
              keyDetail: 'Separated figure',
              description:
                'The person is visibly divided into pieces. Russia commonly adds a yellow border around the sign.',
              images: [
                {
                  fileName: 'sign-20.png',
                  alt: 'Three-stripe pedestrian sign with a separated figure',
                  caption: 'Standard variation',
                },
                {
                  fileName: 'sign-23.png',
                  alt: 'Russian three-stripe pedestrian sign with a yellow border',
                  caption: 'Russian yellow border',
                },
              ],
            },
            {
              title: 'Estonia',
              keyDetail: 'Intact figure',
              description:
                'Unlike the other three-stripe designs, the person is drawn as one intact silhouette.',
              images: [
                {
                  fileName: 'sign-22.png',
                  alt: 'Estonian three-stripe pedestrian crossing sign',
                },
              ],
            },
          ],
        },
        {
          id: 'four-stripes',
          title: '4 stripes',
          frequencies: [
            { label: 'Always', countries: 'Sweden, Iceland, Bulgaria' },
            { label: 'Almost always', countries: 'Norway' },
            { label: 'Seldom', countries: 'Hungary' },
          ],
          examples: [
            {
              title: 'Sweden',
              keyDetail: 'Detailed figure',
              description:
                'Sweden uses a carefully drawn figure. A female variation is also sometimes visible.',
              images: [
                {
                  fileName: 'sign-05.png',
                  alt: 'Swedish four-stripe sign with a detailed male figure',
                  caption: 'Common variation',
                },
                {
                  fileName: 'sign-06.png',
                  alt: 'Swedish four-stripe sign with a female figure',
                  caption: 'Female variation',
                },
              ],
            },
            {
              title: 'Norway',
              keyDetail: 'Casual figure',
              description:
                'The Norwegian figure is noticeably simpler and more casually drawn than the Swedish one. This is Norway’s most common variation.',
              images: [
                {
                  fileName: 'sign-03.png',
                  alt: 'Norwegian four-stripe pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Iceland',
              keyDetail: 'Yellow triangle',
              description:
                'The yellow triangle makes this one of the easiest designs to recognize.',
              images: [
                {
                  fileName: 'sign-19.png',
                  alt: 'Icelandic pedestrian crossing sign with a yellow triangle',
                },
              ],
            },
            {
              title: 'Bulgaria',
              keyDetail: 'Hat',
              description:
                'The figure wears a hat, which does not appear on the other four-stripe designs.',
              images: [
                {
                  fileName: 'sign-17.png',
                  alt: 'Bulgarian four-stripe pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Hungary',
              keyDetail: 'Suitcase',
              description:
                'This rare variation shows a person carrying a suitcase. It is seldom encountered in-game.',
              images: [
                {
                  fileName: 'sign-16.png',
                  alt: 'Hungarian four-stripe pedestrian sign with a suitcase',
                },
              ],
            },
          ],
        },
        {
          id: 'five-stripes-belt',
          title: '5 stripes with a belt',
          description:
            'The “belt” is the horizontal line dividing the figure. Its height is the key distinction.',
          examples: [
            {
              title: 'Regular belt',
              keyDetail: 'Middle height',
              description:
                'Used in Germany, Luxembourg, Croatia, North Macedonia, Bosnia and Herzegovina, and Slovakia.',
              images: [
                {
                  fileName: 'sign-10.png',
                  alt: 'Five-stripe pedestrian sign with a regular-height belt',
                },
              ],
            },
            {
              title: 'Portugal',
              keyDetail: 'High belt',
              description:
                'The dividing line sits noticeably higher than on the regular-belt design.',
              images: [
                {
                  fileName: 'sign-14.png',
                  alt: 'Portuguese five-stripe pedestrian sign with a high belt',
                },
              ],
            },
            {
              title: 'Hungary',
              keyDetail: 'Low belt',
              description:
                'The dividing line sits noticeably lower than on the regular-belt design.',
              images: [
                {
                  fileName: 'sign-15.png',
                  alt: 'Hungarian five-stripe pedestrian sign with a low belt',
                },
              ],
            },
          ],
        },
        {
          id: 'five-stripes-no-belt',
          title: '5 stripes without a belt',
          description: 'This is the most common broad design family in Europe.',
          examples: [
            {
              title: 'Generic design',
              keyDetail: 'Plain silhouette',
              description:
                'Found across France, the Netherlands, Italy, San Marino, Romania, Albania, Bosnia and Herzegovina, Montenegro, Kosovo, Serbia, North Macedonia, and Slovenia.',
              images: [
                {
                  fileName: 'sign-01.png',
                  alt: 'Generic five-stripe pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Denmark',
              keyDetail: 'Stripes touch triangle',
              description:
                'The first and last stripes extend all the way to the sides of the inner triangle.',
              images: [
                {
                  fileName: 'sign-08.png',
                  alt: 'Danish five-stripe pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Finland',
              keyDetail: 'Detailed figure',
              description:
                'The figure is rendered with a level of detail similar to the Swedish design.',
              images: [
                {
                  fileName: 'sign-07.png',
                  alt: 'Finnish five-stripe pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Norway',
              keyDetail: 'Detailed figure with hat',
              description:
                'This five-stripe Norwegian variation is rare. The hat distinguishes it from Finland.',
              images: [
                {
                  fileName: 'sign-04.png',
                  alt: 'Norwegian five-stripe pedestrian sign with a hat',
                },
              ],
            },
            {
              title: 'Czechia',
              keyDetail: 'Untucked shirt',
              description:
                'Similar to Norway’s design, but the shape of the shirt provides a useful distinction.',
              images: [
                {
                  fileName: 'sign-12.png',
                  alt: 'Czech five-stripe pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Slovakia',
              keyDetail: 'Large stripe margin',
              description:
                'The stripes leave a clearly visible gap between their ends and the triangle.',
              images: [
                {
                  fileName: 'sign-25.png',
                  alt: 'Slovak five-stripe pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Latvia',
              keyDetail: 'Long legs',
              description:
                'The figure’s legs are noticeably longer than those in the generic design.',
              images: [
                {
                  fileName: 'sign-21.png',
                  alt: 'Latvian five-stripe pedestrian crossing sign',
                },
              ],
            },
          ],
        },
        {
          id: 'seven-eight-stripes',
          title: '7 and 8 stripes',
          examples: [
            {
              title: 'Switzerland, Liechtenstein',
              keyDetail: '7 stripes',
              description:
                'Only these two countries use the seven-stripe design.',
              images: [
                {
                  fileName: 'sign-24.png',
                  alt: 'Swiss and Liechtenstein seven-stripe pedestrian sign',
                },
              ],
            },
            {
              title: 'Spain, Andorra',
              keyDetail: '8 stripes',
              description:
                'Only these two countries use the eight-stripe design.',
              images: [
                {
                  fileName: 'sign-02.png',
                  alt: 'Spanish and Andorran eight-stripe pedestrian sign',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'dotted-line',
      title: 'Dotted line',
      groups: [
        {
          id: 'dotted-line-countries',
          title: 'Compare the figure',
          description:
            'With no zebra stripes to count, the shape of the person becomes the main clue.',
          examples: [
            {
              title: 'Belgium',
              keyDetail: 'Square head',
              description: 'The figure has a distinctly square-shaped head.',
              images: [
                {
                  fileName: 'sign-09.png',
                  alt: 'Belgian dotted-line pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Austria',
              keyDetail: 'Hat',
              description:
                'Austria is the only dotted-line design here whose figure wears a hat.',
              images: [
                {
                  fileName: 'sign-13.png',
                  alt: 'Austrian dotted-line pedestrian crossing sign',
                },
              ],
            },
            {
              title: 'Greece, North Macedonia',
              keyDetail: 'Plain figure',
              description:
                'If the head is not square and the figure has no hat, consider these two countries. North Macedonia more commonly uses generic five-stripe or regular-belt designs.',
              images: [
                {
                  fileName: 'sign-18.png',
                  alt: 'Greek and North Macedonian dotted-line pedestrian sign',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'solid-line',
      title: 'Solid line',
      groups: [
        {
          id: 'solid-line-country',
          title: 'Poland',
          description:
            'Only Poland falls into this category, making the uninterrupted lines a particularly strong clue.',
          examples: [
            {
              title: 'Poland',
              keyDetail: 'Continuous lines',
              description:
                'Look for solid horizontal crossing lines instead of separated stripes or dots.',
              images: [
                {
                  fileName: 'sign-11.png',
                  alt: 'Polish solid-line pedestrian crossing sign',
                },
              ],
            },
          ],
        },
      ],
    },
  ]
