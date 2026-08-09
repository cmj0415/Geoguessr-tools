import type { GeoJsonObject } from 'geojson'
import type L from 'leaflet'

export const OPEN_STREET_MAP_TILE_LAYER = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}

export const GEO_JSON_DEFAULT_STYLE: L.PathOptions = {
  color: '#2563eb',
  fillColor: '#3b82f6',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.2,
}

export const GEO_JSON_HOVER_STYLE: L.PathOptions = {
  color: '#0284c7',
  fillColor: '#38bdf8',
  weight: 3,
  fillOpacity: 0.5,
}

export const GEO_JSON_CORRECT_STYLE: L.PathOptions = {
  color: '#34d399',
  fillColor: '#34d399',
  weight: 3,
  fillOpacity: 0.55,
}

export const GEO_JSON_HINTED_STYLE: L.PathOptions = {
  color: '#fbbf24',
  fillColor: '#fbbf24',
  weight: 3,
  fillOpacity: 0.55,
}

export function isGeoJsonObject(value: unknown): value is GeoJsonObject {
  return typeof value === 'object' && value !== null && 'type' in value
}

export function getFeatureProperties(
  feature: unknown
): Record<string, unknown> | null {
  if (typeof feature !== 'object' || feature === null) return null

  const properties = (feature as { properties?: unknown }).properties
  if (typeof properties !== 'object' || properties === null) return null

  return properties as Record<string, unknown>
}

export function pickRandomItem<T>(pool: T[]) {
  if (pool.length === 0) return null
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getFeatureGroupKey(featureIds: string[]) {
  return [...featureIds].sort().join('|')
}
