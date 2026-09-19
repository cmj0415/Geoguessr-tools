import type { GuideDocument } from '../quizGuide'

export const EUROPE_BOLLARD_GUIDE: GuideDocument = {
  imageBaseDirectory: '/miscellaneous/eu_bollard',
  introduction: [
    {
      type: 'paragraph',
      content:
        'Bollards are pillar-like objects placed on roadsides for safety purpose. Many countries across the world have their own design on bollards. In Europe, where identifying a country by mere landscape is harder than in other continents, a bollard can be a good clue since almost every country has its own design.',
    },
  ],
  sections: [
    {
      title: 'Unique Design',
      blocks: [
        {
          type: 'group',
          title: 'France',
          blocks: [
            {
              type: 'paragraph',
              content:
                "In France you'll see this cylinder bollard with a tip. The reflector can be red or gray.",
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b01.png',
                  alt: 'Common design',
                  caption: "95% of the time you'll see this",
                },
              ],
            },
            {
              type: 'paragraph',
              content:
                'You will sometimes encounter this kind of design. Color may vary, but this design is unique to France.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b02.png',
                  alt: 'Quite rare',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Ireland',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Though also occasionally being seen in France, this green-white bollard is a good clue for Ireland/UK 50/50.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b13.png',
                  alt: 'Ireland',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Andorra',
          blocks: [
            {
              type: 'paragraph',
              content: 'This tall, wooden bollard can be found in Andorra.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b07.png',
                  alt: 'Andorra',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Switzerland',
          blocks: [
            {
              type: 'paragraph',
              content:
                'This round-shaped bollard with a round top can be found in Switzerland.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b35.png',
                  alt: 'Switzerland',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Denmark',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Danish bollard is wedge-shaped, featuring a trapezoidal reflector and an orange strip at the top.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b14.png',
                  alt: 'Denmark',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Poland',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Polish bollard features a red strip wrapping around it. It has a red reflector at the front and a white one at the back.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b16.png',
                  alt: 'Poland',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'North Macedonia',
          blocks: [
            {
              type: 'paragraph',
              content: 'This unique design only exists in North Macedonia.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b36.png',
                  alt: 'North Macedonia',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Iceland',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Iceland has flat, yellow bollard with a white reflector at the top.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b37.png',
                  alt: 'Iceland',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Faroe Islands',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Bollards in Faroe Islands are wood sticks that are painted yellow, with the top sometimes painted red.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b38.png',
                  alt: 'Faroe',
                },
              ],
            },
            {
              type: 'divider',
            },
            {
              type: 'paragraph',
              content:
                "Now things start to get a bit confusing. I'll try my best to help you memorize. Let's start by defining some terminology so the guide can look simpler:",
            },
            {
              type: 'comparison',
              headings: ['Terminology', 'Definition'],
              rows: [
                [
                  'Window',
                  [
                    {
                      type: 'text',
                      text: 'The section the holds the reflectors which has ',
                    },
                    {
                      type: 'strong',
                      children: [
                        {
                          type: 'text',
                          text: 'different color',
                        },
                      ],
                    },
                    {
                      type: 'text',
                      text: ' from the body',
                    },
                  ],
                ],
                [
                  'Slant window',
                  'The window looks like a parallelogram from the front',
                ],
                [
                  'Flat window',
                  'The window looks like a rectangle from the front',
                ],
                [
                  'Margin',
                  'The section from the top of the bollard to the window',
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Wedge-shaped + Window',
      blocks: [
        {
          type: 'paragraph',
          content:
            'This group of bollards are triangular from the top view. The body is white while the window is black.',
        },
        {
          type: 'group',
          title: 'Germany, Switzerland, Sweden',
          blocks: [
            {
              type: 'paragraph',
              content:
                'I usually call this "standard design" since every part of it is using the most common element: It has usual margin, slant window, white reflectors with 2 bolts on it.',
            },
            {
              type: 'paragraph',
              content: 'You\'ll see what "unusual margin" is later on.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b09.png',
                  alt: 'Germany',
                },
              ],
            },
            {
              type: 'callout',
              tone: 'note',
              blocks: [
                {
                  type: 'paragraph',
                  content:
                    'In Germany, there exists a variation with gray reflectors, so check the number of bolts before locking in. Also, reflectors may be orange at intersections.',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Lithuania',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Similar to a German one, but has ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'orange reflector',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' on the front. If you see this at an intersection, beware that it could be Germany.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b27.png',
                  alt: 'Lithuania',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Luxembourg',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Similar to a German one, but it has ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'gray reflectors',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' and ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: '3 bolts',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b10.png',
                  alt: 'Luxembourg',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Czechia, Slovakia',
          blocks: [
            {
              type: 'paragraph',
              content:
                'This iconic design with two orange reflectors are unique to Czhechia and Slovakia. You may sometimes see a blue variant.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b15.png',
                  alt: 'Czechia',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Hungary, Slovakia, Kosovo',
          blocks: [
            {
              type: 'paragraph',
              content:
                'This type of bollard with a red front reflector is commonly seen in Hungary. However, Slovakia recently adopted this design, too.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b23.png',
                  alt: 'Hungary',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Portugal',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Portuguese bollards have a ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'noticeable small margin',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '. It has white reflectors on both sides.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b05.png',
                  alt: 'Portugal',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Croatia, Bosnia, Montenegro, Kosovo',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This bollard is very similar to the Hungarian one, but with ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'small margin',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b24.png',
                  alt: 'Croatia',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Russia',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Also similar to Hungarian one, but with a shorter belt. There are mainly two variants in Russia.',
            },
            {
              type: 'gallery',
              layout: 'featured',
              images: [
                {
                  fileName: 'b39.png',
                  alt: 'Russia',
                  caption: 'Common variant',
                },
                {
                  fileName: 'b25.png',
                  alt: 'v1',
                  caption: 'You see this in Eastern Russia',
                },
                {
                  fileName: 'b26.png',
                  alt: 'v2',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Greece',
          blocks: [
            {
              type: 'paragraph',
              content:
                'The window is noticeably shorter than usual. It has red reflector in the front and white in the back.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b21.png',
                  alt: 'Greece',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Spain',
          blocks: [
            {
              type: 'paragraph',
              content:
                "While it's not filled, I still count it as a wedge. It features a yellow front reflector.",
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b04.png',
                  alt: 'Spain',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Italy, Albania',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'You are never going to miss this because it is the only one with ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'no margin',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' in this group.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b08.png',
                  alt: 'Italy',
                },
              ],
            },
            {
              type: 'callout',
              tone: 'note',
              blocks: [
                {
                  type: 'paragraph',
                  content:
                    'It is said that this is also rarely found in Bosnia, but I never find one.',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'France',
          blocks: [
            {
              type: 'paragraph',
              content:
                'While very rare, this bollard featuring small margin, short window, white reflectors on both sides is unique to France.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b03.png',
                  alt: 'France',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Wedge-shaped + No window',
      blocks: [
        {
          type: 'group',
          title: 'Belgium',
          blocks: [
            {
              type: 'paragraph',
              content:
                'Belgian bollard has a yellow front reflector and a white back reflector.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b12.png',
                  alt: 'Begium',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Cyprus',
          blocks: [
            {
              type: 'paragraph',
              content: 'Cypriot bollards use red front reflector.',
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b34.png',
                  alt: 'France',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Round-shaped + Window',
      blocks: [
        {
          type: 'group',
          title: 'Estonia',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Estonian bollards feature ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'slant windows',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '. It has a white reflector in the front and two dots in the back. You may see variants with an orange reflector at intersections.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b29.png',
                  alt: 'Estonia',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Finland',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Finnish bollards feature ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'slant windows',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ', and the reflector is bigger than Estonian ones . It can be rounded or thin and curved, which looks like a Latvian one.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b30.png',
                  alt: 'Finland',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Sweden',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This design resembles the Estonian one, but with ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'flat window',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b33.png',
                  alt: 'Sweden',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Thin + Window',
      blocks: [
        {
          type: 'group',
          title: 'Sweden',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'You can see this ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'thin, curved',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' bollard, also with a ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'flat window',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' in Sweden.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b32.png',
                  alt: 'Sweden',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Norway',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This Norwegian bollard has a ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'slant window',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' and ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'almost no margin',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b31.png',
                  alt: 'Norway',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Latvia, Finland',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Latvian design features flat, curved shape with a ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'slant window',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: '. You often see a number beneath the window in Latvia.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b28.png',
                  alt: 'Latvia',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Portugal',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This is the other design of Portuguese bollard, which has a ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'wider reflector',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' than the Nordic and Baltic ones.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b06.png',
                  alt: 'Portugal',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Thin + No window',
      blocks: [
        {
          type: 'group',
          title: 'Netherlands, Turkey, Romania',
          blocks: [
            {
              type: 'paragraph',
              content:
                'These three countries all use red rectangular front reflectors. However, the Dutch ones are not as flat as Turkish ones or Romanian ones. Also, Dutch ones have thinner reflector.',
            },
            {
              type: 'callout',
              tone: 'note',
              blocks: [
                {
                  type: 'paragraph',
                  content: 'You seldom see bollards in Romania.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b11.png',
                  alt: 'Netherlands',
                  caption: 'Netherlands',
                },
                {
                  fileName: 'b22.png',
                  alt: 'Turkey',
                  caption: 'Turkey, Romania',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Capped',
      blocks: [
        {
          type: 'paragraph',
          content:
            'The bollards in this section features a black cap on top of it.',
        },
        {
          type: 'group',
          title: 'Austria',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Austrian bollards feature ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'dark red',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' or ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'dark gray',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' front reflectors.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b17.png',
                  alt: 'Austria',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Slovenia, Montenegro, Bosnia',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Different from Austrian ones, this type of bollard has ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'light red',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' front reflectors.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b18.png',
                  alt: 'North Macedonia',
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Serbia, Bosnia, Kosovo',
          blocks: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Typical Serbian bollards have ',
                },
                {
                  type: 'strong',
                  children: [
                    {
                      type: 'text',
                      text: 'deviated reflectors',
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ', which do not face towards the driver. There is also a flat variant, which (I think) is not seen in Bosnia.',
                },
              ],
            },
            {
              type: 'gallery',
              layout: 'equal',
              images: [
                {
                  fileName: 'b20.png',
                  alt: 'Serbia',
                  caption: 'Common variant',
                },
                {
                  fileName: 'b19.png',
                  alt: 'Not in Bosnia',
                  caption: 'Flat variant',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Comparison Tables',
      blocks: [
        {
          type: 'list',
          items: [
            'F: Flat window',
            'S: Slant window',
            'W: Wedge-shaped',
            'R: Rounded',
            'T: Thin',
          ],
        },
        {
          type: 'comparison',
          headings: ['Country', 'Variants'],
          rows: [
            ['Latvia', 'TS (often with a number)'],
            ['Estonia', 'RS'],
            ['Finland', 'RS (bigger reflector), TS'],
            ['Sweden', 'WS, RF, TF'],
            ['Norway', 'TS (almost no margin)'],
          ],
        },
      ],
    },
  ],
}
