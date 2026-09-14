import PictureGeoJsonQuiz from '../../components/PictureGeoJsonQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getEuropeAdminCountryIds,
  getEuropeAdminCountryLabel,
} from '../../utils/miscellaneous/europeAdminMapData'
import { loadEuropeBollardQuestions } from '../../utils/miscellaneous/europeBollardData'

export default function EuropeBollards() {
  return (
    <PictureGeoJsonQuiz
      title="Europe Bollard Quiz"
      prompt="In which countries will you see this?"
      infoContent={
        <div className="space-y-3 text-left">
          <p>
            Select every country where the pictured roadside bollard is used. A
            bollard can have more than one correct country.
          </p>
          <p>
            Correct countries stay green. Incorrect choices flash red. Find
            every answer or reveal the answer before moving to the next bollard.
          </p>
        </div>
      }
      geoJsonUrl="/miscellaneous/europe_with_tr_cy.geojson"
      loadQuestions={loadEuropeBollardQuestions}
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
