import React from 'react'
import { assets } from '../assets/Asset'

const Heros = () => {
  return (
    <div className='flex flex-col sm:flex-row border overflow-hidden text-gray-400'>
      {/* Heros left side */}
      <div className='flex items-center justify-center py-10 sm:py-0 w-full sm:w-1/2 '>
        <div className='text-gray-200'>
            <div className='flex items-center gap-2'>
              <p className='w-8 sm:w-11 h-[2px] bg-gray-700 '></p>
              <p className='text-xl font-medium text-gray-500 '>Our Bestsellers</p>
            </div>
            <h1 className='text-xl sm:text-3xl lg:text-5xl font-semibold leading-relaxed text-gray-700'>LATEST DESIGNS</h1>
            <div className='flex items-center'>
              <p className='text-sm font-medium text-gray-600 '>Shop Now</p>
              <p className='w-8 sm:w-11 h-[1px] bg-gray-600 '></p>
            </div>

        </div>
     
       
      </div>
      {/* Heros right side */}
      <img src={assets.heros_img} alt="" className='w-full sm:w-1/2 '/>
    </div>
  )
}

export default Heros 
