import type { ReactNode } from 'react'
import InfoButton from './InfoButton'
import QuestionCard from './QuestionCard'

type QuizLayoutProps = {
  title: string
  question: string | null
  selector: ReactNode
  hasSelector?: boolean
  isInfoOpen: boolean
  onInfoClick: () => void
  children: ReactNode
}

export default function QuizLayout({
  title,
  question,
  selector,
  hasSelector = true,
  isInfoOpen,
  onInfoClick,
  children,
}: QuizLayoutProps) {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-slate-900">
      <header className="relative shrink-0 border-b border-white/10 bg-slate-950/35 shadow-lg">
        <div className="mx-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div />
          <h1 className="my-4 text-center text-2xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <div className="justify-self-end">
            <InfoButton active={isInfoOpen} onClick={onInfoClick} />
          </div>
        </div>
      </header>
      <main className="relative min-h-0 flex-1 p-3 sm:p-5">
        <div className="absolute right-6 top-6 z-[1100] sm:right-8 sm:top-8">
          {selector}
        </div>
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-violet-400/35 bg-slate-950/25 shadow-2xl">
          <div
            className={`pointer-events-none absolute inset-x-0 z-[1000] flex justify-center px-4 ${
              hasSelector ? 'top-20 lg:top-4' : 'top-4'
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
