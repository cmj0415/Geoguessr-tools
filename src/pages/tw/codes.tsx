import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getTaiwanFeatureCodes,
  TW_AREA_CODES,
} from '../../utils/tw/codeData'

export default function TaiwanCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Taiwan Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 31 geographic telephone-code regions represented on
            the supplied map of Taiwan.
          </p>
          <p className="mt-4">
            There are some exceptions where the actual boundary is not the ADM2 
            boundary, but this should be comprehensive enough to learn.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/tw/twcode.geojson"
      items={TW_AREA_CODES}
      getFeatureIds={getTaiwanFeatureCodes}
      map={{
        center: [23.7, 120.8],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Taiwan area code map."
    />
  )
}
