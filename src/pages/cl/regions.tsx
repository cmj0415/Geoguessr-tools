import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { CL_REGIONS, getChileRegionIds } from '../../utils/cl/regionData'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'

export default function ChileRegions() {
  return (
    <GeoJsonRegionQuiz
      title="Chile Regions Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice all 16 regions of Chile.</p>
          <p className="mt-4">
            Chile&apos;s insular territories are included with their respective
            regions, including Rapa Nui as part of Valparaíso.
          </p>
        </div>
      }
      geoJsonUrl="/clregion.geojson"
      items={CL_REGIONS}
      getFeatureIds={getChileRegionIds}
      map={{
        center: [-36.7, -71.5],
        zoom: 4,
        minZoom: 3,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the Chile region map."
    />
  )
}
