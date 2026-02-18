import { useEffect } from 'react';
type InfoWindowProps = {
    onClose: () => void,
    title?: React.ReactNode,
    content?: React.ReactNode
}
export default function InfoWindow({ onClose, title, content }: InfoWindowProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [onClose])

    return (
        <div className="fixed flex inset-0 bg-[#0000007f] items-center justify-center">   
            <div className="bg-black text-white rounded-xl w-full max-w-xl p-3 border-2 border-white z-10">
                <div className="text-center text-xl m-2">
                    { title }
                </div>
                <hr></hr>
                <div className="text-justify text-base m-3">
                    { content }
                </div>
                <p className="text-gray-600">
                    Press esc to close
                </p>
            </div>
        </div>
    )
}