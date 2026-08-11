import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />

      <header className="relative z-10 border-b border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
        <NavBar />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-12 text-center sm:px-6">
        <section className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-12 shadow-2xl shadow-black/30 sm:px-10 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300/80">
            Error 404
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
            This quiz does not exist, or its address may have changed.
          </p>
          <Link
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/40 sm:text-base"
            to="/"
          >
            Browse quizzes
          </Link>
        </section>
      </main>
    </div>
  )
}
