import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { GeoJsonObject } from 'geojson'
import type L from 'leaflet'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'
import {
  GEO_JSON_CORRECT_STYLE,
  GEO_JSON_DEFAULT_STYLE,
  GEO_JSON_HINTED_STYLE,
  GEO_JSON_HOVER_STYLE,
  getCodeGroupKey,
  isGeoJsonObject,
  pickRandomCode,
} from '../utils/geoJsonCodeQuiz'
import InfoWindow from './InfoWindow'
import QuizLayout from './QuizLayout'
import { RangeSelector } from './RangeSelector'

type RangeConfiguration = {
  min: number
  max: number
  defaultRange?: [number, number]
  title: string
  menuLabel: string
  formatValue?: (value: number) => string
}

type MapConfiguration = {
  center: L.LatLngExpression
  zoom: number
  minZoom?: number
}

type GeoJsonCodeQuizProps = {
  title: string
  infoContent: ReactNode
  geoJsonUrl: string
  cache?: RequestCache
  availableCodes: string[]
  getFeatureCodes: (feature: unknown) => string[]
  range: RangeConfiguration
  map: MapConfiguration
  emptyQuestion?: string
  loadErrorMessage?: string
}

export default function GeoJsonCodeQuiz({
  title,
  infoContent,
  geoJsonUrl,
  cache,
  availableCodes,
  getFeatureCodes,
  range,
  map,
  emptyQuestion = 'Select code range to begin',
  loadErrorMessage = 'Unable to load the code map.',
}: GeoJsonCodeQuizProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(
    () => new Set(availableCodes)
  )
  const pool = useMemo(
    () => availableCodes.filter((code) => selectedCodes.has(code)),
    [availableCodes, selectedCodes]
  )
  const [question, setQuestion] = useState<string | null>(() =>
    pickRandomCode(availableCodes)
  )
  const [correct, setCorrect] = useState<string | null>(null)
  const [hinted, setHinted] = useState<string | null>(null)
  const questionRef = useRef(question)
  const correctRef = useRef(correct)
  const hintedRef = useRef(hinted)
  const geoRef = useRef<L.GeoJSON | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(geoJsonUrl, { cache, signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${geoJsonUrl}`)
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
  }, [cache, geoJsonUrl])

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
      const codes = getFeatureCodes(feature)
      if (hinted && codes.includes(hinted)) return GEO_JSON_HINTED_STYLE
      if (correct && codes.includes(correct)) return GEO_JSON_CORRECT_STYLE
      return GEO_JSON_DEFAULT_STYLE
    },
    [correct, getFeatureCodes, hinted]
  )

  useEffect(() => {
    geoRef.current?.setStyle(styleByState)
  }, [styleByState])

  function handleRangeChange(nextCodes: Set<string>) {
    const nextPool = availableCodes.filter((code) => nextCodes.has(code))
    setSelectedCodes(nextCodes)
    setQuestion(pickRandomCode(nextPool))
    setCorrect(null)
    correctRef.current = null
    setHinted(null)
    hintedRef.current = null
  }

  function restoreCurrentStyles() {
    geoRef.current?.setStyle((feature) => {
      const codes = getFeatureCodes(feature)
      if (hintedRef.current && codes.includes(hintedRef.current))
        return GEO_JSON_HINTED_STYLE
      if (correctRef.current && codes.includes(correctRef.current))
        return GEO_JSON_CORRECT_STYLE
      return GEO_JSON_DEFAULT_STYLE
    })
  }

  function highlightFeatureGroup(codes: string[]) {
    const groupKey = getCodeGroupKey(codes)

    geoRef.current?.eachLayer((candidateLayer) => {
      const path = candidateLayer as L.Path & { feature?: unknown }
      const candidateCodes = getFeatureCodes(path.feature)
      if (getCodeGroupKey(candidateCodes) !== groupKey) return
      if (correctRef.current && candidateCodes.includes(correctRef.current))
        return

      path.setStyle(GEO_JSON_HOVER_STYLE)
    })
  }

  function handleFeatureClick(codes: string[]) {
    const currentQuestion = questionRef.current
    if (!currentQuestion) return

    const hadHint = hintedRef.current !== null
    if (hadHint) {
      hintedRef.current = null
      setHinted(null)
    }

    if (codes.includes(currentQuestion)) {
      correctRef.current = currentQuestion
      setCorrect(currentQuestion)
    } else if (!hadHint) {
      hintedRef.current = currentQuestion
      setHinted(currentQuestion)
    }
  }

  return (
    <>
      <QuizLayout
        title={title}
        question={question ?? emptyQuestion}
        selector={
          <RangeSelector
            items={availableCodes}
            min={range.min}
            max={range.max}
            defaultRange={range.defaultRange ?? [range.min, range.max]}
            onChange={handleRangeChange}
            title={range.title}
            menuLabel={range.menuLabel}
            formatValue={range.formatValue}
          />
        }
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        <MapContainer
          center={map.center}
          zoom={map.zoom}
          minZoom={map.minZoom}
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
                const codes = getFeatureCodes(feature)
                if (codes.length === 0) return

                layer.on({
                  mouseover: () => highlightFeatureGroup(codes),
                  mouseout: restoreCurrentStyles,
                  click: () => handleFeatureClick(codes),
                })
              }}
            />
          )}
        </MapContainer>
        {!geoData && (
          <div className="pointer-events-none absolute inset-0 z-[900] flex items-center justify-center bg-slate-950/45 backdrop-blur-sm">
            <p className="rounded-xl border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-300 shadow-xl">
              {loadError ? loadErrorMessage : 'Loading map…'}
            </p>
          </div>
        )}
      </QuizLayout>
      {isInfoOpen && (
        <InfoWindow
          title={<h2 className="text-center font-bold">{title}</h2>}
          content={infoContent}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  )
}
