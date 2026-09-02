import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import NavBar from './NavBar'

type QuizHeaderProps = {
  title: string
  actions?: ReactNode
}

type QuizHeaderBadgeProps = {
  ariaLabel: string
  children: ReactNode
}

type QuizHeaderActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonRef?: Ref<HTMLButtonElement>
}

export function QuizHeaderBadge({ ariaLabel, children }: QuizHeaderBadgeProps) {
  return (
    <span
      aria-label={ariaLabel}
      className="hidden h-10 items-center rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-semibold text-slate-400 sm:inline-flex"
    >
      {children}
    </span>
  )
}

export function QuizHeaderActionButton({
  buttonRef,
  className = '',
  ...buttonProps
}: QuizHeaderActionButtonProps) {
  return (
    <button
      ref={buttonRef}
      className={`inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-slate-100 transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/15 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm ${className}`}
      {...buttonProps}
    />
  )
}

export default function QuizHeader({ title, actions }: QuizHeaderProps) {
  return (
    <header className="relative z-[1200] shrink-0 border-b border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <NavBar />
        <div className="flex min-w-0 items-center gap-2 text-right sm:gap-3">
          <h1 className="truncate text-base font-bold text-white sm:text-lg">
            {title}
          </h1>
          {actions}
        </div>
      </div>
    </header>
  )
}
