import { useEffect, useMemo, useRef, useState } from 'react'
import FindThePlaceMap from '../components/FindThePlaceMap'
import FindThePlacePoolSetup from '../components/FindThePlacePoolSetup'
import FindThePlaceResults from '../components/FindThePlaceResults'
import InfoWindow from '../components/InfoWindow'
import QuizLayout from '../components/QuizLayout'
import {
  FIND_THE_PLACE_COUNTRY_CODES,
  FIND_THE_PLACE_COUNTRY_DIVISIONS,
  FIND_THE_PLACE_DATA,
  FIND_THE_PLACE_PLACES,
} from '../utils/findThePlaceData'
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

function getAllCountryCodes(): Set<string> {
  return new Set<string>(
    FIND_THE_PLACE_DATA.flatMap((continent) =>
      continent.countries.map((country) => country.code)
    )
  )
}

export default function FindThePlace() {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [selectedCountryCodes, setSelectedCountryCodes] =
    useState(getAllCountryCodes)
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Set<Difficulty>
  >(() => new Set(DIFFICULTIES))
  const [phase, setPhase] = useState<GamePhase>({ name: 'setup' })
  const [questions, setQuestions] = useState<PlayablePlace[]>([])
  const [results, setResults] = useState<RoundResult[]>([])
  const [now, setNow] = useState(() => performance.now())
  const guessLockedRef = useRef(false)

  const eligiblePlaces = useMemo(
    () =>
      getEligiblePlaces(
        FIND_THE_PLACE_PLACES,
        selectedCountryCodes,
        selectedDifficulties
      ),
    [selectedCountryCodes, selectedDifficulties]
  )

  const selectedCountryNames = useMemo(
    () =>
      Object.entries(FIND_THE_PLACE_COUNTRY_CODES)
        .filter(([, code]) => selectedCountryCodes.has(code))
        .map(([name]) => name),
    [selectedCountryCodes]
  )

  useEffect(() => {
    if (phase.name !== 'guessing') return

    const timer = window.setInterval(() => setNow(performance.now()), 100)
    return () => window.clearInterval(timer)
  }, [phase])

  function startGame() {
    if (eligiblePlaces.length < ROUND_COUNT) return

    const startedAt = performance.now()
    guessLockedRef.current = false
    setQuestions(createSessionQuestions(eligiblePlaces, ROUND_COUNT))
    setResults([])
    setNow(startedAt)
    setPhase({ name: 'guessing', roundIndex: 0, startedAt })
  }

  function handleCountrySelectionChange(countryNames: Set<string>) {
    const countryCodes = new Set<string>()
    countryNames.forEach((name) => {
      const code = FIND_THE_PLACE_COUNTRY_CODES[name]
      if (code) countryCodes.add(code)
    })
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

        {phase.name === 'setup' && (
          <FindThePlacePoolSetup
            countryDivisions={FIND_THE_PLACE_COUNTRY_DIVISIONS}
            selectedCountryNames={selectedCountryNames}
            selectedDifficulties={selectedDifficulties}
            eligiblePlaceCount={eligiblePlaces.length}
            onCountrySelectionChange={handleCountrySelectionChange}
            onDifficultySelectionChange={setSelectedDifficulties}
            onStart={startGame}
          />
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
              <p>
                More and more locations will be added to this quiz!
              </p>
            </div>
          }
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  )
}
