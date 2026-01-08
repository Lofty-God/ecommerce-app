import React from 'react'
import { assets } from '../assets/Asset'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm pl-6 ml-3 '>
            <div >
                <img src={assets.logo} alt="" className='w-32 mb-2' />
                <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum is the dummy test of the printing and typesetting industry.
                Lorem ipsum is the dummy test of the printing and typesetting industry
                </p>

            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-500'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-500'>
                    <li>+234 8039414994</li>
                    <li>ebiuke7710@gmil.com</li>
                </ul>
            </div>
        </div>
          <div>
            <hr />
            <p className='text-sm text-center font-medium py-5'>Copyright 2025@ Lofyfashion.com - All Right-reserved</p>
          </div>
      
    </div>
  )
}

export default Footer
