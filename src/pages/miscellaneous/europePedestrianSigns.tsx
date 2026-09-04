import PictureGeoJsonQuiz from '../../components/PictureGeoJsonQuiz'
import EuropePedestrianSignGuide from '../../components/EuropePedestrianSignGuide'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getEuropeCountryIds,
  getEuropeCountryLabel,
  loadEuropePedestrianSignQuestions,
} from '../../utils/miscellaneous/europePedestrianSignData'

export default function EuropePedestrianSigns() {
  return (
    <PictureGeoJsonQuiz
      title="Europe Pedestrian Crossing Sign Quiz"
      prompt="In which countries will you see this?"
      guide={{
        title: 'Europe Pedestrian Crossing Signs',
        content: <EuropePedestrianSignGuide />,
      }}
      infoContent={
        <div className="space-y-3 text-left">
          <p>
            Select every country where the pictured pedestrian crossing sign is
            used. A sign can have more than one correct country.
          </p>
          <p>
            Correct countries stay green. Incorrect choices flash red. Find
            every answer or reveal the answer before moving to the next sign.
          </p>
        </div>
      }
      geoJsonUrl="/miscellaneous/europe.geojson"
      loadQuestions={loadEuropePedestrianSignQuestions}
      getFeatureIds={getEuropeCountryIds}
      getFeatureLabel={getEuropeCountryLabel}
      map={{
        center: [54, 15],
        zoom: 3,
        minZoom: 2,
        maxZoom: 7,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      mapLoadErrorMessage="Unable to load the Europe map."
    />
  )
}
