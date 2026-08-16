import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const GEONAMES_DIRECTORY = process.argv[2]
const OUTPUT_DIRECTORY = process.argv[3] ?? 'public/find-the-place/ru'

if (!GEONAMES_DIRECTORY) {
  throw new Error(
    'Usage: node scripts/generateRussiaPlaceData.mjs <geonames-directory> [output-directory]'
  )
}

// GeoNames currently models 83 internationally recognized Russian ADM1 regions.
// Source files: https://download.geonames.org/export/dump/
const SUBJECTS = {
  '01': ['Adygea', 'adygea'],
  '03': ['Altai Republic', 'altai-republic'],
  '04': ['Altai Krai', 'altai-krai'],
  '05': ['Amur Oblast', 'amur-oblast'],
  '06': ['Arkhangelsk Oblast', 'arkhangelsk-oblast'],
  '07': ['Astrakhan Oblast', 'astrakhan-oblast'],
  '08': ['Bashkortostan', 'bashkortostan'],
  '09': ['Belgorod Oblast', 'belgorod-oblast'],
  10: ['Bryansk Oblast', 'bryansk-oblast'],
  11: ['Buryatia', 'buryatia'],
  12: ['Chechnya', 'chechnya'],
  13: ['Chelyabinsk Oblast', 'chelyabinsk-oblast'],
  15: ['Chukotka Autonomous Okrug', 'chukotka-autonomous-okrug'],
  16: ['Chuvashia', 'chuvashia'],
  17: ['Dagestan', 'dagestan'],
  19: ['Ingushetia', 'ingushetia'],
  20: ['Irkutsk Oblast', 'irkutsk-oblast'],
  21: ['Ivanovo Oblast', 'ivanovo-oblast'],
  22: ['Kabardino-Balkaria', 'kabardino-balkaria'],
  23: ['Kaliningrad Oblast', 'kaliningrad-oblast'],
  24: ['Kalmykia', 'kalmykia'],
  25: ['Kaluga Oblast', 'kaluga-oblast'],
  27: ['Karachay-Cherkessia', 'karachay-cherkessia'],
  28: ['Karelia', 'karelia'],
  29: ['Kemerovo Oblast–Kuzbass', 'kemerovo-oblast-kuzbass'],
  30: ['Khabarovsk Krai', 'khabarovsk-krai'],
  31: ['Khakassia', 'khakassia'],
  32: [
    'Khanty-Mansi Autonomous Okrug–Yugra',
    'khanty-mansi-autonomous-okrug-yugra',
  ],
  33: ['Kirov Oblast', 'kirov-oblast'],
  34: ['Komi Republic', 'komi-republic'],
  37: ['Kostroma Oblast', 'kostroma-oblast'],
  38: ['Krasnodar Krai', 'krasnodar-krai'],
  40: ['Kurgan Oblast', 'kurgan-oblast'],
  41: ['Kursk Oblast', 'kursk-oblast'],
  42: ['Leningrad Oblast', 'leningrad-oblast'],
  43: ['Lipetsk Oblast', 'lipetsk-oblast'],
  44: ['Magadan Oblast', 'magadan-oblast'],
  45: ['Mari El', 'mari-el'],
  46: ['Mordovia', 'mordovia'],
  47: ['Moscow Oblast', 'moscow-oblast'],
  48: ['Moscow', 'moscow'],
  49: ['Murmansk Oblast', 'murmansk-oblast'],
  50: ['Nenets Autonomous Okrug', 'nenets-autonomous-okrug'],
  51: ['Nizhny Novgorod Oblast', 'nizhny-novgorod-oblast'],
  52: ['Novgorod Oblast', 'novgorod-oblast'],
  53: ['Novosibirsk Oblast', 'novosibirsk-oblast'],
  54: ['Omsk Oblast', 'omsk-oblast'],
  55: ['Orenburg Oblast', 'orenburg-oblast'],
  56: ['Oryol Oblast', 'oryol-oblast'],
  57: ['Penza Oblast', 'penza-oblast'],
  59: ['Primorsky Krai', 'primorsky-krai'],
  60: ['Pskov Oblast', 'pskov-oblast'],
  61: ['Rostov Oblast', 'rostov-oblast'],
  62: ['Ryazan Oblast', 'ryazan-oblast'],
  63: ['Sakha', 'sakha'],
  64: ['Sakhalin Oblast', 'sakhalin-oblast'],
  65: ['Samara Oblast', 'samara-oblast'],
  66: ['Saint Petersburg', 'saint-petersburg'],
  67: ['Saratov Oblast', 'saratov-oblast'],
  68: ['North Ossetia–Alania', 'north-ossetia-alania'],
  69: ['Smolensk Oblast', 'smolensk-oblast'],
  70: ['Stavropol Krai', 'stavropol-krai'],
  71: ['Sverdlovsk Oblast', 'sverdlovsk-oblast'],
  72: ['Tambov Oblast', 'tambov-oblast'],
  73: ['Tatarstan', 'tatarstan'],
  75: ['Tomsk Oblast', 'tomsk-oblast'],
  76: ['Tula Oblast', 'tula-oblast'],
  77: ['Tver Oblast', 'tver-oblast'],
  78: ['Tyumen Oblast', 'tyumen-oblast'],
  79: ['Tuva', 'tuva'],
  80: ['Udmurtia', 'udmurtia'],
  81: ['Ulyanovsk Oblast', 'ulyanovsk-oblast'],
  83: ['Vladimir Oblast', 'vladimir-oblast'],
  84: ['Volgograd Oblast', 'volgograd-oblast'],
  85: ['Vologda Oblast', 'vologda-oblast'],
  86: ['Voronezh Oblast', 'voronezh-oblast'],
  87: ['Yamalo-Nenets Autonomous Okrug', 'yamalo-nenets-autonomous-okrug'],
  88: ['Yaroslavl Oblast', 'yaroslavl-oblast'],
  89: ['Jewish Autonomous Oblast', 'jewish-autonomous-oblast'],
  90: ['Perm Krai', 'perm-krai'],
  91: ['Krasnoyarsk Krai', 'krasnoyarsk-krai'],
  92: ['Kamchatka Krai', 'kamchatka-krai'],
  93: ['Zabaykalsky Krai', 'zabaykalsky-krai'],
}

