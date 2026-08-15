import { QuestionSelector } from './QuestionSelector'
import { DIFFICULTIES } from '../utils/findThePlace'
import type { Difficulty } from '../utils/findThePlace'

type FindThePlacePoolSetupProps = {
  countryDivisions: Record<string, string[]>
  selectedCountryNames: string[]
  selectedDifficulties: ReadonlySet<Difficulty>
  eligiblePlaceCount: number
  onCountrySelectionChange: (countries: Set<string>) => void
  onDifficultySelectionChange: (difficulties: Set<Difficulty>) => void
  onStart: () => void
}

export default function FindThePlacePoolSetup({
  countryDivisions,
  selectedCountryNames,
  selectedDifficulties,
  eligiblePlaceCount,
  onCountrySelectionChange,
  onDifficultySelectionChange,
  onStart,
}: FindThePlacePoolSetupProps) {
  function toggleDifficulty(difficulty: Difficulty) {
    const next = new Set(selectedDifficulties)
    if (next.has(difficulty)) next.delete(difficulty)
    else next.add(difficulty)
    onDifficultySelectionChange(next)
  }

  const canStart = eligiblePlaceCount >= 5

  return (
    <section className="absolute inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm">
      <div className="mt-2 w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/50 sm:mt-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300/80">
          Question pool
        </p>
        <h2 className="mt-2 text-2xl font-black text-white">
          Build your next game
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Choose at least five eligible places. Your pool stays locked during
          the five-round session.
        </p>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <QuestionSelector
            divisions={countryDivisions}
            value={selectedCountryNames}
            onChange={onCountrySelectionChange}
            title="Select countries"
            menuLabel="Country pool"
            searchPlaceholder="Find a country..."
            variant="menu"
            menuAlign="left"
            menuPlacement="down"
          />

          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Difficulty
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {DIFFICULTIES.map((difficulty) => {
                const selected = selectedDifficulties.has(difficulty)
                return (
                  <label
                    key={difficulty}
                    className={`cursor-pointer rounded-xl border px-3 py-2 text-sm font-semibold transition focus-within:ring-2 focus-within:ring-emerald-300 ${
                      selected
                        ? 'border-emerald-300/40 bg-emerald-400/15 text-emerald-100'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selected}
                      onChange={() => toggleDifficulty(difficulty)}
                    />
                    {difficulty}
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-white">
              {eligiblePlaceCount} eligible{' '}
              {eligiblePlaceCount === 1 ? 'place' : 'places'}
            </p>
            {!canStart && (
              <p className="mt-1 text-xs font-medium text-amber-300">
                Select a pool containing at least five places.
              </p>
            )}
          </div>
          <button
            type="button"
            disabled={!canStart}
            onClick={onStart}
            className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            Start game
          </button>
        </div>
      </div>
    </section>
  )
}
