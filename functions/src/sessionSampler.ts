import { randomInt } from 'node:crypto'
import type { Difficulty } from './catalogConfig.js'
import type { CatalogCountry } from './catalogTypes.js'

export type SessionSelection = {
  countryCode: string
  difficulty: Difficulty
  rank: number
}

type RandomIndex = (maximum: number) => number

function validateRandomIndex(index: number, maximum: number) {
  if (!Number.isInteger(index) || index < 0 || index >= maximum) {
    throw new Error('The random index is outside the available range.')
  }
  return index
}

function remainingInCountry(
  country: CatalogCountry,
  difficulties: readonly Difficulty[],
  usedRanks: ReadonlyMap<string, ReadonlySet<number>>
) {
  return difficulties.reduce(
    (total, difficulty) =>
      total +
      country.counts[difficulty] -
      (usedRanks.get(`${country.code}:${difficulty}`)?.size ?? 0),
    0
  )
}

function chooseDifficulty(
  country: CatalogCountry,
  difficulties: readonly Difficulty[],
  usedRanks: ReadonlyMap<string, ReadonlySet<number>>,
  randomIndex: RandomIndex
) {
  const groups = difficulties
    .map((difficulty) => ({
      difficulty,
      remaining:
        country.counts[difficulty] -
        (usedRanks.get(`${country.code}:${difficulty}`)?.size ?? 0),
    }))
    .filter((group) => group.remaining > 0)
  const total = groups.reduce((sum, group) => sum + group.remaining, 0)
  let selection = validateRandomIndex(randomIndex(total), total)
  for (const group of groups) {
    if (selection < group.remaining) return group.difficulty
    selection -= group.remaining
  }
  throw new Error('Unable to select a difficulty.')
}

function chooseUnusedRank(
  count: number,
  used: ReadonlySet<number>,
  randomIndex: RandomIndex
) {
  const remaining = count - used.size
  let selection = validateRandomIndex(randomIndex(remaining), remaining)
  for (let rank = 0; rank < count; rank += 1) {
    if (used.has(rank)) continue
    if (selection === 0) return rank
    selection -= 1
  }
  throw new Error('Unable to select a place rank.')
}

export function createSessionSelections(
  countries: readonly CatalogCountry[],
  difficulties: readonly Difficulty[],
  roundCount: number,
  randomIndex: RandomIndex = randomInt
) {
  const totalEligible = countries.reduce(
    (total, country) =>
      total +
      difficulties.reduce(
        (countryTotal, difficulty) =>
          countryTotal + country.counts[difficulty],
        0
      ),
    0
  )
  if (!Number.isInteger(roundCount) || roundCount < 1) {
    throw new Error('Round count must be a positive integer.')
  }
  if (totalEligible < roundCount) {
    throw new Error(`At least ${roundCount} eligible places are required.`)
  }

  const usedRanks = new Map<string, Set<number>>()
  const selections: SessionSelection[] = []
  while (selections.length < roundCount) {
    const availableCountries = countries.filter(
      (country) => remainingInCountry(country, difficulties, usedRanks) > 0
    )
    const country =
      availableCountries[
        validateRandomIndex(
          randomIndex(availableCountries.length),
          availableCountries.length
        )
      ]
    if (!country) throw new Error('Unable to select a country.')

    const difficulty = chooseDifficulty(
      country,
      difficulties,
      usedRanks,
      randomIndex
    )
    const groupKey = `${country.code}:${difficulty}`
    const used = usedRanks.get(groupKey) ?? new Set<number>()
    const rank = chooseUnusedRank(
      country.counts[difficulty],
      used,
      randomIndex
    )
    used.add(rank)
    usedRanks.set(groupKey, used)
    selections.push({ countryCode: country.code, difficulty, rank })
  }
  return selections
}
