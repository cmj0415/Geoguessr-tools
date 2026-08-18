import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  EC_TAXI_LETTERS,
  getEcuadorTaxiLetterIds,
} from '../../utils/ec/provinceData'

export default function EcuadorTaxiLetters() {
  return (
    <GeoJsonRegionQuiz
      title="Ecuador Taxi First Letters Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the first letter on Ecuadorian taxi license plates for
            each of the 23 mainland provinces included in the map.
          </p>
          <p className="mt-4">
            Select the province that matches the taxi letter shown in the
            question card.
          </p>
        </div>
      }
      geoJsonUrl="/ecprovince.geojson"
      items={EC_TAXI_LETTERS}
      getFeatureIds={getEcuadorTaxiLetterIds}
      map={{
        center: [-1.5, -78.4],
        zoom: 7,
        minZoom: 6,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Ecuador taxi letter map."
    />
  )
}
