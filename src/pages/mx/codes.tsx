import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GeoJsonObject } from 'geojson'
import type L from 'leaflet'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'
import InfoWindow from '../../components/InfoWindow'
import QuizLayout from '../../components/QuizLayout'
import { RangeSelector } from '../../components/RangeSelector'
import {
  AVAILABLE_CODES,
  CORRECT_STYLE,
  DEFAULT_STYLE,
  getFeatureCode,
  HINTED_STYLE,
  HOVER_STYLE,
  formatCode,
  isGeoJsonObject,
  pickRandomCode,
} from '../../utils/mx/codeData'

export default function MexicoCodes() {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(
    () => new Set(AVAILABLE_CODES)
  )
  const pool = useMemo(
    () => AVAILABLE_CODES.filter((code) => selectedCodes.has(code)),
    [selectedCodes]
  )
  const [question, setQuestion] = useState<string | null>(() =>
    pickRandomCode(AVAILABLE_CODES)
  )
  const [correct, setCorrect] = useState<string | null>(null)
  const [hinted, setHinted] = useState<string | null>(null)
  const questionRef = useRef(question)
  const correctRef = useRef(correct)
  const hintedRef = useRef(hinted)
  const geoRef = useRef<L.GeoJSON | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/mxzip.geojson', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load Mexico postal codes')
        return response.json() as Promise<unknown>
      })
      .then((data) => {
        if (!isGeoJsonObject(data)) throw new Error('Invalid GeoJSON data')
        setGeoData(data)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadError(true)
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    questionRef.current = question
  }, [question])

  useEffect(() => {
    correctRef.current = correct
  }, [correct])

  useEffect(() => {
    hintedRef.current = hinted
  }, [hinted])

  useEffect(() => {
    if (!correct) return
    const timer = setTimeout(() => {
      setQuestion(pickRandomCode(pool))
      setCorrect(null)
      correctRef.current = null
    }, 500)
    return () => clearTimeout(timer)
  }, [correct, pool])

  const styleByState = useCallback(
    (feature?: unknown) => {
      const code = getFeatureCode(feature)
      if (hinted && code === hinted) return HINTED_STYLE
      if (correct && code === correct) return CORRECT_STYLE
      return DEFAULT_STYLE
    },
    [correct, hinted]
  )

  useEffect(() => {
    geoRef.current?.setStyle(styleByState)
  }, [styleByState])

  function handleRangeChange(nextCodes: Set<string>) {
    const nextPool = AVAILABLE_CODES.filter((code) => nextCodes.has(code))
    setSelectedCodes(nextCodes)
    setQuestion(pickRandomCode(nextPool))
    setCorrect(null)
    correctRef.current = null
    setHinted(null)
    hintedRef.current = null
  }

  function restoreCurrentStyles() {
    geoRef.current?.setStyle((feature) => {
      const code = getFeatureCode(feature)
      if (hintedRef.current && code === hintedRef.current) return HINTED_STYLE
      if (correctRef.current && code === correctRef.current)
        return CORRECT_STYLE
      return DEFAULT_STYLE
    })
  }

  function highlightCode(code: string) {
    geoRef.current?.eachLayer((candidateLayer) => {
      const path = candidateLayer as L.Path & { feature?: unknown }
      if (getFeatureCode(path.feature) !== code || correctRef.current === code)
        return
      path.setStyle(HOVER_STYLE)
    })
  }

  return (
    <>
      <QuizLayout
        title="Mexico Postal Codes Quiz"
        question={question ?? 'Select a code range to begin'}
        selector={
          <RangeSelector
            items={AVAILABLE_CODES}
            min={1}
            max={99}
            defaultRange={[1, 99]}
            onChange={handleRangeChange}
            title="Select postal code range"
            menuLabel="Code range"
            formatValue={formatCode}
          />
        }
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        <MapContainer
          center={[23.6, -102.5]}
          zoom={5}
          minZoom={4}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geoData && (
            <GeoJSON
              data={geoData}
              ref={geoRef}
              style={styleByState}
              onEachFeature={(feature, layer) => {
                const code = getFeatureCode(feature)
                if (!code) return
                layer.on({
                  mouseover: () => highlightCode(code),
                  mouseout: restoreCurrentStyles,
                  click: () => {
                    const hadHint = hintedRef.current !== null
                    if (hadHint) {
                      hintedRef.current = null
                      setHinted(null)
                    }

                    if (code === questionRef.current) {
                      correctRef.current = code
                      setCorrect(code)
                    } else if (!hadHint) {
                      hintedRef.current = questionRef.current
                      setHinted(questionRef.current)
                    }
                  },
                })
              }}
            />
          )}
        </MapContainer>
        {!geoData && (
          <div className="pointer-events-none absolute inset-0 z-[900] flex items-center justify-center bg-slate-950/45 backdrop-blur-sm">
            <p className="rounded-xl border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-300 shadow-xl">
              {loadError
                ? 'Unable to load the postal code map.'
                : 'Loading map…'}
            </p>
          </div>
        )}
      </QuizLayout>
      {isInfoOpen && (
        <InfoWindow
          title={<h2>Mexico Postal Codes Quiz</h2>}
          content={
            <div>
              <p>
                Practice the first two digits of Mexican postal codes by
                selecting the matching region on the map.
              </p>
              <p className="mt-4">
                Use the range selector to focus the question pool. Codes 17, 18,
                and 19 are not present in the supplied map data.
              </p>
            </div>
          }
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  )
}
