import { Link } from 'react-router-dom'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { CountryQuizGrid } from './components/CountryQuizGrid.tsx'
import Header from './components/Header.tsx'
import { HomeQuizTabs } from './components/HomeQuizTabs.tsx'
import { MiscellaneousQuizGrid } from './components/MiscellaneousQuizGrid.tsx'
import NavBar from './components/NavBar.tsx'

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <Header navbar={<NavBar />} title="Master the map" bgUrl="/bg1.png" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 text-left">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300/80">
            Quiz library
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Choose a place to practice
          </h2>
        </div>

        <HomeQuizTabs
          countrySpecificContent={<CountryQuizGrid />}
          miscellaneousContent={<MiscellaneousQuizGrid />}
        />
      </main>

      <Link
        to="/find-the-place"
        aria-label="Play Find the Place"
        title="Play Find the Place"
        className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200/40 bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-950/50 transition hover:-translate-y-1 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 sm:bottom-7 sm:right-7"
      >
        <FaMapMarkedAlt className="h-6 w-6" />
      </Link>
    </div>
  )
}

export default Home
