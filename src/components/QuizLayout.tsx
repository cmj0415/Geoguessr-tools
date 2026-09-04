import type { ReactNode } from 'react'
import InfoButton from './InfoButton'
import QuizHeader from './QuizHeader'
import QuestionCard from './QuestionCard'

type QuizLayoutProps = {
  title: string
  question: string | null
  questionOverlay?: ReactNode
  controls?: ReactNode
  headerActions?: ReactNode
  isInfoOpen: boolean
  onInfoClick: () => void
  children: ReactNode
}

export default function QuizLayout({
  title,
  question,
  questionOverlay,
  controls,
  headerActions,
  isInfoOpen,
  onInfoClick,
  children,
}: QuizLayoutProps) {
  const showsControls = controls !== undefined
  const overlay =
    questionOverlay ??
    (question !== null ? (
      <QuestionCard target={question} className="shadow-2xl" />
    ) : null)

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />

      <QuizHeader
        title={title}
        actions={
          <>
            {headerActions}
            <InfoButton active={isInfoOpen} onClick={onInfoClick} />
          </>
        }
      />
      <main className="relative min-h-0 flex-1 p-3 sm:p-6">
        {controls && (
          <div className="absolute right-5 top-5 z-[1100] sm:right-9 sm:top-9">
            {controls}
          </div>
        )}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/30">
          {overlay !== null && (
            <div
              className={`pointer-events-none absolute inset-x-0 z-[1000] flex justify-center px-4 ${
                showsControls ? 'top-32 sm:top-20 lg:top-5' : 'top-5'
              }`}
            >
              <div className="pointer-events-auto">{overlay}</div>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}
