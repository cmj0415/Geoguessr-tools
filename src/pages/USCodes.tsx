import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { useState, useEffect, useMemo, useRef } from 'react'
import type L from 'leaflet'
import QuestionCard from '../components/QuestionCard'
import Button from '../components/Button'
import InfoButton from '../components/InfoButton'
import InfoWindow from '../components/InfoWindow'
import { US_CODE_MAP } from '../utils/USAreaCodeData'

export default function USCodes() {
  const divs: Record<string, string[]> = {
    Ranges: ['200s', '300s', '400s', '500s', '600s', '700s', '800s', '900s'],
  }
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    fetch('/map.geojson')
      .then((res) => res.json())
      .then(setGeoData)
  }, [])

  function defaultStyle() {
    return {
      color: '#0000ff',
      fillColor: '#0000ff',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.2,
    }
  }

  function hoverStyle() {
    return {
      color: '#0000ff',
      fillColor: '#0000ff',
      weight: 3,
      fillOpacity: 0.5,
    }
  }

  function correctStyle() {
    return {
      color: '#00ff00',
      fillColor: '#00ff00',
      weight: 3,
      fillOpacity: 0.5,
    }
  }

  function revisedStyle() {
    return {
      color: '#ff0000',
      fillColor: '#ff0000',
      weight: 3,
      fillOpacity: 0.5,
    }
  }

  function hintedStyle() {
    return {
      color: '#ffff00',
      fillColor: '#ffff00',
      weight: 3,
      fillOpacity: 0.5,
    }
  }

  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(
    () => new Set(Object.keys(US_CODE_MAP))
  )

  const pool = useMemo(() => {
    const out: string[] = []
    for (const p of selectedGroups) {
      for (const r of US_CODE_MAP[p]) out.push(r)
    }
    return out
  }, [selectedGroups])

  const [correct, setCorrect] = useState<Set<string>>(new Set())
  const [revised, setRevised] = useState<Set<string>>(new Set())
  const [hinted, setHinted] = useState<string | null>(null)

  const correctRef = useRef<Set<string>>(new Set())
  const revisedRef = useRef<Set<string>>(new Set())
  const hintedRef = useRef<string | null>(null)
  useEffect(() => {
    correctRef.current = correct
  }, [correct])
  useEffect(() => {
    revisedRef.current = revised
  }, [revised])
  useEffect(() => {
    hintedRef.current = hinted
  }, [hinted])

  function pickRandomArea(
    pool: string[],
    correct: Set<string>,
    revised: Set<string>
  ) {
    const candidates = pool.filter((e) => !correct.has(e) && !revised.has(e))
    if (candidates.length == 0) return null
    const q = candidates[Math.floor(Math.random() * candidates.length)]
    return q
  }

  function matching(code?: string) {
    if (!code) return false
    const arr = JSON.parse(code)
    return arr.includes(Number(qref.current))
  }

  const [question, setQuestion] = useState<string | null>(null)
  const qref = useRef<string | null>(null)

  const onRestartClicked = () => {
    const emptyCorrect = new Set<string>()
    const emptyRevised = new Set<string>()
    setCorrect(emptyCorrect)
    setRevised(emptyRevised)
    setHinted(null)
    setQuestion(pickRandomArea(pool, emptyCorrect, emptyRevised))
  }

  useEffect(() => {
    qref.current = question
  }, [question])

  const getCodes = (rawCode: any): string[] => {
  if (typeof rawCode === "string") {
    try {
      return JSON.parse(rawCode).map(String)
    } catch {
      return [rawCode.trim()]
    }
  }
  return [String(rawCode)]
}

const styleByState = (feature: any) => {
  const codes = getCodes(feature.properties.code)

  if (codes.some((c) => correctRef.current.has(c))) return correctStyle()
  if (codes.some((c) => revisedRef.current.has(c))) return revisedStyle()
  if (hintedRef.current && codes.includes(hintedRef.current)) return hintedStyle()

  return defaultStyle()
}

  const geoRef = useRef<L.GeoJSON | null>(null)
  useEffect(() => {
    geoRef.current?.setStyle(styleByState)
  }, [correct, revised, hinted])

  return (
    <div className="relative min-h-screen bg-slate-900">
      <header className="relative">
        <h1 className="text-4xl font-bold pt-4 mb-4">US Area Codes Quiz</h1>
        <InfoButton active={isInfoOpen} onClick={() => setIsInfoOpen(true)} />
      </header>
      <QuestionCard target={question} />
      <Button
        className="
                bg-slate-900 border border-fuchsia-900 rounded-2xl
                max-w-4xl inline-block ml-4 px-4 py-2
                hover:bg-fuchsia-900
                "
        content="Restart"
        onClick={onRestartClicked}
      />
      <div className="mt-16 mx-auto w-full max-w-4xl max-h-[70vh] border-2 z-0">
        <MapContainer
          center={[37.8, -96]}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: '70vh' }}
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
                      correctRef.current.has(code) ||
                      revisedRef.current.has(code)
                    )
                      return
                    e.target.setStyle(hoverStyle())
                  },
                  mouseout: (e) => {
                    const code = feature.properties.code
                    if (
                      correctRef.current.has(code) ||
                      revisedRef.current.has(code)
                    )
                      return
                    geoRef.current?.resetStyle(e.target)
                  },
                  click: (e) => {
                    const code = feature.properties.code
                    if (matching(code)) {
                      setQuestion(pickRandomArea(pool, correctRef.current, revisedRef.current))
                      if (hintedRef.current === qref.current) {
                        setHinted(null)
                        setRevised((prev) => {
                          const next = new Set(prev)
                          next.add(qref.current || '')
                          return next
                        })
                      } else {
                        setCorrect((prev) => {
                          const next = new Set(prev)
                          next.add(qref.current || '')
                          return next
                        })
                      }
                    } else {
                      setHinted(qref.current || '')
                    }
                  },
                })
              }}
            />
          )}
        </MapContainer>
      </div>
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
    </div>
  )
}
