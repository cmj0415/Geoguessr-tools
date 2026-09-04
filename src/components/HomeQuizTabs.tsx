import {
  type KeyboardEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useSwipeableTabs } from './useSwipeableTabs.ts'

type HomeQuizTabsProps = {
  countrySpecificContent: ReactNode
  miscellaneousContent: ReactNode
}

type QuizTab = 'country-specific' | 'miscellaneous'

const QUIZ_TABS: { id: QuizTab; label: string }[] = [
  { id: 'country-specific', label: 'Country-specific' },
  { id: 'miscellaneous', label: 'Miscellaneous' },
]

const getTabIndex = (tab: QuizTab) =>
  QUIZ_TABS.findIndex(({ id }) => id === tab)

export function HomeQuizTabs({
  countrySpecificContent,
  miscellaneousContent,
}: HomeQuizTabsProps) {
  const [activeTab, setActiveTab] = useState<QuizTab>('country-specific')
  const [activePanelHeight, setActivePanelHeight] = useState<number>()
  const activeIndex = getTabIndex(activeTab)
  const panelRefs = useRef<Array<HTMLElement | null>>([])
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const {
    handleClickCapture,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    trackRef,
    viewportRef,
  } = useSwipeableTabs({
    activeIndex,
    onSelectIndex: (index) => setActiveTab(QUIZ_TABS[index].id),
    tabCount: QUIZ_TABS.length,
  })

  useLayoutEffect(() => {
    const activePanel = panelRefs.current[activeIndex]
    if (!activePanel) return

    const updatePanelHeight = () => {
      setActivePanelHeight(activePanel.offsetHeight)
    }

    updatePanelHeight()
    const observer = new ResizeObserver(updatePanelHeight)
    observer.observe(activePanel)

    return () => observer.disconnect()
  }, [activeIndex])

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    tabIndex: number
  ) => {
    let nextIndex: number | undefined

    if (event.key === 'ArrowLeft') {
      nextIndex = Math.max(0, tabIndex - 1)
    } else if (event.key === 'ArrowRight') {
      nextIndex = Math.min(QUIZ_TABS.length - 1, tabIndex + 1)
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = QUIZ_TABS.length - 1
    }

    if (nextIndex === undefined || nextIndex === tabIndex) return

    event.preventDefault()
    setActiveTab(QUIZ_TABS[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section aria-label="Quiz categories">
      <div
        className="relative mb-7 grid w-full grid-cols-2 rounded-xl border border-white/10 bg-slate-900/80 p-1 sm:w-fit sm:min-w-96"
        role="tablist"
        aria-label="Quiz category"
      >
        <span
          aria-hidden="true"
          className={`absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-lg bg-emerald-400 shadow-sm shadow-emerald-950/30 transition-transform duration-300 ease-out motion-reduce:transition-none ${
            activeIndex === 1 ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
        {QUIZ_TABS.map(({ id, label }, tabIndex) => {
          const isActive = activeTab === id

          return (
            <button
              key={id}
              ref={(element) => {
                tabRefs.current[tabIndex] = element
              }}
              id={`home-${id}-tab`}
              type="button"
              role="tab"
              aria-controls={`home-${id}-panel`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(id)}
              onKeyDown={(event) => handleTabKeyDown(event, tabIndex)}
              className={`relative rounded-lg px-4 py-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] sm:px-6 ${
                isActive ? 'text-slate-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div
        ref={viewportRef}
        className="touch-pan-y overflow-hidden"
        style={
          activePanelHeight === undefined
            ? undefined
            : { height: `${activePanelHeight}px` }
        }
        onClickCapture={handleClickCapture}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            transform: `translate3d(calc(-${activeIndex * 100}% + var(--home-tab-drag-offset, 0px)), 0, 0)`,
          }}
        >
          <section
            ref={(element) => {
              panelRefs.current[0] = element
            }}
            id="home-country-specific-panel"
            role="tabpanel"
            aria-labelledby="home-country-specific-tab"
            aria-hidden={activeIndex !== 0}
            inert={activeIndex !== 0}
            className="w-full shrink-0"
          >
            {countrySpecificContent}
          </section>

          <section
            ref={(element) => {
              panelRefs.current[1] = element
            }}
            id="home-miscellaneous-panel"
            role="tabpanel"
            aria-labelledby="home-miscellaneous-tab"
            aria-hidden={activeIndex !== 1}
            inert={activeIndex !== 1}
            className="w-full shrink-0"
          >
            {miscellaneousContent}
          </section>
        </div>
      </div>
    </section>
  )
}
