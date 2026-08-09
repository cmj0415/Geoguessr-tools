import GeoJsonCodeQuiz from '../../components/GeoJsonCodeQuiz'
import {
  BR_AVAILABLE_CODES,
  getBrazilFeatureCodes,
} from '../../utils/br/codeData'

export default function BrazilCodes() {
  return (
    <GeoJsonCodeQuiz
      title="Brazil Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>This practice contains every area code in Brazil.</p>
          <p className="mt-4">
            You can choose the range of codes that you want to practice!
          </p>
        </div>
      }
      geoJsonUrl="/brazil_ddd.geojson"
      availableCodes={BR_AVAILABLE_CODES}
      getFeatureCodes={getBrazilFeatureCodes}
      range={{
        min: 11,
        max: 99,
        title: 'Select area code range',
        menuLabel: 'Code range',
      }}
      map={{ center: [-14.2, -51.9], zoom: 4, minZoom: 3 }}
      loadErrorMessage="Unable to load the area code map."
    />
  )
}
