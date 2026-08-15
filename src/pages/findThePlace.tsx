import { useEffect, useMemo, useRef, useState } from 'react'
import FindThePlaceMap from '../components/FindThePlaceMap'
import FindThePlacePoolSetup from '../components/FindThePlacePoolSetup'
import FindThePlaceResults from '../components/FindThePlaceResults'
import InfoWindow from '../components/InfoWindow'
import QuizLayout from '../components/QuizLayout'
import {
  countEligibleManifestPlaces,
  getAllCountryCodes,
  getCountryCodesByName,
  getCountryDivisions,
  loadFindThePlaceManifest,
  loadSelectedPlaceData,
} from '../utils/findThePlaceData'
import type { FindThePlaceManifest } from '../utils/findThePlaceData'
import {
  DIFFICULTIES,
  calculateDistanceKm,
  calculateRoundScore,
  createSessionQuestions,
  formatDistance,
  formatTime,
  getEligiblePlaces,
} from '../utils/findThePlace'
import type {
  Coordinates,
  Difficulty,
  GamePhase,
  PlayablePlace,
  RoundResult,
} from '../utils/findThePlace'

const ROUND_COUNT = 5

export default function FindThePlace() {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [manifest, setManifest] = useState<FindThePlaceManifest | null>(null)
  const [manifestError, setManifestError] = useState(false)
  const [manifestRequestVersion, setManifestRequestVersion] = useState(0)
  const [selectedCountryCodes, setSelectedCountryCodes] = useState<Set<string>>(
    new Set()
  )
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Set<Difficulty>
  >(() => new Set(DIFFICULTIES))
  const [phase, setPhase] = useState<GamePhase>({ name: 'setup' })
  const [questions, setQuestions] = useState<PlayablePlace[]>([])
  const [results, setResults] = useState<RoundResult[]>([])
  const [now, setNow] = useState(() => performance.now())
  const [isStarting, setIsStarting] = useState(false)
  const [startError, setStartError] = useState<string | null>(null)
  const guessLockedRef = useRef(false)
  const startRequestRef = useRef(false)

  const countryDivisions = useMemo(
    () => (manifest ? getCountryDivisions(manifest) : {}),
    [manifest]
  )
  const countryCodesByName = useMemo(
    () => (manifest ? getCountryCodesByName(manifest) : {}),
    [manifest]
  )
  const eligiblePlaceCount = useMemo(
    () =>
      manifest
        ? countEligibleManifestPlaces(
            manifest,
            selectedCountryCodes,
            selectedDifficulties
          )
        : 0,
    [manifest, selectedCountryCodes, selectedDifficulties]
  )

  const selectedCountryNames = useMemo(
    () =>
      Object.entries(countryCodesByName)
        .filter(([, code]) => selectedCountryCodes.has(code))
        .map(([name]) => name),
    [countryCodesByName, selectedCountryCodes]
  )

  useEffect(() => {
    const controller = new AbortController()

    loadFindThePlaceManifest(controller.signal)
      .then((nextManifest) => {
        setManifest(nextManifest)
        setSelectedCountryCodes(getAllCountryCodes(nextManifest))
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setManifestError(true)
      })

    return () => controller.abort()
  }, [manifestRequestVersion])

  useEffect(() => {
    if (phase.name !== 'guessing') return

    const timer = window.setInterval(() => setNow(performance.now()), 100)
    return () => window.clearInterval(timer)
  }, [phase])

  async function startGame() {
    if (
      !manifest ||
      eligiblePlaceCount < ROUND_COUNT ||
      startRequestRef.current
    ) {
      return
    }

    startRequestRef.current = true
    setIsStarting(true)
    setStartError(null)

    try {
      const loadedPlaces = await loadSelectedPlaceData(
        manifest,
        selectedCountryCodes
      )
      const eligiblePlaces = getEligiblePlaces(
        loadedPlaces,
        selectedCountryCodes,
        selectedDifficulties
      )
      if (eligiblePlaces.length < ROUND_COUNT) {
        throw new Error('The selected data contains fewer than five places.')
      }

      const startedAt = performance.now()
      guessLockedRef.current = false
      setQuestions(createSessionQuestions(eligiblePlaces, ROUND_COUNT))
      setResults([])
      setNow(startedAt)
      setPhase({ name: 'guessing', roundIndex: 0, startedAt })
    } catch (error: unknown) {
      setStartError(
        error instanceof Error
          ? error.message
          : 'Unable to load the selected place data.'
      )
    } finally {
      startRequestRef.current = false
      setIsStarting(false)
    }
  }

  function handleCountrySelectionChange(countryNames: Set<string>) {
    const countryCodes = new Set<string>()
    countryNames.forEach((name) => {
      const code = countryCodesByName[name]
      if (code) countryCodes.add(code)
    })
    setStartError(null)
    setSelectedCountryCodes(countryCodes)
  }

  function handleGuess(guessedCoordinates: Coordinates) {
    if (phase.name !== 'guessing' || guessLockedRef.current) return
    const place = questions[phase.roundIndex]
    if (!place) return
    guessLockedRef.current = true

    const elapsedSeconds = Math.max(
      0,
      (performance.now() - phase.startedAt) / 1000
    )
    const distanceKm = calculateDistanceKm(
      guessedCoordinates,
      place.coordinates
    )
    const result: RoundResult = {
      place,
      guessedCoordinates,
      elapsedSeconds,
      distanceKm,
      score: calculateRoundScore(elapsedSeconds, distanceKm),
    }

    setResults((currentResults) => [...currentResults, result])
    setPhase({ name: 'review', roundIndex: phase.roundIndex, result })
  }

  function advanceRound() {
    if (phase.name !== 'review') return

    if (phase.roundIndex === ROUND_COUNT - 1) {
      setPhase({ name: 'results' })
      return
    }

    const startedAt = performance.now()
    guessLockedRef.current = false
    setNow(startedAt)
    setPhase({
      name: 'guessing',
      roundIndex: phase.roundIndex + 1,
      startedAt,
    })
  }

  function changePool() {
    guessLockedRef.current = false
    setQuestions([])
    setResults([])
    setStartError(null)
    setPhase({ name: 'setup' })
  }

  const activeRoundIndex =
    phase.name === 'guessing' || phase.name === 'review' ? phase.roundIndex : -1
  const currentQuestion =
    activeRoundIndex >= 0 ? questions[activeRoundIndex] : null
  const currentResult = phase.name === 'review' ? phase.result : null
  const elapsedSeconds =
    phase.name === 'guessing'
      ? Math.max(0, (now - phase.startedAt) / 1000)
      : (currentResult?.elapsedSeconds ?? 0)
  const totalScore = results.reduce((total, result) => total + result.score, 0)

  return (
    <>
      <QuizLayout
        title="Find the Place"
        question={currentQuestion?.question ?? null}
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        <FindThePlaceMap
          roundKey={activeRoundIndex}
          guessing={phase.name === 'guessing'}
          result={currentResult}
          onGuess={handleGuess}
        />

        {phase.name === 'setup' && manifest && (
          <FindThePlacePoolSetup
            countryDivisions={countryDivisions}
            selectedCountryNames={selectedCountryNames}
            selectedDifficulties={selectedDifficulties}
            eligiblePlaceCount={eligiblePlaceCount}
            isLoading={isStarting}
            loadError={startError}
            onCountrySelectionChange={handleCountrySelectionChange}
            onDifficultySelectionChange={(difficulties) => {
              setStartError(null)
              setSelectedDifficulties(difficulties)
            }}
            onStart={startGame}
          />
        )}

        {phase.name === 'setup' && !manifest && (
          <section className="absolute inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-6 py-5 text-center shadow-2xl">
              <p className="font-bold text-white">
                {manifestError
                  ? 'Unable to load the question pool.'
                  : 'Loading question pool…'}
              </p>
              {manifestError && (
                <button
                  type="button"
                  onClick={() => {
                    setManifestError(false)
                    setManifestRequestVersion((version) => version + 1)
                  }}
                  className="mt-4 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                >
                  Retry
                </button>
              )}
            </div>
          </section>
        )}

        {(phase.name === 'guessing' || phase.name === 'review') && (
          <div className="pointer-events-none absolute bottom-5 left-5 z-[1000] rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur sm:bottom-8 sm:left-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Round {activeRoundIndex + 1} / {ROUND_COUNT}
            </p>
            <div className="mt-1 flex gap-4 text-sm font-bold tabular-nums">
              <span className="text-white">{formatTime(elapsedSeconds)}</span>
              <span className="text-emerald-300">
                {totalScore.toLocaleString()} pts
              </span>
            </div>
          </div>
        )}

        {phase.name === 'review' && (
          <section className="absolute bottom-5 right-5 z-[1000] w-[min(24rem,calc(100%-2.5rem))] rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur sm:bottom-8 sm:right-8 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300/80">
              Round result
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-white/5 p-2">
                <p className="text-[0.65rem] uppercase text-slate-500">
                  Distance
                </p>
                <p className="mt-1 font-black text-white">
                  {formatDistance(phase.result.distanceKm)}
                </p>
              </div>
              <div className="rounded-xl bg-white/5 p-2">
                <p className="text-[0.65rem] uppercase text-slate-500">Time</p>
                <p className="mt-1 font-black text-white">
                  {formatTime(phase.result.elapsedSeconds)}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-400/10 p-2">
                <p className="text-[0.65rem] uppercase text-emerald-300/70">
                  Score
                </p>
                <p className="mt-1 font-black text-emerald-300">
                  {phase.result.score.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={advanceRound}
              className="mt-4 w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
            >
              {phase.roundIndex === ROUND_COUNT - 1
                ? 'View results'
                : 'Next round'}
            </button>
          </section>
        )}

        {phase.name === 'results' && (
          <FindThePlaceResults
            results={results}
            isStarting={isStarting}
            onNextGame={startGame}
            onChangePool={changePool}
          />
        )}
      </QuizLayout>

      {isInfoOpen && (
        <InfoWindow
          title={<h2 className="text-center font-bold">Find the Place</h2>}
          content={
            <div className="space-y-4 text-justify">
              <p>
                Find each named place on the OpenStreetMap layer. Every game
                contains five rounds, and your first click is final.
              </p>
              <p>
                Guesses within 10 km receive the full time-adjusted score.
                Beyond that, points decrease smoothly with both time and
                distance.
              </p>
              <p>More and more locations will be added to this quiz!</p>
            </div>
          }
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  )
}
