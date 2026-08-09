import GeoJsonCodeQuiz from '../../components/GeoJsonCodeQuiz'
import {
  AVAILABLE_CODES,
  formatCode,
  getMexicoFeatureCodes,
} from '../../utils/mx/codeData'

export default function MexicoCodes() {
  return (
    <GeoJsonCodeQuiz
      title="Mexico Postal Codes Quiz"
      infoContent={
        <div>
          <p>
            Practice the first two digits of Mexican postal codes by selecting
            the matching region on the map.
          </p>
          <p className="mt-4">
            Use the range selector to focus the question pool. Codes 17, 18, and
            19 are not present in the supplied map data.
          </p>
        </div>
      }
      geoJsonUrl="/mxzip.geojson"
      availableCodes={AVAILABLE_CODES}
      getFeatureCodes={getMexicoFeatureCodes}
      range={{
        min: 1,
        max: 99,
        title: 'Select postal code range',
        menuLabel: 'Code range',
        formatValue: formatCode,
      }}
      map={{ center: [23.6, -102.5], zoom: 5, minZoom: 4 }}
      loadErrorMessage="Unable to load the postal code map."
    />
  )
}
