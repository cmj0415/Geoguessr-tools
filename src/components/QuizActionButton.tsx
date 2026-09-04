import type { ButtonHTMLAttributes, Ref } from 'react'

type QuizActionButtonVariant = 'primary' | 'secondary' | 'next'

type QuizActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: QuizActionButtonVariant
  buttonRef?: Ref<HTMLButtonElement>
}

const BUTTON_BASE_CLASSES =
  'inline-flex min-h-12 items-center justify-center rounded-xl border px-5 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-40 sm:text-base'

const BUTTON_VARIANT_CLASSES: Record<QuizActionButtonVariant, string> = {
  primary:
    'border-emerald-300/30 bg-emerald-700 text-white shadow-lg shadow-emerald-950/40 hover:bg-emerald-600 focus-visible:ring-emerald-300/40 disabled:bg-emerald-950 disabled:text-slate-400',
  secondary:
    'border-white/15 bg-white/5 text-slate-100 hover:border-white/30 hover:bg-white/10 focus-visible:ring-white/15',
  next: 'border-rose-300/20 bg-rose-500 text-white shadow-lg shadow-rose-950/30 hover:bg-rose-400 focus-visible:ring-rose-300/30',
}

export default function QuizActionButton({
  variant,
  buttonRef,
  className = '',
  ...buttonProps
}: QuizActionButtonProps) {
  return (
    <button
      ref={buttonRef}
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${className}`}
      {...buttonProps}
    />
  )
}
