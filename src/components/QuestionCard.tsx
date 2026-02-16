type QuestionCardProps = {
    target?: string;
}
export default function QuestionCard({ target = "" }: QuestionCardProps) {
    return (
        <div className="inline-block bg-white">
            <p className="
                text-center text-slate-900 text-xl font-bold p-3
                outline-3 outline-dashed outline-black
                -outline-offset-4
            ">
                { target }
            </p>
        </div>
    )   
}