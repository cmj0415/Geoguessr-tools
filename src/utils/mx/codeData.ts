import type { GeoJsonObject } from 'geojson'
import type L from 'leaflet'

export const DEFAULT_STYLE: L.PathOptions = {
  color: '#2563eb',
  fillColor: '#3b82f6',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.2,
}

export const HOVER_STYLE: L.PathOptions = {
  color: '#0284c7',
  fillColor: '#38bdf8',
  weight: 3,
  fillOpacity: 0.5,
}

export const CORRECT_STYLE: L.PathOptions = {
  color: '#34d399',
  fillColor: '#34d399',
  weight: 3,
  fillOpacity: 0.55,
}

export const HINTED_STYLE: L.PathOptions = {
  color: '#fbbf24',
  fillColor: '#fbbf24',
  weight: 3,
  fillOpacity: 0.55,
}

export function formatCode(value: number) {
  return String(value).padStart(2, '0')
}

export const AVAILABLE_CODES = Array.from(
  { length: 99 },
  (_, index) => index + 1
)
  .filter((code) => code < 17 || code > 19)
  .map(formatCode)

export function pickRandomCode(pool: string[]) {
  if (pool.length === 0) return null
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getFeatureCode(feature: unknown) {
  if (typeof feature !== 'object' || feature === null) return null
  const properties = (feature as { properties?: unknown }).properties
  if (typeof properties !== 'object' || properties === null) return null

  const rawCode = (properties as Record<string, unknown>).d_cp
  if (typeof rawCode !== 'string' && typeof rawCode !== 'number') return null

  const code = String(rawCode).trim()
  return /^\d+$/.test(code) ? code.padStart(2, '0') : null
}

export function isGeoJsonObject(value: unknown): value is GeoJsonObject {
  return typeof value === 'object' && value !== null && 'type' in value
}
