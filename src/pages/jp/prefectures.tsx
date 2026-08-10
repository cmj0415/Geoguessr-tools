import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import {
  getJapanPrefectureIds,
  JP_MAP,
  JP_PREFECTURES,
} from '../../utils/jp/prefectureData'

const REGION_DIVISIONS = {
  Regions: Object.keys(JP_MAP),
}

export default function JapanPrefecture() {
  return (
    <GeoJsonRegionQuiz
      title="Japan Prefectures Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice all 47 Japanese prefectures. The question pool can be
            adjusted by region, and the map is zoomable and pannable. However, 
            since OpenStreetMap writes the prefecture name so obviously, I
            removed the OSM layer for this test :)
          </p>
          <p className="mt-4">
            Region groups follow broad Japanese regional divisions, with
            Hokkaido included in Tohoku and Okinawa included in Kyushu for this
            quiz.
          </p>
        </div>
      }
      geoJsonUrl="/jpprefecture.geojson"
      items={JP_PREFECTURES}
      getFeatureIds={getJapanPrefectureIds}
      selector={{
        divisions: REGION_DIVISIONS,
        title: 'Select regions',
        menuLabel: 'Region pool',
        searchPlaceholder: 'Find a region...',
      }}
      map={{ center: [36.2, 138.2], zoom: 5, minZoom: 4 }}
      emptyQuestion="Select regions to begin"
      loadErrorMessage="Unable to load the prefecture map."
    />
  )
}
