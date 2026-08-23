import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getTurkeyDistrictIds,
  TR_DISTRICTS,
  TR_PROVINCE_DIVISIONS,
} from '../../utils/tr/districtData'

export default function TurkeyDistricts() {
  return (
    <GeoJsonRegionQuiz
      title="Turkey Districts Quiz"
      infoContent={
        <div className="text-justify">
          <p>Practice all 973 districts represented on the supplied map.</p>
          <p className="mt-4">
            Use the province selector to focus the question pool. District names
            shared by multiple provinces include the province in parentheses to
            keep each question unambiguous.
          </p>
        </div>
      }
      geoJsonUrl="/trdistrict.geojson"
      items={TR_DISTRICTS}
      getFeatureIds={getTurkeyDistrictIds}
      selector={{
        divisions: TR_PROVINCE_DIVISIONS,
        title: 'Select provinces',
        menuLabel: 'Province pool',
        searchPlaceholder: 'Find a province...',
      }}
      map={{
        center: [39, 35],
        zoom: 6,
        minZoom: 5,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select provinces to begin"
      loadErrorMessage="Unable to load the Turkey district map."
    />
  )
}
