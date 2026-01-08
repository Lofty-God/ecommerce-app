import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='pt-6 pl-[20%] flex flex-col gap-3 '>
            <NavLink className='flex items-center gap-3 border border-r-0 border-gray-300 rounded-l px-3 py-2' to='/add'>
              <img className='w-5 h-5' src={assets.add_icon} alt="" />
              <p className='hidden md:block'>Add Items</p>
            </NavLink>
             <NavLink className='flex items-center gap-3 border border-r-0 border-gray-300 rounded-l px-3 py-2' to='/list'>
              <img className='w-5 h-5' src={assets.order_icon} alt="" />
              <p className='hidden md:block'>List Items</p>
            </NavLink>
             <NavLink className='flex items-center gap-3 border border-r-0 border-gray-300 rounded-l px-3 py-2' to='/orders'>
              <img className='w-5 h-5' src={assets.order_icon} alt="" />
              <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>

      
    </div>
  )
}

export default Sidebar
