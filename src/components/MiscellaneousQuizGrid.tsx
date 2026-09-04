import { FaWalking } from 'react-icons/fa'
import { CountryCard } from './CountryCard'
import QuizCardLink from './QuizCardLink'

export function MiscellaneousQuizGrid() {
  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
      <CountryCard
        countryName="Europe"
        flag={<FaWalking aria-hidden="true" className="h-5 w-5 text-sky-300" />}
      >
        <QuizCardLink
          label="Pedestrian Crossing Sign Quiz"
          to="/miscellaneous/europe-pedestrian-crossing-signs"
        />
      </CountryCard>
    </div>
  )
}
