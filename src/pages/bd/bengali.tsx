import { useRef, useState } from 'react'
import type {
  ButtonHTMLAttributes,
  SubmitEvent as ReactSubmitEvent,
} from 'react'
import BengaliExplanation from '../../components/BengaliExplanation'
import NavBar from '../../components/NavBar'
import places from '../../utils/bd/places.json'

type QuizStatus = 'unanswered' | 'incorrect' | 'correct' | 'revealed'
type ButtonVariant = 'primary' | 'secondary' | 'next'
type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant
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
  className = '',
  ...buttonProps
}: ActionButtonProps) {
  return (
    <button
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${className}`}
      {...buttonProps}
    />
  )
}

function normalizeAnswer(value: string) {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
}

function pickNextIndex(currentIndex: number) {
  if (places.length <= 1) return 0

  const nextIndex = Math.floor(Math.random() * (places.length - 1))
  return nextIndex >= currentIndex ? nextIndex + 1 : nextIndex
}

export default function Bengali() {
  const [questionIndex, setQuestionIndex] = useState(() =>
    Math.floor(Math.random() * places.length)
  )
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState<QuizStatus>('unanswered')
  const inputRef = useRef<HTMLInputElement>(null)
  const place = places[questionIndex]
  const canAdvance = status === 'correct' || status === 'revealed'

  function handleSubmit(event: ReactSubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!answer.trim() || canAdvance) return

    const submittedAnswer = normalizeAnswer(answer)
    const acceptedAnswers = [place.answer, ...place.alternativeAnswers]
    const isCorrect = acceptedAnswers.some(
      (acceptedAnswer) => normalizeAnswer(acceptedAnswer) === submittedAnswer
    )

    setStatus(isCorrect ? 'correct' : 'incorrect')
  }

  function handleNext() {
    if (!canAdvance) return

    setQuestionIndex((currentIndex) => pickNextIndex(currentIndex))
    setAnswer('')
    setStatus('unanswered')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const feedback = {
    unanswered: 'Type the established English place name.',
    incorrect: 'Not quite. Check the spelling and try again.',
    correct: 'Correct! Review the breakdown, then continue.',
    revealed: 'Answer revealed. Review the breakdown, then continue.',
  }[status]

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />

      <header className="relative z-[1200] shrink-0 border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <NavBar />
          <div className="flex min-w-0 items-center gap-3 text-right">
            <h1 className="truncate text-base font-bold text-white sm:text-lg">
              Bengali Practice
            </h1>
            <span
              aria-label={`${places.length} place names`}
              className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-semibold text-slate-400"
            >
              {places.length} places
            </span>
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-10">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/30">
          <div className="border-b border-white/10 bg-gradient-to-br from-emerald-950/80 to-slate-900 px-5 py-8 text-center sm:px-10 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300/80">
              Translate this place name
            </p>
            <p
              lang="bn"
              className="mt-5 text-5xl font-bold text-white sm:text-7xl"
            >
              {place.bengali}
            </p>
          </div>

          <form className="p-5 sm:p-8" onSubmit={handleSubmit}>
            <label
              htmlFor="bengali-answer"
              className="mb-2 block text-left text-sm font-bold text-slate-200"
            >
              English place name
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                ref={inputRef}
                id="bengali-answer"
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

        {canAdvance && <BengaliExplanation place={place} />}
      </main>
    </div>
  )
}
