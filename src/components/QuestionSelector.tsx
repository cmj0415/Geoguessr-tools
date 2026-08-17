import { useMemo, useRef, useState } from 'react'
import { MAP_CONTROL_TRIGGER_CLASS_NAME } from './mapControlStyles'
type QuestionSelectorProps = {
  divisions?: Record<string, string[]>
  value?: string[] // optional: controlled
  defaultValue?: string[] // optional: uncontrolled
  onChange?: (next: Set<string>) => void
  title?: string
  menuLabel?: string
  searchPlaceholder?: string
  variant?: 'panel' | 'menu'
  menuAlign?: 'left' | 'right'
  menuPlacement?: 'auto' | 'down' | 'up'
  className?: string
}

export function QuestionSelector({
  divisions,
  value,
  defaultValue,
  onChange,
  title = 'Select regions',
  menuLabel = title,
  searchPlaceholder = 'Find an option...',
  variant = 'panel',
  menuAlign = 'right',
  menuPlacement = 'auto',
  className = '',
}: QuestionSelectorProps) {
  const groups = useMemo(() => Object.entries(divisions ?? {}), [divisions])
  const allItems = useMemo(() => groups.flatMap(([, items]) => items), [groups])

  const isControlled = value !== undefined
  const [inner, setInner] = useState<Set<string>>(new Set(defaultValue ?? []))
  const selectedSet = isControlled ? new Set(value) : inner

  const [query, setQuery] = useState('')
  const summaryRef = useRef<HTMLElement | null>(null)
  const [menuLayout, setMenuLayout] = useState({
    opensUpward: false,
    maxHeight: 672,
  })

  function handleMenuToggle(event: React.SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open || !summaryRef.current) return

    const viewportPadding = 16
    const menuGap = 8
    const summaryBounds = summaryRef.current.getBoundingClientRect()
    const spaceAbove = summaryBounds.top - viewportPadding - menuGap
    const spaceBelow =
      window.innerHeight - summaryBounds.bottom - viewportPadding - menuGap
    const opensUpward =
      menuPlacement === 'up' ||
      (menuPlacement === 'auto' && spaceAbove > spaceBelow)
    const availableHeight = opensUpward ? spaceAbove : spaceBelow

    setMenuLayout({
      opensUpward,
      maxHeight: Math.max(96, Math.min(672, availableHeight)),
    })
  }

  const setSelected = (next: Set<string>) => {
    if (!isControlled) setInner(next)
    onChange?.(next)
  }

  const toggleOne = (item: string) => {
    const next = new Set(selectedSet)
    if (next.has(item)) next.delete(item)
    else next.add(item)
    setSelected(next)
  }

  const toggleGroup = (items: string[]) => {
    const next = new Set(selectedSet)
    const allChecked = items.every((x) => next.has(x))
    if (allChecked) items.forEach((x) => next.delete(x))
    else items.forEach((x) => next.add(x))
    setSelected(next)
  }

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map(([g, items]) => {
        const filtered = items.filter((x) => x.toLowerCase().includes(q))
        return [g, filtered] as const
      })
      .filter(([, items]) => items.length > 0)
  }, [groups, query])

  const selectorContent = (
    <>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-white">{title}</div>
          <div className="text-xs text-slate-400">
            {selectedSet.size} of {allItems.length} selected
          </div>
        </div>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-slate-300 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            onClick={() => setSelected(new Set(allItems))}
          >
            All
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-slate-300 transition hover:border-rose-300/30 hover:bg-rose-400/10 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
            onClick={() => setSelected(new Set())}
          >
            None
          </button>
        </div>
      </div>

      <input
        className="mb-3 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/70 focus:ring-4 focus:ring-emerald-300/10"
        type="search"
        value={query}
        placeholder={searchPlaceholder}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div
        className={
          variant === 'menu'
            ? 'grid gap-3'
            : 'grid grid-cols-1 gap-4 sm:grid-cols-2'
        }
      >
        {filteredGroups.map(([groupName, items]) => {
          const checkedCount = items.filter((x) => selectedSet.has(x)).length
          const allChecked = items.length > 0 && checkedCount === items.length
          const indeterminate = checkedCount > 0 && checkedCount < items.length

          return (
            <section
              key={groupName}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              <header className="mb-2 flex items-center justify-between gap-3">
                <div className="font-medium">{groupName} </div>

                <label className="flex cursor-pointer select-none items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-emerald-500"
                    checked={allChecked}
                    ref={(el) => {
                      if (el) el.indeterminate = indeterminate
                    }}
                    onChange={() => toggleGroup(items)}
                  />
                  <span>{allChecked ? 'Unselect all' : 'Select all'}</span>
                </label>
              </header>

              <div
                className={
                  variant === 'menu'
                    ? 'grid grid-cols-2 gap-2'
                    : 'grid grid-cols-2 gap-2 sm:grid-cols-3'
                }
              >
                {items.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-slate-950/30 px-2.5 py-2 text-slate-300 transition hover:border-emerald-300/25 hover:bg-emerald-400/[0.07] hover:text-white"
                  >
                    <input
                      type="checkbox"
                      className="accent-emerald-500"
                      checked={selectedSet.has(item)}
                      onChange={() => toggleOne(item)}
                    />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )

  if (variant === 'menu') {
    return (
      <details
        className={`group relative w-fit ${className}`}
        onToggle={handleMenuToggle}
      >
        <summary
          ref={summaryRef}
          className={`${MAP_CONTROL_TRIGGER_CLASS_NAME} cursor-pointer list-none`}
        >
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-200">
            {menuLabel}
          </span>
          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-100">
            {selectedSet.size}/{allItems.length}
          </span>
          <span className="ml-auto text-xs text-slate-400 transition group-open:rotate-180">
            ▼
          </span>
        </summary>
        <div
          className={`absolute z-10 w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-left shadow-2xl shadow-black/40 backdrop-blur-md ${
            menuAlign === 'left' ? 'left-0' : 'right-0'
          } ${
            menuLayout.opensUpward
              ? 'bottom-[calc(100%+0.5rem)]'
              : 'top-[calc(100%+0.5rem)]'
          }`}
          style={{ maxHeight: menuLayout.maxHeight }}
        >
          {selectorContent}
        </div>
      </details>
    )
  }

  return (
    <div
      className={`mx-auto mt-16 w-full max-w-5xl rounded-2xl border border-white/10 bg-slate-900/80 p-4 ${className}`}
    >
      {selectorContent}
    </div>
  )
}
