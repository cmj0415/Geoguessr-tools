import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { GeoJsonObject } from 'geojson'
import type L from 'leaflet'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'
import { GEO_JSON_HOVER_STYLE, isGeoJsonObject } from '../utils/geoJsonCodeQuiz'
import {
  getPictureFeatureStyle,
  getRemainingAnswerCount,
  isPictureQuestionComplete,
  pickNextPictureQuestionIndex,
} from '../utils/pictureGeoJsonQuiz'
import type { PictureGeoJsonQuestion } from '../utils/pictureGeoJsonQuiz'
import InfoWindow from './InfoWindow'
import PictureQuestionCard from './PictureQuestionCard'
import { QuizHeaderActionButton, QuizHeaderBadge } from './QuizHeader'
import QuizLayout from './QuizLayout'
import ReferencePanel from './ReferencePanel'
import useFixedGeoJsonAnswerLabels from './useFixedGeoJsonAnswerLabels'
import type { GeoJsonQuizMapConfiguration } from './GeoJsonQuiz'

type PictureQuizGuide = {
  title: string
  content: ReactNode
}

type PictureGeoJsonQuizProps = {
  title: string
  prompt: string
  infoContent: ReactNode
  geoJsonUrl: string
  loadQuestions: (signal: AbortSignal) => Promise<PictureGeoJsonQuestion[]>
  getFeatureIds: (feature: unknown) => string[]
  getFeatureLabel: (feature: unknown) => string | null
  map: GeoJsonQuizMapConfiguration
  mapLoadErrorMessage: string
  guide?: PictureQuizGuide
}

type FeatureLayer = L.Path & {
  feature?: unknown
}

function getFeatures(geoData: GeoJsonObject) {
  if (!('features' in geoData) || !Array.isArray(geoData.features)) return []
  return geoData.features as unknown[]
}

