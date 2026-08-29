import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'
import Contact from './pages/Contact.jsx'
import { Swiper, SwiperSlide } from 'swiper/react';
import Shop from './pages/Shop.jsx'
import Journal from './pages/Journal.jsx'
import Info from './pages/Info.jsx'

function App() {


  return (
    <>
   
    <Routes>
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>} />          
        <Route path="shop" element={<Shop/>} />          
        <Route path="journal" element={<Journal/>} />          
        <Route path="info" element={<Info/>} />          
        <Route path="about" element={<About/>} /> 
        <Route path="contact" element={<Contact/>} /> 
        <Route path="*" element={<Error/>} /> 
      </Route>
    </Routes>

     
    </>
  )
}

export default App
