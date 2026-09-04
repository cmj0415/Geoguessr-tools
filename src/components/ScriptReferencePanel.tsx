import type { RefObject } from 'react'
import type { ScriptReference } from '../utils/translationPractice'
import ReferencePanel from './ReferencePanel'

type ScriptReferencePanelProps = {
  isOpen: boolean
  sourceLanguage: string
  reference: ScriptReference
  panelId: string
  returnFocusRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
}

export default function ScriptReferencePanel({
  isOpen,
  sourceLanguage,
  reference,
  panelId,
  returnFocusRef,
  onClose,
}: ScriptReferencePanelProps) {
  return (
    <ReferencePanel
      isOpen={isOpen}
      eyebrow="Script guide"
      title={reference.title}
      panelId={panelId}
      returnFocusRef={returnFocusRef}
      closeLabel="Close script guide"
      onClose={onClose}
    >
      {reference.description && (
        <p className="mb-6 text-sm leading-6 text-slate-300">
          {reference.description}
        </p>
      )}

      <div className="space-y-7">
        {reference.sections.map((section) => (
          <section key={section.title}>
            <h3 className="text-base font-bold text-white">{section.title}</h3>
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
    </ReferencePanel>
  )
}
