import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getIndiaStateIds, IN_STATES } from '../../utils/in/stateData'

export default function IndiaStates() {
  return (
    <GeoJsonRegionQuiz
      title="India States Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 28 states and six union territories represented on the
            supplied map of India.
          </p>
        </div>
      }
      geoJsonUrl="/instate.geojson"
      items={IN_STATES}
      getFeatureIds={getIndiaStateIds}
      map={{
        center: [22.8, 79],
        zoom: 4,
        minZoom: 3,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the India state map."
    />
  )
}
