import {
  EUROPE_CHEVRON_GUIDE,
  OTHER_CONTINENT_CHEVRON_NOTES,
  REGIONAL_CHEVRON_EXCEPTIONS,
} from '../utils/miscellaneous/europeChevronGuideData'
import type {
  ChevronColorScheme,
  ChevronGuideEntry,
} from '../utils/miscellaneous/europeChevronGuideData'

const IMAGE_DIRECTORY = '/miscellaneous/eu_chevron'

const SCHEME_CLASSES: Record<
  ChevronColorScheme,
  { background: string; arrow: string }
> = {
  'white-blue': { background: 'bg-blue-600', arrow: 'text-white' },
  'yellow-blue': { background: 'bg-blue-600', arrow: 'text-yellow-300' },
  'white-black': { background: 'bg-black', arrow: 'text-white' },
  'black-white': { background: 'bg-white', arrow: 'text-black' },
  'yellow-black': { background: 'bg-black', arrow: 'text-yellow-300' },
  'white-red': { background: 'bg-red-600', arrow: 'text-white' },
  'red-white': { background: 'bg-white', arrow: 'text-red-600' },
  'red-yellow': { background: 'bg-yellow-300', arrow: 'text-red-600' },
}

function SchemeMarker({ scheme }: { scheme: ChevronColorScheme }) {
  const colors = SCHEME_CLASSES[scheme]
  return (
    <span
      aria-hidden="true"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-3xl font-black leading-none shadow-inner ${colors.background} ${colors.arrow}`}
    >
      ›
    </span>
  )
}

function ChevronEntry({ entry }: { entry: ChevronGuideEntry }) {
  return (
    <article
      id={`chevron-guide-${entry.id}`}
      className="scroll-mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
    >
      <div className="flex items-center gap-3">
        <SchemeMarker scheme={entry.scheme} />
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-white">{entry.title}</h3>
          <p className="mt-0.5 text-xs font-semibold leading-5 text-emerald-300">
            {entry.countries}
          </p>
        </div>
      </div>

      <div
        className={`mt-4 grid gap-3 ${
          entry.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {entry.images.map(({ fileName, alt, caption }, imageIndex) => (
          <figure
            key={fileName}
            className={
              entry.images.length === 3 && imageIndex === 0
                ? 'col-span-2'
                : 'min-w-0'
            }
          >
            <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 p-2 sm:h-44">
              <img
                src={`${IMAGE_DIRECTORY}/${fileName}`}
                alt={alt}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
            {caption && (
              <figcaption className="mt-1.5 text-center text-xs font-medium text-slate-500">
                {caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">
        {entry.description}
      </p>
    </article>
  )
}

function NoteList({ notes }: { notes: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {notes.map((note) => (
        <li key={note} className="flex gap-3 text-sm leading-6 text-slate-300">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300"
          />
          <span>{note}</span>
        </li>
      ))}
    </ul>
  )
}

export default function EuropeChevronGuide() {
  return (
    <div className="pb-8">
      <p className="text-sm leading-6 text-slate-300">
        Road chevrons guide drivers through bends. Their arrow and background
        colors vary substantially across Europe, making them useful GeoGuessr
        clues. In this guide, “white on blue” means a white arrow on a blue
        background.
      </p>

      <aside className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] px-4 py-3 text-sm leading-6 text-amber-100/90">
        <span className="font-bold text-amber-200">Scope note: </span>
        Turkey and Cyprus are included for geographic completeness in this quiz.
      </aside>

      <nav
        aria-label="Chevron guide sections"
        className="mt-5 grid grid-cols-3 gap-2"
      >
        <a
          href="#chevron-guide-designs"
          className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-xs font-bold text-slate-300 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Designs
        </a>
        <a
          href="#chevron-guide-world"
          className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-xs font-bold text-slate-300 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Other regions
        </a>
        <a
          href="#chevron-guide-exceptions"
          className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-xs font-bold text-slate-300 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Exceptions
        </a>
      </nav>

      <section id="chevron-guide-designs" className="mt-8 scroll-mt-5">
        <h2 className="text-xl font-black text-white">European designs</h2>
        <div className="mt-5 space-y-5">
          {EUROPE_CHEVRON_GUIDE.map((entry) => (
            <ChevronEntry key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      <section
        id="chevron-guide-world"
        className="mt-10 scroll-mt-5 border-t border-white/10 pt-8"
      >
        <h2 className="text-xl font-black text-white">Other regions</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Chevrons are generally less distinctive outside Europe, but these
          comparisons are still useful.
        </p>
        <NoteList notes={OTHER_CONTINENT_CHEVRON_NOTES} />
      </section>

      <section
        id="chevron-guide-exceptions"
        className="mt-10 scroll-mt-5 rounded-2xl border border-rose-300/20 bg-rose-300/[0.06] p-4 sm:p-5"
      >
        <h2 className="text-xl font-black text-rose-100">
          Regional exceptions
        </h2>
        <NoteList notes={REGIONAL_CHEVRON_EXCEPTIONS} />
      </section>
    </div>
  )
}
