import { FaInfoCircle } from 'react-icons/fa'
type Props = {
  active: boolean
  onClick: () => void
}

export default function InfoButton({ active, onClick }: Props) {
  return (
    <FaInfoCircle
      onClick={onClick}
      className={[
        'transition cursor-pointer',
        active ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500',
      ].join(' ')}
    />
  )
}
