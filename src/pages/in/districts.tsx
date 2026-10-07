import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  CORE_HINDI_STATES,
  getIndiaHindiDistrictIds,
  IN_HINDI_DISTRICTS,
} from '../../utils/in/hindiDistrictData'

const STATE_GROUPS = {
  States: [...CORE_HINDI_STATES],
}

export default function IndiaHindiDistricts() {
  return (
    <GeoJsonRegionQuiz
      title="India Hindi-Written District Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Locate 324 districts from India&apos;s core Hindi belt using their
            Devanagari names.
          </p>
          <p className="mt-4">
            Use the state selector to focus the question pool on one or more
            states.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/in/hindidistrict.geojson"
      items={IN_HINDI_DISTRICTS}
      getFeatureIds={getIndiaHindiDistrictIds}
      selector={{
        divisions: STATE_GROUPS,
        title: 'Select states',
        menuLabel: 'State pool',
        searchPlaceholder: 'Find a state...',
      }}
      map={{
        center: [25.2, 79.5],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select states to begin"
      loadErrorMessage="Unable to load the Hindi district map."
    />
  )
}
