import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { useState, useEffect, useMemo, useRef } from 'react'
import type L from 'leaflet'
import QuestionCard from '../components/QuestionCard'
import Button from '../components/Button'
import InfoButton from '../components/InfoButton'
import InfoWindow from '../components/InfoWindow'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
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

  function pickRandomArea(pool: string[]) {
    const q = pool[Math.floor(Math.random() * pool.length)]
    return q
  }

  function matching(code?: string) {
    if (!code) return false
    const arr = JSON.parse(code)
    return arr.includes(Number(qref.current))
  }

  const [question, setQuestion] = useState<string | null>(null)
  const qref = useRef<string | null>(null)
  useEffect(() => {
    setQuestion(pickRandomArea(pool))
  }, [])

  useEffect(() => {
    qref.current = question
  }, [question])

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

  useEffect(() => {
    if (!correct) return

    const timer = setTimeout(() => {
      setQuestion(pickRandomArea(pool))
      setCorrect(null)
    }, 500)

    return () => clearTimeout(timer)
  }, [correct])

  const styleByState = (feature: any) => {
    const codes = getCodes(feature.properties.code)
    if (hintedRef.current && codes.includes(hintedRef.current))
      return hintedStyle()
    if (!correct) return defaultStyle()
    if (codes.includes(correct)) return correctStyle()

    return defaultStyle()
  }

  const geoRef = useRef<L.GeoJSON | null>(null)
  useEffect(() => {
    geoRef.current?.setStyle(styleByState)
  }, [correct, hinted])

  return (
    <div className="relative min-h-screen bg-slate-900">
      <header className="relative">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mx-4">
          <div />
          <h1 className="text-4xl font-bold pt-4 mb-4">US Area Codes Quiz</h1>
          <div className="justify-self-end">
            <InfoButton
              active={isInfoOpen}
              onClick={() => setIsInfoOpen(true)}
            />
          </div>
        </div>
      </header>
      <QuestionCard target={question} />
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
                      correctRef.current &&
                      getCodes(code).includes(correctRef.current)
                    )
                      return
                    e.target.setStyle(hoverStyle())
                  },
                  mouseout: (e) => {
                    const code = feature.properties.code
                    if (
                      correctRef.current &&
                      getCodes(code).includes(correctRef.current)
                    )
                      return
                    geoRef.current?.resetStyle(e.target)
                  },
                  click: (e) => {
                    const code = feature.properties.code
                    if (matching(code)) {
                      setQuestion(pickRandomArea(pool))
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
