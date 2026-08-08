import { FaInfoCircle } from 'react-icons/fa'
type Props = {
  active: boolean
  onClick: () => void
}

export default function InfoButton({ active, onClick }: Props) {
  return (
    <button
      type="button"
      aria-label="Open quiz information"
      title="Quiz information"
      onClick={onClick}
      className={[
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border p-0 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300',
        active
          ? 'border-emerald-300/40 bg-emerald-400/15 text-emerald-300'
          : 'border-white/10 bg-white/5 text-slate-400 hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-300',
      ].join(' ')}
    >
      <FaInfoCircle className="h-4 w-4" />
    </button>
  )
}
