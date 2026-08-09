import {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { GeoJsonObject } from 'geojson'
import type L from 'leaflet'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'
import {
  GEO_JSON_CORRECT_STYLE,
  GEO_JSON_DEFAULT_STYLE,
  GEO_JSON_HINTED_STYLE,
  GEO_JSON_HOVER_STYLE,
  getFeatureGroupKey,
  isGeoJsonObject,
  pickRandomItem,
} from '../utils/geoJsonCodeQuiz'
import InfoWindow from './InfoWindow'
import QuizLayout from './QuizLayout'

export type GeoJsonQuizItem = {
  id: string
  label: string
}

export type GeoJsonTileLayer = {
  url: string
  attribution: string
}

export type GeoJsonQuizMapConfiguration = {
  center: L.LatLngExpression
  zoom: number
  minZoom?: number
  tileLayer?: GeoJsonTileLayer | false
}

export type GeoJsonQuizSelectorProps = {
  onSelectionChange?: (selectedIds: Set<string>) => void
}

type GeoJsonQuizProps = {
  title: string
  infoContent: ReactNode
  geoJsonUrl: string
  cache?: RequestCache
  items: GeoJsonQuizItem[]
  getFeatureIds: (feature: unknown) => string[]
  map: GeoJsonQuizMapConfiguration
  selector?: ReactElement<GeoJsonQuizSelectorProps>
  emptyQuestion: string
  loadErrorMessage: string
}

export default function GeoJsonQuiz({
  title,
  infoContent,
  geoJsonUrl,
  cache,
  items,
  getFeatureIds,
  map,
  selector,
  emptyQuestion,
  loadErrorMessage,
}: GeoJsonQuizProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(items.map((item) => item.id))
  )
  const pool = useMemo(
    () => items.filter((item) => selectedIds.has(item.id)),
    [items, selectedIds]
  )
  const [question, setQuestion] = useState<GeoJsonQuizItem | null>(() =>
    pickRandomItem(items)
  )
  const [correctId, setCorrectId] = useState<string | null>(null)
  const [hintedId, setHintedId] = useState<string | null>(null)
  const questionRef = useRef(question)
  const correctIdRef = useRef(correctId)
  const hintedIdRef = useRef(hintedId)
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
    correctIdRef.current = correctId
  }, [correctId])

  useEffect(() => {
    hintedIdRef.current = hintedId
  }, [hintedId])

  useEffect(() => {
    if (!correctId) return

    const timer = setTimeout(() => {
      setQuestion(pickRandomItem(pool))
      setCorrectId(null)
      correctIdRef.current = null
    }, 500)

    return () => clearTimeout(timer)
  }, [correctId, pool])

  const styleByState = useCallback(
    (feature?: unknown) => {
      const featureIds = getFeatureIds(feature)
      if (hintedId && featureIds.includes(hintedId))
        return GEO_JSON_HINTED_STYLE
      if (correctId && featureIds.includes(correctId))
        return GEO_JSON_CORRECT_STYLE
      return GEO_JSON_DEFAULT_STYLE
    },
    [correctId, getFeatureIds, hintedId]
  )

  useEffect(() => {
    geoRef.current?.setStyle(styleByState)
  }, [styleByState])

  function handleSelectionChange(nextIds: Set<string>) {
    const nextPool = items.filter((item) => nextIds.has(item.id))
    setSelectedIds(nextIds)
    setQuestion(pickRandomItem(nextPool))
    setCorrectId(null)
    setHintedId(null)
  }

  function restoreCurrentStyles() {
    geoRef.current?.setStyle((feature) => {
      const featureIds = getFeatureIds(feature)
      if (hintedIdRef.current && featureIds.includes(hintedIdRef.current))
        return GEO_JSON_HINTED_STYLE
      if (correctIdRef.current && featureIds.includes(correctIdRef.current))
        return GEO_JSON_CORRECT_STYLE
      return GEO_JSON_DEFAULT_STYLE
    })
  }

  function highlightFeatureGroup(featureIds: string[]) {
    const groupKey = getFeatureGroupKey(featureIds)

    geoRef.current?.eachLayer((candidateLayer) => {
      const path = candidateLayer as L.Path & { feature?: unknown }
      const candidateIds = getFeatureIds(path.feature)
      if (getFeatureGroupKey(candidateIds) !== groupKey) return
      if (correctIdRef.current && candidateIds.includes(correctIdRef.current))
        return

      path.setStyle(GEO_JSON_HOVER_STYLE)
    })
  }

  function handleFeatureClick(featureIds: string[]) {
    const currentQuestion = questionRef.current
    if (!currentQuestion) return

    const hadHint = hintedIdRef.current !== null
    if (hadHint) {
      hintedIdRef.current = null
      setHintedId(null)
    }

    if (featureIds.includes(currentQuestion.id)) {
      correctIdRef.current = currentQuestion.id
      setCorrectId(currentQuestion.id)
    } else if (!hadHint) {
      hintedIdRef.current = currentQuestion.id
      setHintedId(currentQuestion.id)
    }
  }

  const selectorContent = selector
    ? cloneElement(selector, { onSelectionChange: handleSelectionChange })
    : undefined

  return (
    <>
      <QuizLayout
        title={title}
        question={question?.label ?? emptyQuestion}
        selector={selectorContent}
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        <MapContainer
          center={map.center}
          zoom={map.zoom}
          minZoom={map.minZoom}
          scrollWheelZoom
          className="h-full w-full !bg-slate-900"
        >
          {map.tileLayer && (
            <TileLayer
              attribution={map.tileLayer.attribution}
              url={map.tileLayer.url}
            />
          )}
          {geoData && (
            <GeoJSON
              data={geoData}
              ref={geoRef}
              style={styleByState}
              onEachFeature={(feature, layer) => {
                const featureIds = getFeatureIds(feature)
                if (featureIds.length === 0) return

                layer.on({
                  mouseover: () => highlightFeatureGroup(featureIds),
                  mouseout: restoreCurrentStyles,
                  click: () => handleFeatureClick(featureIds),
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
