import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getKenyaPostalCodeIds,
  KE_POSTAL_CODE_ITEMS,
} from '../../utils/ke/postalCodeData'

export default function KenyaPostalCodes() {
  return (
    <GeoJsonRegionQuiz
      title="Kenya Postal Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 43 postal-code regions represented on this map of
            Kenya. Combined codes are displayed together exactly as supplied.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/ke/kecode.geojson"
      items={KE_POSTAL_CODE_ITEMS}
      getFeatureIds={getKenyaPostalCodeIds}
      map={{
        center: [0.2, 37.8],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Kenya postal code map."
    />
  )
}
