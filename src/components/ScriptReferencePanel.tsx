import { useEffect, useId, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import type { RefObject } from 'react'
import type { ScriptReference } from '../utils/translationPractice'

type ScriptReferencePanelProps = {
  isOpen: boolean
  sourceLanguage: string
  reference: ScriptReference
  panelId: string
  returnFocusRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
}

const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ScriptReferencePanel({
  isOpen,
  sourceLanguage,
  reference,
  panelId,
  returnFocusRef,
  onClose,
}: ScriptReferencePanelProps) {
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
      className={`fixed inset-0 z-[1300] transition-[visibility] duration-300 ${
        isOpen ? 'visible' : 'pointer-events-none invisible delay-300'
      }`}
    >
      <div
        className={`absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300 ${
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
        className={`absolute inset-y-0 right-0 flex w-[min(28rem,calc(100vw-1rem))] flex-col border-l border-white/10 bg-slate-950 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-slate-900/80 px-5 py-5">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300/80">
              Script guide
            </p>
            <h2 id={titleId} className="mt-1 text-xl font-bold text-white">
              {reference.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            aria-label="Close script guide"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            onClick={onClose}
            type="button"
          >
            <FaTimes aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {reference.description && (
            <p className="mb-6 text-sm leading-6 text-slate-300">
              {reference.description}
            </p>
          )}

          <div className="space-y-7">
            {reference.sections.map((section) => (
              <section key={section.title}>
                <h3 className="text-base font-bold text-white">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {section.description}
                  </p>
                )}

                <dl className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.symbol}
                      className="grid grid-cols-[minmax(4rem,auto)_1fr] gap-x-4 gap-y-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <dt
                        lang={sourceLanguage}
                        className="text-2xl font-semibold text-white"
                      >
                        {item.symbol}
                      </dt>
                      <dd className="flex flex-wrap items-center gap-1.5">
                        {item.romanizations.length > 0 ? (
                          item.romanizations.map((romanization) => (
                            <span
                              key={romanization}
                              className="rounded-md bg-emerald-400/10 px-2 py-1 text-sm font-bold text-emerald-200 ring-1 ring-inset ring-emerald-300/15"
                            >
                              {romanization}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm italic text-slate-400">
                            No independent sound
                          </span>
                        )}
                      </dd>
                      {item.note && (
                        <dd className="col-span-2 border-t border-white/10 pt-2 text-sm leading-5 text-slate-400">
                          {item.note}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
