import { useCallback, useId, useRef, useState } from 'react'
import type {
  ButtonHTMLAttributes,
  Ref,
  SubmitEvent as ReactSubmitEvent,
} from 'react'
import {
  normalizeTranslationAnswer,
  pickNextTranslationIndex,
} from '../utils/translationPractice'
import type {
  ScriptReference,
  TranslationPracticeEntry,
} from '../utils/translationPractice'
import NavBar from './NavBar'
import ScriptReferencePanel from './ScriptReferencePanel'
import TranslationExplanation from './TranslationExplanation'

type QuizStatus = 'unanswered' | 'incorrect' | 'correct' | 'revealed'
type ButtonVariant = 'primary' | 'secondary' | 'next'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant
  buttonRef?: Ref<HTMLButtonElement>
}

type TranslationPracticeProps = {
  title: string
  sourceLanguage: string
  entries: TranslationPracticeEntry[]
  itemCountLabel?: string
  componentLabel?: string
  scriptReference?: ScriptReference
}

const BUTTON_BASE_CLASSES =
  'inline-flex min-h-12 items-center justify-center rounded-xl border px-5 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-40 sm:text-base'

const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'border-emerald-300/30 bg-emerald-700 text-white shadow-lg shadow-emerald-950/40 hover:bg-emerald-600 focus-visible:ring-emerald-300/40 disabled:bg-emerald-950 disabled:text-slate-400',
  secondary:
    'border-white/15 bg-white/5 text-slate-100 hover:border-white/30 hover:bg-white/10 focus-visible:ring-white/15',
  next: 'border-rose-300/20 bg-rose-500 text-white shadow-lg shadow-rose-950/30 hover:bg-rose-400 focus-visible:ring-rose-300/30',
}

function ActionButton({
  variant,
  buttonRef,
  className = '',
  ...buttonProps
}: ActionButtonProps) {
  return (
    <button
      ref={buttonRef}
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${className}`}
      {...buttonProps}
    />
  )
}

export default function TranslationPractice({
  title,
  sourceLanguage,
  entries,
  itemCountLabel = 'places',
  componentLabel,
  scriptReference,
}: TranslationPracticeProps) {
  const [questionIndex, setQuestionIndex] = useState(() =>
    entries.length > 0 ? Math.floor(Math.random() * entries.length) : 0
  )
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState<QuizStatus>('unanswered')
  const [isReferenceOpen, setIsReferenceOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const referenceButtonRef = useRef<HTMLButtonElement>(null)
  const inputId = useId()
  const referencePanelId = useId()
  const entry = entries[questionIndex] ?? entries[0]
  const canAdvance = status === 'correct' || status === 'revealed'
  const closeReference = useCallback(() => setIsReferenceOpen(false), [])

  function handleSubmit(event: ReactSubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!entry || !answer.trim() || canAdvance) return

    const submittedAnswer = normalizeTranslationAnswer(answer)
    const acceptedAnswers = [entry.answer, ...(entry.alternativeAnswers ?? [])]
    const isCorrect = acceptedAnswers.some(
      (acceptedAnswer) =>
        normalizeTranslationAnswer(acceptedAnswer) === submittedAnswer
    )

    setStatus(isCorrect ? 'correct' : 'incorrect')
  }

  function handleNext() {
    if (!canAdvance) return

    setQuestionIndex((currentIndex) =>
      pickNextTranslationIndex(entries.length, currentIndex)
    )
    setAnswer('')
    setStatus('unanswered')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const reviewSubject = entry?.segments?.length ? 'breakdown' : 'answer'
  const feedback = {
    unanswered: 'Type the established English place name.',
    incorrect: 'Not quite. Check the spelling and try again.',
    correct: `Correct! Review the ${reviewSubject}, then continue.`,
    revealed: `Answer revealed. Review the ${reviewSubject}, then continue.`,
  }[status]

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />

      <header className="relative z-[1200] shrink-0 border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <NavBar />
          <div className="flex min-w-0 items-center gap-2 text-right sm:gap-3">
            <h1 className="truncate text-base font-bold text-white sm:text-lg">
              {title}
            </h1>
            <span
              aria-label={`${entries.length} ${itemCountLabel}`}
              className="hidden h-10 items-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-semibold text-slate-400 sm:inline-flex"
            >
              {entries.length} {itemCountLabel}
            </span>
            {scriptReference && (
              <ActionButton
                buttonRef={referenceButtonRef}
                aria-controls={referencePanelId}
                aria-expanded={isReferenceOpen}
                aria-haspopup="dialog"
                variant="secondary"
                type="button"
                className="min-h-10 shrink-0 px-3 py-2 text-xs sm:text-sm"
                onClick={() => setIsReferenceOpen(true)}
              >
                Script guide
              </ActionButton>
            )}
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-10">
        {!entry ? (
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center text-slate-400 shadow-2xl shadow-black/30">
            No practice entries are available.
          </section>
        ) : (
          <>
            <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/30">
              <div className="border-b border-white/10 bg-gradient-to-br from-emerald-950/80 to-slate-900 px-5 py-8 text-center sm:px-10 sm:py-12">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300/80">
                  Translate this place name
                </p>
                <p
                  lang={sourceLanguage}
                  className="mt-5 text-5xl font-bold text-white sm:text-7xl"
                >
                  {entry.prompt}
                </p>
              </div>

              <form className="p-5 sm:p-8" onSubmit={handleSubmit}>
                <label
                  htmlFor={inputId}
                  className="mb-2 block text-left text-sm font-bold text-slate-200"
                >
                  English place name
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    ref={inputRef}
                    id={inputId}
                    value={answer}
                    onChange={(event) => {
                      setAnswer(event.target.value)
                      if (status === 'incorrect') setStatus('unanswered')
                    }}
                    autoComplete="off"
                    autoFocus
                    disabled={canAdvance}
                    spellCheck={false}
                    placeholder="Type your answer"
                    className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-lg text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/70 focus:ring-4 focus:ring-emerald-300/10 disabled:opacity-60"
                  />
                  <ActionButton
                    variant="primary"
                    type="submit"
                    disabled={!answer.trim() || canAdvance}
                    className="sm:min-w-36"
                  >
                    Check answer
                  </ActionButton>
                </div>

                <p
                  aria-live="polite"
                  className={`mt-3 min-h-6 text-left text-sm font-medium ${
                    status === 'incorrect'
                      ? 'text-rose-300'
                      : status === 'correct'
                        ? 'text-emerald-300'
                        : 'text-slate-400'
                  }`}
                >
                  {feedback}
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ActionButton
                    variant="secondary"
                    type="button"
                    disabled={canAdvance}
                    onClick={() => setStatus('revealed')}
                  >
                    Show answer
                  </ActionButton>
                  <ActionButton
                    variant="next"
                    type="button"
                    disabled={!canAdvance}
                    onClick={handleNext}
                  >
                    Next place →
                  </ActionButton>
                </div>
              </form>
            </section>

            {canAdvance && (
              <TranslationExplanation
                entry={entry}
                sourceLanguage={sourceLanguage}
                componentLabel={componentLabel}
              />
            )}
          </>
        )}
      </main>

      {scriptReference && (
        <ScriptReferencePanel
          isOpen={isReferenceOpen}
          sourceLanguage={sourceLanguage}
          reference={scriptReference}
          panelId={referencePanelId}
          returnFocusRef={referenceButtonRef}
          onClose={closeReference}
        />
      )}
    </div>
  )
}
