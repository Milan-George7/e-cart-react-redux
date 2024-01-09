import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import View from './pages/View'
import Header from './Components/Header'
import Footer from './Components/Footer'


function App() {
  

  return (
    <>
    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/wishlist' element={<Wishlist/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/view/:id' element={<View/>} />
      <Route path='/*' element={<Navigate to={'/'}/>} />
    </Routes>
    <Footer/>

    </>
  )
}

export default App
