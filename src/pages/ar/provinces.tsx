import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import {
  AR_PROVINCES,
  getArgentinaProvinceIds,
} from '../../utils/ar/provinceData'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'

export default function ArgentinaProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="Argentina Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Argentina&apos;s 23 provinces plus the Autonomous City of
            Buenos Aires.
          </p>
        </div>
      }
      geoJsonUrl="/arprovince.geojson"
      items={AR_PROVINCES}
      getFeatureIds={getArgentinaProvinceIds}
      map={{
        center: [-38.4, -63.6],
        zoom: 4,
        minZoom: 3,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Argentina province map."
    />
  )
}
