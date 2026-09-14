import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getUkraineFeatureCodes, UA_AREA_CODES } from '../../utils/ua/codeData'

export default function UkraineCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Ukraine Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 27 two-digit geographic telephone area-code prefixes
            represented on the supplied map of Ukraine.
          </p>
          <p className="mt-4">
            These are the first two digits after Ukraine&apos;s +380 country
            calling code.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/ua/uaoblast.geojson"
      items={UA_AREA_CODES}
      getFeatureIds={getUkraineFeatureCodes}
      map={{
        center: [48.4, 31.2],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Ukraine area code map."
    />
  )
}
