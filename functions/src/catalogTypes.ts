import type { Difficulty } from './catalogConfig.js'

export type DifficultyCounts = Record<Difficulty, number>

export type CatalogCountry = {
  code: string
  name: string
  counts: DifficultyCounts
}

export type CatalogContinent = {
  name: string
  countries: CatalogCountry[]
}

export type CatalogMetadata = {
  version: string
  generatedAt: string
  continents: CatalogContinent[]
  placeCount: number
  status: 'building' | 'ready' | 'failed'
}

export type CatalogPlace = {
  id: string
  name: string
  coordinates: readonly [number, number]
  population: number
  difficulty: Difficulty
  countryCode: string
  countryName: string
  continentName: string
  jurisdictionName: string
  administrativePath: string[]
  question: string
  sourceCountryCode: string
  sourceGeoNamesId: string
  tierRank: number
}

export type SessionQuestion = Omit<
  CatalogPlace,
  'population' | 'sourceCountryCode' | 'sourceGeoNamesId' | 'tierRank'
>
