import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getTurkeyProvinceIds,
  TR_PROVINCES,
} from '../../utils/tr/provinceData'

export default function TurkeyProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="Turkey Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice all 81 provinces of Turkey.</p>
          <p className="mt-4">
            İstanbul is represented by two telephone-code areas on the map,
            but both belong to the same province question.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/tr/trprovince.geojson"
      items={TR_PROVINCES}
      getFeatureIds={getTurkeyProvinceIds}
      map={{
        center: [39, 35],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Turkey province map."
    />
  )
}
