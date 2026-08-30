import Frame from './Frame'
import { formatPoleAccuracy } from '../utils/poleNumbers'

type PoleAccuracyPanelProps = {
  overallAccuracy: number | null
  sessionAccuracy: number | null
  roundAccuracy: number | null
}

const METRIC_LABELS = ['Overall', 'Session', 'Round'] as const

export default function PoleAccuracyPanel({
  overallAccuracy,
  sessionAccuracy,
  roundAccuracy,
}: PoleAccuracyPanelProps) {
  const values = [overallAccuracy, sessionAccuracy, roundAccuracy]

  return (
    <Frame className="shadow-2xl">
      <div className="grid grid-cols-3 gap-px px-1 py-1">
        {METRIC_LABELS.map((label, index) => (
          <div
            key={label}
            className="min-w-[4.5rem] rounded-lg px-2 py-2 text-center sm:min-w-20"
          >
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-slate-400">
              {label}
            </p>
            <p
              className={`mt-1 text-sm font-black tabular-nums sm:text-base ${
                label === 'Round' ? 'text-emerald-300' : 'text-white'
              }`}
            >
              {formatPoleAccuracy(values[index])}
            </p>
          </div>
        ))}
      </div>
    </Frame>
  )
}
