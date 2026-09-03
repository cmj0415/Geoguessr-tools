import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getIndonesiaRegencyIds,
  ID_REGENCIES,
} from '../../utils/id/regencyData'

const PROVINCE_DIVISIONS = {
  Sumatra: [
    'Aceh',
    'North Sumatra',
    'West Sumatra',
    'Riau',
    'Jambi',
    'Bengkulu',
    'South Sumatra',
    'Lampung',
    'Bangka Belitung Islands',
    'Riau Islands',
  ],
  Kalimantan: [
    'West Kalimantan',
    'Central Kalimantan',
    'South Kalimantan',
    'East Kalimantan',
    'North Kalimantan',
  ],
  Java: [
    'Banten',
    'Jakarta',
    'West Java',
    'Yogyakarta',
    'Central Java',
    'East Java',
  ],
  Sulawesi: [
    'North Sulawesi',
    'Gorontalo',
    'Central Sulawesi',
    'West Sulawesi',
    'South Sulawesi',
    'Southeast Sulawesi',
  ],
  'Lesser Sunda Islands': ['Bali', 'West Nusa Tenggara', 'East Nusa Tenggara'],
  'Maluku Islands': ['Maluku', 'North Maluku'],
  'Western New Guinea': [
    'West Papua',
    'Papua',
    'Highland Papua',
    'South Papua',
    'Central Papua',
    'Southwest Papua',
  ],
}

export default function IndonesiaRegencies() {
  return (
    <GeoJsonRegionQuiz
      title="Indonesia Regencies Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            This practice contains all 514 Indonesian regencies and cities,
            including areas without official Street View coverage.
          </p>
          <p className="mt-4">
            Use the province selector to focus on one or more parts of the
            country. Cities use the “Kota” prefix to distinguish them from
            regencies with the same name.
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/id/idkabupaten.geojson"
      items={ID_REGENCIES}
      getFeatureIds={getIndonesiaRegencyIds}
      selector={{
        divisions: PROVINCE_DIVISIONS,
        title: 'Select provinces',
        menuLabel: 'Province pool',
        searchPlaceholder: 'Find a province...',
      }}
      map={{
        center: [-2.5, 118],
        zoom: 4,
        minZoom: 3,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      emptyQuestion="Select provinces to begin"
      loadErrorMessage="Unable to load the regency map."
    />
  )
}
