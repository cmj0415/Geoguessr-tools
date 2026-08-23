import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import { getPeruProvinceIds, PE_PROVINCES } from '../../utils/pe/provinceData'

export default function PeruProvinces() {
  return (
    <GeoJsonRegionQuiz
      title="Peru Provinces Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 25 department-level areas represented on this map:
            Peru&apos;s 24 departments and the Constitutional Province of
            Callao.
          </p>
        </div>
      }
      geoJsonUrl="/peprovince.geojson"
      items={PE_PROVINCES}
      getFeatureIds={getPeruProvinceIds}
      map={{
        center: [-9.2, -75],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Peru province map."
    />
  )
}
