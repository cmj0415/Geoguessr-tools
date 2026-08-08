import Frame from './Frame'
type QuestionCardProps = {
  target: string | null
  className?: string
}

export default function QuestionCard({
  target = '',
  className = '',
}: QuestionCardProps) {
  return (
    <Frame className={`mx-auto ${className}`}>
      <div className="px-6 py-3 text-center sm:px-8 sm:py-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-emerald-300/80">
          Find on the map
        </p>
        <p className="mt-1 text-xl font-black tracking-wide text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:text-2xl">
          {target}
        </p>
      </div>
    </Frame>
  )
}
