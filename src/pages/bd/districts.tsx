import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import {
  BD_DISTRICT_MAP,
  BD_DISTRICTS,
  getBangladeshDistrictIds,
} from '../../utils/bd/districtData'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'

const DIVISION_GROUPS = {
  Divisions: Object.keys(BD_DISTRICT_MAP),
}

export default function BangladeshDistricts() {
  return (
    <GeoJsonRegionQuiz
      title="Bangladesh Districts Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice all 64 districts of Bangladesh.</p>
          <p className="mt-4">
            Use the division selector to focus the question pool on one or more
            of Bangladesh&apos;s eight divisions.
          </p>
        </div>
      }
      geoJsonUrl="/bddistrict.geojson"
      items={BD_DISTRICTS}
      getFeatureIds={getBangladeshDistrictIds}
      selector={{
        divisions: DIVISION_GROUPS,
        title: 'Select divisions',
        menuLabel: 'Division pool',
        searchPlaceholder: 'Find a division...',
      }}
      map={{
        center: [23.7, 90.35],
        zoom: 7,
        minZoom: 6,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select divisions to begin"
      loadErrorMessage="Unable to load the Bangladesh district map."
    />
  )
}
