import React, { useMemo, useState } from "react";
type QuestionSelectorProps = {
  divisions?: Record<string, string[]>;
  value?: string[];                 // optional: controlled
  defaultValue?: string[];          // optional: uncontrolled
  onChange?: (next: Set<string>) => void;
  title?: string;
};

export function QuestionSelector({
  divisions,
  value,
  defaultValue,
  onChange,
  title = "Select regions",
}: QuestionSelectorProps) {
  const groups = useMemo(() => Object.entries(divisions ?? {}), [divisions]);

  const isControlled = value !== undefined;
  const [inner, setInner] = useState<Set<string>>(
    new Set(defaultValue ?? [])
  );
  const selectedSet = isControlled ? new Set(value) : inner;

  const [query, setQuery] = useState("");

  const setSelected = (next: Set<string>) => {
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const toggleOne = (item: string) => {
    const next = new Set(selectedSet);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setSelected(next);
  };

  const toggleGroup = (items: string[]) => {
    const next = new Set(selectedSet);
    const allChecked = items.every((x) => next.has(x));
    if (allChecked) items.forEach((x) => next.delete(x));
    else items.forEach((x) => next.add(x));
    setSelected(next);
  };

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map(([g, items]) => {
        const filtered = items.filter((x) => x.toLowerCase().includes(q));
        return [g, filtered] as const;
      })
      .filter(([, items]) => items.length > 0);
  }, [groups, query]);

  return (
    <div className="mt-16 w-full max-w-5xl mx-auto rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm opacity-70">
          selected: {selectedSet.size}
        </div>
      </div>    

      <div className="grid grid-cols-2 gap-6 items-start">
        {filteredGroups.map(([groupName, items]) => {
          const checkedCount = items.filter((x) => selectedSet.has(x)).length;
          const allChecked = items.length > 0 && checkedCount === items.length;
          const indeterminate =
            checkedCount > 0 && checkedCount < items.length;

          return (
            <section key={groupName} className="rounded-lg border border-white/10 p-3">
              <header className="mb-2 flex items-center justify-between gap-3">
                <div className="font-medium">
                  {groupName}{" "}
                </div>

                <label className="flex cursor-pointer select-none items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    ref={(el) => {
                      if (el) el.indeterminate = indeterminate;
                    }}
                    onChange={() => toggleGroup(items)}
                  />
                  <span>{allChecked ? "Unselect all" : "Select all"}</span>
                </label>
              </header>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
          );
        })}
      </div>
    </div>
  );
}