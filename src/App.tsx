import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import USStates from './pages/USStates'
import IndonesiaRegencies from './pages/IndonesiaRegencies'
import PhilippinesProvinces from './pages/PhilippinesProvinces'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/us/states" element={<USStates />} />
      <Route path="id/kabupatens" element={<IndonesiaRegencies />} />
      <Route path="/ph/provinces" element={<PhilippinesProvinces />} />
    </Routes>
  )
}

export default App
