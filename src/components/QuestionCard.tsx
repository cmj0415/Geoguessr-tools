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
      <p
        className="
          px-6 py-3 sm:px-8 sm:py-4
          text-center text-xl font-black tracking-wide sm:text-2xl
          text-white
          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
        "
      >
        {target}
      </p>
    </Frame>
  )
}
