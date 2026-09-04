import { EUROPE_PEDESTRIAN_SIGN_GUIDE } from '../utils/miscellaneous/europePedestrianSignGuideData'
import type {
  PedestrianSignGuideExample,
  PedestrianSignGuideFrequency,
} from '../utils/miscellaneous/europePedestrianSignGuideData'

const IMAGE_DIRECTORY = '/miscellaneous/eu_pedestrian_sign'

function FrequencyList({
  frequencies,
}: {
  frequencies: readonly PedestrianSignGuideFrequency[]
}) {
  return (
    <dl className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      {frequencies.map(({ label, countries }) => (
        <div
          key={label}
          className="grid grid-cols-[7rem_1fr] gap-3 border-b border-white/10 px-4 py-3 text-sm last:border-b-0"
        >
          <dt className="font-bold text-emerald-300">{label}</dt>
          <dd className="text-slate-300">{countries}</dd>
        </div>
      ))}
    </dl>
  )
}

function SignExample({ example }: { example: PedestrianSignGuideExample }) {
  return (
    <article className="border-t border-white/10 py-5 first:border-t-0 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h4 className="font-bold text-white">{example.title}</h4>
        <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-200 ring-1 ring-inset ring-emerald-300/15">
          {example.keyDetail}
        </span>
      </div>

      <div
        className={`mt-3 grid gap-3 ${
          example.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {example.images.map(({ fileName, alt, caption }) => (
          <figure key={fileName} className="min-w-0">
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
        {example.description}
      </p>
    </article>
  )
}

export default function EuropePedestrianSignGuide() {
  return (
    <div className="pb-8">
      <p className="text-sm leading-6 text-slate-300">
        Pedestrian crossing signs are extremely useful in European urban rounds
        and are one of the best visual clues for beginners to learn. Start by
        identifying one of three broad families, then compare the details of the
        figure and crossing.
      </p>

      <nav
        aria-label="Guide categories"
        className="mt-5 grid grid-cols-3 gap-2"
      >
        {EUROPE_PEDESTRIAN_SIGN_GUIDE.map(({ id, title }) => (
          <a
            key={id}
            href={`#guide-${id}`}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-center text-xs font-bold text-slate-300 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            {title}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-10">
        {EUROPE_PEDESTRIAN_SIGN_GUIDE.map((category, categoryIndex) => (
          <section key={category.id} id={`guide-${category.id}`}>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400 font-black text-slate-950">
                {categoryIndex + 1}
              </span>
              <h2 className="text-xl font-black text-white">
                {category.title}
              </h2>
            </div>
            {category.description && (
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {category.description}
              </p>
            )}

            <div className="mt-5 space-y-5">
              {category.groups.map((group) => (
                <section
                  key={group.id}
                  className="scroll-mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
                >
                  <h3 className="text-lg font-bold text-white">
                    {group.title}
                  </h3>
                  {group.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {group.description}
                    </p>
                  )}
                  {group.note && (
                    <aside className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] px-4 py-3 text-sm leading-6 text-amber-100/90">
                      <span className="font-bold text-amber-200">
                        Scope note:{' '}
                      </span>
                      {group.note}
                    </aside>
                  )}
                  {group.frequencies && (
                    <FrequencyList frequencies={group.frequencies} />
                  )}

                  <div className="mt-5">
                    {group.examples.map((example) => (
                      <SignExample key={example.title} example={example} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
