import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getItalyFeatureCodes,
  IT_AREA_CODE_PREFIXES,
  IT_AREA_CODES,
} from '../../utils/it/codeData'

const PREFIX_GROUPS = {
  Prefixes: IT_AREA_CODE_PREFIXES,
}

export default function ItalyCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Italy Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 231 geographic telephone area codes represented on the
            supplied map of Italy.
          </p>
          <p className="mt-4">
            Use the prefix selector to practice 01, 02 &amp; 03, 04, 05, 06
            &amp; 07, 08, or 09 codes.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/it/itcodes.geojson"
      items={IT_AREA_CODES}
      getFeatureIds={getItalyFeatureCodes}
      searchKind="code"
      selector={{
        divisions: PREFIX_GROUPS,
        title: 'Select prefixes',
        menuLabel: 'Prefix pool',
        searchPlaceholder: 'Find a prefix...',
      }}
      map={{
        center: [42.8, 12.5],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select prefixes to begin"
      loadErrorMessage="Unable to load the Italy area code map."
    />
  )
}
