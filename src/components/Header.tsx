type HeaderProps = {
  navbar: React.ReactNode
  title: string
  infobutton?: React.ReactNode
  bgUrl: string
}
export default function Header({
  navbar,
  title,
  infobutton,
  bgUrl,
}: HeaderProps) {
  return (
    <header
      className="bg-[#0f172a] bg-cover bg-center mb-4 h-[30vh] flex flex-col justify-center"
      style={{
        backgroundImage: `
                    linear-gradient(
                        to bottom, 
                        transparent, 
                        #0f172a
                    ),
                    url(${bgUrl})
                `,
      }}
    >
      <div
        className="
                mx-4
                grid items-center gap-4 py-3
                grid-cols-[1fr_auto_1fr]
                max-[700px]:grid-cols-[1fr_auto]
                "
      >
        <div className="justify-self-start">{navbar}</div>
        <h1 className="text-4xl text-center font-bold pt-4 mb-4">{title}</h1>
        <div className="justify-self-end">{infobutton}</div>
      </div>
    </header>
  )
}
