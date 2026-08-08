type FrameProps = {
  children: React.ReactNode
  className?: string
}

export default function Frame({ children, className = '' }: FrameProps) {
  return (
    <div
      className={`
        w-fit
        rounded-2xl
        border border-emerald-300/20
        bg-slate-950/80
        p-1
        ${className}
      `}
    >
      <div
        className="
          rounded-xl
          border border-white/10
          bg-slate-900/95
          shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
        "
      >
        {children}
      </div>
    </div>
  )
}
