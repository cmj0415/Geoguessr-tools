import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { useState, useEffect, useMemo, useRef } from 'react'
import type L from 'leaflet'
import QuestionCard from "../components/QuestionCard"
import InfoButton from "../components/InfoButton"
import InfoWindow from "../components/InfoWindow"
import { US_CODE_MAP } from "../utils/USAreaCodeData"

export default function USCodes() {
    const divs: Record<string, string[]> = {
        "Ranges": ["200s", "300s", "400s", "500s", "600s", "700s", "800s", "900s"]
    }
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [geoData, setGeoData] = useState(null)

    useEffect(() => {
        fetch('/public/map.geojson')
            .then(res => res.json())
            .then(setGeoData)
    }, [])

    function defaultStyle() {
        return {
            color: '#0000ff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.2
        };
    }

    function hoverStyle() {
        return {
            color: '#0000ff',
            weight: 3,
            fillOpacity: 0.5
        };
    }

    function correctStyle() {
        return {
            color: '#00ff00',
            weight: 3,
            fillOpacity: 0.5
        }
    }

    function wrongStyle() {
        return {
            color: '#ff0000',
            weight: 3,
            fillOpacity: 0.5
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

    function pickRandomArea(pool: string[]) {
        console.log("called")
        if (pool.length == 0) return null
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
    const [result, setResult] = useState<"correct" | "wrong" | null>(null)
    const [highlightCode, setHighlightCode] = useState<string | null>(null)
    const [highlightKind, setHighlightKind] = useState<"correct" | "wrong" | null>(null)

    useEffect(() => {
        console.log("pool changed")
        setQuestion(pickRandomArea(pool))
    }, [pool])

    useEffect(() => {
        qref.current = question
    }, [question])

    useEffect(() => {
        if (!result) return

        const timer = setTimeout(() => {
            if (result === "correct") {
                setQuestion(pickRandomArea(pool))
            }
            setResult(null)
            setHighlightCode(null)
            setHighlightKind(null)
        }, 250)

        return () => clearTimeout(timer)
    }, [result, pool])

    const styleByState = (feature: any) => {
        const code = feature.properties.code

        if (highlightCode && code === highlightCode) {
            if (highlightKind === "correct") return correctStyle()
            if (highlightKind === "wrong") return wrongStyle()
        }

        return defaultStyle()
    }

    const geoRef = useRef<L.GeoJSON | null>(null)
    useEffect(() => {
        geoRef.current?.resetStyle()
    }, [highlightCode, highlightKind])

    return (
        <div className="relative min-h-screen bg-slate-900">
            <header className="relative">
                <h1 className="text-4xl font-bold pt-4 mb-4">US Area Codes Quiz</h1>
                <InfoButton active={isInfoOpen} onClick={ (() => setIsInfoOpen(true)) } />
            </header>
            <QuestionCard target={ question }/>
            <div className="mt-16 mx-auto w-full max-w-4xl max-h-[70vh] border-2 z-0">
                <MapContainer center={[37.8, -96]} zoom={4} scrollWheelZoom={true} style={{ height: '70vh' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {geoData && (
                        <GeoJSON data={geoData} 
                            ref={geoRef}
                            style={ styleByState }
                            onEachFeature={(feature, layer) => {
                                layer.on({
                                    mouseover: e => {
                                        if (highlightCode && feature.properties.code === highlightCode) return
                                        e.target.setStyle(hoverStyle())
                                    },
                                    mouseout: e => {
                                        if (highlightCode && feature.properties.code === highlightCode) return
                                        geoRef.current?.resetStyle(e.target)
                                    },
                                    click: e => {
                                        const code = feature.properties.code
                                        if (matching(code)) {
                                            setHighlightCode(code)
                                            setHighlightKind("correct")
                                            setResult("correct")
                                        } else {
                                            setHighlightCode(code)
                                            setHighlightKind("wrong")
                                            setResult("wrong")
                                        }
                                    }
                                })
                            }}
                        />
                    )}
                </MapContainer>
            </div>
            { isInfoOpen && <InfoWindow 
                title={
                    <h2 className="text-center font-bold">US Area Codes Quiz</h2>
                }
                content={
                    <div className="text-justify">
                        <p>
                            This practice contains every area codes of the US territories, including Puerto Rico, Guam, and NMI.
                        </p>
                        <p className="mt-4">
                            You can choose the range of codes that you want to practice. This page is still under progress, so not all codes are available. It might take me a month or two to draw all the divisions lol. 
                        </p>
                    </div>
                } 
                onClose={ (() => setIsInfoOpen(false)) }
            />}
        </div>
    )
}