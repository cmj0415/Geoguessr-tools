import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getTaiwanCountyIds, TW_COUNTIES } from '../../utils/tw/countyData'

export default function TaiwanCounties() {
  return (
    <GeoJsonRegionQuiz
      title="Taiwan Counties Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 22 county-level divisions represented on the supplied
            map of Taiwan, including counties, cities, special municipalities,
            and outlying islands.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/tw/twcounty.geojson"
      items={TW_COUNTIES}
      getFeatureIds={getTaiwanCountyIds}
      map={{
        center: [23.7, 120.8],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Taiwan county map."
    />
  )
}
