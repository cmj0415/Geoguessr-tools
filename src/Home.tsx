import { CountryCard } from './components/CountryCard.tsx'
import { Link } from 'react-router-dom'
import NavBar from './components/NavBar.tsx'
import Header from './components/Header.tsx'

const QUIZ_LINK_CLASSES =
  'flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-300/30 hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300'

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
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          <CountryCard countryName="Bangladesh" flag={<span>🇧🇩</span>}>
            <Link className={QUIZ_LINK_CLASSES} to="/bd/bengali">
              <span>Translation Practice</span>
              <span aria-hidden="true">→</span>
            </Link>
          </CountryCard>

          <CountryCard countryName="Brazil" flag={<span>🇧🇷</span>}>
            <Link className={QUIZ_LINK_CLASSES} to="/br/area-codes">
              <span>Area Code Quiz</span>
              <span aria-hidden="true">→</span>
            </Link>
          </CountryCard>

          <CountryCard countryName="Indonesia" flag={<span>🇮🇩</span>}>
            <Link className={QUIZ_LINK_CLASSES} to="/id/kabupatens">
              <span>Kabupatens Quiz</span>
              <span aria-hidden="true">→</span>
            </Link>
          </CountryCard>

          <CountryCard countryName="Japan" flag={<span>🇯🇵</span>}>
            <Link className={QUIZ_LINK_CLASSES} to="/jp/prefectures">
              <span>Prefecture Quiz</span>
              <span aria-hidden="true">→</span>
            </Link>
          </CountryCard>

          <CountryCard countryName="Mexico" flag={<span>🇲🇽</span>}>
            <Link className={QUIZ_LINK_CLASSES} to="/mx/postal-codes">
              <span>Postal Code Quiz</span>
              <span aria-hidden="true">→</span>
            </Link>
          </CountryCard>

          <CountryCard countryName="Russia" flag={<span>🇷🇺</span>}>
            <Link className={QUIZ_LINK_CLASSES} to="/ru/russian">
              <span>Translation Practice</span>
              <span aria-hidden="true">→</span>
            </Link>
          </CountryCard>

          <CountryCard countryName="United States" flag={<span>🇺🇸</span>}>
              <Link className={QUIZ_LINK_CLASSES} to="/us/area-codes">
                <span>Area Code Quiz</span>
                <span aria-hidden="true">→</span>
              </Link>
          </CountryCard>
          
          <CountryCard countryName="The Philippines" flag={<span>🇵🇭</span>}>
            <Link className={QUIZ_LINK_CLASSES} to="/ph/provinces">
              <span>Province Quiz</span>
              <span aria-hidden="true">→</span>
            </Link>
          </CountryCard>
        </div>
      </main>
    </div>
  )
}

export default Home
