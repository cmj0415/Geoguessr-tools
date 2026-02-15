import React from "react";
import USMap from '../assets/us-state-map.svg?react'
import { useRef, useEffect, useState } from 'react'

export default function USStates() {
    const svgRef = useRef<SVGSVGElement>(null)

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
            if (target.tagName !== "path" && target.tagName !== "circle") return
            
            const cls = target.getAttribute("class")
            if (!cls) return

            const area = interactiveArea.get(cls)
            if (area) area.style.fill = "blue"
        }

        function handleLeave(e: MouseEvent) {
            const target = e.target as SVGElement
            if (target.tagName !== "path" && target.tagName !== "circle") return

            const cls = target.getAttribute("class")
            if (!cls) return

            const area = interactiveArea.get(cls)
            if (area) area.style.fill = ""
        }

        svg.addEventListener("mouseover", handleEnter)
        svg.addEventListener("mouseout", handleLeave)

        return () => {
            svg.removeEventListener("mouseover", handleEnter)
            svg.removeEventListener("mouseout", handleLeave)
        }
    }, [])
    
    return (
        <USMap ref={ svgRef }/>
    )
}