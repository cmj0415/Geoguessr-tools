import { Link } from 'react-router-dom'
import { FaHome, FaGithub } from 'react-icons/fa'
export default function NavBar() {
  return (
    <nav className="flex items-center gap-2">
      <Link
        aria-label="Home"
        className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-400/10 text-emerald-200 transition hover:bg-emerald-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        to="/"
      >
        <FaHome className="h-4 w-4 transition group-hover:scale-110" />
      </Link>
      <a
        aria-label="GitHub repository"
        className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        href="https://github.com/cmj0415/Geoguessr-tools"
      >
        <FaGithub className="h-5 w-5 transition group-hover:scale-110" />
      </a>
    </nav>
  )
}
