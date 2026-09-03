import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { DE_STATES, getGermanyStateIds } from '../../utils/de/stateData'

export default function GermanyStates() {
  return (
    <GeoJsonRegionQuiz
      title="Germany States Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice all 16 federal states of Germany.</p>
        </div>
      }
      geoJsonUrl="/country_specific/de/destate.geojson"
      items={DE_STATES}
      getFeatureIds={getGermanyStateIds}
      map={{
        center: [51.1, 10.4],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Germany state map."
    />
  )
}
