import { Link } from 'react-router-dom'

type QuizCardLinkProps = {
  label: string
  to: string
}

export default function QuizCardLink({ label, to }: QuizCardLinkProps) {
  return (
    <Link
      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      to={to}
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  )
}
