import { useEffect } from 'react';
type InfoWindowProps = {
    onClose: () => void,
    content?: React.ReactNode
}
export default function InfoWindow({ onClose, content }: InfoWindowProps) {
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
                { content }
            </div>
        </div>
    )
}