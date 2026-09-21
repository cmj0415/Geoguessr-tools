import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import InfoButton from './InfoButton'
import QuizHeader from './QuizHeader'
import QuestionCard from './QuestionCard'

type QuizLayoutProps = {
  title: string
  question: string | null
  questionOverlay?: ReactNode
  controls?: ReactNode
  mapActions?: ReactNode
  collapsibleMobileControls?: boolean
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
  mapActions,
  collapsibleMobileControls = false,
  headerActions,
  isInfoOpen,
  onInfoClick,
  children,
}: QuizLayoutProps) {
  const showsControls = controls !== undefined
  const [areMobileControlsOpen, setAreMobileControlsOpen] = useState(false)
  const mobileControlsTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileControlsCloseRef = useRef<HTMLButtonElement>(null)
  const mobileControlsPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!areMobileControlsOpen) return

    mobileControlsCloseRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAreMobileControlsOpen(false)
        mobileControlsTriggerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || window.innerWidth >= 640) return

      const focusableElements =
        mobileControlsPanelRef.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), summary, [tabindex]:not([tabindex="-1"])'
        )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const desktopQuery = window.matchMedia('(min-width: 640px)')
    const handleDesktopChange = () => {
      if (desktopQuery.matches) setAreMobileControlsOpen(false)
    }
    desktopQuery.addEventListener('change', handleDesktopChange)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktopQuery.removeEventListener('change', handleDesktopChange)
    }
  }, [areMobileControlsOpen])

  function closeMobileControls() {
    setAreMobileControlsOpen(false)
    mobileControlsTriggerRef.current?.focus()
  }

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
        {mapActions}
        {controls && collapsibleMobileControls && (
          <button
            ref={mobileControlsTriggerRef}
            type="button"
            aria-controls="mobile-quiz-controls"
            aria-expanded={areMobileControlsOpen}
            onClick={() => setAreMobileControlsOpen(true)}
            className="absolute bottom-5 left-5 z-[1100] inline-flex min-h-12 items-center rounded-xl border border-emerald-300/25 bg-slate-950/90 px-4 text-sm font-bold uppercase tracking-[0.16em] text-emerald-200 shadow-xl backdrop-blur-md transition hover:border-emerald-300/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:hidden"
          >
            Quiz controls
          </button>
        )}
        {controls && collapsibleMobileControls && areMobileControlsOpen && (
          <button
            type="button"
            aria-label="Close quiz controls"
            onClick={closeMobileControls}
            className="fixed inset-0 z-[1300] bg-slate-950/70 sm:hidden"
          />
        )}
        {controls && (
          <div
            ref={mobileControlsPanelRef}
            id={collapsibleMobileControls ? 'mobile-quiz-controls' : undefined}
            role={
              collapsibleMobileControls && areMobileControlsOpen
                ? 'dialog'
                : undefined
            }
            aria-modal={
              collapsibleMobileControls && areMobileControlsOpen
                ? true
                : undefined
            }
            aria-label={
              collapsibleMobileControls && areMobileControlsOpen
                ? 'Quiz controls'
                : undefined
            }
            className={
              collapsibleMobileControls
                ? `${areMobileControlsOpen ? 'fixed inset-x-0 bottom-0 z-[1400] block max-h-[85dvh] overflow-y-auto rounded-t-2xl border-t border-white/15 bg-slate-950 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl' : 'hidden'} sm:absolute sm:right-9 sm:top-9 sm:bottom-auto sm:left-auto sm:z-[1100] sm:block sm:max-h-none sm:overflow-visible sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`
                : 'absolute right-5 top-5 z-[1100] sm:right-9 sm:top-9'
            }
          >
            {collapsibleMobileControls && (
              <div className="mb-4 flex items-center justify-between sm:hidden">
                <h2 className="text-base font-bold text-white">
                  Quiz controls
                </h2>
                <button
                  ref={mobileControlsCloseRef}
                  type="button"
                  onClick={closeMobileControls}
                  className="rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  Close
                </button>
              </div>
            )}
            {controls}
          </div>
        )}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/30">
          {overlay !== null && (
            <div
              className={`pointer-events-none absolute inset-x-0 z-[1000] flex justify-center px-4 ${
                showsControls
                  ? collapsibleMobileControls
                    ? 'top-5 sm:top-20 lg:top-5'
                    : 'top-32 sm:top-20 lg:top-5'
                  : 'top-5'
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
