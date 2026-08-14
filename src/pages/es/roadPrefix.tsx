import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  ES_PROVINCIAL_ROAD_PREFIXES,
  getSpainProvincialRoadPrefixIds,
} from '../../utils/es/provinceData'

export default function SpainProvincialRoadPrefixes() {
  return (
    <GeoJsonRegionQuiz
      title="Spain Provincial Road Prefixes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the provincial road prefixes included in the supplied map
            of Spain.
          </p>
        </div>
      }
      geoJsonUrl="/esprovince.geojson"
      items={ES_PROVINCIAL_ROAD_PREFIXES}
      getFeatureIds={getSpainProvincialRoadPrefixIds}
      map={{
        center: [39.5, -3.7],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Spain provincial road prefix map."
    />
  )
}
