import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  ES_PROVINCES,
  getSpainProvinceIds,
} from '../../utils/es/provinceData'

export default function SpainProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="Spain Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Spain&apos;s 50 provinces plus the autonomous cities of
            Ceuta and Melilla.
          </p>
        </div>
      }
      geoJsonUrl="/esprovince.geojson"
      items={ES_PROVINCES}
      getFeatureIds={getSpainProvinceIds}
      map={{
        center: [39.5, -3.7],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Spain province map."
    />
  )
}
