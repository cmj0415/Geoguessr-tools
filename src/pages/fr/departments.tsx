import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import {
  FR_DEPARTMENTS,
  getFranceDepartmentIds,
} from '../../utils/fr/departmentData'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'

export default function FranceDepartments() {
  return (
    <GeoJsonRegionQuiz
      title="France Departments Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice all 96 departments of metropolitan France, including the
            two departments of Corsica.
          </p>
          <p className="mt-4">
            Overseas departments are not included in this map. All departments
            share one question pool without a region selector.
          </p>
        </div>
      }
      geoJsonUrl="/frdepartment.geojson"
      items={FR_DEPARTMENTS}
      getFeatureIds={getFranceDepartmentIds}
      map={{
        center: [46.6, 2.5],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the France department map."
    />
  )
}
