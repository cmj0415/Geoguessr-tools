import { Fragment } from 'react'

type BengaliSegment = {
  bengali: string
  romanization: string
  conjunctComponents?: string[]
}

type BengaliExplanationProps = {
  place: {
    answer: string
    segments: BengaliSegment[]
    note: string | null
  }
}

export default function BengaliExplanation({ place }: BengaliExplanationProps) {
  return (
    <section className="rounded-2xl border border-emerald-300/15 bg-slate-950/45 p-5 sm:p-7">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          {place.answer}
        </h2>
        <p className="text-sm text-emerald-200/70">Reading breakdown</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        {place.segments.map((segment, index) => (
          <Fragment key={`${segment.bengali}-${index}`}>
            {index > 0 && (
              <span aria-hidden="true" className="font-bold text-slate-500">
                +
              </span>
            )}
            <div className="min-w-20 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 text-center shadow-sm">
              <p className="text-2xl font-semibold text-white">
                {segment.bengali}
              </p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-emerald-300">
                {segment.romanization}
              </p>
              {segment.conjunctComponents && (
                <p className="mt-2 border-t border-white/10 pt-2 text-xs text-slate-400">
                  <span className="mr-1 text-slate-500">Conjunct:</span>
                  {segment.conjunctComponents.join(' + ')}
                </p>
              )}
            </div>
          </Fragment>
        ))}
        <span aria-hidden="true" className="font-bold text-slate-500">
          =
        </span>
        <div className="rounded-xl bg-rose-500/15 px-4 py-3 font-bold text-rose-200 ring-1 ring-inset ring-rose-300/20">
          {place.answer}
        </div>
      </div>

      {place.note && (
        <div className="mt-5 rounded-xl border-l-4 border-amber-300 bg-amber-300/10 px-4 py-3 text-left text-sm leading-6 text-amber-50/90">
          {place.note}
        </div>
      )}
    </section>
  )
}
