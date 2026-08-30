import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getMexicoFeatureCodes,
  MX_AREA_CODE_MAP,
  MX_AREA_CODES,
} from '../../utils/mx/codeData'

const PREFIX_GROUPS = {
  Prefixes: Object.keys(MX_AREA_CODE_MAP),
}

export default function MexicoCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Mexico Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 396 geographic telephone codes represented in the
            supplied map of Mexico. Note that this map is not meant to be 
            100% accurate. I did my best to make it look legit, and it
            serves as an overview of how the codes are distributed.
          </p>
          <p className="mt-4">
            Use the prefix selector to practice codes beginning with 2, 3, 4, 5,
            6, 7, 8, or 9. Some codes cover multiple disconnected areas.
          </p>
        </div>
      }
      geoJsonUrl="/mxcode.geojson"
      items={MX_AREA_CODES}
      getFeatureIds={getMexicoFeatureCodes}
      selector={{
        divisions: PREFIX_GROUPS,
        title: 'Select prefixes',
        menuLabel: 'Prefix pool',
        searchPlaceholder: 'Find a prefix...',
      }}
      map={{
        center: [23.6, -102.5],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select prefixes to begin"
      loadErrorMessage="Unable to load the Mexico area code map."
    />
  )
}
