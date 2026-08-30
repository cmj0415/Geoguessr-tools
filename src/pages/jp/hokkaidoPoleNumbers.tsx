import type L from 'leaflet'
import PoleNumberMap from '../../components/PoleNumberMap'
import PoleNumberQuiz from '../../components/PoleNumberQuiz'
import {
  getHokkaidoPoleGridGeometry,
  parseHokkaidoPoleQuestionPool,
} from '../../utils/jp/poleNumbers'

const HOKKAIDO_PLAY_BOUNDS: L.LatLngBoundsExpression = [
  [41.2, 139.15],
  [45.7, 146],
]

export default function HokkaidoPoleNumbers() {
  return (
    <PoleNumberQuiz
      title="Hokkaido Pole Number Quiz"
      infoTitle="Hokkaido Pole Numbers"
      poolUrl="/jp-hokkaido-pole-number/cells.json"
      parsePool={parseHokkaidoPoleQuestionPool}
      getGeometry={getHokkaidoPoleGridGeometry}
      renderMap={(props) => (
        <PoleNumberMap
          {...props}
          bounds={HOKKAIDO_PLAY_BOUNDS}
          minZoom={5}
        />
      )}
      infoContent={
        <div className="space-y-4 text-justify">
          <p>
            Each question combines the small two-digit 画 and 区 numbers at the
            top of a Hokkaido Electric Power pole plate. For example, 53画 and
            07区 appear here as 5307.
          </p>
          <p>
            The first two digits select an approximately 80 × 80 kilometer
            block. The last two divide that block into an 8 × 8 grid, producing
            an answer cell of roughly 10 × 10 kilometers.
          </p>
          <p>
            Place a marker, adjust it if needed, and press Submit. Accuracy is
            100 × e<sup>−distance / 50 km</sup>. Overall uses every answer from
            this visit, while Session uses the latest five.
          </p>
          <p>
            The 999-question pool includes cells touching Hokkaido proper,
            Rishiri, Rebun, Okushiri, and nearby western islands. The Northern
            Territories are excluded. Coastal cells remain eligible even when
            their centers lie offshore.
          </p>
          <p>
            Plate formatting follows{' '}
            <a
              href="https://www.hepco.co.jp/network/electric_life/service/location_info/index.html"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-2 hover:text-emerald-200"
            >
              Hokkaido Electric Power Network
            </a>
            . Grid calculations and Tokyo Datum conversion follow the{' '}
            <a
              href="https://haiden.x0.com/denkangikyo/technical/pole-number-calc.php"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-2 hover:text-emerald-200"
            >
              Hokkaido pole-number conversion reference
            </a>
            .
          </p>
        </div>
      }
    />
  )
}
