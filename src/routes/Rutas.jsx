import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from '../components/Menu/Menu'
import Tarea from '../components/Tareas/Tarea'
import Temporizador from '../components/Temporizador/Temporizador'

const Rutas = () => {
  return (
    <BrowserRouter>
    <Menu />
        <Routes>
            <Route path="/" element={<Tarea />} />
            <Route path="/Temporizador" element={<Temporizador />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Rutas