import { useEffect } from 'react'
import type { ReactNode } from 'react'
import L from 'leaflet'
import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { OPEN_STREET_MAP_TILE_LAYER } from '../utils/geoJsonCodeQuiz'
import { formatPoleDistance } from '../utils/poleNumbers'
import type { PoleCoordinates, PoleRoundResult } from '../utils/poleNumbers'
import { ANSWER_MAP_PIN_ICON, GUESS_MAP_PIN_ICON } from './mapMarkerIcons'

type PoleNumberMapProps = {
  bounds: L.LatLngBoundsExpression
  minZoom: number
  roundKey: number
  guessing: boolean
  selectedCoordinates: PoleCoordinates | null
  result: PoleRoundResult | null
  onSelect: (coordinates: PoleCoordinates) => void
  children?: ReactNode
}

function toLatLng(coordinates: PoleCoordinates): L.LatLngTuple {
  return [coordinates[0], coordinates[1]]
}

function GuessHandler({
  enabled,
  onSelect,
}: {
  enabled: boolean
  onSelect: (coordinates: PoleCoordinates) => void
}) {
  useMapEvents({
    click(event) {
      if (enabled) onSelect([event.latlng.lat, event.latlng.lng])
    },
  })
  return null
}

function ViewportController({
  bounds,
  roundKey,
  result,
}: {
  bounds: L.LatLngBoundsExpression
  roundKey: number
  result: PoleRoundResult | null
}) {
  const map = useMap()

  useEffect(() => {
    if (result) return
    map.stop()
    map.fitBounds(bounds, { animate: false, padding: [32, 32] })
  }, [bounds, map, result, roundKey])

  useEffect(() => {
    if (!result) return
    const reviewBounds = L.latLngBounds(result.geometry.sector.map(toLatLng))
    reviewBounds.extend(toLatLng(result.guessedCoordinates))
    map.stop()
    map.fitBounds(reviewBounds, {
      animate: true,
      maxZoom: 11,
      padding: [64, 64],
    })
  }, [map, result])

  return null
}

export default function PoleNumberMap({
  bounds,
  minZoom,
  roundKey,
  guessing,
  selectedCoordinates,
  result,
  onSelect,
  children,
}: PoleNumberMapProps) {
  const guessCoordinates = result?.guessedCoordinates ?? selectedCoordinates

  return (
    <MapContainer
      bounds={bounds}
      minZoom={minZoom}
      maxZoom={18}
      scrollWheelZoom
      className={`h-full w-full !bg-slate-900 ${guessing ? 'cursor-crosshair' : ''}`}
    >
      <TileLayer
        attribution={OPEN_STREET_MAP_TILE_LAYER.attribution}
        url={OPEN_STREET_MAP_TILE_LAYER.url}
      />
      <GuessHandler enabled={guessing} onSelect={onSelect} />
      <ViewportController bounds={bounds} roundKey={roundKey} result={result} />
      {children}

      {guessCoordinates && (
        <Marker position={toLatLng(guessCoordinates)} icon={GUESS_MAP_PIN_ICON}>
          <Tooltip direction="top">Your guess</Tooltip>
        </Marker>
      )}

      {result && (
        <>
          <Polygon
            positions={result.geometry.sector.map(toLatLng)}
            pathOptions={{
              color: '#fbbf24',
              fillColor: '#fbbf24',
              fillOpacity: 0.08,
              opacity: 0.9,
              weight: 3,
            }}
          />
          <Polygon
            positions={result.geometry.cell.map(toLatLng)}
            pathOptions={{
              color: '#34d399',
              fillColor: '#34d399',
              fillOpacity: 0.38,
              opacity: 1,
              weight: 3,
            }}
          />
          <Marker
            position={toLatLng(result.geometry.center)}
            icon={ANSWER_MAP_PIN_ICON}
          >
            <Tooltip direction="top">Answer</Tooltip>
          </Marker>
          <Polyline
            positions={[
              toLatLng(result.guessedCoordinates),
              toLatLng(result.geometry.center),
            ]}
            pathOptions={{ color: '#f8fafc', opacity: 0.85, weight: 3 }}
          >
            <Tooltip permanent direction="center" className="font-bold">
              {formatPoleDistance(result.distanceKm)}
            </Tooltip>
          </Polyline>
        </>
      )}
    </MapContainer>
  )
}
