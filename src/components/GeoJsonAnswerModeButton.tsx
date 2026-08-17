import { MAP_CONTROL_TRIGGER_CLASS_NAME } from './mapControlStyles'

type GeoJsonAnswerModeButtonProps = {
  mode: 'quiz' | 'preparing' | 'answers'
  disabled: boolean
  onClick: () => void
}

export default function GeoJsonAnswerModeButton({
  mode,
  disabled,
  onClick,
}: GeoJsonAnswerModeButtonProps) {
  const isAnswerMode = mode !== 'quiz'

  return (
    <button
      type="button"
      aria-pressed={isAnswerMode}
      disabled={disabled}
      onClick={onClick}
      className={`${MAP_CONTROL_TRIGGER_CLASS_NAME} text-sm font-bold uppercase tracking-[0.16em] text-emerald-200 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-slate-600 ${
        isAnswerMode ? 'border-emerald-300/60 ring-1 ring-emerald-300/15' : ''
      }`}
    >
      {isAnswerMode && (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-emerald-300"
        />
      )}
      {mode === 'quiz'
        ? 'Show answers'
        : mode === 'preparing'
          ? 'Preparing answers…'
          : 'Start quiz'}
    </button>
  )
}
