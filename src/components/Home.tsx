import { CountryCard } from './CountryCard.tsx'
function Home() {
    return (
        <div className="relative min-h-screen bg-slate-900">

            {/* background image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 h-[30vh]"
                style={{ backgroundImage: "url('/src/assets/bg1.png')" }}
            />

            {/* fade transition */}
            <div className="
                absolute top-0 left-0 w-full h-[30vh]
                bg-linear-to-b from-transparent to-slate-900
            " />

            {/* content */}
            <div className="relative z-10 mx-20">
                <div className="flex flex-col items-center pt-16 mb-24 text-center">
                    <h1 className="text-4xl font-bold mt-4 mb-4">Welcome to GeoGuessr Quizzes</h1>
                    <p className="text-lg text-gray-400">Master your knowledge of the globe</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <CountryCard countryName="Brazil" flag={<span>🇧🇷</span>}>
                        <a className="inline-block underline text-white" href="/br/area-code">
                            Area Code Quiz
                        </a>
                    </CountryCard>

                    <CountryCard countryName="India" flag={<span>🇮🇳</span>}>
                        <a className="inline-block underline text-white" href="/in/states">
                            States Quiz
                        </a>
                    </CountryCard>

                    <CountryCard countryName="Indonesia" flag={<span>🇮🇩</span>}>
                        <a className="inline-block underline text-white" href="/id/kabupaten">
                            Kabupatens Quiz
                        </a>
                    </CountryCard>

                    <CountryCard countryName="Japan" flag={<span>🇯🇵</span>}>
                        <a className="inline-block underline text-white" href="/jp/prefecture">
                            Prefecture Quiz
                        </a>
                    </CountryCard>

                    <CountryCard countryName="Mexico" flag={<span>🇲🇽</span>}>
                        <a className="inline-block underline text-white" href="/mx/postal-code">
                            Postal Code Quiz
                        </a>
                    </CountryCard>

                    <CountryCard countryName="United States" flag={<span>🇺🇸</span>}>
                        <ul>
                            <li>
                                <a className="inline-block underline text-white" href="/usa/area-code">
                                    Area Code Quiz
                                </a>
                            </li>
                            <li>
                                <a className="inline-block underline text-white" href="/usa/states">
                                    States Quiz
                                </a>
                            </li>
                        </ul> 
                    </CountryCard>
                </div>
            </div>
        </div>
    )
}

export default Home