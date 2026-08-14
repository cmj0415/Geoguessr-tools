import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getRussiaFeatureCodes,
  RU_AREA_CODE_MAP,
  RU_AREA_CODES,
} from '../../utils/ru/codeData'

const PREFIX_GROUPS = {
  Prefixes: Object.keys(RU_AREA_CODE_MAP),
}

export default function RussiaCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Russia Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 89 three-digit geographic area codes included in the
            supplied map of Russia.
          </p>
          <p className="mt-4">
            Use the prefix selector to practice codes beginning with 3, 4, or
            8. Some subjects contain multiple codes, while code 818 is shared
            by Arkhangelsk and Nenets.
          </p>
        </div>
      }
      geoJsonUrl="/rufedsubject.geojson"
      items={RU_AREA_CODES}
      getFeatureIds={getRussiaFeatureCodes}
      selector={{
        divisions: PREFIX_GROUPS,
        title: 'Select prefixes',
        menuLabel: 'Prefix pool',
        searchPlaceholder: 'Find a prefix...',
      }}
      map={{
        center: [61, 90],
        zoom: 3,
        minZoom: 2,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select prefixes to begin"
      loadErrorMessage="Unable to load the Russia area code map."
    />
  )
}
