import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getNigeriaStateIds, NG_STATES } from '../../utils/ng/stateData'

export default function NigeriaStates() {
  return (
    <GeoJsonRegionQuiz
      title="Nigeria States Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Nigeria&apos;s 36 states plus Abuja, the Federal Capital
            Territory.
          </p>
          <p className="mt-4">
            All 37 areas are included in one question pool without a region
            selector.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/ng/ngstates.geojson"
      items={NG_STATES}
      getFeatureIds={getNigeriaStateIds}
      map={{
        center: [9.08, 8.68],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Nigeria state map."
    />
  )
}
