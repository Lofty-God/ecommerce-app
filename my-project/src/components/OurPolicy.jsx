import React from 'react'
import { assets } from '../assets/Asset'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-center jstify-between gap-12 sm:gap-34 '>
        <div className='flex flex-col items-center overflow-hidden  py-5 px-3 '>
            <img src={assets.exchange_icon} alt="" className='w-12 min-w-12 h-12'/>
            <p className='sm:text-bases md:text-semi-bold text-black text-xl  font:semi-bold'>Easy Exchange Policy</p>
            <p className='text-sm sm:text-bases md:text-semi-bold text-center text-gray-700 font-medium'>We offer hassle free exchange policy</p>
        </div>
        <div className='flex flex-col items-center overflow-hidden  py-5 px-3 '>
            <img src={assets.Quality_icon} alt="" className='w-12 min-w-12' />
            <p className='sm:text-bases md:text-semi-bold text-black text-xl  font:semi-bold'>7 Days Return Policy</p>
            <p className='text-sm sm:text-bases md:text-semi-bold text-center text-gray-700 font-medium'>We offer 7 days free return policy</p>
        </div>
        <div className='flex flex-col items-center overflow-hidden  py-5 px-3 '>
            <img src={assets.contact_icon} alt="" className='w-12 min-w-12' />
            <p className='sm:text-bases md:text-semi-bold text-black text-xl  font:semi-bold'>Best Customer Support</p>
            <p className='text-sm sm:text-bases md:text-semi-bold text-center text-gray-700 font-medium'>We provide 24/7 customer support</p>
        </div>
      
    </div>
  )
}

export default OurPolicy

