import JapanMap from '../../assets/jp-pref-map.svg?react'
import InfoWindow from '../../components/InfoWindow'
import QuizLayout from '../../components/QuizLayout'
import { QuestionSelector } from '../../components/QuestionSelector'
import { useRef, useEffect, useState, useMemo } from 'react'
import { JP_MAP, JP_PREFECTURE_CODES } from '../../utils/jp/prefectureData'
import type { Prefecture } from '../../utils/jp/prefectureData'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

export default function JapanPrefecture() {
  const divs: Record<string, string[]> = {
    Regions: Object.keys(JP_MAP),
  }
  const svgRef = useRef<SVGSVGElement>(null)

  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(
    () => new Set(Object.keys(JP_MAP))
  )

  const pool = useMemo(() => {
    const out: Prefecture[] = []
    for (const region of selectedRegions) {
      for (const name of JP_MAP[region] ?? []) {
        const code = JP_PREFECTURE_CODES[name]
        if (code) out.push({ region, name, code })
      }
    }
    return out
  }, [selectedRegions])

  function pickRandomPrefecture(pool: Prefecture[]) {
    if (pool.length === 0) return null
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const [question, setQuestion] = useState<Prefecture | null>(
    pickRandomPrefecture(pool)
  )

  useEffect(() => {
    setQuestion(pickRandomPrefecture(pool))
  }, [pool])

  const targetRef = useRef(question)
  useEffect(() => {
    targetRef.current = question
  }, [question])

  const [hoveredCode, setHoveredCode] = useState<string | null>(null)
  const [clickedCode, setClickedCode] = useState<string | null>(null)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)

  useEffect(() => {
    if (!result) return

    const timer = setTimeout(() => {
      if (result === 'correct') {
        setQuestion(pickRandomPrefecture(pool))
      }
      setResult(null)
      setClickedCode(null)
    }, 250)

    return () => clearTimeout(timer)
  }, [pool, result])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    svg.querySelectorAll<SVGGElement>('g[data-code]').forEach((el) => {
      const code = el.getAttribute('data-code')
      const fill = (() => {
        if (result === 'correct' && code === targetRef.current?.code) {
          return '#34d399b3'
        }
        if (result === 'wrong' && code === clickedCode) return '#fb7185cc'
        if (!result && code === hoveredCode) return '#38bdf899'
        return ''
      })()

      el.querySelectorAll<SVGElement>('path, polygon').forEach((shape) => {
        shape.style.fill = fill
      })
    })
  }, [clickedCode, hoveredCode, result])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    function findPrefectureGroup(target: EventTarget | null) {
      return (target as Element | null)?.closest?.(
        'g[data-code]'
      ) as SVGGElement | null
    }

    function handleEnter(e: MouseEvent) {
      const el = findPrefectureGroup(e.target)
      const code = el?.getAttribute('data-code')
      if (code) setHoveredCode(code)
    }

    function handleLeave(e: MouseEvent) {
      const current = findPrefectureGroup(e.target)
      const next = findPrefectureGroup(e.relatedTarget)
      if (current && current === next) return
      setHoveredCode(null)
    }

    function handleClick(e: MouseEvent) {
      const code = findPrefectureGroup(e.target)?.getAttribute('data-code')
      if (!code) return

      setClickedCode(code)
      if (code === targetRef.current?.code) {
        setResult('correct')
      } else {
        setResult('wrong')
      }
    }

    svg.addEventListener('mouseover', handleEnter)
    svg.addEventListener('mouseout', handleLeave)
    svg.addEventListener('click', handleClick)

    return () => {
      svg.removeEventListener('mouseover', handleEnter)
      svg.removeEventListener('mouseout', handleLeave)
      svg.removeEventListener('click', handleClick)
    }
  }, [])

  const [isInfoOpen, setIsInfoOpen] = useState(false)

  return (
    <>
      <QuizLayout
        title="Japan Prefectures Quiz"
        question={question ? question.name : 'Select regions to begin'}
        selector={
          <QuestionSelector
            divisions={divs}
            defaultValue={Array.from(selectedRegions)}
            onChange={setSelectedRegions}
            title="Select regions"
            menuLabel="Region pool"
            searchPlaceholder="Find a region..."
            variant="menu"
          />
        }
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden p-2 sm:p-5">
          <TransformWrapper
            minScale={0.5}
            maxScale={20}
            initialScale={0.7}
            wheel={{ step: 10 }}
            centerOnInit
            limitToBounds={false}
          >
            <TransformComponent
              wrapperClass="w-full h-full flex items-center justify-center"
              contentClass="flex items-center justify-center"
            >
              <JapanMap
                className="w-full h-full max-w-full max-h-full"
                ref={svgRef}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </QuizLayout>
      {isInfoOpen && (
        <InfoWindow
          title={
            <h2 className="text-center font-bold">Japan Prefectures Quiz</h2>
          }
          content={
            <div className="text-justify">
              <p>
                Practice all 47 Japanese prefectures. The question pool can be
                adjusted by region, and the map is zoomable and pannable.
              </p>
              <p className="mt-4">
                Region groups follow broad Japanese regional divisions, with
                Hokkaido included in Tohoku and Okinawa included in Kyushu for
                this quiz.
              </p>
            </div>
          }
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  )
}
