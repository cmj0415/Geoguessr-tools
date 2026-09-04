import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import USCodes from './pages/us/codes'
import IndonesiaRegencies from './pages/id/regencies'
import PhilippinesProvinces from './pages/ph/provinces'
import BrazilCodes from './pages/br/codes'
import JapanPrefectures from './pages/jp/prefectures'
import JapanCodes from './pages/jp/codes'
import KenyaCounties from './pages/ke/counties'
import KenyaPostalCodes from './pages/ke/postalCodes'
import Bengali from './pages/bd/bengali'
import MexicoCodes from './pages/mx/codes'
import MexicoPostalCodes from './pages/mx/postalCodes'
import Russian from './pages/ru/russian'
import PageMetadata from './components/PageMetadata'
import NotFound from './pages/NotFound'
import NigeriaStates from './pages/ng/states'
import NewZealandRegions from './pages/nz/regions'
import FranceDepartments from './pages/fr/departments'
import BangladeshDistricts from './pages/bd/districts'
import GermanyCodes from './pages/de/codes'
import GermanyStates from './pages/de/states'
import GermanyDistricts from './pages/de/districts'
import ItalyProvinces from './pages/it/provinces'
import RussiaFederalSubjects from './pages/ru/federalSubjects'
import RussiaCodes from './pages/ru/codes'
import SpainProvinces from './pages/es/provinces'
import SpainProvincialRoadPrefixes from './pages/es/roadPrefix'
import SpainCodes from './pages/es/codes'
import FindThePlace from './pages/findThePlace'
import TurkeyProvinces from './pages/tr/provinces'
import TurkeyCodes from './pages/tr/codes'
import EcuadorProvinces from './pages/ec/provinces'
import EcuadorTaxiLetters from './pages/ec/taxiLetters'
import PeruProvinces from './pages/pe/provinces'
import ArgentinaProvinces from './pages/ar/provinces'
import ColombiaDepartments from './pages/co/departments'
import ChileRegions from './pages/cl/regions'
import ParaguayDepartments from './pages/py/departments'
import UruguayDepartments from './pages/uy/departments'
import TurkeyDistricts from './pages/tr/districts'
import SouthAfricaProvinces from './pages/za/provinces'
import SouthAfricaCodes from './pages/za/codes'
import IndiaStates from './pages/in/states'
import RomaniaCounties from './pages/ro/counties'
import ThailandCodes from './pages/th/codes'
import ThailandProvinceAbbreviations from './pages/th/provinceAbbreviations'
import ThailandProvinces from './pages/th/provinces'
import TaiwanCounties from './pages/tw/counties'
import TaiwanCodes from './pages/tw/codes'
import VietnamCodes from './pages/vn/codes'
import VietnamProvincesPost2025 from './pages/vn/provincesPost2025'
import VietnamProvincesPre2025 from './pages/vn/provincesPre2025'
import EuropePedestrianSigns from './pages/miscellaneous/europePedestrianSigns'

const TaiwanPoleNumbers = lazy(() => import('./pages/tw/poleNumbers'))
const HokkaidoPoleNumbers = lazy(() => import('./pages/jp/hokkaidoPoleNumbers'))

function App() {
  return (
    <>
      <PageMetadata />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-the-place" element={<FindThePlace />} />
        <Route path="us/area-codes" element={<USCodes />} />
        <Route path="id/regencies" element={<IndonesiaRegencies />} />
        <Route path="/jp/prefectures" element={<JapanPrefectures />} />
        <Route path="/jp/area-codes" element={<JapanCodes />} />
        <Route path="/ke/counties" element={<KenyaCounties />} />
        <Route path="/ke/postal-codes" element={<KenyaPostalCodes />} />
        <Route
          path="/jp/hokkaido-pole-numbers"
          element={
            <Suspense
              fallback={
                <div className="h-dvh bg-slate-950" aria-label="Loading" />
              }
            >
              <HokkaidoPoleNumbers />
            </Suspense>
          }
        />
        <Route path="/ph/provinces" element={<PhilippinesProvinces />} />
        <Route path="br/area-codes" element={<BrazilCodes />} />
        <Route path="bd/bengali" element={<Bengali />} />
        <Route path="bd/districts" element={<BangladeshDistricts />} />
        <Route path="de/area-codes" element={<GermanyCodes />} />
        <Route path="de/states" element={<GermanyStates />} />
        <Route path="de/districts" element={<GermanyDistricts />} />
        <Route path="fr/departments" element={<FranceDepartments />} />
        <Route path="it/provinces" element={<ItalyProvinces />} />
        <Route path="mx/area-codes" element={<MexicoCodes />} />
        <Route path="mx/postal-codes" element={<MexicoPostalCodes />} />
        <Route path="ng/states" element={<NigeriaStates />} />
        <Route path="nz/regions" element={<NewZealandRegions />} />
        <Route path="ru/area-codes" element={<RussiaCodes />} />
        <Route path="ru/federal-subjects" element={<RussiaFederalSubjects />} />
        <Route path="ru/russian" element={<Russian />} />
        <Route path="es/provinces" element={<SpainProvinces />} />
        <Route path="es/area-codes" element={<SpainCodes />} />
        <Route
          path="es/provincial-road-prefixes"
          element={<SpainProvincialRoadPrefixes />}
        />
        <Route path="tr/provinces" element={<TurkeyProvinces />} />
        <Route path="tr/area-codes" element={<TurkeyCodes />} />
        <Route path="ec/provinces" element={<EcuadorProvinces />} />
        <Route path="ec/taxi-letters" element={<EcuadorTaxiLetters />} />
        <Route path="pe/provinces" element={<PeruProvinces />} />
        <Route path="ar/provinces" element={<ArgentinaProvinces />} />
        <Route path="co/departments" element={<ColombiaDepartments />} />
        <Route path="cl/regions" element={<ChileRegions />} />
        <Route path="py/departments" element={<ParaguayDepartments />} />
        <Route path="uy/departments" element={<UruguayDepartments />} />
        <Route path="tr/districts" element={<TurkeyDistricts />} />
        <Route path="za/provinces" element={<SouthAfricaProvinces />} />
        <Route path="za/area-codes" element={<SouthAfricaCodes />} />
        <Route path="in/states" element={<IndiaStates />} />
        <Route path="ro/counties" element={<RomaniaCounties />} />
        <Route path="th/area-codes" element={<ThailandCodes />} />
        <Route path="th/provinces" element={<ThailandProvinces />} />
        <Route
          path="th/province-abbreviations"
          element={<ThailandProvinceAbbreviations />}
        />
        <Route path="tw/counties" element={<TaiwanCounties />} />
        <Route path="tw/area-codes" element={<TaiwanCodes />} />
        <Route path="vn/area-codes" element={<VietnamCodes />} />
        <Route
          path="vn/provinces-post-2025"
          element={<VietnamProvincesPost2025 />}
        />
        <Route
          path="vn/provinces-pre-2025"
          element={<VietnamProvincesPre2025 />}
        />
        <Route
          path="miscellaneous/europe-pedestrian-crossing-signs"
          element={<EuropePedestrianSigns />}
        />
        <Route
          path="tw/pole-numbers"
          element={
            <Suspense
              fallback={
                <div className="h-dvh bg-slate-950" aria-label="Loading" />
              }
            >
              <TaiwanPoleNumbers />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
