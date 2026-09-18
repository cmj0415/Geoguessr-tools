import PictureGeoJsonQuiz from '../../components/PictureGeoJsonQuiz'
import QuizGuide from '../../components/QuizGuide'
import { EUROPE_CHEVRON_GUIDE } from '../../utils/miscellaneous/europeChevronGuideData'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { loadEuropeChevronQuestions } from '../../utils/miscellaneous/europeChevronData'
import {
  getEuropeAdminCountryIds,
  getEuropeAdminCountryLabel,
} from '../../utils/miscellaneous/europeAdminMapData'

export default function EuropeChevrons() {
  return (
    <PictureGeoJsonQuiz
      title="Europe Chevron Quiz"
      prompt="In which countries will you see this?"
      guide={{
        title: 'Europe Chevrons',
        content: <QuizGuide document={EUROPE_CHEVRON_GUIDE} />,
      }}
      infoContent={
        <div className="space-y-3 text-left">
          <p>
            Select every country where the pictured road chevron design is used.
            A chevron can have more than one correct country.
          </p>
          <p>
            Correct countries stay green. Incorrect choices flash red. Find
            every answer or reveal the answer before moving to the next chevron.
          </p>
        </div>
      }
      geoJsonUrl="/miscellaneous/europe_with_tr_cy.geojson"
      loadQuestions={loadEuropeChevronQuestions}
      getFeatureIds={getEuropeAdminCountryIds}
      getFeatureLabel={getEuropeAdminCountryLabel}
      map={{
        center: [53, 18],
        zoom: 3,
        minZoom: 2,
        maxZoom: 7,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      mapLoadErrorMessage="Unable to load the Europe map."
    />
  )
}
