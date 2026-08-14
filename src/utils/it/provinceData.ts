import { getFeatureProperties } from '../geoJsonCodeQuiz'

export const IT_PROVINCE_MAP: Record<string, string[]> = {
  Abruzzo: ['Chieti', "L'Aquila", 'Pescara', 'Teramo'],
  Basilicata: ['Matera', 'Potenza'],
  Calabria: [
    'Catanzaro',
    'Cosenza',
    'Crotone',
    'Reggio di Calabria',
    'Vibo Valentia',
  ],
  Campania: ['Avellino', 'Benevento', 'Caserta', 'Napoli', 'Salerno'],
  'Emilia-Romagna': [
    'Bologna',
    'Ferrara',
    'Forlì-Cesena',
    'Modena',
    'Parma',
    'Piacenza',
    'Ravenna',
    "Reggio nell'Emilia",
    'Rimini',
  ],
  'Friuli-Venezia Giulia': ['Gorizia', 'Pordenone', 'Trieste', 'Udine'],
  Lazio: ['Frosinone', 'Latina', 'Rieti', 'Roma', 'Viterbo'],
  Liguria: ['Genova', 'Imperia', 'La Spezia', 'Savona'],
  Lombardia: [
    'Bergamo',
    'Brescia',
    'Como',
    'Cremona',
    'Lecco',
    'Lodi',
    'Mantova',
    'Milano',
    'Monza e della Brianza',
    'Pavia',
    'Sondrio',
    'Varese',
  ],
  Marche: ['Ancona', 'Ascoli Piceno', 'Fermo', 'Macerata', 'Pesaro e Urbino'],
  Molise: ['Campobasso', 'Isernia'],
  Piemonte: [
    'Alessandria',
    'Asti',
    'Biella',
    'Cuneo',
    'Novara',
    'Torino',
    'Verbano-Cusio-Ossola',
    'Vercelli',
  ],
  Puglia: [
    'Bari',
    'Barletta-Andria-Trani',
    'Brindisi',
    'Foggia',
    'Lecce',
    'Taranto',
  ],
  Sardegna: ['Cagliari', 'Nuoro', 'Oristano', 'Sassari', 'Sud Sardegna'],
  Sicilia: [
    'Agrigento',
    'Caltanissetta',
    'Catania',
    'Enna',
    'Messina',
    'Palermo',
    'Ragusa',
    'Siracusa',
    'Trapani',
  ],
  Toscana: [
    'Arezzo',
    'Firenze',
    'Grosseto',
    'Livorno',
    'Lucca',
    'Massa-Carrara',
    'Pisa',
    'Pistoia',
    'Prato',
    'Siena',
  ],
  'Trentino-Alto Adige': ['Bolzano', 'Trento'],
  Umbria: ['Perugia', 'Terni'],
  "Valle d'Aosta": ["Valle d'Aosta"],
  Veneto: ['Belluno', 'Padova', 'Rovigo', 'Treviso', 'Venezia', 'Verona', 'Vicenza'],
}

export const IT_PROVINCES = Object.entries(IT_PROVINCE_MAP).flatMap(
  ([region, provinces]) =>
    provinces.map((province) => ({
      id: province,
      label: province,
      region,
    }))
)

const IT_PROVINCE_IDS = new Set(IT_PROVINCES.map((province) => province.id))

export function getItalyProvinceIds(feature: unknown) {
  const province = getFeatureProperties(feature)?.prov_name
  if (typeof province !== 'string') return []

  const normalizedProvince = province.trim()
  return IT_PROVINCE_IDS.has(normalizedProvince) ? [normalizedProvince] : []
}
