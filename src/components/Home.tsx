import { CountryCard } from './CountryCard.tsx'
function Home() {
    return (
        <>
            <div className="flex flex-col items-center pt-16 mb-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to GeoGuessr Quizzes</h1>
                <p className="text-lg text-gray-600">Master your knowledge of the globe</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <CountryCard countryName="Japan" flag={<span>🇯🇵</span>}>
                    <a className="inline-block underline text-white" href="/jp/prefecture">
                    Prefecture Quiz
                    </a>
                </CountryCard>

                <CountryCard countryName="Brazil" flag={<span>🇧🇷</span>}>
                    <a className="inline-block underline text-white" href="/br/area-code">
                    Area Code Quiz
                    </a>
                </CountryCard>
            </div>
        </>
    )
}

export default Home