import L from 'leaflet'
import {
  LayerGroup,
  LayersControl,
  Marker,
  Tooltip,
} from 'react-leaflet'
import { getPoleGridOrigins } from '../utils/tw/poleNumbers'
import type { PoleCoordinates, PoleRoundResult } from '../utils/poleNumbers'
import PoleNumberMap from './PoleNumberMap'

type TaiwanPoleNumberMapProps = {
  roundKey: number
  guessing: boolean
  selectedCoordinates: PoleCoordinates | null
  result: PoleRoundResult | null
  onSelect: (coordinates: PoleCoordinates) => void
}

const PLAY_BOUNDS = L.latLngBounds([21.7, 117.8], [26.5, 122.2])
const GRID_ORIGINS = getPoleGridOrigins()

export default function TaiwanPoleNumberMap({
  roundKey,
  guessing,
  selectedCoordinates,
  result,
  onSelect,
}: TaiwanPoleNumberMapProps) {
  return (
    <PoleNumberMap
      bounds={PLAY_BOUNDS}
      minZoom={5}
      roundKey={roundKey}
      guessing={guessing}
      selectedCoordinates={selectedCoordinates}
      result={result}
      onSelect={onSelect}
    >
      <LayersControl position="bottomleft">
        <LayersControl.Overlay name="Pole-grid origins">
          <LayerGroup>
            {GRID_ORIGINS.map((origin) => (
              <Marker
                key={origin.id}
                position={[origin.coordinates[0], origin.coordinates[1]]}
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
    </PoleNumberMap>
  )
}
