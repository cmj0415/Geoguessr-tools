import React from "react"
import IndonesiaMap from '../assets/id-kab-map.svg?react'
import QuestionCard from "../components/QuestionCard"
import InfoButton from "../components/InfoButton"
import InfoWindow from "../components/InfoWindow"
import { QuestionSelector } from "../components/QuestionSelector"
import { useRef, useEffect, useState, useMemo } from 'react'
import { ID_MAP } from "../utils/IDRegencyData"
import type { Regency, ProvinceData } from "../utils/IDRegencyData"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

export default function IndonesiaRegencies() {
    const divs: Record<string, string[]> = {
        "Sumatra": ["Aceh", "North Sumatra", "West Sumatra", "Riau", "Jambi", "Bengkulu", "South Sumatra", "Lampung", "Bangka Belitung Islands", "Riau Islands"],
        "Kalimantan": ["West Kalimantan", "Central Kalimantan", "South Kalimantan", "East Kalimantan", "North Kalimantan"],
        "Java": ["Banten", "Jakarta", "West Java", "Yogyakarta", "Central Java", "East Java"],
        "Sulawesi": ["North Sulawesi", "Gorontalo", "Central Sulawesi", "West Sulawesi", "South Sulawesi", "Southeast Sulawesi"],
        "Lesser Sunda Islands": ["Bali", "West Nusa Tenggara", "East Nusa Tenggara"],
        "Maluku Islands": ["Maluku", "North Maluku"],
        "Western New Guinea": ["West Papua", "Papua", "Highland Papua", "South Papua", "Central Papua", "Southwest Papua"]
    }
    const svgRef = useRef<SVGSVGElement>(null)

    const [selectedProvinces, setSelectedProvinces] = useState<Set<string>>(
        () => new Set(Object.keys(ID_MAP))
    )

    const pool = useMemo(() => {
        const out: Regency[] = []
        for (const p of selectedProvinces) {
            for (const r of ID_MAP[p] ?? []) out.push({ province: p, name: r })
        }
        return out
    }, [selectedProvinces])

    useEffect(() => {
        setQuestion(pickRandomRegency(pool))
    }, [pool])

    function pickRandomRegency(pool: Regency[]) {
        if (pool.length == 0) return null
        return pool[Math.floor(Math.random() * pool.length)]
    }

    const [question, setQuestion] = useState<Regency | null>(pickRandomRegency(pool))

    const targetRef = useRef(question)
    useEffect(() => {
        targetRef.current = question
    }, [question])

    const [hovered, setHovered] = useState<string | null>(null)
    const [result, setResult] = useState<"correct" | "wrong" | null>(null)

    useEffect(() => {
        if (!result) return

        const timer = setTimeout(() => {
            if (result === "correct") {
                setQuestion(pickRandomRegency(pool))
            }
            setResult(null)
        }, 250)

        return () => clearTimeout(timer)
    }, [result])

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.querySelectorAll("path, polygon").forEach(el => {
            const cls = el.getAttribute("regency")
            if (!cls) return

            const e = el as SVGElement

            // reset
            e.style.fill = ""

            if (result === "correct" && cls === targetRef.current?.name) {
                e.style.fill = "#6bffa78c"
            } else if (result === "wrong" && cls === hovered) {
                e.style.fill = "#f53f2fbf"
            } else if (!result && cls === hovered) {
                e.style.fill = "#b2dcf7ad"
            }
        })
    }, [hovered, result])

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        const interactiveArea = new Map<string, SVGElement>()
        svg.querySelectorAll("path, polygon").forEach(el => {
            const cls = el.getAttribute("regency")
            if (cls && cls.length == 2) {
                interactiveArea.set(cls, el as SVGElement)
            }
        })

        function handleEnter(e: MouseEvent) {
            const el = (e.target as Element | null)?.closest?.("path,polygon") as SVGElement | null
            if (!el) return

            const r = el.getAttribute("regency")
            if (!r) return

            setHovered(r)
        }

        function handleLeave() {
            setHovered(null)
        }

        function handleClick(e: MouseEvent) {
            const target = e.target as SVGElement
            if (!target || target.tagName !== "path" && target.tagName !== "polygon") return
            const r = target.getAttribute("regency")
            if (r === targetRef.current?.name) {
                setResult("correct")
            } else {
                setResult("wrong")
            }
        }

        svg.addEventListener("mouseover", handleEnter)
        svg.addEventListener("mouseout", handleLeave)
        svg.addEventListener("click", handleClick)

        return () => {
            svg.removeEventListener("mouseover", handleEnter)
            svg.removeEventListener("mouseout", handleLeave)
            svg.removeEventListener("click", handleClick)
        }
    }, [])

    const [isInfoOpen, setIsInfoOpen] = useState(false)
    
    return (
        <div className="relative min-h-screen bg-slate-900">
            <header className="relative">
                <h1 className="text-4xl font-bold pt-4 mb-4">Indonesia Regencies Quiz</h1>
                <InfoButton active={isInfoOpen} onClick={ (() => setIsInfoOpen(true)) } />
            </header>
            <QuestionCard target={ question?.name }/>
            <div className="mt-16 mx-auto w-full max-w-5xl border-2">
                <TransformWrapper
                    minScale={1}
                    maxScale={20}
                    initialScale={2}
                    wheel={{ step: 10 }}
                    >
                    <TransformComponent>
                        <IndonesiaMap  className="w-full h-auto" ref={ svgRef }/>
                    </TransformComponent>
                </TransformWrapper>
            </div>
            <QuestionSelector divisions={divs} defaultValue={ Array.from(selectedProvinces) } onChange={ setSelectedProvinces }/>
            { isInfoOpen && <InfoWindow 
                title={
                    <h2 className="text-center font-bold">Indonesia Regencies Quiz</h2>
                }
                content={
                    <div className="text-justify">
                        <p>
                            This practice contains every (I suppose) regencies of Indonesia, even including those without official coverage such as the Papua area.
                        </p>
                        <p className="mt-4">
                            The best part about this is that you can choose the provinces that you want to practice! Once a checkbox is changed, the selector immediately re-select a new target. Also, this map is zoomable and pannable. Though the layout sucks (I suck at designing these stuffs), it should be decent enough for practice purpose.
                        </p>
                        <p className="mt-4">
                            p.s.: I spent 4 hours just dealing with the svg file, MANUALLY adding properties to all the paths to mark which regency it is. That was a disaster.
                        </p>
                    </div>
                } 
                onClose={ (() => setIsInfoOpen(false)) }
            />}
        </div>
    )
}