import L from 'leaflet'
import { LayerGroup, LayersControl, Marker, Tooltip } from 'react-leaflet'
import type { PoleGridOrigin } from '../utils/poleNumbers'

type PoleGridOriginsLayerProps = {
  origins: readonly PoleGridOrigin[]
}

export default function PoleGridOriginsLayer({
  origins,
}: PoleGridOriginsLayerProps) {
  return (
    <LayersControl position="bottomleft">
      <LayersControl.Overlay name="Pole-grid origins">
        <LayerGroup>
          {origins.map((origin) => (
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
  )
}
