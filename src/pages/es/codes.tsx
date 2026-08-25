import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  ES_AREA_CODE_PREFIXES,
  ES_AREA_CODES,
  getSpainFeatureCodes,
} from '../../utils/es/codeData'

const PREFIX_GROUPS = {
  Prefixes: [...ES_AREA_CODE_PREFIXES],
}

export default function SpainCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Spain Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 48 geographic telephone codes included in the supplied
            map of Spain.
          </p>
          <p className="mt-4">
            Use the prefix selector to practice 91–93, 94, 95, 96, 97, or 98
            codes. Some codes cover multiple provinces or island polygons.
          </p>
        </div>
      }
      geoJsonUrl="/esprovince.geojson"
      items={ES_AREA_CODES}
      getFeatureIds={getSpainFeatureCodes}
      selector={{
        divisions: PREFIX_GROUPS,
        title: 'Select prefixes',
        menuLabel: 'Prefix pool',
        searchPlaceholder: 'Find a prefix...',
      }}
      map={{
        center: [39.5, -3.7],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select prefixes to begin"
      loadErrorMessage="Unable to load the Spain area code map."
    />
  )
}
