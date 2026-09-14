import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getUkraineOblastIds, UA_OBLASTS } from '../../utils/ua/oblastData'

export default function UkraineOblasts() {
  return (
    <GeoJsonRegionQuiz
      title="Ukraine Oblasts Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice Ukraine&apos;s 24 oblasts, the Autonomous Republic of
            Crimea, and the special-status cities of Kyiv and Sevastopol.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/ua/uaoblast.geojson"
      items={UA_OBLASTS}
      getFeatureIds={getUkraineOblastIds}
      map={{
        center: [48.4, 31.2],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Ukraine oblast map."
    />
  )
}
