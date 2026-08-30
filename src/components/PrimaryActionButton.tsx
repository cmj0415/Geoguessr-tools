import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PrimaryActionButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled' | 'onClick' | 'type'
> & {
  children: ReactNode
  className?: string
}

export default function PrimaryActionButton({
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
}: PrimaryActionButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 shadow-xl transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 ${className}`}
    >
      {children}
    </button>
  )
}
