import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getThailandFeatureCodes,
  TH_AREA_CODES,
} from '../../utils/th/codeData'

export default function ThailandCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Thailand Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 21 geographic telephone area-code regions represented
            on the supplied map of Thailand.
          </p>
        </div>
      }
      geoJsonUrl="/thcode.geojson"
      items={TH_AREA_CODES}
      getFeatureIds={getThailandFeatureCodes}
      map={{
        center: [13.8, 101],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Thailand area code map."
    />
  )
}
