import GeoJsonCodeQuiz from '../../components/GeoJsonCodeQuiz'
import {
  getUsFeatureCodes,
  US_AVAILABLE_CODES,
} from '../../utils/us/areaCodeData'

export default function USCodes() {
  return (
    <GeoJsonCodeQuiz
      title="US Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            This practice contains every area codes of the US territories,
            including Puerto Rico, Guam, and NMI.
          </p>
          <p className="mt-4">
            You can choose the range of codes that you want to practice. This
            page is still under progress, so not all codes are available. It
            might take me a month or two to draw all the divisions lol.
          </p>
        </div>
      }
      geoJsonUrl="/uscode.geojson"
      cache="no-store"
      availableCodes={US_AVAILABLE_CODES}
      getFeatureCodes={getUsFeatureCodes}
      range={{
        min: 201,
        max: 989,
        title: 'Select code range',
        menuLabel: 'Code range',
      }}
      map={{ center: [37.8, -96], zoom: 4 }}
      loadErrorMessage="Unable to load the area code map."
    />
  )
}