const PLACE_NAME_OVERRIDES = {
  "Arkhangel'sk": 'Arkhangelsk',
  "Kamen'-na-Obi": 'Kamen-na-Obi',
  "Kem'": 'Kem',
  'Nizhniy Novgorod': 'Nizhny Novgorod',
  "Pereslavl'-Zalesskiy": 'Pereslavl-Zalessky',
  "Prokop'yevsk": 'Prokopyevsk',
  "Ryazan'": 'Ryazan',
  'Ulan-Ude': 'Ulan-Ude',
}

const ADMIN_NAME_OVERRIDES = {
  'Maykop Republican Urban Okrug': 'Maykop Urban Okrug',
  'Adygeysk Republican Urban Okrug': 'Adygeysk Urban Okrug',
  'Sochi City': 'Sochi Urban Okrug',
  Yakutsk: 'Yakutsk Urban Okrug',
}

const PLACE_NAME_EXCLUSIONS = new Set([
  // Duplicate spelling of the same locality; keep the PPLA record Nar'yan-Mar.
  'Narian-Mar',
  // Prefer the principal modern locality rather than an adjacent duplicate.
  'Petrodvorets',
  'Staryy Malgobek',
  'Gorodoviki',
  // GeoNames carries an implausibly high population for this small settlement.
  'Krasnaya Glinka',
])

