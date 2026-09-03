import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getVietnamAreaCodeIds, VN_AREA_CODES } from '../../utils/vn/codeData'

export default function VietnamCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Vietnam Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 63 geographic telephone area-code regions represented
            on the pre-2025 map of Vietnam.
          </p>
        </div>
      }
      geoJsonUrl="/vnprovince_old.geojson"
      items={VN_AREA_CODES}
      getFeatureIds={getVietnamAreaCodeIds}
      map={{
        center: [16.2, 107.8],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Vietnam area code map."
    />
  )
}
