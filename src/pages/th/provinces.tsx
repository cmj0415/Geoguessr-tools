import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getThailandProvinceIds,
  TH_PROVINCES,
} from '../../utils/th/provinceData'

export default function ThailandProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="Thailand Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the English full names of Thailand&apos;s 76 provinces and
            Bangkok, which has province-level special administrative status.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/th/thprovince.geojson"
      items={TH_PROVINCES}
      getFeatureIds={getThailandProvinceIds}
      map={{
        center: [13.8, 101],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Thailand province map."
    />
  )
}
