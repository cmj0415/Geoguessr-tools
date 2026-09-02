import { useMemo } from 'react'
import type { ReactNode } from 'react'
import GeoJsonQuiz from './GeoJsonQuiz'
import type {
  GeoJsonQuizItem,
  GeoJsonQuizMapConfiguration,
  GeoJsonQuizSelectorProps,
} from './GeoJsonQuiz'
import { QuestionSelector } from './QuestionSelector'

export type GeoJsonRegionQuizItem = GeoJsonQuizItem & {
  region?: string
}

type RegionSelectorConfiguration = {
  divisions: Record<string, string[]>
  title?: string
  menuLabel?: string
  searchPlaceholder?: string
}

type GeoJsonRegionQuizProps = {
  title: string
  infoContent: ReactNode
  geoJsonUrl: string
  cache?: RequestCache
  items: GeoJsonRegionQuizItem[]
  getFeatureIds: (feature: unknown) => string[]
  selector?: RegionSelectorConfiguration
  headerActions?: ReactNode
  map: GeoJsonQuizMapConfiguration
  emptyQuestion?: string
  loadErrorMessage?: string
}

type RegionQuizSelectorProps = GeoJsonQuizSelectorProps & {
  items: GeoJsonRegionQuizItem[]
  selectableRegions: string[]
  configuration: RegionSelectorConfiguration
}

function RegionQuizSelector({
  items,
  selectableRegions,
  configuration,
  onSelectionChange,
}: RegionQuizSelectorProps) {
  return (
    <QuestionSelector
      divisions={configuration.divisions}
      defaultValue={selectableRegions}
      onChange={(selectedRegions) => {
        onSelectionChange?.(
          new Set(
            items
              .filter((item) => item.region && selectedRegions.has(item.region))
              .map((item) => item.id)
          )
        )
      }}
      title={configuration.title}
      menuLabel={configuration.menuLabel}
      searchPlaceholder={configuration.searchPlaceholder}
      variant="menu"
    />
  )
}

export default function GeoJsonRegionQuiz({
  title,
  infoContent,
  geoJsonUrl,
  cache,
  items,
  getFeatureIds,
  selector,
  headerActions,
  map,
  emptyQuestion = selector ? 'Select regions to begin' : 'No regions available',
  loadErrorMessage = 'Unable to load the region map.',
}: GeoJsonRegionQuizProps) {
  const selectableRegions = useMemo(
    () =>
      selector
        ? Array.from(new Set(Object.values(selector.divisions).flat()))
        : [],
    [selector]
  )

  return (
    <GeoJsonQuiz
      title={title}
      infoContent={infoContent}
      geoJsonUrl={geoJsonUrl}
      cache={cache}
      items={items}
      getFeatureIds={getFeatureIds}
      map={map}
      headerActions={headerActions}
      selector={
        selector ? (
          <RegionQuizSelector
            items={items}
            selectableRegions={selectableRegions}
            configuration={selector}
          />
        ) : undefined
      }
      emptyQuestion={emptyQuestion}
      loadErrorMessage={loadErrorMessage}
    />
  )
}
