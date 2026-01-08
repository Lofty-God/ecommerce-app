import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='items-center'>
      <div className='flex items-center justify-between py-2 px-[4%]'>
        <img className='w-[max(10%, 60px)] h-40 text-xl' src={assets.logo} alt=''/>
        <button onClick={()=>setToken('')} className="sm:text-sm pl-8 bg-gray-600 text-white rounded-full text-center text-xs px-5 sm:py-2 sm:px-7">Logout</button>
      </div> 
    </div>
  )
}
export default Navbar
