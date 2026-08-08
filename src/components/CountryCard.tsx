import React from 'react'

type CountryCardProps = {
  countryName: string
  flag?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function CountryCard({
  countryName,
  flag,
  children,
  className = '',
}: CountryCardProps) {
  return (
    <section
      className={[
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80',
        'p-5 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-1 hover:border-emerald-300/30 hover:shadow-xl hover:shadow-emerald-950/20 sm:p-6',
        className,
      ].join(' ')}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/5 blur-2xl transition group-hover:bg-emerald-400/10" />
      <div className="relative flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-2xl ring-1 ring-inset ring-white/10">
          {flag ?? null}
        </div>
        <div className="font-bold tracking-wide text-white">{countryName}</div>
      </div>

      <div className="relative mt-4 space-y-2">{children}</div>
    </section>
  )
}
