import { useCallback, useId, useRef, useState } from 'react'
import GeoJsonRegionQuiz from '../../components/GeoJsonRegionQuiz'
import {
  QuizHeaderActionButton,
  QuizHeaderBadge,
} from '../../components/QuizHeader'
import ScriptReferencePanel from '../../components/ScriptReferencePanel'
import { OPEN_STREET_MAP_TILE_LAYER } from '../../utils/geoJsonCodeQuiz'
import {
  getThailandProvinceAbbreviationIds,
  TH_PROVINCE_ABBREVIATIONS,
} from '../../utils/th/provinceAbbreviationData'
import { TH_PROVINCE_ABBREVIATION_SCRIPT_REFERENCE } from '../../utils/th/provinceAbbreviationScriptReference'

export default function ThailandProvinceAbbreviations() {
  const [isReferenceOpen, setIsReferenceOpen] = useState(false)
  const referenceButtonRef = useRef<HTMLButtonElement>(null)
  const referencePanelId = useId()
  const closeReference = useCallback(() => setIsReferenceOpen(false), [])

  return (
    <>
      <GeoJsonRegionQuiz
        title="Thailand Province Abbreviations Quiz"
        infoContent={
          <div className="space-y-3 text-justify">
            <p>
              Practice the two-letter Thai province abbreviations found before
              the route number on provincial-road signs. Bangkok remains visible
              for context but is not part of this 76-province quiz.
            </p>
            <p>
              Be careful not to mistake <span lang="th">กม</span>, the
              abbreviation for kilometre, for a province abbreviation on a
              roadside marker.
            </p>
            <p>
              Abbreviations are based on the{' '}
              <a
                className="font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-4 hover:text-emerald-200"
                href="https://super-duper.fr/country/thailand_provinces_en.php"
                rel="noreferrer"
                target="_blank"
              >
                Super-Duper Thailand province guide
              </a>
              .
            </p>
          </div>
        }
        geoJsonUrl="/country_specific/th/thprovince.geojson"
        items={TH_PROVINCE_ABBREVIATIONS}
        getFeatureIds={getThailandProvinceAbbreviationIds}
        headerActions={
          <>
            <QuizHeaderBadge ariaLabel="76 provinces">
              76 provinces
            </QuizHeaderBadge>
            <QuizHeaderActionButton
              buttonRef={referenceButtonRef}
              aria-controls={referencePanelId}
              aria-expanded={isReferenceOpen}
              aria-haspopup="dialog"
              type="button"
              onClick={() => setIsReferenceOpen(true)}
            >
              Script guide
            </QuizHeaderActionButton>
          </>
        }
        map={{
          center: [13.8, 101],
          zoom: 6,
          minZoom: 5,
          tileLayer: OPEN_STREET_MAP_TILE_LAYER,
        }}
        loadErrorMessage="Unable to load the Thailand province map."
      />
      <ScriptReferencePanel
        isOpen={isReferenceOpen}
        sourceLanguage="th"
        reference={TH_PROVINCE_ABBREVIATION_SCRIPT_REFERENCE}
        panelId={referencePanelId}
        returnFocusRef={referenceButtonRef}
        onClose={closeReference}
      />
    </>
  )
}
