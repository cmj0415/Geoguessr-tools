import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import {
  getPhilippinesProvinceIds,
  PH_PROVINCES,
} from '../../utils/ph/provinceData'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'

const ISLAND_GROUPS = {
  'Island Groups': ['Luzon', 'Visayas', 'Mindanao'],
}

export default function PhilippinesProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="Philippines Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            This practice contains all 82 provinces of the Philippines, plus
            Manila.
          </p>
          <p className="mt-4">
            Maguindanao del Norte and Maguindanao del Sur are shown separately,
            reflecting the 2022 division of the former Maguindanao province.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/ph/phprovince.geojson"
      items={PH_PROVINCES}
      getFeatureIds={getPhilippinesProvinceIds}
      selector={{
        divisions: ISLAND_GROUPS,
        title: 'Select island groups',
        menuLabel: 'Island group pool',
        searchPlaceholder: 'Find an island group...',
      }}
      map={{
        center: [12.88, 121.77],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select island groups to begin"
      loadErrorMessage="Unable to load the province map."
    />
  )
}