export default function PictureGeoJsonQuiz({
  title,
  prompt,
  infoContent,
  geoJsonUrl,
  loadQuestions,
  getFeatureIds,
  getFeatureLabel,
  map,
  mapLoadErrorMessage,
  guide,
}: PictureGeoJsonQuizProps) {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null)
  const [questions, setQuestions] = useState<PictureGeoJsonQuestion[] | null>(
    null
  )
  const [questionIndex, setQuestionIndex] = useState(-1)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [foundIds, setFoundIds] = useState<Set<string>>(() => new Set())
  const [incorrectIds, setIncorrectIds] = useState<Set<string>>(() => new Set())
  const [isRevealed, setIsRevealed] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const geoRef = useRef<L.GeoJSON | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const guideButtonRef = useRef<HTMLButtonElement>(null)
  const guidePanelId = useId()
  const questionRef = useRef<PictureGeoJsonQuestion | null>(null)
  const foundIdsRef = useRef(foundIds)
  const incorrectIdsRef = useRef(incorrectIds)
  const isRevealedRef = useRef(isRevealed)
  const incorrectTimersRef = useRef(new Map<string, number>())
  const question = questions?.[questionIndex] ?? null

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([
      fetch(geoJsonUrl, { signal: controller.signal }).then((response) => {
        if (!response.ok) throw new Error(mapLoadErrorMessage)
        return response.json() as Promise<unknown>
      }),
      loadQuestions(controller.signal),
    ])
      .then(([rawGeoData, loadedQuestions]) => {
        if (!isGeoJsonObject(rawGeoData)) throw new Error(mapLoadErrorMessage)
        if (loadedQuestions.length === 0) {
          throw new Error('No picture questions are available.')
        }
        setGeoData(rawGeoData)
        setQuestions(loadedQuestions)
        setQuestionIndex(Math.floor(Math.random() * loadedQuestions.length))
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadError(
          error instanceof Error ? error.message : 'Unable to load this quiz.'
        )
      })

    return () => controller.abort()
  }, [geoJsonUrl, loadQuestions, mapLoadErrorMessage])

  const featureData = useMemo(() => {
    const labelsById = new Map<string, string>()
    let error: string | null = null

    if (geoData) {
      for (const feature of getFeatures(geoData)) {
        const featureIds = getFeatureIds(feature)
        const label = getFeatureLabel(feature)
        if (featureIds.length === 0 || !label) {
          error = 'Every map feature needs a country code and name.'
          break
        }
        for (const id of featureIds) {
          if (labelsById.has(id)) {
            error = `The map contains more than one feature for ${id}.`
            break
          }
          labelsById.set(id, label)
        }
        if (error) break
      }
    }

    if (!error && questions && geoData) {
      const missingAnswerId = questions
        .flatMap((item) => item.answerIds)
        .find((id) => !labelsById.has(id))
      if (missingAnswerId) {
        error = `The answer ${missingAnswerId} is missing from the map.`
      }
    }

    return { labelsById, error }
  }, [geoData, getFeatureIds, getFeatureLabel, questions])

  useEffect(() => {
    questionRef.current = question
  }, [question])

  useEffect(() => {
    foundIdsRef.current = foundIds
  }, [foundIds])

  useEffect(() => {
    incorrectIdsRef.current = incorrectIds
  }, [incorrectIds])

  useEffect(() => {
    isRevealedRef.current = isRevealed
  }, [isRevealed])

  useEffect(
    () => () => {
      incorrectTimersRef.current.forEach((timer) => window.clearTimeout(timer))
      incorrectTimersRef.current.clear()
    },
    []
  )

  const correctIds = useMemo(
    () => (isRevealed && question ? new Set(question.answerIds) : foundIds),
    [foundIds, isRevealed, question]
  )
  const revealedAnswerIds = useMemo(
    () => new Set(question?.answerIds ?? []),
    [question]
  )
  const remainingCount = question
    ? isRevealed
      ? 0
      : getRemainingAnswerCount(question.answerIds, foundIds)
    : 0
  const canAdvance =
    isRevealed ||
    (question !== null &&
      isPictureQuestionComplete(question.answerIds, foundIds))

  const styleByState = useCallback(
    (feature?: unknown) =>
      getPictureFeatureStyle(getFeatureIds(feature), {
        correctIds,
        incorrectIds,
      }),
    [correctIds, getFeatureIds, incorrectIds]
  )

  useEffect(() => {
    geoRef.current?.setStyle(styleByState)
  }, [styleByState])

  useFixedGeoJsonAnswerLabels({
    enabled: isRevealed,
    isGeoJsonLoaded: geoData !== null,
    selectedIds: revealedAnswerIds,
    labelsById: featureData.labelsById,
    getFeatureIds,
    referenceZoom: map.maxZoom ?? 18,
    geoRef,
    mapRef,
  })

  function clearIncorrectFeedback() {
    incorrectTimersRef.current.forEach((timer) => window.clearTimeout(timer))
    incorrectTimersRef.current.clear()
    incorrectIdsRef.current = new Set()
    setIncorrectIds(new Set())
  }

  function handleFeatureClick(featureIds: string[]) {
    const currentQuestion = questionRef.current
    if (
      !currentQuestion ||
      isRevealedRef.current ||
      isPictureQuestionComplete(currentQuestion.answerIds, foundIdsRef.current)
    )
      return

    const answerIds = new Set(currentQuestion.answerIds)
    const matchedIds = featureIds.filter((id) => answerIds.has(id))

    if (matchedIds.length > 0) {
      const nextFoundIds = new Set(foundIdsRef.current)
      let changed = false
      matchedIds.forEach((id) => {
        if (!nextFoundIds.has(id)) {
          nextFoundIds.add(id)
          changed = true
        }
      })
      if (!changed) return

      foundIdsRef.current = nextFoundIds
      setFoundIds(nextFoundIds)
      const nextRemainingCount = getRemainingAnswerCount(
        currentQuestion.answerIds,
        nextFoundIds
      )
      setFeedback(
        nextRemainingCount === 0 ? 'All countries found.' : 'Correct.'
      )
      return
    }

    const incorrectId = featureIds[0]
    if (!incorrectId) return
    const nextIncorrectIds = new Set(incorrectIdsRef.current)
    nextIncorrectIds.add(incorrectId)
    incorrectIdsRef.current = nextIncorrectIds
    setIncorrectIds(nextIncorrectIds)
    setFeedback('Not an answer.')

    const existingTimer = incorrectTimersRef.current.get(incorrectId)
    if (existingTimer !== undefined) window.clearTimeout(existingTimer)
    const timer = window.setTimeout(() => {
      const remainingIncorrectIds = new Set(incorrectIdsRef.current)
      remainingIncorrectIds.delete(incorrectId)
      incorrectIdsRef.current = remainingIncorrectIds
      setIncorrectIds(remainingIncorrectIds)
      incorrectTimersRef.current.delete(incorrectId)
    }, 500)
    incorrectTimersRef.current.set(incorrectId, timer)
  }

  function handleReveal() {
    if (!question) return
    clearIncorrectFeedback()
    isRevealedRef.current = true
    setIsRevealed(true)
    setFeedback('Answer revealed.')
  }

  function handleNext() {
    if (!questions || !canAdvance) return
    clearIncorrectFeedback()
    const nextIndex = pickNextPictureQuestionIndex(
      questions.length,
      questionIndex
    )
    setQuestionIndex(nextIndex)
    questionRef.current = questions[nextIndex] ?? null
    foundIdsRef.current = new Set()
    isRevealedRef.current = false
    setFoundIds(new Set())
    setIsRevealed(false)
    setFeedback('')
  }

  function restoreFeatureStyle(layer: FeatureLayer, featureIds: string[]) {
    const currentQuestion = questionRef.current
    const currentCorrectIds = isRevealedRef.current
      ? new Set(currentQuestion?.answerIds ?? [])
      : foundIdsRef.current
    layer.setStyle(
      getPictureFeatureStyle(featureIds, {
        correctIds: currentCorrectIds,
        incorrectIds: incorrectIdsRef.current,
      })
    )
  }

  const closeGuide = useCallback(() => setIsGuideOpen(false), [])
  const visibleError = loadError ?? featureData.error

  return (
    <>
      <QuizLayout
        title={title}
        question={null}
        questionOverlay={
          question && !visibleError ? (
            <PictureQuestionCard
              prompt={prompt}
              imageUrl={question.imageUrl}
              imageAlt={question.imageAlt}
              remainingCount={remainingCount}
              canAdvance={canAdvance}
              isRevealed={isRevealed}
              feedback={feedback}
              onReveal={handleReveal}
              onNext={handleNext}
            />
          ) : undefined
        }
        headerActions={
          <>
            <QuizHeaderBadge ariaLabel={`${questions?.length ?? 0} signs`}>
              {questions?.length ?? 0} signs
            </QuizHeaderBadge>
            {guide && (
              <QuizHeaderActionButton
                buttonRef={guideButtonRef}
                aria-controls={guidePanelId}
                aria-expanded={isGuideOpen}
                aria-haspopup="dialog"
                type="button"
                onClick={() => setIsGuideOpen(true)}
              >
                Guide
              </QuizHeaderActionButton>
            )}
          </>
        }
        isInfoOpen={isInfoOpen}
        onInfoClick={() => setIsInfoOpen(true)}
      >
        <MapContainer
          ref={mapRef}
          center={map.center}
          zoom={map.zoom}
          minZoom={map.minZoom}
          maxZoom={map.maxZoom ?? 18}
          scrollWheelZoom
          className="h-full w-full !bg-slate-900"
        >
          {map.tileLayer && (
            <TileLayer
              attribution={map.tileLayer.attribution}
              url={map.tileLayer.url}
            />
          )}
          {geoData && !featureData.error && (
            <GeoJSON
              data={geoData}
              ref={geoRef}
              style={styleByState}
              onEachFeature={(feature, rawLayer) => {
                const featureIds = getFeatureIds(feature)
                const featureLabel = getFeatureLabel(feature)
                const layer = rawLayer as FeatureLayer

                layer.on({
                  mouseover: () => {
                    const currentQuestion = questionRef.current
                    if (
                      isRevealedRef.current ||
                      (currentQuestion !== null &&
                        isPictureQuestionComplete(
                          currentQuestion.answerIds,
                          foundIdsRef.current
                        )) ||
                      featureIds.some(
                        (id) =>
                          foundIdsRef.current.has(id) ||
                          incorrectIdsRef.current.has(id)
                      )
                    )
                      return
                    layer.setStyle(GEO_JSON_HOVER_STYLE)
                  },
                  mouseout: () => restoreFeatureStyle(layer, featureIds),
                  click: () => handleFeatureClick(featureIds),
                  add: () => {
                    const element = layer.getElement()
                    if (!element || !featureLabel) return
                    element.setAttribute('tabindex', '0')
                    element.setAttribute('role', 'button')
                    element.setAttribute('aria-label', `Select ${featureLabel}`)
                    element.addEventListener('keydown', (event) => {
                      const keyboardEvent = event as KeyboardEvent
                      if (
                        keyboardEvent.key !== 'Enter' &&
                        keyboardEvent.key !== ' '
                      )
                        return
                      event.preventDefault()
                      handleFeatureClick(featureIds)
                    })
                  },
                })
              }}
            />
          )}
        </MapContainer>

        {(!geoData || !questions || visibleError) && (
          <div className="pointer-events-none absolute inset-0 z-[900] flex items-center justify-center bg-slate-950/45 backdrop-blur-sm">
            <p
              role={visibleError ? 'alert' : 'status'}
              className="rounded-xl border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-300 shadow-xl"
            >
              {visibleError ?? 'Loading quiz…'}
            </p>
          </div>
        )}
      </QuizLayout>

      {isInfoOpen && (
        <InfoWindow
          title={<h2 className="text-center font-bold">{title}</h2>}
          content={infoContent}
          onClose={() => setIsInfoOpen(false)}
        />
      )}

      {guide && (
        <ReferencePanel
          isOpen={isGuideOpen}
          eyebrow="Quiz guide"
          title={guide.title}
          panelId={guidePanelId}
          returnFocusRef={guideButtonRef}
          closeLabel="Close quiz guide"
          size="wide"
          onClose={closeGuide}
        >
          {guide.content}
        </ReferencePanel>
      )}
    </>
  )
}
