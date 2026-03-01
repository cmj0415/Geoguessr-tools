import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { useState, useEffect } from 'react'
import QuestionCard from "../components/QuestionCard"
import InfoButton from "../components/InfoButton"
import InfoWindow from "../components/InfoWindow"

export default function USCodes() {
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [geoData, setGeoData] = useState(null)

    useEffect(() => {
        fetch('/public/map.geojson')
            .then(res => res.json())
            .then(setGeoData)
    }, [])

    function defaultStyle() {
        return {
            weight: 1,
            opacity: 1,
            fillOpacity: 0.2
        };
    }

    function highlightStyle() {
        return {
            weight: 3,
            fillOpacity: 0.5
        };
    }

    return (
        <div className="relative min-h-screen bg-slate-900">
            <header className="relative">
                <h1 className="text-4xl font-bold pt-4 mb-4">US Area Codes Quiz</h1>
                <InfoButton active={isInfoOpen} onClick={ (() => setIsInfoOpen(true)) } />
            </header>
            <div className="mt-16 mx-auto w-full max-w-4xl max-h-[70vh] border-2">
                <MapContainer center={[37.8, -96]} zoom={4} scrollWheelZoom={true} style={{ height: '70vh' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {geoData && (
                        <GeoJSON data={geoData} 
                            style={ defaultStyle }
                            onEachFeature={(feature, layer) => {
                                layer.on({
                                    mouseover: e => {
                                        e.target.setStyle(highlightStyle())
                                    },
                                    mouseout: e => {
                                        e.target.setStyle(defaultStyle())
                                    }
                                })
                            }}
                        />
                    )}
                </MapContainer>
            </div>
        </div>
    )
}