import { useEffect, useMemo, useState } from 'react'
import InfoWindow from '../../components/InfoWindow'
import PrimaryActionButton from '../../components/PrimaryActionButton'
import QuizLayout from '../../components/QuizLayout'
import TaiwanPoleAccuracyPanel from '../../components/TaiwanPoleAccuracyPanel'
import TaiwanPoleNumberMap from '../../components/TaiwanPoleNumberMap'
import type { TaiwanPoleRoundResult } from '../../components/TaiwanPoleNumberMap'
import {
  calculateAverageAccuracy,
  calculatePoleAccuracy,
  calculatePoleDistanceKm,
  getPoleGridGeometry,
  parsePoleQuestionPool,
  shufflePoleCodes,
} from '../../utils/tw/poleNumbers'
import type { PoleCoordinates } from '../../utils/tw/poleNumbers'

type PoolState = 'loading' | 'ready' | 'error'

export default function TaiwanPoleNumbers() {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [poolState, setPoolState] = useState<PoolState>('loading')
  const [requestVersion, setRequestVersion] = useState(0)
  const [allCodes, setAllCodes] = useState<string[]>([])
  const [questionDeck, setQuestionDeck] = useState<string[]>([])
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<PoleCoordinates | null>(null)
  const [result, setResult] = useState<TaiwanPoleRoundResult | null>(null)
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

    fetch('/tw-pole-number/cells.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load the question pool.')
        return response.json() as Promise<unknown>
      })
      .then((value) => {
        const pool = parsePoleQuestionPool(value)
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
  }, [requestVersion])

  function submitGuess() {
    if (!question || !selectedCoordinates || result) return

    const geometry = getPoleGridGeometry(question)
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
        title="Taiwan Pole Number Quiz"
        question={poolState === 'ready' ? question : null}
        controls={
          <TaiwanPoleAccuracyPanel
            overallAccuracy={overallAccuracy}
            sessionAccuracy={sessionAccuracy}
            roundAccuracy={result?.accuracy ?? null}
          />
        }
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        <TaiwanPoleNumberMap
          roundKey={roundKey}
          guessing={poolState === 'ready' && result === null}
          selectedCoordinates={selectedCoordinates}
          result={result}
          onSelect={setSelectedCoordinates}
        />

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
          title={<h2 className="text-center font-bold">Taiwan Pole Numbers</h2>}
          content={
            <div className="space-y-4 text-justify">
              <p>
                Each question identifies an 800 × 500 meter Taiwan Power Company
                grid cell. Place a marker, adjust it if needed, and press Submit
                to lock your answer.
              </p>
              <p>
                The first letter selects an 80 × 50 kilometer sector. The first
                digit pair moves east in 800 meter steps, and the second moves
                north in 500 meter steps. The optional map layer marks the
                sector origins.
              </p>
              <p>
                Accuracy is 100 × e<sup>−distance / 50 km</sup>. Overall uses
                every answer from this visit, while Session uses the latest
                five. Coastal cells are included when any part overlaps land, so
                a few cell centres lie offshore.
              </p>
              <p>
                Grid conversion follows the TWD67-based Taiwan Power Company
                system. Land filtering uses county boundaries published by
                Taiwan&apos;s{' '}
                <a
                  href="https://maps.nlsc.gov.tw/pro/download.jsp"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-2 hover:text-emerald-200"
                >
                  National Land Surveying and Mapping Center
                </a>
                . Grid definitions follow the{' '}
                <a
                  href="https://wiki.osgeo.org/wiki/Taiwan_Power_Company_grid"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-emerald-300 underline decoration-emerald-300/40 underline-offset-2 hover:text-emerald-200"
                >
                  OSGeo reference
                </a>
                .
              </p>
            </div>
          }
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  )
}
