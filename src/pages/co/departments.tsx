import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import {
  CO_DEPARTMENTS,
  getColombiaDepartmentIds,
} from '../../utils/co/departmentData'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'

export default function ColombiaDepartments() {
  return (
    <GeoJsonRegionQuiz
      title="Colombia Departments Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Colombia&apos;s 32 departments plus Bogotá, D.C., which is
            represented as a department-level area on the map.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/co/codepartment.geojson"
      items={CO_DEPARTMENTS}
      getFeatureIds={getColombiaDepartmentIds}
      map={{
        center: [4.6, -74.3],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Colombia department map."
    />
  )
}
