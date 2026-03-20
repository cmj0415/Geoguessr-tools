type ButtonProps = {
  className?: string
  content?: string
  onClick: () => void
}
export default function Button({ className, content, onClick }: ButtonProps) {
  return (
    <div className={className} onClick={onClick}>
      {content}
    </div>
  )
}
