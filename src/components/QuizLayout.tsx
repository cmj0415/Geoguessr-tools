import type { ReactNode } from 'react'
import InfoButton from './InfoButton'
import NavBar from './NavBar'
import QuestionCard from './QuestionCard'

type QuizLayoutProps = {
  title: string
  question: string | null
  selector?: ReactNode
  hasSelector?: boolean
  isInfoOpen: boolean
  onInfoClick: () => void
  children: ReactNode
}

export default function QuizLayout({
  title,
  question,
  selector,
  hasSelector,
  isInfoOpen,
  onInfoClick,
  children,
}: QuizLayoutProps) {
  const showsSelector = hasSelector ?? selector !== undefined

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />

      <header className="relative z-[1200] shrink-0 border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <NavBar />
          <div className="flex min-w-0 items-center gap-3 text-right">
            <h1 className="truncate text-base font-bold text-white sm:text-lg">
              {title}
            </h1>
            <InfoButton active={isInfoOpen} onClick={onInfoClick} />
          </div>
        </div>
      </header>
      <main className="relative min-h-0 flex-1 p-3 sm:p-6">
        {selector && (
          <div className="absolute right-5 top-5 z-[1100] sm:right-9 sm:top-9">
            {selector}
          </div>
        )}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/30">
          <div
            className={`pointer-events-none absolute inset-x-0 z-[1000] flex justify-center px-4 ${
              showsSelector ? 'top-20 lg:top-5' : 'top-5'
            }`}
          >
            <QuestionCard
              target={question}
              className="pointer-events-auto shadow-2xl"
            />
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
