import { useEffect, useMemo, useState } from 'react'
import type { RefObject } from 'react'
import L from 'leaflet'
import {
  getProjectedPolygons,
  getSelectedAnswerLabels,
  placePreparedLabelFeatures,
  prepareLabelFeature,
} from '../utils/geoJsonFixedLabels'
import type { PreparedLabelFeature } from '../utils/geoJsonFixedLabels'

type AnswerFeatureLayer = L.Layer & {
  feature?: unknown
}

type FixedAnswerPlacement = {
  featureIds: string[]
  coordinate: L.LatLng
}

type UseFixedGeoJsonAnswerLabelsOptions = {
  enabled: boolean
  isGeoJsonLoaded: boolean
  selectedIds: ReadonlySet<string>
  labelsById: ReadonlyMap<string, string>
  getFeatureIds: (feature: unknown) => string[]
  referenceZoom: number
  geoRef: RefObject<L.GeoJSON | null>
  mapRef: RefObject<L.Map | null>
}

type LabelDefinition = {
  featureIds: string[]
  label: string
  feature: unknown
  width: number
  height: number
}

function measureLabelDefinitions(
  definitions: Array<Omit<LabelDefinition, 'width' | 'height'>>
) {
  const container = document.createElement('div')
  container.className = 'geo-json-answer-measurements'
  const elements = definitions.map(({ label }) => {
    const element = document.createElement('span')
    element.className = 'leaflet-tooltip geo-json-answer-label'
    element.textContent = label
    container.appendChild(element)
    return element
  })
  document.body.appendChild(container)

  const measured = definitions.map((definition, index) => {
    const bounds = elements[index].getBoundingClientRect()
    return {
      ...definition,
      width: bounds.width || Math.min(192, definition.label.length * 7 + 12),
      height: bounds.height || 24,
    }
  })
  container.remove()
  return measured
}

export default function useFixedGeoJsonAnswerLabels({
  enabled,
  isGeoJsonLoaded,
  selectedIds,
  labelsById,
  getFeatureIds,
  referenceZoom,
  geoRef,
  mapRef,
}: UseFixedGeoJsonAnswerLabelsOptions) {
  const [placements, setPlacements] = useState<FixedAnswerPlacement[] | null>(
    null
  )
  const allIds = useMemo(() => new Set(labelsById.keys()), [labelsById])

  useEffect(() => {
    if (!enabled || !isGeoJsonLoaded || placements !== null) return

    const currentMap = mapRef.current
    if (!currentMap) return
    const leafletMap: L.Map = currentMap
    let timer: number | null = null
    let cancelled = false

    const rawDefinitions: Array<Omit<LabelDefinition, 'width' | 'height'>> = []
    geoRef.current?.eachLayer((candidateLayer) => {
      const layer = candidateLayer as AnswerFeatureLayer
      const featureIds = getFeatureIds(layer.feature)
      const labels = getSelectedAnswerLabels(featureIds, allIds, labelsById)
      if (labels.length === 0) return
      rawDefinitions.push({
        featureIds,
        label: labels.join(' · '),
        feature: layer.feature,
      })
    })
    const definitions = measureLabelDefinitions(rawDefinitions)
    const preparedFeatures: PreparedLabelFeature[] = []
    const preparedDefinitions: LabelDefinition[] = []
    let index = 0

    function processBatch() {
      const batchEnd = Math.min(index + 12, definitions.length)
      while (index < batchEnd) {
        const definition = definitions[index]
        const polygons = getProjectedPolygons(
          definition.feature,
          (latitude, longitude) => {
            const point = leafletMap.project(
              L.latLng(latitude, longitude),
              referenceZoom
            )
            return { x: point.x, y: point.y }
          }
        )
        if (polygons.length > 0) {
          preparedFeatures.push(
            prepareLabelFeature(polygons, definition.width, definition.height)
          )
          preparedDefinitions.push(definition)
        }
        index += 1
      }

      if (cancelled) return
      if (index < definitions.length) {
        timer = window.setTimeout(processBatch, 0)
        return
      }

      const points = placePreparedLabelFeatures(preparedFeatures)
      setPlacements(
        points.map((point, pointIndex) => ({
          featureIds: preparedDefinitions[pointIndex].featureIds,
          coordinate: leafletMap.unproject(
            L.point(point.x, point.y),
            referenceZoom
          ),
        }))
      )
    }

    timer = window.setTimeout(processBatch, 0)
    return () => {
      cancelled = true
      if (timer !== null) window.clearTimeout(timer)
    }
  }, [
    allIds,
    enabled,
    geoRef,
    getFeatureIds,
    isGeoJsonLoaded,
    labelsById,
    mapRef,
    placements,
    referenceZoom,
  ])

  useEffect(() => {
    if (!enabled || placements === null || !mapRef.current) return

    const tooltipGroup = L.layerGroup().addTo(mapRef.current)
    placements.forEach(({ featureIds, coordinate }) => {
      const labels = getSelectedAnswerLabels(
        featureIds,
        selectedIds,
        labelsById
      )
      if (labels.length === 0) return

      const content = document.createElement('span')
      content.textContent = labels.join(' · ')
      L.tooltip({
        permanent: true,
        direction: 'center',
        className: 'geo-json-answer-label',
        interactive: false,
      })
        .setLatLng(coordinate)
        .setContent(content)
        .addTo(tooltipGroup)
    })

    return () => {
      tooltipGroup.remove()
    }
  }, [enabled, labelsById, mapRef, placements, selectedIds])

  return {
    isPrepared: placements !== null,
    isPreparing: enabled && placements === null,
  }
}
