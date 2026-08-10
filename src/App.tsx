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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="us/area-codes" element={<USCodes />} />
      <Route path="id/kabupatens" element={<IndonesiaRegencies />} />
      <Route path="/jp/prefectures" element={<JapanPrefectures />} />
      <Route path="/ph/provinces" element={<PhilippinesProvinces />} />
      <Route path="br/area-codes" element={<BrazilCodes />} />
      <Route path="bd/bengali" element={<Bengali />} />
      <Route path="mx/postal-codes" element={<MexicoCodes />} />
      <Route path="ru/russian" element={<Russian />} />
    </Routes>
  )
}

export default App
