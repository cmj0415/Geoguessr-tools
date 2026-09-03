import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  DE_DISTRICTS,
  DE_REGIERUNGSBEZIRK_DIVISIONS,
  getGermanyDistrictIds,
} from '../../utils/de/districtData'

export default function GermanyDistricts() {
  return (
    <GeoJsonRegionQuiz
      title="Germany Districts Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice all 401 district-level areas represented on the supplied
            map.
          </p>
          <p className="mt-4">
            Use the Regierungsbezirk selector to focus the question pool. Its
            state-grouped options follow the supplied boundary data, including
            former Regierungsbezirke and state-wide groupings where needed.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/de/dedistrict.geojson"
      items={DE_DISTRICTS}
      getFeatureIds={getGermanyDistrictIds}
      selector={{
        divisions: DE_REGIERUNGSBEZIRK_DIVISIONS,
        title: 'Select Regierungsbezirke',
        menuLabel: 'Regierungsbezirk pool',
        searchPlaceholder: 'Find a Regierungsbezirk...',
      }}
      map={{
        center: [51.1, 10.4],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select Regierungsbezirke to begin"
      loadErrorMessage="Unable to load the Germany district map."
    />
  )
}
