type HeaderProps = {
  navbar: React.ReactNode
  title: string
  infobutton?: React.ReactNode
  bgUrl: string
}
export default function Header({
  navbar,
  title,
  infobutton,
  bgUrl,
}: HeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-slate-950">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-rose-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-5 sm:px-6 sm:pb-24">
        <div className="flex items-center justify-between gap-4">
          {navbar}
          {infobutton}
        </div>
        <div className="mx-auto mt-14 max-w-3xl text-center sm:mt-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300/80">
            GeoGuessr study tools
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            I suck at memorizing so I made this. 
          </p>
        </div>
      </div>
    </header>
  )
}
