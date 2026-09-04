import { useEffect, useId, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { FaTimes } from 'react-icons/fa'

type ReferencePanelProps = {
  isOpen: boolean
  eyebrow: string
  title: string
  panelId: string
  returnFocusRef: RefObject<HTMLButtonElement | null>
  closeLabel: string
  size?: 'standard' | 'wide'
  children: ReactNode
  onClose: () => void
}

const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ReferencePanel({
  isOpen,
  eyebrow,
  title,
  panelId,
  returnFocusRef,
  closeLabel,
  size = 'standard',
  children,
  onClose,
}: ReferencePanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return

    const previousBodyOverflow = document.body.style.overflow
    const returnFocusElement = returnFocusRef.current
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (!firstElement || !lastElement) {
        event.preventDefault()
        return
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow
      returnFocusElement?.focus()
    }
  }, [isOpen, onClose, returnFocusRef])

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[1300] transition-[visibility] duration-300 motion-reduce:transition-none ${
        isOpen ? 'visible' : 'pointer-events-none invisible delay-300'
      }`}
    >
      <div
        className={`absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        id={panelId}
        aria-labelledby={titleId}
        aria-modal="true"
        role="dialog"
        className={`absolute inset-y-0 right-0 flex flex-col border-l border-white/10 bg-slate-950 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out motion-reduce:transition-none ${
          size === 'wide'
            ? 'w-[min(38rem,calc(100vw-1rem))]'
            : 'w-[min(28rem,calc(100vw-1rem))]'
        } ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-slate-900/80 px-5 py-5">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300/80">
              {eyebrow}
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-bold text-white">
              {title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            aria-label={closeLabel}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            onClick={onClose}
            type="button"
          >
            <FaTimes aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {children}
        </div>
      </aside>
    </div>
  )
}
