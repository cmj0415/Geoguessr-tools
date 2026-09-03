import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  EC_PROVINCES,
  getEcuadorProvinceIds,
} from '../../utils/ec/provinceData'

export default function EcuadorProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="Ecuador Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 23 mainland provinces included in the supplied map of
            Ecuador.
          </p>
          <p className="mt-4">
            Galápagos is not included because it is not represented by the map
            data.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/ec/ecprovince.geojson"
      items={EC_PROVINCES}
      getFeatureIds={getEcuadorProvinceIds}
      map={{
        center: [-1.5, -78.4],
        zoom: 7,
        minZoom: 6,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Ecuador province map."
    />
  )
}
