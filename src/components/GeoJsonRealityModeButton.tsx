import { MAP_CONTROL_TRIGGER_CLASS_NAME } from './mapControlStyles'

type GeoJsonRealityModeButtonProps = {
  active: boolean
  disabled: boolean
  onClick: () => void
}

export default function GeoJsonRealityModeButton({
  active,
  disabled,
  onClick,
}: GeoJsonRealityModeButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`${MAP_CONTROL_TRIGGER_CLASS_NAME} text-sm font-bold uppercase tracking-[0.16em] text-emerald-200 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-slate-600 ${
        active ? 'border-emerald-300/60 ring-1 ring-emerald-300/15' : ''
      }`}
    >
      {active && (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-emerald-300"
        />
      )}
      Reality Mode
    </button>
  )
}
