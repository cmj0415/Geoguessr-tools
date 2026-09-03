import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getRomaniaCountyIds, RO_COUNTIES } from '../../utils/ro/countyData'

export default function RomaniaCounties() {
  return (
    <GeoJsonRegionQuiz
      title="Romania Counties Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice Romania&apos;s 41 counties plus Bucharest.</p>
        </div>
      }
      geoJsonUrl="/country_specific/ro/rocounty.geojson"
      items={RO_COUNTIES}
      getFeatureIds={getRomaniaCountyIds}
      map={{
        center: [45.9, 24.9],
        zoom: 7,
        minZoom: 6,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Romania county map."
    />
  )
}
