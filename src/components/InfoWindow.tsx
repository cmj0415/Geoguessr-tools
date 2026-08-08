import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type InfoWindowProps = {
  onClose: () => void
  title?: React.ReactNode
  content?: React.ReactNode
}
export default function InfoWindow({
  onClose,
  title,
  content,
}: InfoWindowProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-slate-100 shadow-2xl shadow-black/50"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="text-lg font-bold text-white sm:text-xl">{title}</div>
          <button
            type="button"
            aria-label="Close information"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-0 text-xl text-slate-300 transition hover:border-rose-300/30 hover:bg-rose-400/10 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          >
            ×
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 py-5 text-left text-sm leading-6 text-slate-300 sm:px-6 sm:text-base">
          {content}
        </div>
        <p className="border-t border-white/10 px-5 py-3 text-center text-xs text-slate-500">
          Press Esc or click outside to close
        </p>
      </div>
    </div>,
    document.body
  )
}
