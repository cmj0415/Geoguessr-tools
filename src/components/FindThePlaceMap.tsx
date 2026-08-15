import { useEffect } from 'react'
import L from 'leaflet'
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { OPEN_STREET_MAP_TILE_LAYER } from '../utils/geoJsonCodeQuiz'
import type { Coordinates, RoundResult } from '../utils/findThePlace'
import { formatDistance } from '../utils/findThePlace'

type FindThePlaceMapProps = {
  roundKey: number
  guessing: boolean
  result: RoundResult | null
  onGuess: (coordinates: Coordinates) => void
}

const WORLD_CENTER: Coordinates = [20, 0]
const WORLD_ZOOM = 2

function toLatLngTuple(coordinates: Coordinates): L.LatLngTuple {
  return [coordinates[0], coordinates[1]]
}

function getReviewPositions(result: RoundResult) {
  const answerPosition = toLatLngTuple(result.place.coordinates)
  const guessPosition = toLatLngTuple(result.guessedCoordinates)

  while (guessPosition[1] - answerPosition[1] > 180) guessPosition[1] -= 360
  while (guessPosition[1] - answerPosition[1] < -180) guessPosition[1] += 360

  return { answerPosition, guessPosition }
}

const GUESS_ICON = L.divIcon({
  className: 'find-place-marker-container',
  html: '<span class="find-place-marker find-place-marker--guess"><span></span></span>',
  iconSize: [30, 42],
  iconAnchor: [15, 40],
})

const ANSWER_ICON = L.divIcon({
  className: 'find-place-marker-container',
  html: '<span class="find-place-marker find-place-marker--answer"><span></span></span>',
  iconSize: [30, 42],
  iconAnchor: [15, 40],
})

function MapGuessHandler({
  enabled,
  onGuess,
}: {
  enabled: boolean
  onGuess: (coordinates: Coordinates) => void
}) {
  useMapEvents({
    click(event) {
      if (enabled) onGuess([event.latlng.lat, event.latlng.lng])
    },
  })
  return null
}

function MapViewportController({
  roundKey,
  result,
}: {
  roundKey: number
  result: RoundResult | null
}) {
  const map = useMap()

  useEffect(() => {
    map.stop()
    map.setView(toLatLngTuple(WORLD_CENTER), WORLD_ZOOM, { animate: false })
  }, [map, roundKey])

  useEffect(() => {
    if (!result) return

    const { answerPosition, guessPosition } = getReviewPositions(result)
    map.stop()
    map.fitBounds([guessPosition, answerPosition], {
      animate: true,
      maxZoom: 10,
      padding: [64, 64],
    })
  }, [map, result])

  return null
}

export default function FindThePlaceMap({
  roundKey,
  guessing,
  result,
  onGuess,
}: FindThePlaceMapProps) {
  const reviewPositions = result ? getReviewPositions(result) : null

  return (
    <MapContainer
      center={toLatLngTuple(WORLD_CENTER)}
      zoom={WORLD_ZOOM}
      minZoom={2}
      scrollWheelZoom
      worldCopyJump
      className={`h-full w-full !bg-slate-900 ${
        guessing ? 'cursor-crosshair' : ''
      }`}
    >
      <TileLayer
        attribution={OPEN_STREET_MAP_TILE_LAYER.attribution}
        url={OPEN_STREET_MAP_TILE_LAYER.url}
      />
      <MapGuessHandler enabled={guessing} onGuess={onGuess} />
      <MapViewportController roundKey={roundKey} result={result} />

      {result && reviewPositions && (
        <>
          <Marker position={reviewPositions.guessPosition} icon={GUESS_ICON}>
            <Tooltip direction="top" offset={[0, -34]}>
              Your guess
            </Tooltip>
          </Marker>
          <Marker position={reviewPositions.answerPosition} icon={ANSWER_ICON}>
            <Tooltip direction="top" offset={[0, -34]}>
              Answer
            </Tooltip>
          </Marker>
          <Polyline
            positions={[
              reviewPositions.guessPosition,
              reviewPositions.answerPosition,
            ]}
            pathOptions={{ color: '#f8fafc', opacity: 0.8, weight: 3 }}
          >
            <Tooltip permanent direction="center" className="font-bold">
              {formatDistance(result.distanceKm)}
            </Tooltip>
          </Polyline>
        </>
      )}
    </MapContainer>
  )
}
