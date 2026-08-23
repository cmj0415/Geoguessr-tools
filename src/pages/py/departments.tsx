import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getParaguayDepartmentIds,
  PY_DEPARTMENTS,
} from '../../utils/py/departmentData'

export default function ParaguayDepartments() {
  return (
    <GeoJsonRegionQuiz
      title="Paraguay Departments Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Paraguay&apos;s 17 departments plus the capital district of
            Asunción.
          </p>
        </div>
      }
      geoJsonUrl="/pydepartment.geojson"
      items={PY_DEPARTMENTS}
      getFeatureIds={getParaguayDepartmentIds}
      map={{
        center: [-23.4, -58.5],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Paraguay department map."
    />
  )
}
