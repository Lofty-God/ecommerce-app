import React from 'react'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Orders from './pages/Orders'
import Product from './pages/Product'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Placeorder from './pages/Placeorder'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='px-4 sm:p-[5x] md:p-[7x] lg:p-[9x] '>

        <ToastContainer />
        <Navbar/>
        <Searchbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/placeorder' element={<Placeorder/>} />
            <Route path='/product/:productId' element={<Product/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/verify' element={<Verify />} />

        </Routes>
        <Footer/>
      
    </div>
  )
}

export default App


