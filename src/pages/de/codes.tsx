import GeoJsonCodeQuiz from '../../components/GeoJsonCodeQuiz'
import {
  DE_AVAILABLE_CODES,
  getGermanyFeatureCodes,
} from '../../utils/de/codeData'

export default function GermanyCodes() {
  return (
    <GeoJsonCodeQuiz
      title="Germany Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the two-digit geographic area-code prefixes of Germany by
            selecting the matching region on the map.
          </p>
          <p className="mt-4">
            Use the range selector to focus the question pool. 
          </p>
        </div>
      }
      geoJsonUrl="/decode.geojson"
      availableCodes={DE_AVAILABLE_CODES}
      getFeatureCodes={getGermanyFeatureCodes}
      range={{
        min: 20,
        max: 99,
        title: 'Select area code range',
        menuLabel: 'Code range',
      }}
      map={{ center: [51.1, 10.4], zoom: 6, minZoom: 5 }}
      loadErrorMessage="Unable to load the Germany area code map."
    />
  )
}
