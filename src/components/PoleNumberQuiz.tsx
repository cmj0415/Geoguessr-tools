import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  calculateAverageAccuracy,
  calculatePoleAccuracy,
  calculatePoleDistanceKm,
  shufflePoleCodes,
} from '../utils/poleNumbers'
import type {
  PoleCoordinates,
  PoleGridGeometry,
  PoleRoundResult,
} from '../utils/poleNumbers'
import InfoWindow from './InfoWindow'
import PoleAccuracyPanel from './PoleAccuracyPanel'
import PrimaryActionButton from './PrimaryActionButton'
import QuizLayout from './QuizLayout'

type PoolState = 'loading' | 'ready' | 'error'

export type PoleNumberQuizMapProps = {
  roundKey: number
  guessing: boolean
  selectedCoordinates: PoleCoordinates | null
  result: PoleRoundResult | null
  onSelect: (coordinates: PoleCoordinates) => void
}

type PoleNumberQuizProps = {
  title: string
  infoTitle: string
  infoContent: ReactNode
  poolUrl: string
  parsePool: (value: unknown) => { codes: string[] }
  getGeometry: (code: string) => PoleGridGeometry
  renderMap: (props: PoleNumberQuizMapProps) => ReactNode
}

export default function PoleNumberQuiz({
  title,
  infoTitle,
  infoContent,
  poolUrl,
  parsePool,
  getGeometry,
  renderMap,
}: PoleNumberQuizProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [poolState, setPoolState] = useState<PoolState>('loading')
  const [requestVersion, setRequestVersion] = useState(0)
  const [allCodes, setAllCodes] = useState<string[]>([])
  const [questionDeck, setQuestionDeck] = useState<string[]>([])
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<PoleCoordinates | null>(null)
  const [result, setResult] = useState<PoleRoundResult | null>(null)
  const [accuracies, setAccuracies] = useState<number[]>([])
  const [roundKey, setRoundKey] = useState(0)
  const question = questionDeck[0] ?? null
  const overallAccuracy = useMemo(
    () => calculateAverageAccuracy(accuracies),
    [accuracies]
  )
  const sessionAccuracy = useMemo(
    () => calculateAverageAccuracy(accuracies.slice(-5)),
    [accuracies]
  )

  useEffect(() => {
    const controller = new AbortController()

    fetch(poolUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load the question pool.')
        return response.json() as Promise<unknown>
      })
      .then((value) => {
        const pool = parsePool(value)
        if (pool.codes.length === 0)
          throw new Error('The question pool is empty.')
        const shuffledCodes = shufflePoleCodes(pool.codes)
        setAllCodes(pool.codes)
        setQuestionDeck(shuffledCodes)
        setSelectedCoordinates(null)
        setResult(null)
        setPoolState('ready')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setPoolState('error')
      })

    return () => controller.abort()
  }, [parsePool, poolUrl, requestVersion])

  function submitGuess() {
    if (!question || !selectedCoordinates || result) return

    const geometry = getGeometry(question)
    const distanceKm = calculatePoleDistanceKm(
      selectedCoordinates,
      geometry.center
    )
    const accuracy = calculatePoleAccuracy(distanceKm)
    const nextResult = {
      guessedCoordinates: selectedCoordinates,
      geometry,
      distanceKm,
      accuracy,
    }

    setResult(nextResult)
    setAccuracies((current) => [...current, accuracy])
  }

  function nextQuestion() {
    if (!result) return

    setQuestionDeck((currentDeck) =>
      currentDeck.length > 1 ? currentDeck.slice(1) : shufflePoleCodes(allCodes)
    )
    setSelectedCoordinates(null)
    setResult(null)
    setRoundKey((current) => current + 1)
  }

  return (
    <>
      <QuizLayout
        title={title}
        question={poolState === 'ready' ? question : null}
        controls={
          <PoleAccuracyPanel
            overallAccuracy={overallAccuracy}
            sessionAccuracy={sessionAccuracy}
            roundAccuracy={result?.accuracy ?? null}
          />
        }
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        {renderMap({
          roundKey,
          guessing: poolState === 'ready' && result === null,
          selectedCoordinates,
          result,
          onSelect: setSelectedCoordinates,
        })}

        {poolState !== 'ready' && (
          <section className="absolute inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-6 py-5 text-center shadow-2xl">
              <p className="font-bold text-white">
                {poolState === 'error'
                  ? 'Unable to load the question pool.'
                  : 'Loading question pool…'}
              </p>
              {poolState === 'error' && (
                <PrimaryActionButton
                  className="mt-4"
                  onClick={() => {
                    setPoolState('loading')
                    setRequestVersion((version) => version + 1)
                  }}
                >
                  Retry
                </PrimaryActionButton>
              )}
            </div>
          </section>
        )}

        {poolState === 'ready' && (
          <div className="absolute bottom-5 right-5 z-[1000] sm:bottom-8 sm:right-8">
            <PrimaryActionButton
              disabled={!result && !selectedCoordinates}
              onClick={result ? nextQuestion : submitGuess}
            >
              {result ? 'Next' : 'Submit'}
            </PrimaryActionButton>
          </div>
        )}
      </QuizLayout>

      {isInfoOpen && (
        <InfoWindow
          title={<h2 className="text-center font-bold">{infoTitle}</h2>}
          content={infoContent}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  )
}
