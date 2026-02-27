import React from "react"
import BrazilMap from '../assets/br-code-map.svg?react'
import QuestionCard from "../components/QuestionCard"
import InfoButton from "../components/InfoButton"
import InfoWindow from "../components/InfoWindow"
import { QuestionSelector } from "../components/QuestionSelector"
import { useRef, useEffect, useState, useMemo } from 'react'
import { BR_MAP } from "../utils/BRCodeData"
import type { Area, AreaData } from "../utils/BRCodeData"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

export default function BrazilCodes() {
    const divs: Record<string, string[]> = {
        "Code Groups": ["10s", "20s", "30s", "40s", "50s", "60s", "70s", "80s", "90s"]
    }
    const svgRef = useRef<SVGSVGElement>(null)

    const [selectedGroups, setSelectedGroups] = useState<Set<string>>(
        () => new Set(Object.keys(BR_MAP))
    )

    const pool = useMemo(() => {
        const out: Area[] = []
        for (const p of selectedGroups) {
            for (const r of BR_MAP[p] ?? []) out.push({ group: p, code: r })
        }
        return out
    }, [selectedGroups])

    useEffect(() => {
        setQuestion(pickRandomArea(pool))
    }, [pool])

    function pickRandomArea(pool: Area[]) {
        if (pool.length == 0) return null
        return pool[Math.floor(Math.random() * pool.length)]
    }

    const [question, setQuestion] = useState<Area | null>(pickRandomArea(pool))

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
                setQuestion(pickRandomArea(pool))
            }
            setResult(null)
        }, 250)

        return () => clearTimeout(timer)
    }, [result])

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        svg.querySelectorAll("path, polygon").forEach(el => {
            const cls = el.getAttribute("code")
            if (!cls) return

            const e = el as SVGElement

            // reset
            e.style.fill = ""

            if (result === "correct" && cls === targetRef.current?.code) {
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
            const cls = el.getAttribute("code")
            if (cls && cls.length == 2) {
                interactiveArea.set(cls, el as SVGElement)
            }
        })

        function handleEnter(e: MouseEvent) {
            const el = (e.target as Element | null)?.closest?.("path, polygon") as SVGElement | null
            if (!el) return

            const r = el.getAttribute("code")
            if (!r) return

            setHovered(r)
        }

        function handleLeave() {
            setHovered(null)
        }

        function handleClick(e: MouseEvent) {
            const target = e.target as SVGElement
            if (!target || target.tagName !== "path" && target.tagName !== "polygon") return
            const r = target.getAttribute("code")
            if (r === targetRef.current?.code) {
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
                <h1 className="text-4xl font-bold pt-4 mb-4">Brazil Area Quiz</h1>
                <InfoButton active={isInfoOpen} onClick={ (() => setIsInfoOpen(true)) } />
            </header>
            <QuestionCard target={ question?.code }/>
            <div className="mt-16 mx-auto w-full max-w-4xl max-h-2xl border-2">
                <div className="w-full h-[70vh] flex items-center justify-center overflow-hidden">
                    <TransformWrapper
                        minScale={0.5}
                        maxScale={20}
                        initialScale={0.5}
                        wheel={{ step: 10 }}
                        centerOnInit
                        limitToBounds={ false }
                        >
                        <TransformComponent
                            wrapperClass="w-full h-full flex items-center justify-center"
                            contentClass="flex items-center justify-center"
                        >
                            <BrazilMap  className="max-w-full max-h-full" ref={ svgRef }/>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
            </div>
            <QuestionSelector divisions={divs} defaultValue={ Array.from(selectedGroups) } onChange={ setSelectedGroups }/>
            { isInfoOpen && <InfoWindow 
                title={
                    <h2 className="text-center font-bold">Brazil Area Codes Quiz</h2>
                }
                content={
                    <div className="text-justify">
                        <p>
                            This practice contains every area code in Brazil.
                        </p>
                        <p className="mt-4">
                            You can choose the code group(s) you want to practice!
                        </p>
                    </div>
                } 
                onClose={ (() => setIsInfoOpen(false)) }
            />}
        </div>
    )
}