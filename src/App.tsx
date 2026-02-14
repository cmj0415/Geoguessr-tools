import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import USStates from './pages/USStates'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/us/state" element={<Home />} />
    </Routes>
  )
}

export default App
