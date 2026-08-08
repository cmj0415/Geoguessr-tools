import { useMemo, useState } from 'react'

type RangeSelectorProps = {
  items: string[]
  min?: number
  max?: number
  defaultRange?: [number, number]
  onChange?: (next: Set<string>) => void
  title?: string
  menuLabel?: string
  className?: string
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function pct(value: number, min: number, max: number) {
  if (max === min) return 0
  return ((value - min) / (max - min)) * 100
}

export function RangeSelector({
  items,
  min = 201,
  max = 989,
  defaultRange = [min, max],
  onChange,
  title = 'Select range',
  menuLabel = title,
  className = '',
}: RangeSelectorProps) {
  const availableCodes = useMemo(
    () =>
      Array.from(
        new Set(
          items
            .map((item) => Number(item))
            .filter((code) => Number.isFinite(code))
            .sort((a, b) => a - b)
        )
      ),
    [items]
  )

  const [left, setLeft] = useState(() =>
    clamp(defaultRange[0], min, defaultRange[1])
  )
  const [right, setRight] = useState(() =>
    clamp(defaultRange[1], defaultRange[0], max)
  )

  const selectedCodes = useMemo(
    () => availableCodes.filter((code) => code >= left && code <= right),
    [availableCodes, left, right]
  )

  const commitRange = (nextLeft: number, nextRight: number) => {
    const nextCodes = availableCodes.filter(
      (code) => code >= nextLeft && code <= nextRight
    )
    onChange?.(new Set(nextCodes.map(String)))
  }

  const updateLeft = (rawValue: number) => {
    const nextLeft = clamp(rawValue, min, right)
    setLeft(nextLeft)
    commitRange(nextLeft, right)
  }

  const updateRight = (rawValue: number) => {
    const nextRight = clamp(rawValue, left, max)
    setRight(nextRight)
    commitRange(left, nextRight)
  }

  const leftPct = pct(left, min, max)
  const rightPct = pct(right, min, max)

  return (
    <details className={`group relative w-fit ${className}`}>
      <summary className="flex w-fit cursor-pointer list-none items-center gap-3 whitespace-nowrap rounded-xl border border-emerald-300/25 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur-md transition hover:border-emerald-300/50 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
        <span className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">
          {menuLabel}
        </span>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-100">
          {selectedCodes.length}/{availableCodes.length}
        </span>
        <span className="ml-auto text-xs text-slate-400 transition group-open:rotate-180">
          ▼
        </span>
      </summary>

      <div className="absolute right-0 top-[calc(100%+0.5rem)] w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-left shadow-2xl shadow-black/40 backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-slate-400">
              {selectedCodes.length} of {availableCodes.length} selected
            </div>
          </div>
          <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-100">
            {left}-{right}
          </div>
        </div>

        <div className="relative h-20 px-3">
          <div className="flex justify-between text-sm font-semibold text-emerald-100">
            <span>{left}</span>
            <span>{right}</span>
          </div>

          <div className="absolute inset-x-3 top-12 h-1 rounded-full bg-white/20">
            <div
              className="absolute h-1 rounded-full bg-emerald-500"
              style={{
                left: `${leftPct}%`,
                width: `${rightPct - leftPct}%`,
              }}
            />
          </div>

          <input
            aria-label="Minimum area code"
            className="range-selector-thumb pointer-events-none absolute inset-x-0 top-8 z-10 h-8 w-full appearance-none bg-transparent"
            type="range"
            min={min}
            max={max}
            step={1}
            value={left}
            onChange={(event) => updateLeft(Number(event.target.value))}
          />
          <input
            aria-label="Maximum area code"
            className="range-selector-thumb pointer-events-none absolute inset-x-0 top-8 z-20 h-8 w-full appearance-none bg-transparent"
            type="range"
            min={min}
            max={max}
            step={1}
            value={right}
            onChange={(event) => updateRight(Number(event.target.value))}
          />
        </div>

        <div className="mt-1 flex justify-between text-xs font-medium text-slate-400">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      <style>{`
        .range-selector-thumb::-webkit-slider-runnable-track {
          height: 0;
        }

        .range-selector-thumb::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;
          appearance: none;
          width: 1.5rem;
          height: 1.5rem;
          margin-top: -0.75rem;
          border: 0;
          border-radius: 9999px;
          background: rgb(16 185 129);
          box-shadow: 0 0 0 4px rgb(16 185 129 / 0.18);
          cursor: grab;
        }

        .range-selector-thumb:active::-webkit-slider-thumb {
          cursor: grabbing;
          background: rgb(52 211 153);
        }

        .range-selector-thumb::-moz-range-track {
          height: 0;
          background: transparent;
          border: 0;
        }

        .range-selector-thumb::-moz-range-thumb {
          pointer-events: auto;
          width: 1.5rem;
          height: 1.5rem;
          border: 0;
          border-radius: 9999px;
          background: rgb(16 185 129);
          box-shadow: 0 0 0 4px rgb(16 185 129 / 0.18);
          cursor: grab;
        }

        .range-selector-thumb:active::-moz-range-thumb {
          cursor: grabbing;
          background: rgb(52 211 153);
        }
      `}</style>
    </details>
  )
}
