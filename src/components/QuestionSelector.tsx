import { useMemo, useState } from 'react'
type QuestionSelectorProps = {
  divisions?: Record<string, string[]>
  value?: string[] // optional: controlled
  defaultValue?: string[] // optional: uncontrolled
  onChange?: (next: Set<string>) => void
  title?: string
  menuLabel?: string
  searchPlaceholder?: string
  variant?: 'panel' | 'menu'
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
  className = '',
}: QuestionSelectorProps) {
  const groups = useMemo(() => Object.entries(divisions ?? {}), [divisions])
  const allItems = useMemo(() => groups.flatMap(([, items]) => items), [groups])

  const isControlled = value !== undefined
  const [inner, setInner] = useState<Set<string>>(new Set(defaultValue ?? []))
  const selectedSet = isControlled ? new Set(value) : inner

  const [query, setQuery] = useState('')

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
          <div className="font-semibold">{title}</div>
          <div className="text-xs text-slate-400">
            {selectedSet.size} of {allItems.length} selected
          </div>
        </div>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            className="border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10"
            onClick={() => setSelected(new Set(allItems))}
          >
            All
          </button>
          <button
            type="button"
            className="border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10"
            onClick={() => setSelected(new Set())}
          >
            None
          </button>
        </div>
      </div>

      <input
        className="mb-3 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-violet-400"
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
              className="rounded-lg border border-white/10 p-3"
            >
              <header className="mb-2 flex items-center justify-between gap-3">
                <div className="font-medium">{groupName} </div>

                <label className="flex cursor-pointer select-none items-center gap-2 text-sm">
                  <input
                    type="checkbox"
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
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-black/10 px-2 py-1 hover:bg-black/20"
                  >
                    <input
                      type="checkbox"
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
      <details className={`group relative w-fit ${className}`}>
        <summary className="flex w-fit cursor-pointer list-none items-center gap-3 whitespace-nowrap rounded-xl border border-violet-400/50 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur-md transition hover:border-violet-300 hover:bg-slate-900">
          <span className="text-sm font-bold uppercase tracking-[0.16em] text-violet-200">
            {menuLabel}
          </span>
          <span className="rounded-full bg-violet-400/15 px-2 py-0.5 text-xs text-violet-100">
            {selectedSet.size}/{allItems.length}
          </span>
          <span className="ml-auto text-xs text-slate-400 transition group-open:rotate-180">
            ▼
          </span>
        </summary>
        <div className="absolute right-0 top-[calc(100%+0.5rem)] max-h-[min(70vh,42rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border border-white/15 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-md">
          {selectorContent}
        </div>
      </details>
    )
  }

  return (
    <div
      className={`mx-auto mt-16 w-full max-w-5xl rounded-xl border border-white/10 bg-white/5 p-4 ${className}`}
    >
      {selectorContent}
    </div>
  )
}
