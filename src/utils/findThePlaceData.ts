import type {
  AdministrativeNode,
  ContinentNode,
  Difficulty,
  PlaceNode,
} from './findThePlace'
import { flattenPlaceData } from './findThePlace'

function place(
  id: string,
  name: string,
  coordinates: PlaceNode['coordinates'],
  difficulty: Difficulty
): PlaceNode {
  return { type: 'place', id, name, coordinates, difficulty }
}

function administrative(
  name: string,
  children: AdministrativeNode['children']
): AdministrativeNode {
  return { type: 'administrative', name, children }
}

export const FIND_THE_PLACE_DATA = [
  {
    name: 'North America',
    countries: [
      {
        code: 'us',
        name: 'USA',
        children: [
          administrative('Mississippi', [
            place('us-jackson-ms', 'Jackson', [32.2988, -90.1848], 'Easy'),
          ]),
          administrative('Texas', [
            place('us-marfa-tx', 'Marfa', [30.3095, -104.0206], 'Medium'),
          ]),
          administrative('Nevada', [
            place('us-ely-nv', 'Ely', [39.2474, -114.8881], 'Hard'),
          ]),
          administrative('Maine', [
            place('us-bangor-me', 'Bangor', [44.8016, -68.7712], 'Easy'),
          ]),
          administrative('Oregon', [
            place('us-astoria-or', 'Astoria', [46.1879, -123.8313], 'Medium'),
          ]),
          administrative('Kansas', [
            place(
              'us-dodge-city-ks',
              'Dodge City',
              [37.7528, -100.0171],
              'Hard'
            ),
          ]),
        ],
      },
    ],
  },
  {
    name: 'South America',
    countries: [
      {
        code: 'br',
        name: 'Brazil',
        children: [
          administrative('Paraná', [
            place('br-londrina-pr', 'Londrina', [-23.3045, -51.1696], 'Easy'),
          ]),
          administrative('Pará', [
            place('br-santarem-pa', 'Santarém', [-2.4385, -54.6996], 'Hard'),
          ]),
          administrative('Bahia', [
            place(
              'br-feira-de-santana-ba',
              'Feira de Santana',
              [-12.2664, -38.9663],
              'Medium'
            ),
          ]),
          administrative('Minas Gerais', [
            place(
              'br-uberlandia-mg',
              'Uberlândia',
              [-18.9186, -48.2772],
              'Easy'
            ),
          ]),
          administrative('Rio Grande do Sul', [
            place('br-pelotas-rs', 'Pelotas', [-31.7654, -52.3376], 'Medium'),
          ]),
          administrative('Roraima', [
            place('br-boa-vista-rr', 'Boa Vista', [2.8235, -60.6758], 'Hard'),
          ]),
        ],
      },
    ],
  },
  {
    name: 'Europe',
    countries: [
      {
        code: 'fr',
        name: 'France',
        children: [
          administrative('Île-de-France', [
            administrative('Paris', [
              place('fr-paris', 'Paris', [48.8566, 2.3522], 'Easy'),
            ]),
          ]),
          administrative('Auvergne-Rhône-Alpes', [
            administrative('Rhône', [
              place('fr-lyon', 'Lyon', [45.764, 4.8357], 'Easy'),
            ]),
            administrative('Cantal', [
              place('fr-saint-flour', 'Saint-Flour', [45.0344, 3.092], 'Hard'),
            ]),
          ]),
          administrative('Brittany', [
            administrative('Finistère', [
              place('fr-quimper', 'Quimper', [47.996, -4.1025], 'Medium'),
            ]),
          ]),
          administrative("Provence-Alpes-Côte d'Azur", [
            administrative('Alpes-Maritimes', [
              place('fr-menton', 'Menton', [43.7745, 7.4975], 'Medium'),
            ]),
          ]),
          administrative('Bourgogne-Franche-Comté', [
            administrative('Nièvre', [
              place('fr-nevers', 'Nevers', [46.9896, 3.159], 'Hard'),
            ]),
          ]),
        ],
      },
    ],
  },
  {
    name: 'Asia',
    countries: [
      {
        code: 'jp',
        name: 'Japan',
        children: [
          administrative('Hokkaido', [
            place('jp-sapporo', 'Sapporo', [43.0618, 141.3545], 'Easy'),
          ]),
          administrative('Nagano', [
            place('jp-matsumoto', 'Matsumoto', [36.238, 137.972], 'Medium'),
          ]),
          administrative('Ishikawa', [
            place('jp-kanazawa', 'Kanazawa', [36.5613, 136.6562], 'Easy'),
          ]),
          administrative('Kōchi', [
            place('jp-kochi', 'Kōchi', [33.5597, 133.5311], 'Medium'),
          ]),
          administrative('Miyazaki', [
            place('jp-miyazaki', 'Miyazaki', [31.9077, 131.4202], 'Hard'),
          ]),
          administrative('Aomori', [
            place('jp-hirosaki', 'Hirosaki', [40.6031, 140.4638], 'Hard'),
          ]),
        ],
      },
    ],
  },
] as const satisfies readonly ContinentNode[]

export const FIND_THE_PLACE_PLACES = flattenPlaceData(FIND_THE_PLACE_DATA)

export const FIND_THE_PLACE_COUNTRY_DIVISIONS = Object.fromEntries(
  FIND_THE_PLACE_DATA.map((continent) => [
    continent.name,
    continent.countries.map((country) => country.name),
  ])
)

export const FIND_THE_PLACE_COUNTRY_CODES = Object.fromEntries(
  FIND_THE_PLACE_DATA.flatMap((continent) =>
    continent.countries.map((country) => [country.name, country.code])
  )
)
