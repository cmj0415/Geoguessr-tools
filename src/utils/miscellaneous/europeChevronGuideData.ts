import type { GuideDocument } from '../quizGuide'

export const EUROPE_CHEVRON_GUIDE: GuideDocument = {
  imageBaseDirectory: '/miscellaneous/eu_chevron',
  introduction: [
    {
      type: 'paragraph',
      content:
        'Road chevrons guide drivers through bends. Their arrow and background colors vary substantially across Europe, making them useful GeoGuessr clues. In this guide, “white on blue” means a white arrow on a blue background.',
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
              text: 'Turkey and Cyprus are included for geographic completeness in this quiz.',
            },
          ],
        },
      ],
    },
  ],
  sections: [
    {
      title: 'European designs',
      blocks: [
        {
          type: 'group',
          title: 'White on blue',
          blocks: [
            {
              type: 'paragraph',
              content: 'France, Spain, Andorra',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'ch-02.png',
                  alt: 'White road chevron on a blue background',
                },
              ],
            },
            {
              type: 'paragraph',
              content:
                'Spain almost always uses two or four arrows rather than a single arrow. In France, the number of arrows can vary from one to five.',
            },
          ],
        },
        {
          type: 'group',
          title: 'Yellow on blue',
          blocks: [
            {
              type: 'paragraph',
              content: 'Sweden',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'ch-09.png',
                  alt: 'Swedish yellow road chevron on a blue background',
                },
              ],
            },
            {
              type: 'paragraph',
              content:
                'This design is unique to Sweden in the quiz. Fading or strong sunlight can sometimes make the yellow arrow appear white.',
            },
          ],
        },
        {
          type: 'group',
          title: 'White on black',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Spain, Switzerland, Italy, United Kingdom, Albania, Greece',
            },
            {
              type: 'gallery',
              layout: 'equal',
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
              type: 'paragraph',
              content:
                'Spain again tends to use multiple arrows. A yellow border around this color scheme is a highly specific clue for Jersey.',
            },
          ],
        },
        {
          type: 'group',
          title: 'Black on white',
          blocks: [
            {
              type: 'paragraph',
              content: 'Serbia, Kosovo, Montenegro, North Macedonia, Slovenia',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'ch-11.png',
                  alt: 'Black road chevron on a white background',
                },
              ],
            },
            {
              type: 'paragraph',
              content:
                'This design appears across the western Balkans. It is less common in Slovenia than in the other listed countries.',
            },
          ],
        },
        {
          type: 'group',
          title: 'Yellow on black',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Iceland, Ireland, Norway, Finland, Portugal, Luxembourg',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'ch-07.png',
                  alt: 'Yellow road chevron on a black background',
                },
              ],
            },
            {
              type: 'paragraph',
              content:
                'The arrow often appears orange rather than bright yellow, especially in real imagery.',
            },
          ],
        },
        {
          type: 'group',
          title: 'White on red',
          blocks: [
            {
              type: 'paragraph',
              content: 'Austria, Hungary, Albania, Russia, Ukraine, Estonia',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'ch-04.png',
                  alt: 'White road chevron on a red background',
                },
              ],
            },
            {
              type: 'paragraph',
              content:
                'A bright white arrow over a solid red field points toward this group of central and eastern European countries.',
            },
          ],
        },
        {
          type: 'group',
          title: 'Red on white',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Netherlands, Belgium, Germany, Denmark, Czechia, Poland, Slovenia, Croatia, Bosnia and Herzegovina, Albania, North Macedonia, Bulgaria, Romania, Turkey, Cyprus, Lithuania, Latvia',
            },
            {
              type: 'gallery',
              layout: 'featured',
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
              type: 'paragraph',
              content:
                'This is Europe’s most widespread design. Romania sometimes adds a yellow border, while Lithuania commonly adds a red border around a single-arrow chevron.',
            },
          ],
        },
        {
          type: 'group',
          title: 'Red on yellow',
          blocks: [
            {
              type: 'paragraph',
              content: 'Austria, Slovakia, Croatia, Montenegro, San Marino',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'ch-08.png',
                  alt: 'Red road chevron on a yellow background',
                },
              ],
            },
            {
              type: 'paragraph',
              content:
                'The yellow background separates this smaller country group from the more common red-on-white family.',
            },
          ],
        },
      ],
    },
    {
      title: 'Other regions',
      blocks: [
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          content:
            'Chevrons are generally less distinctive outside Europe, but these comparisons are still useful.',
        },
        {
          type: 'list',
          items: [
            'Most countries in the Americas use black-on-yellow chevrons. Brazil instead uses yellow on black, like Portugal, while Argentina uses red on white.',
            'South Africa uses red on white. Australia uses white on black and black on yellow, which can help distinguish the two countries.',
            'The Philippines uses white on red, a design not seen in Malaysia, Thailand, or Indonesia.',
          ],
        },
      ],
    },
    {
      title: 'Regional exceptions',
      blocks: [
        {
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              type: 'list',
              items: [
                'In Turkey, yellow-on-black chevrons appear mainly in Kars and Balıkesir provinces, while black-on-yellow chevrons are mainly found north of Izmir.',
                'In Spain, red-on-white chevrons strongly indicate Murcia.',
              ],
            },
          ],
        },
      ],
    },
  ],
}
