import { type MouseEvent, type PointerEvent, useEffect, useRef } from 'react'

type UseSwipeableTabsOptions = {
  activeIndex: number
  onSelectIndex: (index: number) => void
  tabCount: number
}

type PointerGesture = {
  axis: 'horizontal' | 'pending' | 'vertical'
  currentOffset: number
  pointerId: number
  startTime: number
  startX: number
  startY: number
}

export function useSwipeableTabs({
  activeIndex,
  onSelectIndex,
  tabCount,
}: UseSwipeableTabsOptions) {
  const clickResetTimeoutRef = useRef<number | undefined>(undefined)
  const gestureRef = useRef<PointerGesture | undefined>(undefined)
  const snapFrameRef = useRef<number | undefined>(undefined)
  const suppressClickRef = useRef(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(
    () => () => {
      if (snapFrameRef.current !== undefined) {
        cancelAnimationFrame(snapFrameRef.current)
      }
      if (clickResetTimeoutRef.current !== undefined) {
        window.clearTimeout(clickResetTimeoutRef.current)
      }
    },
    []
  )

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return

    gestureRef.current = {
      axis: 'pending',
      currentOffset: 0,
      pointerId: event.pointerId,
      startTime: event.timeStamp,
      startX: event.clientX,
      startY: event.clientY,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    if (
      !gesture ||
      !track ||
      !viewport ||
      gesture.pointerId !== event.pointerId
    )
      return

    const deltaX = event.clientX - gesture.startX
    const deltaY = event.clientY - gesture.startY

    if (gesture.axis === 'pending') {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 8) return
      gesture.axis =
        Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical'

      if (gesture.axis === 'horizontal') {
        event.currentTarget.setPointerCapture(event.pointerId)
        track.style.transition = 'none'
      }
    }

    if (gesture.axis !== 'horizontal') return

    event.preventDefault()
    const isPastFirstTab = activeIndex === 0 && deltaX > 0
    const isPastLastTab = activeIndex === tabCount - 1 && deltaX < 0
    const dragOffset = isPastFirstTab || isPastLastTab ? deltaX * 0.24 : deltaX
    const maxOffset = viewport.offsetWidth
    const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, dragOffset))

    gesture.currentOffset = clampedOffset
    track.style.setProperty('--home-tab-drag-offset', `${clampedOffset}px`)
  }

  const finishPointerGesture = (
    event: PointerEvent<HTMLDivElement>,
    allowTabChange: boolean
  ) => {
    const gesture = gestureRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    if (
      !gesture ||
      !track ||
      !viewport ||
      gesture.pointerId !== event.pointerId
    )
      return

    gestureRef.current = undefined
    if (gesture.axis !== 'horizontal') return

    const deltaX = event.clientX - gesture.startX
    const elapsedTime = Math.max(event.timeStamp - gesture.startTime, 1)
    const velocity = deltaX / elapsedTime
    const distanceThreshold = Math.min(
      120,
      Math.max(52, viewport.offsetWidth * 0.18)
    )
    const shouldChangeTab =
      allowTabChange &&
      (Math.abs(deltaX) >= distanceThreshold || Math.abs(velocity) >= 0.55)
    let nextIndex = activeIndex

    if (shouldChangeTab && deltaX < 0) {
      nextIndex = Math.min(tabCount - 1, activeIndex + 1)
    } else if (shouldChangeTab && deltaX > 0) {
      nextIndex = Math.max(0, activeIndex - 1)
    }

    const preservedOffset =
      gesture.currentOffset + (nextIndex - activeIndex) * viewport.offsetWidth
    track.style.setProperty('--home-tab-drag-offset', `${preservedOffset}px`)

    if (nextIndex !== activeIndex) onSelectIndex(nextIndex)

    suppressClickRef.current = Math.abs(deltaX) >= 8
    if (clickResetTimeoutRef.current !== undefined) {
      window.clearTimeout(clickResetTimeoutRef.current)
    }
    clickResetTimeoutRef.current = window.setTimeout(() => {
      suppressClickRef.current = false
      clickResetTimeoutRef.current = undefined
    }, 0)

    if (snapFrameRef.current !== undefined) {
      cancelAnimationFrame(snapFrameRef.current)
    }
    snapFrameRef.current = requestAnimationFrame(() => {
      track.style.transition = ''
      track.style.setProperty('--home-tab-drag-offset', '0px')
    })
  }

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return
    event.preventDefault()
    event.stopPropagation()
  }

  return {
    handleClickCapture,
    handlePointerCancel: (event: PointerEvent<HTMLDivElement>) =>
      finishPointerGesture(event, false),
    handlePointerDown,
    handlePointerMove,
    handlePointerUp: (event: PointerEvent<HTMLDivElement>) =>
      finishPointerGesture(event, true),
    trackRef,
    viewportRef,
  }
}
