import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getKenyaCountyIds, KE_COUNTIES } from '../../utils/ke/countyData'

export default function KenyaCounties() {
  return (
    <GeoJsonRegionQuiz
      title="Kenya Counties Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice the 47 counties represented on this map of Kenya.</p>
        </div>
      }
      geoJsonUrl="/kecounty.geojson"
      items={KE_COUNTIES}
      getFeatureIds={getKenyaCountyIds}
      map={{
        center: [0.2, 37.8],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Kenya county map."
    />
  )
}
