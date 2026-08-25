import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getSouthAfricaProvinceIds,
  ZA_PROVINCES,
} from '../../utils/za/provinceData'

export default function SouthAfricaProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="South Africa Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice all nine provinces of South Africa.</p>
        </div>
      }
      geoJsonUrl="/zaprovince.geojson"
      items={ZA_PROVINCES}
      getFeatureIds={getSouthAfricaProvinceIds}
      map={{
        center: [-30.6, 24.3],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the South Africa province map."
    />
  )
}
