import L from 'leaflet'
import { getPoleGridOrigins } from '../utils/tw/poleNumbers'
import type { PoleCoordinates, PoleRoundResult } from '../utils/poleNumbers'
import PoleGridOriginsLayer from './PoleGridOriginsLayer'
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
      <PoleGridOriginsLayer origins={GRID_ORIGINS} />
    </PoleNumberMap>
  )
}
