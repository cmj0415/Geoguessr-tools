import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useState, useEffect, useMemo, useRef } from 'react'
import type L from 'leaflet'
import InfoWindow from '../../components/InfoWindow'
import QuizLayout from '../../components/QuizLayout'
import { RangeSelector } from '../../components/RangeSelector'
import { US_CODE_MAP } from '../../utils/us/areaCodeData'

export default function USCodes() {
  const availableCodes = useMemo(
    () =>
      Object.values(US_CODE_MAP)
        .flat()
        .sort((a, b) => Number(a) - Number(b)),
    []
  )

  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    fetch('/map.geojson', { cache: 'no-store' })
      .then((res) => res.json())
      .then(setGeoData)
  }, [])

  /* area styles */
  function defaultStyle() {
    return {
      color: '#2563eb',
      fillColor: '#3b82f6',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.2,
    }
  }

  function hoverStyle() {
    return {
      color: '#0284c7',
      fillColor: '#38bdf8',
      weight: 3,
      fillOpacity: 0.5,
    }
  }

  function correctStyle() {
    return {
      color: '#34d399',
      fillColor: '#34d399',
      weight: 3,
      fillOpacity: 0.5,
    }
  }

  function hintedStyle() {
    return {
      color: '#fbbf24',
      fillColor: '#fbbf24',
      weight: 3,
      fillOpacity: 0.5,
    }
  }

  /* 
    pool: set from selectedCodes
    pickRandomArea: select a question from pool
  */
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(
    () => new Set(availableCodes)
  )

  const pool = useMemo(() => {
    return availableCodes.filter((code) => selectedCodes.has(code))
  }, [availableCodes, selectedCodes])

  function pickRandomArea(pool: string[]) {
    if (pool.length === 0) return null
    const q = pool[Math.floor(Math.random() * pool.length)]
    return q
  }

  /*
    correct: set to current question if clicked correctly
    hinted: set to current question if clicked incorrectly
  */
  const [correct, setCorrect] = useState<string | null>(null)
  const [hinted, setHinted] = useState<string | null>(null)

  const correctRef = useRef<string | null>(null)
  const hintedRef = useRef<string | null>(null)
  useEffect(() => {
    correctRef.current = correct
  }, [correct])
  useEffect(() => {
    hintedRef.current = hinted
  }, [hinted])

  /*
    getCodes: get a string array of codes from "aaa/bbb/ccc" 
    matching: check code is in the array
  */
  const getCodes = (rawCode: any): string[] => {
    if (typeof rawCode === 'string') {
      try {
        return JSON.parse(rawCode).map(String)
      } catch {
        return [rawCode.trim()]
      }
    }
    return [String(rawCode)]
  }
  function matching(code?: string) {
    if (!code || !qref.current) return false
    return getCodes(code).includes(qref.current)
  }

  /* question: current question shown on the question card */
  const [question, setQuestion] = useState<string | null>(pickRandomArea(pool))
  const qref = useRef<string | null>(null)
  useEffect(() => {
    setQuestion(pickRandomArea(pool))
    setCorrect(null)
    setHinted(null)
  }, [pool])

  useEffect(() => {
    qref.current = question
  }, [question])

  /* upon correct area is clicked, wait 500ms and then select new question */
  useEffect(() => {
    if (!correct) return

    const timer = setTimeout(() => {
      setQuestion(pickRandomArea(pool))
      setCorrect(null)
    }, 500)

    return () => clearTimeout(timer)
  }, [correct])

  /* GeoJSON style function */
  const styleByState = (feature: any) => {
    const codes = getCodes(feature.properties.code)
    if (hintedRef.current && codes.includes(hintedRef.current))
      return hintedStyle()
    if (!correct) return defaultStyle()
    if (codes.includes(correct)) return correctStyle()

    return defaultStyle()
  }

  const geoRef = useRef<L.GeoJSON | null>(null)

  const highlightRegionsWithCodes = (rawCode: unknown) => {
    geoRef.current?.eachLayer((candidateLayer) => {
      const path = candidateLayer as L.Path & {
        feature?: { properties?: { code?: unknown } }
      }
      const candidateCode = path.feature?.properties?.code
      if (candidateCode === undefined) return

      const candidateCodes = getCodes(candidateCode)
      if (!(candidateCode === rawCode)) return
      if (correctRef.current && candidateCodes.includes(correctRef.current))
        return

      path.setStyle(hoverStyle())
    })
  }

  useEffect(() => {
    geoRef.current?.setStyle(styleByState)
  }, [correct, hinted])

  return (
    <>
      <QuizLayout
        title="US Area Codes Quiz"
        question={question ?? 'Select code range to begin'}
        selector={
          <RangeSelector
            items={availableCodes}
            min={201}
            max={989}
            defaultRange={[201, 989]}
            onChange={setSelectedCodes}
            title="Select code range"
            menuLabel="Code range"
          />
        }
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        <MapContainer
          center={[37.8, -96]}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
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
                layer.on({
                  mouseover: (e) => {
                    const code = feature.properties.code
                    if (
                      correctRef.current &&
                      getCodes(code).includes(correctRef.current)
                    )
                      return
                    highlightRegionsWithCodes(code)
                  },
                  mouseout: () => {
                    const code = feature.properties.code
                    if (
                      correctRef.current &&
                      getCodes(code).includes(correctRef.current)
                    )
                      return
                    geoRef.current?.setStyle(styleByState)
                  },
                  click: (e) => {
                    const code = feature.properties.code
                    if (matching(code)) {
                      setHinted(null)
                      setCorrect(qref.current)
                    } else {
                      setHinted(qref.current || '')
                    }
                  },
                })
              }}
            />
          )}
        </MapContainer>
      </QuizLayout>
      {isInfoOpen && (
        <InfoWindow
          title={<h2 className="text-center font-bold">US Area Codes Quiz</h2>}
          content={
            <div className="text-justify">
              <p>
                This practice contains every area codes of the US territories,
                including Puerto Rico, Guam, and NMI.
              </p>
              <p className="mt-4">
                You can choose the range of codes that you want to practice.
                This page is still under progress, so not all codes are
                available. It might take me a month or two to draw all the
                divisions lol.
              </p>
            </div>
          }
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  )
}
