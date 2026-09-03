import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getNewZealandRegionIds, NZ_REGIONS } from '../../utils/nz/regionData'

export default function NewZealandRegions() {
  return (
    <GeoJsonRegionQuiz
      title="New Zealand Regions Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice all 16 regions of New Zealand.</p>
        </div>
      }
      geoJsonUrl="/country_specific/nz/nzregion.geojson"
      items={NZ_REGIONS}
      getFeatureIds={getNewZealandRegionIds}
      map={{
        center: [-40.8, 172.5],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the New Zealand region map."
    />
  )
}