const ADMINISTRATION_OVERRIDES = {
  '03:Mayma': 'Mayminsky District',
  '11:Selenginsk': 'Kabansky District',
  '12:Gudermes': 'Gudermessky District',
  '19:Ekazhevo': 'Nazranovsky District',
  '21:Furmanov': 'Furmanovsky District',
  '22:Terek': 'Tersky District',
  '24:Troitskoye': 'Tselinny District',
  '30:Amursk': 'Amursky District',
  '30:Nikolayevsk-on-Amure': 'Nikolayevsky District',
  "31:Ust'-Abakan": 'Ust-Abakansky District',
  '32:Surgut': 'Surgut Urban Okrug',
  '32:Nefteyugansk': 'Nefteyugansk Urban Okrug',
  '38:Yeysk': 'Yeysky District',
  '42:Tikhvin': 'Tikhvinsky District',
  '44:Susuman': 'Susumansky Municipal Okrug',
  '44:Ola': 'Olsky Municipal Okrug',
  "44:Ust'-Omchug": 'Tenkinsky Municipal Okrug',
  '50:Iskateley': 'Zapolyarny District',
  "50:Nes'": 'Zapolyarny District',
  '50:Khoreyver': 'Zapolyarny District',
  '50:Amderma': 'Zapolyarny District',
  "50:Nar'yan-Mar": 'Naryan-Mar Urban Okrug',
  '54:Tara': 'Tarsky District',
  '54:Kalachinsk': 'Kalachinsky District',
  "54:Isil'kul'": 'Isilkulsky District',
  '64:Korsakov': 'Korsakovsky District',
  '64:Kholmsk': 'Kholmsky District',
  '64:Okha': 'Okhinsky District',
  '65:Samara': 'Samara Urban Okrug',
  '65:Novokuybyshevsk': 'Novokuybyshevsk Urban Okrug',
  "67:Vol'sk": 'Volsky District',
  "69:Roslavl'": 'Roslavlsky District',
  '71:Serov': 'Serov Urban Okrug',
  '71:Nizhny Tagil': 'Nizhny Tagil Urban Okrug',
  '73:Nizhnekamsk': 'Nizhnekamsky District',
  "73:Al'met'yevsk": 'Almetyevsky District',
  '73:Zelenodolsk': 'Zelenodolsky District',
  '75:Asino': 'Asinovsky District',
  '79:Kaa-Khem': 'Kyzylsky District',
  '81:Ulyanovsk': 'Ulyanovsk Urban Okrug',
  '85:Cherepovets': 'Cherepovets Urban Okrug',
  '85:Vologda': 'Vologda Urban Okrug',
  "86:Rossosh'": 'Rossoshansky District',
  '86:Novovoronezh': 'Novovoronezh Urban Okrug',
  '90:Chaykovskiy': 'Chaykovsky Urban Okrug',
  "90:Lys'va": 'Lysva Urban Okrug',
  '92:Yelizovo': 'Yelizovsky District',
  '04:Novoaltaysk': 'Novoaltaysk Urban Okrug',
  "06:Arkhangel'sk": 'Arkhangelsk Urban Okrug',
  '23:Chernyakhovsk': 'Chernyakhovsk Urban Okrug',
  '48:Moscow': 'Central Administrative Okrug',
  '48:Zelenograd': 'Zelenograd Administrative Okrug',
  '48:Novo-Peredelkino': 'Western Administrative Okrug',
  '48:Cheremushki': 'Southwestern Administrative Okrug',
  '48:Vostochnoe Degunino': 'Northern Administrative Okrug',
}

