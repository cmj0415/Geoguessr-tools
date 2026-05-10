import Frame from './Frame'
type QuestionCardProps = {
  target: string | null
}

export default function QuestionCard({ target = '' }: QuestionCardProps) {
  return (
    <Frame className="mx-auto">
      <p
        className="
          px-8 py-4
          text-center text-2xl font-black tracking-wide
          text-white
          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
        "
      >
        {target}
      </p>
    </Frame>
  )
}
