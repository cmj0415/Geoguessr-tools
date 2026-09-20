import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getItalyThreeDigitFeatureCodes,
  IT_THREE_DIGIT_AREA_CODE_PREFIXES,
  IT_THREE_DIGIT_AREA_CODES,
} from '../../utils/it/codeData'

const PREFIX_GROUPS = {
  Prefixes: IT_THREE_DIGIT_AREA_CODE_PREFIXES,
}

export default function ItalyThreeDigitCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Italy Area Codes Quiz (3 Digits)"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Italy&apos;s 71 geographic telephone area-code regions,
            grouped by their first three digits.
          </p>
          <p className="mt-4">
            The two-digit codes 02 and 06 remain unchanged. Use the prefix
            selector to practice 01, 02 &amp; 03, 04, 05, 06 &amp; 07, 08, or 09
            codes.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/it/itcodes3.geojson"
      items={IT_THREE_DIGIT_AREA_CODES}
      getFeatureIds={getItalyThreeDigitFeatureCodes}
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
      loadErrorMessage="Unable to load the Italy three-digit area code map."
    />
  )
}
