import { useCallback, useId, useRef, useState } from 'react'
import type { SubmitEvent as ReactSubmitEvent } from 'react'
import {
  normalizeTranslationAnswer,
  pickNextTranslationIndex,
} from '../utils/translationPractice'
import type {
  ScriptReference,
  TranslationPracticeEntry,
} from '../utils/translationPractice'
import QuizHeader, {
  QuizHeaderActionButton,
  QuizHeaderBadge,
} from './QuizHeader'
import QuizActionButton from './QuizActionButton'
import ScriptReferencePanel from './ScriptReferencePanel'
import TranslationExplanation from './TranslationExplanation'

type QuizStatus = 'unanswered' | 'incorrect' | 'correct' | 'revealed'
type TranslationPracticeProps = {
  title: string
  sourceLanguage: string
  entries: TranslationPracticeEntry[]
  itemCountLabel?: string
  componentLabel?: string
  scriptReference?: ScriptReference
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

      <QuizHeader
        title={title}
        actions={
          <>
            <QuizHeaderBadge ariaLabel={`${entries.length} ${itemCountLabel}`}>
              {entries.length} {itemCountLabel}
            </QuizHeaderBadge>
            {scriptReference && (
              <QuizHeaderActionButton
                buttonRef={referenceButtonRef}
                aria-controls={referencePanelId}
                aria-expanded={isReferenceOpen}
                aria-haspopup="dialog"
                type="button"
                onClick={() => setIsReferenceOpen(true)}
              >
                Script guide
              </QuizHeaderActionButton>
            )}
          </>
        }
      />

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
                  <QuizActionButton
                    variant="primary"
                    type="submit"
                    disabled={!answer.trim() || canAdvance}
                    className="sm:min-w-36"
                  >
                    Check answer
                  </QuizActionButton>
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
                  <QuizActionButton
                    variant="secondary"
                    type="button"
                    disabled={canAdvance}
                    onClick={() => setStatus('revealed')}
                  >
                    Show answer
                  </QuizActionButton>
                  <QuizActionButton
                    variant="next"
                    type="button"
                    disabled={!canAdvance}
                    onClick={handleNext}
                  >
                    Next place →
                  </QuizActionButton>
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
