import React from "react";
import USMap from '../assets/us-state-map.svg?react'
import QuestionCard from "../components/QuestionCard";
import { useRef, useEffect, useState } from 'react'
import { STATE_NAME_MAP } from "../utils/USStateData";

export default function USStates() {
    const svgRef = useRef<SVGSVGElement>(null)

    const [target, setTarget] = useState(() => {
        const arr = [...STATE_NAME_MAP]
        return arr[Math.floor(Math.random() * STATE_NAME_MAP.size)]
    })

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return

        const interactiveArea = new Map<string, SVGElement>()
        svg.querySelectorAll("path, circle").forEach(el => {
            const cls = el.getAttribute("class")?.split(" ")[0]
            if (cls && cls.length == 2) {
                interactiveArea.set(cls, el as SVGElement)
            }
        })

        function handleEnter(e: MouseEvent) {
            const target = e.target as SVGElement
            if (!target || (target.tagName !== "path" && target.tagName !== "circle")) return
            if (target.getAttribute("class") === "separator1") return
            target.style.fill = "blue"
        }

        function handleLeave(e: MouseEvent) {
            const target = e.target as SVGElement
            if (!target || target.tagName !== "path" && target.tagName !== "circle") return
            if (target.getAttribute("class") === "separator1") return
            target.style.fill = ""
        }

        svg.addEventListener("mouseover", handleEnter)
        svg.addEventListener("mouseout", handleLeave)

        return () => {
            svg.removeEventListener("mouseover", handleEnter)
            svg.removeEventListener("mouseout", handleLeave)
        }
    }, [])
    
    return (
        <div className="relative min-h-screen bg-slate-900">
            <h1 className="text-4xl font-bold pt-4 mb-4">US States Quiz</h1>
            <QuestionCard target={ target[1] }/>
            <USMap className="mx-auto mt-16 w-full max-w-4xl h-auto" ref={ svgRef }/>
        </div>
    )
}