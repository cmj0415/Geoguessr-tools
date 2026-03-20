import { Link } from 'react-router-dom'
import { FaHome, FaGithub } from 'react-icons/fa'
export default function NavBar() {
  return (
    <nav className="flex gap-4">
      <Link
        className="
                group
                w-10 h-10 rounded-full
                flex items-center justify-center
                border-2 border-transparent
                hover:border-3 hover:border-purple-800
                transition duration-200"
        to="/"
      >
        <FaHome
          className="
                    text-gray-900 w-6 h-6
                    transition duration-200
                    group-hover:scale-110
                    group-hover:text-white"
        />
      </Link>
      <a
        className="
                group
                w-10 h-10 rounded-full
                flex items-center justify-center
                border-2 border-transparent
                hover:border-3 hover:border-purple-800
                transition duration-200"
        href="https://github.com/cmj0415/Geoguessr-tools"
      >
        <FaGithub
          className="
                    text-gray-900 w-6 h-6
                    transition duration-200
                    group-hover:scale-110
                    group-hover:text-white"
        />
      </a>
    </nav>
  )
}
