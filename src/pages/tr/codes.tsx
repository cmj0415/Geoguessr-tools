import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getTurkeyFeatureCodes,
  TR_AREA_CODE_MAP,
  TR_AREA_CODES,
} from '../../utils/tr/provinceData'

const PREFIX_GROUPS = {
  Prefixes: Object.keys(TR_AREA_CODE_MAP),
}

export default function TurkeyCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Turkey Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 82 three-digit geographic telephone codes included in
            the supplied map of Turkey.
          </p>
          <p className="mt-4">
            Use the prefix selector to practice codes beginning with 2, 3, or
            4. İstanbul has separate codes for its European and Asian sides.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/tr/trprovince.geojson"
      items={TR_AREA_CODES}
      getFeatureIds={getTurkeyFeatureCodes}
      selector={{
        divisions: PREFIX_GROUPS,
        title: 'Select prefixes',
        menuLabel: 'Prefix pool',
        searchPlaceholder: 'Find a prefix...',
      }}
      map={{
        center: [39, 35],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select prefixes to begin"
      loadErrorMessage="Unable to load the Turkey area code map."
    />
  )
}
