import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Whishlist from './pages/Wishlist'
import View from './pages/View'
import Cart from './pages/Cart'
import { Navigate, Route, Routes } from 'react-router-dom'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/wishlist' element={<Whishlist/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/view/:id' element={<View/>} />
      <Route path='/*' element={<Navigate to={'/'}/>} />
    </Routes>
   
     <Footer />
    </>
  )
}

export default App