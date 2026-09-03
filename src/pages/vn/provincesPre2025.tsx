import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getVietnamPre2025ProvinceIds,
  VN_PRE_2025_PROVINCES,
} from '../../utils/vn/provinceData'

export default function VietnamProvincesPre2025() {
  return (
    <GeoJsonRegionQuiz
      title="Vietnam Provinces Quiz (Pre 2025)"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Vietnam&apos;s 63 province-level administrative units
            before the 2025 consolidation.
          </p>
        </div>
      }
      geoJsonUrl="/vnprovince_old.geojson"
      items={VN_PRE_2025_PROVINCES}
      getFeatureIds={getVietnamPre2025ProvinceIds}
      map={{
        center: [16.2, 107.8],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the pre-2025 Vietnam province map."
    />
  )
}
