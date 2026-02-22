import React from "react"
import PhilippinesMap from '../assets/ph-province-map.svg?react'
import QuestionCard from "../components/QuestionCard"
import InfoButton from "../components/InfoButton"
import InfoWindow from "../components/InfoWindow"
import { QuestionSelector } from "../components/QuestionSelector"
import { useRef, useEffect, useState, useMemo } from 'react'
import { PH_MAP } from "../utils/PHProvinceData"
import type { Province, GroupData } from "../utils/PHProvinceData"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

export default function PhilippinesProvinces() {
    const divs: Record<string, string[]> = {
        "Island Groups": ["Luzon", "Visayas", "Mindanao"]
    }
    const svgRef = useRef<SVGSVGElement>(null)

    const [selectedGroups, setSelectedGroups] = useState<Set<string>>(
        () => new Set(Object.keys(PH_MAP))
    )

    const pool = useMemo(() => {
        const out: Province[] = []
        for (const p of selectedGroups) {
            for (const r of PH_MAP[p] ?? []) out.push({ group: p, province: r })
        }
        return out
    }, [selectedGroups])

    useEffect(() => {
        setQuestion(pickRandomProvince(pool))
    }, [pool])

    function pickRandomProvince(pool: Province[]) {
        if (pool.length == 0) return null
        return pool[Math.floor(Math.random() * pool.length)]
    }

    const [question, setQuestion] = useState<Province | null>(pickRandomProvince(pool))

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
                setQuestion(pickRandomProvince(pool))
            }
            setResult(null)
        }, 250)

        return () => clearTimeout(timer)
    }, [result])

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.querySelectorAll("path, polygon").forEach(el => {
            const cls = el.getAttribute("province")
            if (!cls) return

            const e = el as SVGElement

            // reset
            e.style.fill = ""

            if (result === "correct" && cls === targetRef.current?.province) {
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
            const cls = el.getAttribute("province")
            if (cls && cls.length == 2) {
                interactiveArea.set(cls, el as SVGElement)
            }
        })

        function handleEnter(e: MouseEvent) {
            const el = (e.target as Element | null)?.closest?.("path,polygon") as SVGElement | null
            if (!el) return

            const r = el.getAttribute("province")
            if (!r) return

            setHovered(r)
        }

        function handleLeave() {
            setHovered(null)
        }

        function handleClick(e: MouseEvent) {
            const target = e.target as SVGElement
            if (!target || target.tagName !== "path" && target.tagName !== "polygon") return
            const r = target.getAttribute("province")
            if (r === targetRef.current?.province) {
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
                <h1 className="text-4xl font-bold pt-4 mb-4">Philippines Provinces Quiz</h1>
                <InfoButton active={isInfoOpen} onClick={ (() => setIsInfoOpen(true)) } />
            </header>
            <QuestionCard target={ question?.province }/>
            <div className="mt-16 mx-auto w-full max-w-4xl border-2">
                <TransformWrapper
                    minScale={1}
                    maxScale={20}
                    initialScale={1}
                    wheel={{ step: 10 }}
                    >
                    <TransformComponent>
                        <PhilippinesMap  className="w-full h-auto" ref={ svgRef }/>
                    </TransformComponent>
                </TransformWrapper>
            </div>
            <QuestionSelector divisions={divs} defaultValue={ Array.from(selectedGroups) } onChange={ setSelectedGroups }/>
            { isInfoOpen && <InfoWindow 
                title={
                    <h2 className="text-center font-bold">Philippines Provinces Quiz</h2>
                }
                content={
                    <div className="text-justify">
                        <p>
                            This practice contains every (not actually) provinces of the Philippines.
                        </p>
                        <p className="mt-4">
                            Note that the province of Maguindanao has split into Maguindanao del Norte and Maguindanao del Sur in 2022, but I couldn't find an SVG map with those 2 provinces. However, I think this is not actually a big deal. If you know where Maguindanao is, you'll know where the 2 provinces are.
                        </p>
                    </div>
                } 
                onClose={ (() => setIsInfoOpen(false)) }
            />}
        </div>
    )
}