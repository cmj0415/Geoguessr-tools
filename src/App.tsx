import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import USCodes from './pages/us/codes'
import IndonesiaRegencies from './pages/id/regencies'
import PhilippinesProvinces from './pages/ph/provinces'
import BrazilCodes from './pages/br/codes'
import JapanPrefectures from './pages/jp/prefectures'
import Bengali from './pages/bd/bengali'
import MexicoCodes from './pages/mx/codes'
import Russian from './pages/ru/russian'
import PageMetadata from './components/PageMetadata'
import NotFound from './pages/NotFound'
import NigeriaStates from './pages/ng/states'
import FranceDepartments from './pages/fr/departments'
import BangladeshDistricts from './pages/bd/districts'
import GermanyCodes from './pages/de/codes'
import ItalyProvinces from './pages/it/provinces'
import RussiaFederalSubjects from './pages/ru/federalSubjects'
import RussiaCodes from './pages/ru/codes'
import SpainProvinces from './pages/es/provinces'
import SpainProvincialRoadPrefixes from './pages/es/roadPrefix'

function App() {
  return (
    <>
      <PageMetadata />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="us/area-codes" element={<USCodes />} />
        <Route path="id/regencies" element={<IndonesiaRegencies />} />
        <Route path="/jp/prefectures" element={<JapanPrefectures />} />
        <Route path="/ph/provinces" element={<PhilippinesProvinces />} />
        <Route path="br/area-codes" element={<BrazilCodes />} />
        <Route path="bd/bengali" element={<Bengali />} />
        <Route path="bd/districts" element={<BangladeshDistricts />} />
        <Route path="de/area-codes" element={<GermanyCodes />} />
        <Route path="fr/departments" element={<FranceDepartments />} />
        <Route path="it/provinces" element={<ItalyProvinces />} />
        <Route path="mx/postal-codes" element={<MexicoCodes />} />
        <Route path="ng/states" element={<NigeriaStates />} />
        <Route path="ru/area-codes" element={<RussiaCodes />} />
        <Route path="ru/federal-subjects" element={<RussiaFederalSubjects />} />
        <Route path="ru/russian" element={<Russian />} />
        <Route path="es/provinces" element={<SpainProvinces />} />
        <Route
          path="es/provincial-road-prefixes"
          element={<SpainProvincialRoadPrefixes />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
