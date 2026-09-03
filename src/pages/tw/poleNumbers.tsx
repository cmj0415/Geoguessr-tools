import PoleNumberQuiz from '../../components/PoleNumberQuiz'
import TaiwanPoleNumberMap from '../../components/TaiwanPoleNumberMap'
import {
  getPoleGridGeometry,
  parsePoleQuestionPool,
} from '../../utils/tw/poleNumbers'

export default function TaiwanPoleNumbers() {
  return (
    <PoleNumberQuiz
      title="Taiwan Pole Number Quiz"
      infoTitle="Taiwan Pole Numbers"
      poolUrl="/country_specific/tw/tw-pole-number/cells.json"
      parsePool={parsePoleQuestionPool}
      getGeometry={getPoleGridGeometry}
      renderMap={(props) => <TaiwanPoleNumberMap {...props} />}
      infoContent={
        <div className="space-y-4 text-justify">
          <p>
            Each question identifies an 800 × 500 meter Taiwan Power Company
            grid cell. Place a marker, adjust it if needed, and press Submit to
            lock your answer.
          </p>
          <p>
            The first letter selects an 80 × 50 kilometer sector. The first
            digit pair moves east in 800 meter steps, and the second moves north
            in 500 meter steps. The optional map layer marks the sector origins.
          </p>
          <p>
            Accuracy is 100 × e<sup>−distance / 50 km</sup>. Overall uses every
            answer from this visit, while Session uses the latest five. Coastal
            cells are included when any part overlaps land, so a few cell
            centres lie offshore.
          </p>
          <p>
            Grid conversion follows the TWD67-based Taiwan Power Company
            system. Land filtering uses county boundaries published by
            Taiwan&apos;s{' '}
            <a
              href="https://maps.nlsc.gov.tw/pro/download.jsp"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-2 hover:text-emerald-200"
            >
              National Land Surveying and Mapping Center
            </a>
            . Grid definitions follow the{' '}
            <a
              href="https://wiki.osgeo.org/wiki/Taiwan_Power_Company_grid"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-2 hover:text-emerald-200"
            >
              OSGeo reference
            </a>
            .
          </p>
        </div>
      }
    />
  )
}
