import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'
import Contact from './pages/Contact.jsx'
import Shop from './pages/Shop.jsx'
import Journal from './pages/Journal.jsx'
import Info from './pages/Info.jsx'
import Cart from './pages/Cart.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Checkout from './pages/Checkout.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="journal" element={<Journal />} />
        <Route path="info" element={<Info />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default App