function parseGeoNamesLine(line) {
  const columns = line.split('\t')
  return {
    id: columns[0],
    name: columns[2],
    latitude: Number(columns[4]),
    longitude: Number(columns[5]),
    featureClass: columns[6],
    featureCode: columns[7],
    admin1Code: columns[10],
    admin2Code: columns[11],
    population: Number(columns[14]),
  }
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalizedWords(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((word) => word.length >= 4)
}

function placeMatchesAdministration(placeName, administrationName) {
  const placeWords = normalizedWords(placeName)
  const administrationWords = normalizedWords(administrationName).filter(
    (word) =>
      !['city', 'district', 'gorod', 'gorodskoy', 'okrug', 'rayon'].includes(
        word
      )
  )

  return placeWords.some((placeWord) =>
    administrationWords.some((administrationWord) => {
      const comparableLength = Math.min(
        6,
        placeWord.length,
        administrationWord.length
      )
      return (
        comparableLength >= 4 &&
        placeWord.slice(0, comparableLength) ===
          administrationWord.slice(0, comparableLength)
      )
    })
  )
}

function distanceKm(first, second) {
  const latitudeDistance = (first.latitude - second.latitude) * 111
  const longitudeDistance =
    (first.longitude - second.longitude) *
    111 *
    Math.cos((first.latitude * Math.PI) / 180)
  return Math.hypot(latitudeDistance, longitudeDistance)
}

function normalizeAdministrationName(value, placeName) {
  if (ADMIN_NAME_OVERRIDES[value]) {
    return ADMIN_NAME_OVERRIDES[value]
  }

  const normalized = value
    .replace(/^Gorodskoy Okrug (.+)$/, '$1 Urban Okrug')
    .replace(/^Gorod (.+)$/, '$1 Urban Okrug')
    .replace(/(.+) Gorodskoy Okrug$/, '$1 Urban Okrug')
    .replace(/(.+) Urban District$/, '$1 Urban Okrug')
    .replace(/(.+) City District$/, '$1 Urban Okrug')
    .replace(/(.+) City$/, '$1 Urban Okrug')
    .replace(/(.+) Municipality$/, '$1 Urban Okrug')
    .replace(/ Republican Urban Okrug$/, ' Urban Okrug')
    .replace(/\bRayon\b/gi, 'District')
    .replace(/skiy\b/g, 'sky')
    .replace(/tskiy\b/g, 'tsky')
    .replace(/['’]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (
    placeMatchesAdministration(placeName, normalized) &&
    !/(District|Okrug|Ulus|Region|Poseleniye|ZATO)/.test(normalized)
  ) {
    return `${normalized} Urban Okrug`
  }

  return normalized
}

function readAdmin2Codes(value) {
  return new Map(
    value
      .split('\n')
      .filter((line) => line.startsWith('RU.'))
      .map((line) => {
        const [code, , asciiName] = line.split('\t')
        return [code, asciiName]
      })
  )
}

function resolveAdministration(place, administrations, admin2Codes) {
  const override = ADMINISTRATION_OVERRIDES[`${place.admin1Code}:${place.name}`]
  if (override) {
    return { name: override, method: 'curated override', distance: 0 }
  }

  const nearby = administrations
    .map((administration) => ({
      administration,
      distance: distanceKm(place, administration),
    }))
    .sort((first, second) => first.distance - second.distance)

  const nameMatch = nearby.find(
    ({ administration, distance }) =>
      distance <= 30 &&
      placeMatchesAdministration(place.name, administration.name)
  )
  if (nameMatch) {
    return {
      name: normalizeAdministrationName(
        nameMatch.administration.name,
        place.name
      ),
      method: 'nearby name match',
      distance: nameMatch.distance,
    }
  }

  const codedName = admin2Codes.get(
    `RU.${place.admin1Code}.${place.admin2Code}`
  )
  if (codedName) {
    return {
      name: normalizeAdministrationName(codedName, place.name),
      method: 'ADM2 code',
      distance: 0,
    }
  }

  if (place.admin2Code && !/^\d+$/.test(place.admin2Code)) {
    return {
      name: normalizeAdministrationName(place.admin2Code, place.name),
      method: 'ADM2 name',
      distance: 0,
    }
  }

  const closest = nearby[0]
  if (!closest) {
    return undefined
  }

  return {
    name: normalizeAdministrationName(closest.administration.name, place.name),
    method: 'nearest ADM2',
    distance: closest.distance,
  }
}

function difficultyForIndex(index) {
  if (index < 2) return 'Easy'
  if (index < 4) return 'Medium'
  return 'Hard'
}

const [geoNamesText, admin2CodesText] = await Promise.all([
  readFile(path.join(GEONAMES_DIRECTORY, 'RU.txt'), 'utf8'),
  readFile(path.join(GEONAMES_DIRECTORY, 'admin2Codes.txt'), 'utf8'),
])
const records = geoNamesText.trim().split('\n').map(parseGeoNamesLine)
const admin2Codes = readAdmin2Codes(admin2CodesText)

await mkdir(OUTPUT_DIRECTORY, { recursive: true })

const report = []
for (const [admin1Code, [subjectName, subjectSlug]] of Object.entries(
  SUBJECTS
)) {
  if (subjectSlug === 'karelia') continue

  const administrations = records.filter(
    (record) =>
      record.admin1Code === admin1Code && record.featureCode === 'ADM2'
  )
  const seenNames = new Set()
  const candidates = records
    .filter(
      (record) =>
        record.admin1Code === admin1Code &&
        record.featureClass === 'P' &&
        ['PPL', 'PPLC', 'PPLA', 'PPLA2', 'PPLA3', 'PPLA4'].includes(
          record.featureCode
        ) &&
        record.population > 0 &&
        !PLACE_NAME_EXCLUSIONS.has(record.name)
    )
    .sort((first, second) => second.population - first.population)
    .filter((record) => {
      const key = slugify(record.name)
      if (!key || seenNames.has(key)) return false
      seenNames.add(key)
      return true
    })
    .map((place) => ({
      place,
      administration: resolveAdministration(
        place,
        administrations,
        admin2Codes
      ),
    }))
    .filter((candidate) => candidate.administration)
    .slice(0, 5)

  if (candidates.length !== 5) {
    throw new Error(
      `${subjectName} resolved only ${candidates.length} usable places.`
    )
  }

  const children = []
  candidates.forEach(({ place, administration }, index) => {
    const placeName = (PLACE_NAME_OVERRIDES[place.name] ?? place.name).replace(
      /['’]/g,
      ''
    )
    report.push(
      [
        subjectName,
        placeName,
        administration.name,
        administration.method,
        administration.distance.toFixed(1),
      ].join('\t')
    )
    const placeNode = {
      type: 'place',
      id: `ru-${subjectSlug}-${slugify(placeName)}`,
      name: placeName,
      coordinates: [place.latitude, place.longitude],
      difficulty: difficultyForIndex(index),
    }

    const existingAdministration = children.find(
      (child) => child.name === administration.name
    )
    if (existingAdministration) {
      existingAdministration.children.push(placeNode)
    } else {
      children.push({
        type: 'administrative',
        name: administration.name,
        children: [placeNode],
      })
    }
  })

  await writeFile(
    path.join(OUTPUT_DIRECTORY, `${subjectSlug}.json`),
    `${JSON.stringify(
      { type: 'administrative', name: subjectName, children },
      null,
      2
    )}\n`
  )
}

console.log(
  ['subject\tplace\tadministration\tmethod\tdistance_km', ...report].join('\n')
)
