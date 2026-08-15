import type { RoundResult } from '../utils/findThePlace'
import { formatDistance, formatTime } from '../utils/findThePlace'

type FindThePlaceResultsProps = {
  results: readonly RoundResult[]
  onNextGame: () => void
  onChangePool: () => void
}

export default function FindThePlaceResults({
  results,
  onNextGame,
  onChangePool,
}: FindThePlaceResultsProps) {
  const totalScore = results.reduce((total, result) => total + result.score, 0)

  return (
    <section className="absolute inset-0 z-[1000] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-md sm:p-6">
      <div className="max-h-full w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/50 sm:p-7">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300/80">
              Game complete
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">Results</h2>
          </div>
          <div className="sm:text-right">
            <p className="text-sm font-semibold text-slate-400">Final score</p>
            <p className="text-3xl font-black text-emerald-300">
              {totalScore.toLocaleString()}
              <span className="text-base text-slate-500"> / 25,000</span>
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">Round</th>
                <th className="px-4 py-3">Place</th>
                <th className="px-4 py-3 text-right">Distance</th>
                <th className="px-4 py-3 text-right">Time</th>
                <th className="px-4 py-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {results.map((result, index) => (
                <tr key={result.place.id} className="text-slate-300">
                  <td className="px-4 py-3 font-bold text-slate-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">
                    {result.place.question}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatDistance(result.distanceKm)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatTime(result.elapsedSeconds)}
                  </td>
                  <td className="px-4 py-3 text-right font-black tabular-nums text-emerald-300">
                    {result.score.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onChangePool}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Change pool
          </button>
          <button
            type="button"
            onClick={onNextGame}
            className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
          >
            Next game
          </button>
        </div>
      </div>
    </section>
  )
}
