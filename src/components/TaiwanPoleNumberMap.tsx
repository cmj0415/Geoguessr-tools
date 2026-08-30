import { useEffect } from 'react'
import L from 'leaflet'
import {
  LayerGroup,
  LayersControl,
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
import { formatPoleDistance, getPoleGridOrigins } from '../utils/tw/poleNumbers'
import type { PoleCoordinates, PoleGridGeometry } from '../utils/tw/poleNumbers'
import { ANSWER_MAP_PIN_ICON, GUESS_MAP_PIN_ICON } from './mapMarkerIcons'

export type TaiwanPoleRoundResult = {
  guessedCoordinates: PoleCoordinates
  geometry: PoleGridGeometry
  distanceKm: number
  accuracy: number
}

type TaiwanPoleNumberMapProps = {
  roundKey: number
  guessing: boolean
  selectedCoordinates: PoleCoordinates | null
  result: TaiwanPoleRoundResult | null
  onSelect: (coordinates: PoleCoordinates) => void
}

const PLAY_BOUNDS = L.latLngBounds([21.7, 117.8], [26.5, 122.2])
const GRID_ORIGINS = getPoleGridOrigins()

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
  roundKey,
  result,
}: {
  roundKey: number
  result: TaiwanPoleRoundResult | null
}) {
  const map = useMap()

  useEffect(() => {
    if (result) return
    map.stop()
    map.fitBounds(PLAY_BOUNDS, { animate: false, padding: [32, 32] })
  }, [map, result, roundKey])

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

export default function TaiwanPoleNumberMap({
  roundKey,
  guessing,
  selectedCoordinates,
  result,
  onSelect,
}: TaiwanPoleNumberMapProps) {
  const guessCoordinates = result?.guessedCoordinates ?? selectedCoordinates

  return (
    <MapContainer
      bounds={PLAY_BOUNDS}
      minZoom={5}
      maxZoom={18}
      scrollWheelZoom
      className={`h-full w-full !bg-slate-900 ${guessing ? 'cursor-crosshair' : ''}`}
    >
      <TileLayer
        attribution={OPEN_STREET_MAP_TILE_LAYER.attribution}
        url={OPEN_STREET_MAP_TILE_LAYER.url}
      />
      <GuessHandler enabled={guessing} onSelect={onSelect} />
      <ViewportController roundKey={roundKey} result={result} />

      <LayersControl position="bottomleft">
        <LayersControl.Overlay name="Pole-grid origins">
          <LayerGroup>
            {GRID_ORIGINS.map((origin) => (
              <Marker
                key={origin.id}
                position={toLatLng(origin.coordinates)}
                icon={L.divIcon({
                  className: 'pole-grid-origin',
                  html: '<span></span>',
                  iconSize: [12, 12],
                  iconAnchor: [6, 6],
                })}
                interactive={false}
              >
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, -5]}
                  className="pole-grid-origin-label"
                >
                  {origin.label}
                </Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

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
