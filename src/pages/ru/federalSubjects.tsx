import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getRussiaFederalSubjectIds,
  RU_FEDERAL_SUBJECTS,
} from '../../utils/ru/federalSubjectData'

export default function RussiaFederalSubjects() {
  return (
    <GeoJsonRegionQuiz
      title="Russia Federal Subjects Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice all 83 federal subjects included in the supplied map of
            Russia.
          </p>
          <p className="mt-4">
            All subjects share one question pool without a region selector.
          </p>
        </div>
      }
      geoJsonUrl="/rufedsubject.geojson"
      items={RU_FEDERAL_SUBJECTS}
      getFeatureIds={getRussiaFederalSubjectIds}
      map={{
        center: [61, 90],
        zoom: 3,
        minZoom: 2,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Russia federal subject map."
    />
  )
}
