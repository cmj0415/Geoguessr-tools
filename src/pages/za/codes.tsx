import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getSouthAfricaFeatureCodes,
  ZA_AREA_CODES,
} from '../../utils/za/codeData'

export default function SouthAfricaCodes() {
  return (
    <GeoJsonRegionQuiz
      title="South Africa Area Codes Quiz"
      infoContent={
        <div className="text-justify">
          <p>
            Practice the 36 geographic telephone area codes represented on the
            supplied map of South Africa. The map is made by me joining and 
            splitting the municipalities by hand, so it could be somewhat 
            inaccurate, but it should still be a decent map.
          </p>
          <p className="mt-4">
            Codes 010 and 011 overlap in the Johannesburg region. Also I have to 
            note that 040 is not presented in the map because it's too weird and 
            you're probably not going to encounter any once in real game.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Sources:{' '}
            <a
              className="underline hover:text-slate-200"
              href="https://www.icasa.org.za/pages/numbering"
              target="_blank"
              rel="noreferrer"
            >
              ICASA
            </a>
            ,{' '}
            <a
              className="underline hover:text-slate-200"
              href="https://www.myza.co.za/press/about/dialing-codes/"
              target="_blank"
              rel="noreferrer"
            >
              MyZA dialing codes
            </a>
            .
          </p>
        </div>
      }
      geoJsonUrl="/country_specific/za/zacode.geojson"
      items={ZA_AREA_CODES}
      getFeatureIds={getSouthAfricaFeatureCodes}
      map={{
        center: [-30.6, 24.3],
        zoom: 5,
        minZoom: 4,
        tileLayer: OPEN_STREET_MAP_TILE_LAYER,
      }}
      loadErrorMessage="Unable to load the South Africa area code map."
    />
  )
}
