import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/Asset';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false) 
    }
  }, [location])
  return showSearch && visible ? (
    <div className='border-t border-b border-gray-50 text-center'>
      <div className='inline-flex border items-center justify-center px-3 py-3 mx-3 my-3 rounded-full w-3/4 sm:w-1/2'>
        <input className='flex-1 outline-none bg-inherit text-sm' value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='search' />
        <img className='w-8' src={assets.search_icon} alt="" />
      </div>
      <img onClick={() => setShowSearch(false)} className='w-5 cursor-pointer inline' src={assets.cross_icon} alt="" />

    </div>
  ) : null
}

export default Searchbar
