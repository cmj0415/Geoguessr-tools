import { useState } from 'react'
import Frame from './Frame'
import QuizActionButton from './QuizActionButton'

type PictureQuestionCardProps = {
  prompt: string
  imageUrl: string
  imageAlt: string
  remainingCount: number
  canAdvance: boolean
  isRevealed: boolean
  feedback: string
  onReveal: () => void
  onNext: () => void
}

export default function PictureQuestionCard({
  prompt,
  imageUrl,
  imageAlt,
  remainingCount,
  canAdvance,
  isRevealed,
  feedback,
  onReveal,
  onNext,
}: PictureQuestionCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const imageFailed = failedImageUrl === imageUrl

  const remainingLabel = `${remainingCount} ${
    remainingCount === 1 ? 'country' : 'countries'
  } remaining`

  return (
    <Frame className="w-[min(25rem,calc(100vw-2rem))] shadow-2xl shadow-black/50">
      <div className="px-3 py-3 sm:px-4 sm:py-4">
        <p className="text-center text-xs font-bold text-slate-200 sm:text-sm">
          {prompt}
        </p>
        <div className="mt-2 flex h-28 items-center justify-center overflow-hidden rounded-lg bg-slate-950/75 ring-1 ring-inset ring-white/10 sm:h-40 lg:h-44">
          {imageFailed ? (
            <p role="alert" className="px-4 text-center text-sm text-rose-300">
              Unable to load this question image.
            </p>
          ) : (
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="h-full w-full object-contain"
              onError={() => setFailedImageUrl(imageUrl)}
            />
          )}
        </div>

        <div
          aria-live="polite"
          className="mt-2 flex items-center justify-between gap-3 text-xs font-semibold sm:text-sm"
        >
          <span className="text-slate-400">{remainingLabel}</span>
          <span className="min-w-0 truncate text-right text-slate-300">
            {feedback}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <QuizActionButton
            variant="secondary"
            type="button"
            disabled={isRevealed}
            onClick={onReveal}
            className="min-h-10 px-3 py-2 text-xs sm:min-h-11 sm:text-sm"
          >
            Show Answer
          </QuizActionButton>
          <QuizActionButton
            variant="next"
            type="button"
            disabled={!canAdvance}
            onClick={onNext}
            className="min-h-10 px-3 py-2 text-xs sm:min-h-11 sm:text-sm"
          >
            Next →
          </QuizActionButton>
        </div>
      </div>
    </Frame>
  )
}
