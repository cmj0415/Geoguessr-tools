import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getVietnamPost2025ProvinceIds,
  VN_POST_2025_PROVINCES,
} from '../../utils/vn/provinceData'

export default function VietnamProvincesPost2025() {
  return (
    <GeoJsonRegionQuiz
      title="Vietnam Provinces Quiz (Post 2025)"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Vietnam&apos;s 34 province-level administrative units after
            the 2025 consolidation.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/vn/vnprovince_new.geojson"
      items={VN_POST_2025_PROVINCES}
      getFeatureIds={getVietnamPost2025ProvinceIds}
      map={{
        center: [16.2, 107.8],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the post-2025 Vietnam province map."
    />
  )
}
