import type { GuideDocument } from '../quizGuide'

export const EUROPE_PEDESTRIAN_SIGN_GUIDE: GuideDocument = {
  imageBaseDirectory: '/miscellaneous/eu_pedestrian_sign',
  introduction: [
    {
      type: 'paragraph',
      content:
        'Pedestrian crossing signs are extremely useful in European urban rounds and are one of the best visual clues for beginners to learn. Start by identifying one of three broad families, then compare the details of the figure and crossing.',
    },
  ],
  sections: [
    {
      title: 'Stripe',
      blocks: [
        {
          type: 'paragraph',
          content:
            'The figure walks over a conventional zebra crossing. This is the largest and most varied category.',
        },
        {
          type: 'group',
          title: '3 stripes',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Within Europe, this pattern appears in Lithuania, Estonia, Ukraine, and Russia.',
            },
            {
              type: 'callout',
              tone: 'note',
              blocks: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'strong',
                      children: [
                        {
                          type: 'text',
                          text: 'Scope note: ',
                        },
                      ],
                    },
                    {
                      type: 'text',
                      text: 'Outside this guide’s European scope, similar three-stripe signs also appear in several post-Soviet countries, including Kazakhstan, Kyrgyzstan, and Georgia.',
                    },
                  ],
                },
              ],
            },
            {
              type: 'example',
              title: 'Lithuania, Ukraine, Russia',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Separated figure',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
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
                  type: 'paragraph',
                  content:
                    'The person is visibly divided into pieces. Russia commonly adds a yellow border around the sign.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Estonia',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Intact figure',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-22.png',
                      alt: 'Estonian three-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'Unlike the other three-stripe designs, the person is drawn as one intact silhouette.',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: '4 stripes',
          blocks: [
            {
              type: 'comparison',
              headings: ['Frequency', 'Countries'],
              rows: [
                ['Always', 'Sweden, Iceland, Bulgaria'],
                ['Almost always', 'Norway'],
                ['Seldom', 'Hungary'],
              ],
            },
            {
              type: 'example',
              title: 'Sweden',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Detailed figure',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
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
                  type: 'paragraph',
                  content:
                    'Sweden uses a carefully drawn figure. A female variation is also sometimes visible.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Norway',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Casual figure',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-03.png',
                      alt: 'Norwegian four-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The Norwegian figure is noticeably simpler and more casually drawn than the Swedish one. This is Norway’s most common variation.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Iceland',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Yellow triangle',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-19.png',
                      alt: 'Icelandic pedestrian crossing sign with a yellow triangle',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The yellow triangle makes this one of the easiest designs to recognize.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Bulgaria',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Hat',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-17.png',
                      alt: 'Bulgarian four-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The figure wears a hat, which does not appear on the other four-stripe designs.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Hungary',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Suitcase',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-16.png',
                      alt: 'Hungarian four-stripe pedestrian sign with a suitcase',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'This rare variation shows a person carrying a suitcase. It is seldom encountered in-game.',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: '5 stripes with a belt',
          blocks: [
            {
              type: 'paragraph',
              content:
                'The “belt” is the horizontal line dividing the figure. Its height is the key distinction.',
            },
            {
              type: 'example',
              title: 'Regular belt',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Middle height',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-10.png',
                      alt: 'Five-stripe pedestrian sign with a regular-height belt',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'Used in Germany, Luxembourg, Croatia, North Macedonia, Bosnia and Herzegovina, and Slovakia.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Portugal',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'High belt',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-14.png',
                      alt: 'Portuguese five-stripe pedestrian sign with a high belt',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The dividing line sits noticeably higher than on the regular-belt design.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Hungary',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Low belt',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-15.png',
                      alt: 'Hungarian five-stripe pedestrian sign with a low belt',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The dividing line sits noticeably lower than on the regular-belt design.',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: '5 stripes without a belt',
          blocks: [
            {
              type: 'paragraph',
              content: 'This is the most common broad design family in Europe.',
            },
            {
              type: 'example',
              title: 'Generic design',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Plain silhouette',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-01.png',
                      alt: 'Generic five-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'Found across France, the Netherlands, Italy, San Marino, Romania, Albania, Bosnia and Herzegovina, Montenegro, Kosovo, Serbia, North Macedonia, and Slovenia.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Denmark',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Stripes touch triangle',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-08.png',
                      alt: 'Danish five-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The first and last stripes extend all the way to the sides of the inner triangle.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Finland',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Detailed figure',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-07.png',
                      alt: 'Finnish five-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The figure is rendered with a level of detail similar to the Swedish design.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Norway',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Detailed figure with hat',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-04.png',
                      alt: 'Norwegian five-stripe pedestrian sign with a hat',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'This five-stripe Norwegian variation is rare. The hat distinguishes it from Finland.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Czechia',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Untucked shirt',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-12.png',
                      alt: 'Czech five-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'Similar to Norway’s design, but the shape of the shirt provides a useful distinction.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Slovakia',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Large stripe margin',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-25.png',
                      alt: 'Slovak five-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The stripes leave a clearly visible gap between their ends and the triangle.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Latvia',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Long legs',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-21.png',
                      alt: 'Latvian five-stripe pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'The figure’s legs are noticeably longer than those in the generic design.',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: '7 and 8 stripes',
          blocks: [
            {
              type: 'example',
              title: 'Switzerland, Liechtenstein',
              blocks: [
                {
                  type: 'paragraph',
                  content: '7 stripes',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-24.png',
                      alt: 'Swiss and Liechtenstein seven-stripe pedestrian sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'Only these two countries use the seven-stripe design.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Spain, Andorra',
              blocks: [
                {
                  type: 'paragraph',
                  content: '8 stripes',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-02.png',
                      alt: 'Spanish and Andorran eight-stripe pedestrian sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'Only these two countries use the eight-stripe design.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Dotted line',
      blocks: [
        {
          type: 'group',
          title: 'Compare the figure',
          blocks: [
            {
              type: 'paragraph',
              content:
                'With no zebra stripes to count, the shape of the person becomes the main clue.',
            },
            {
              type: 'example',
              title: 'Belgium',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Square head',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-09.png',
                      alt: 'Belgian dotted-line pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: 'The figure has a distinctly square-shaped head.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Austria',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Hat',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-13.png',
                      alt: 'Austrian dotted-line pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'Austria is the only dotted-line design here whose figure wears a hat.',
                },
              ],
            },
            {
              type: 'example',
              title: 'Greece, North Macedonia',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Plain figure',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-18.png',
                      alt: 'Greek and North Macedonian dotted-line pedestrian sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'If the head is not square and the figure has no hat, consider these two countries. North Macedonia more commonly uses generic five-stripe or regular-belt designs.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Solid line',
      blocks: [
        {
          type: 'group',
          title: 'Poland',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Only Poland falls into this category, making the uninterrupted lines a particularly strong clue.',
            },
            {
              type: 'example',
              title: 'Poland',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'Continuous lines',
                },
                {
                  type: 'gallery',
                  layout: 'equal',
                  images: [
                    {
                      fileName: 'sign-11.png',
                      alt: 'Polish solid-line pedestrian crossing sign',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content:
                    'Look for solid horizontal crossing lines instead of separated stripes or dots.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
