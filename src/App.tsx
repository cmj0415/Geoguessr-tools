import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import USStates from './pages/USStates'
import USCodes from './pages/USCodes'
import IndonesiaRegencies from './pages/IndonesiaRegencies'
import PhilippinesProvinces from './pages/PhilippinesProvinces'
import BrazilCodes from './pages/BrazilCodes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/us/states" element={<USStates />} />
      <Route path="us/area-codes" element={<USCodes />} />
      <Route path="id/kabupatens" element={<IndonesiaRegencies />} />
      <Route path="/ph/provinces" element={<PhilippinesProvinces />} />
      <Route path="br/area-codes" element={<BrazilCodes />} />
    </Routes>
  )
}

export default App
