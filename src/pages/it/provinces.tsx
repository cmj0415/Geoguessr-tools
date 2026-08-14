import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getItalyProvinceIds,
  IT_PROVINCE_MAP,
  IT_PROVINCES,
} from '../../utils/it/provinceData'

const REGION_GROUPS = {
  Regions: Object.keys(IT_PROVINCE_MAP),
}

export default function ItalyProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="Italy Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice all 107 province-level areas included in the supplied map
            of Italy.
          </p>
          <p className="mt-4">
            The question pool includes provinces, metropolitan cities, and
            special administrative cases represented by the map data. Use the
            region selector to focus on one or more of Italy&apos;s 20 regions.
          </p>
        </div>
      }
      geoJsonUrl="/itprovince.geojson"
      items={IT_PROVINCES}
      getFeatureIds={getItalyProvinceIds}
      selector={{
        divisions: REGION_GROUPS,
        title: 'Select regions',
        menuLabel: 'Region pool',
        searchPlaceholder: 'Find a region...',
      }}
      map={{
        center: [42.8, 12.5],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select regions to begin"
      loadErrorMessage="Unable to load the Italy province map."
    />
  )
}
