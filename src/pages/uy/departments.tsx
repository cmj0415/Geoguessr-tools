import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getUruguayDepartmentIds,
  UY_DEPARTMENTS,
} from '../../utils/uy/departmentData'

export default function UruguayDepartments() {
  return (
    <GeoJsonRegionQuiz
      title="Uruguay Departments Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice all 19 departments of Uruguay.</p>
        </div>
      }
      geoJsonUrl="/uydepartment.geojson"
      items={UY_DEPARTMENTS}
      getFeatureIds={getUruguayDepartmentIds}
      map={{
        center: [-32.5, -55.8],
        zoom: 7,
        minZoom: 6,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Uruguay department map."
    />
  )
}
