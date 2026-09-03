import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getJapanFeatureCodes, JP_AREA_CODES } from '../../utils/jp/codeData'

export default function JapanCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Japan Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 59 geographic telephone area-code regions represented
            on the supplied map of Japan.
          </p>
          <p className="mt-4">
            The quiz uses the leading two- or three-digit code shown on the map.
            Some code regions consist of multiple disconnected polygons.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/jp/jpcode.geojson"
      items={JP_AREA_CODES}
      getFeatureIds={getJapanFeatureCodes}
      map={{
        center: [36.2, 138.2],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Japan area code map."
    />
  )
}
