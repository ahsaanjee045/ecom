import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar/Navbar'
import SingleProduct from './pages/SingleProduct'
import CartPage from './pages/CartPage'
import { useSelector } from 'react-redux'
import ProductPanel from './pages/AdminPanel/ProductPanel'
import UserPanel from './pages/AdminPanel/UserPanel'
import OrderPanel from './pages/AdminPanel/OrderPanel'

function App() {
  const {user} = useSelector((state) => state.user)

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:_id" element={<SingleProduct />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        {user?.isAdmin && <Route path='/admin/products' element={<ProductPanel/>}/>}
        {user?.isAdmin && <Route path='/admin/users' element={<UserPanel/>}/>}
        {user?.isAdmin && <Route path='/admin/orders' element={<OrderPanel/>}/>}
      </Routes>
    </div>
  )
}

export default App
