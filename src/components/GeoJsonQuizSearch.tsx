import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { GeoJsonQuizItem } from './GeoJsonQuiz'
import {
  filterPlaceSearchItems,
  findExactCodeSearchItem,
} from '../utils/geoJsonQuizSearch'
import { MAP_CONTROL_TRIGGER_CLASS_NAME } from './mapControlStyles'

export type QuizSearchKind = 'place' | 'code'

type GeoJsonQuizSearchProps = {
  kind: QuizSearchKind
  items: GeoJsonQuizItem[]
  disabled: boolean
  onSelect: (item: GeoJsonQuizItem) => boolean
}

export default function GeoJsonQuizSearch({
  kind,
  items,
  disabled,
  onSelect,
}: GeoJsonQuizSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [error, setError] = useState('')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const listId = useId()
  const matches = useMemo(
    () => (kind === 'place' ? filterPlaceSearchItems(items, query) : []),
    [items, kind, query]
  )

  function closeSearch() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  function openSearch() {
    setQuery('')
    setActiveIndex(0)
    setError('')
    setIsOpen(true)
  }

  function selectItem(item: GeoJsonQuizItem) {
    if (!onSelect(item)) {
      setError('This location is not available on the map.')
      return
    }
    closeSearch()
  }

  useEffect(() => {
    if (!isOpen) return

    inputRef.current?.focus()

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !panelRef.current?.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        closeSearch()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeSearch()
        return
      }
      if (event.key !== 'Tab' || window.innerWidth >= 640) return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled)'
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || kind !== 'place' || matches.length === 0) return
    listRef.current?.children.item(activeIndex)?.scrollIntoView({
      block: 'nearest',
    })
  }, [activeIndex, isOpen, kind, matches])

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (kind === 'place') {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((index) =>
          Math.max(0, Math.min(index + 1, matches.length - 1))
        )
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((index) => Math.max(index - 1, 0))
      } else if (event.key === 'Enter' && matches[activeIndex]) {
        event.preventDefault()
        selectItem(matches[activeIndex])
      }
      return
    }

    if (event.key !== 'Enter') return
    event.preventDefault()
    const item = findExactCodeSearchItem(items, query)
    if (item) selectItem(item)
    else setError('No exact code found. Enter the complete code as shown.')
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={openSearch}
        className={`${MAP_CONTROL_TRIGGER_CLASS_NAME} absolute bottom-20 left-5 z-[1100] text-sm font-bold uppercase tracking-[0.16em] text-emerald-200 disabled:cursor-not-allowed disabled:opacity-40 sm:bottom-9 sm:left-9`}
      >
        Search
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[1500] bg-slate-950/70 sm:bg-transparent" />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={kind === 'place' ? 'Search regions' : 'Search codes'}
            className="fixed inset-x-0 bottom-0 z-[1600] flex max-h-[85dvh] flex-col rounded-t-2xl border border-white/15 bg-slate-950 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:absolute sm:inset-x-auto sm:bottom-24 sm:left-9 sm:w-[min(24rem,calc(100vw-4rem))] sm:rounded-2xl sm:pb-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-bold text-white">
                Search {kind === 'place' ? 'regions' : 'codes'}
              </h2>
              <button
                type="button"
                onClick={closeSearch}
                className="rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Close
              </button>
            </div>
            <input
              ref={inputRef}
              type="search"
              value={query}
              role={kind === 'place' ? 'combobox' : undefined}
              aria-autocomplete={kind === 'place' ? 'list' : undefined}
              aria-controls={kind === 'place' ? listId : undefined}
              aria-expanded={kind === 'place' ? true : undefined}
              aria-activedescendant={
                kind === 'place' && matches[activeIndex]
                  ? `${listId}-${activeIndex}`
                  : undefined
              }
              aria-label={kind === 'place' ? 'Find a region' : 'Enter a code'}
              placeholder={
                kind === 'place'
                  ? 'Type or choose a region...'
                  : 'Enter the full code...'
              }
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
                setError('')
              }}
              onKeyDown={handleInputKeyDown}
              className="w-full rounded-xl border border-white/15 bg-slate-900 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-300/70 focus:ring-2 focus:ring-emerald-300/20"
            />
            {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
            {kind === 'code' && !error && (
              <p className="mt-3 text-xs text-slate-400">
                Press Enter to locate the complete code.
              </p>
            )}
            {kind === 'place' && (
              <div
                ref={listRef}
                id={listId}
                role="listbox"
                aria-label="Matching regions"
                className="mt-3 min-h-0 overflow-y-auto rounded-xl border border-white/10 bg-slate-900/70"
              >
                {matches.length === 0 ? (
                  <p className="p-3 text-sm text-slate-400">
                    No matching regions.
                  </p>
                ) : (
                  matches.map((item, index) => (
                    <button
                      key={item.id}
                      id={`${listId}-${index}`}
                      type="button"
                      role="option"
                      tabIndex={-1}
                      aria-selected={index === activeIndex}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectItem(item)}
                      className={`block w-full px-3 py-2.5 text-left text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300 ${index === activeIndex ? 'bg-emerald-400/15' : 'hover:bg-white/10'}`}
                    >
                      {item.searchLabel ?? item.label}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
