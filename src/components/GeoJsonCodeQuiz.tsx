import { useMemo } from 'react'
import type { ReactNode } from 'react'
import GeoJsonQuiz from './GeoJsonQuiz'
import type {
  GeoJsonQuizMapConfiguration,
  GeoJsonQuizSelectorProps,
} from './GeoJsonQuiz'
import { RangeSelector } from './RangeSelector'
import { OPEN_STREET_MAP_TILE_LAYER } from '../utils/geoJsonCodeQuiz'

type RangeConfiguration = {
  min: number
  max: number
  defaultRange?: [number, number]
  title: string
  menuLabel: string
  formatValue?: (value: number) => string
}

type GeoJsonCodeQuizProps = {
  title: string
  infoContent: ReactNode
  geoJsonUrl: string
  cache?: RequestCache
  availableCodes: string[]
  getFeatureCodes: (feature: unknown) => string[]
  range: RangeConfiguration
  map: Omit<GeoJsonQuizMapConfiguration, 'tileLayer'>
  emptyQuestion?: string
  loadErrorMessage?: string
}

type CodeQuizSelectorProps = GeoJsonQuizSelectorProps & {
  availableCodes: string[]
  range: RangeConfiguration
}

function CodeQuizSelector({
  availableCodes,
  range,
  onSelectionChange,
}: CodeQuizSelectorProps) {
  return (
    <RangeSelector
      items={availableCodes}
      min={range.min}
      max={range.max}
      defaultRange={range.defaultRange ?? [range.min, range.max]}
      onChange={onSelectionChange}
      title={range.title}
      menuLabel={range.menuLabel}
      formatValue={range.formatValue}
    />
  )
}

export default function GeoJsonCodeQuiz({
  title,
  infoContent,
  geoJsonUrl,
  cache,
  availableCodes,
  getFeatureCodes,
  range,
  map,
  emptyQuestion = 'Select code range to begin',
  loadErrorMessage = 'Unable to load the code map.',
}: GeoJsonCodeQuizProps) {
  const items = useMemo(
    () => availableCodes.map((code) => ({ id: code, label: code })),
    [availableCodes]
  )

  return (
    <GeoJsonQuiz
      title={title}
      infoContent={infoContent}
      geoJsonUrl={geoJsonUrl}
      cache={cache}
      items={items}
      getFeatureIds={getFeatureCodes}
      map={{ ...map, tileLayer: OPEN_STREET_MAP_TILE_LAYER }}
      selector={
        <CodeQuizSelector availableCodes={availableCodes} range={range} />
      }
      emptyQuestion={emptyQuestion}
      loadErrorMessage={loadErrorMessage}
    />
  )
}
