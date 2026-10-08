export type QuizSearchItem = {
  id: string
  label: string
  searchLabel?: string
}

export function normalizePlaceSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim()
}

export function filterPlaceSearchItems<T extends QuizSearchItem>(
  items: T[],
  query: string
) {
  const normalizedQuery = normalizePlaceSearch(query)
  return [...items]
    .filter((item) =>
      normalizePlaceSearch(item.searchLabel ?? item.label).includes(
        normalizedQuery
      )
    )
    .sort((first, second) =>
      (first.searchLabel ?? first.label).localeCompare(
        second.searchLabel ?? second.label
      )
    )
}

export function findExactCodeSearchItem<T extends QuizSearchItem>(
  items: T[],
  query: string
) {
  return items.find((item) => item.label === query.trim()) ?? null
}
