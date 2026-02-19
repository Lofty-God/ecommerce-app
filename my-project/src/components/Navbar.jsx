import React, { useContext, useState } from 'react'
import { assets } from '../assets/Asset'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})

    }
    return (
        <div className='flex justify-between '>
            <Link to='/'><img src={assets.logo} alt="" className='w-32' /></Link>
            <ul className='sm:flex gap-5 text-sm hidden items-center'>
                <NavLink to='/' className='flex flex-col items-center'>
                    <p className='text-sm font-medium text-gray-700 '>HOME</p>
                    <hr className='w-3/4 h-[1.5px] bg-gray-700 hidden border-none' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center'>
                    <p className='text-sm font-medium text-gray-700 '>COLLECTION</p>
                    <hr className='w-3/4 h-[1.5px] bg-gray-700 hidden border-none' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center'>
                    <p className='text-sm font-medium text-gray-700 '>ABOUT</p>
                    <hr className='w-3/4 h-[1.5px] bg-gray-700 hidden border-none' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center'>
                    <p className='text-sm font-medium text-gray-700 '>CONTACT</p>
                    <hr className='w-3/4 h-[1.5px] bg-gray-700 hidden border-none' />
                </NavLink>

            </ul>
            <div className='gap-3 flex items-center cursor-pointer' >
                <img onClick={() =>setShowSearch(true)} src={assets.search_icon} alt="" className='w-10' />
                <div className='group relative' >
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="profile" className='w-8 cursor-pointer' />
                    {/* dropdown menu */}
                    {token &&
                        <div className='group-hover:block hidden absolute right-0 dropdown-menu pt-4'>
                            <div className="flex flex-col gap-2 w-36 py-2 px-3 bg-slate-100 text-gray-500 rounded">
                                <p className='py-2 text-sm font-medium px-4 hover:text-black'>My-profile</p>
                                <p onClick={() => navigate('/orders')} className='py-2 text-sm font-medium hover:text-black px-4 cursor-pointer'>Orders</p>
                                <p onClick={logout} className='py-2 text-sm font-medium hover:text-black px-4 cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    }



                </div>
                <Link to='/cart' className='flex items-center relative '>
                    <img src={assets.cart_icon} alt="" className='w-10' />
                    <p className='absolute bg-black text-white text-center w-6 font-medium rounded-full -bottom-1.25 -right-1.25'>{getCartCount()}</p>
                </Link>
                <img src={assets.menu_icon} alt="" className='sm:hidden w-8 cursor-pointer' onClick={() => setVisible(true)} />

            </div>
            {/* sidebar menu for small screen */}
            <div className={`absolute dropdown-menu top-0 bottom-0 right-0 bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col py-6 pl-6 cursor-pointer overflow-hidden'>
                    <div className='flex items-center gap-4 py-3 cursor-pointer' onClick={() => setVisible(false)}>
                        <span className='text-xl w-5 '>&lt;</span>
                        <p className='text-sm font-medium'>BACK</p>
                    </div>
                    <NavLink to='/' onClick={() => setVisible(false)} className='pl-3 text-sm border font-medium  text-gray-500 py-2'>HOME</NavLink>
                    <NavLink to='/collection' onClick={() => setVisible(false)} className='pl-3 text-sm border font-medium text-gray-500 py-2'>COLLECTION</NavLink>
                    <NavLink to='/about' onClick={() => setVisible(false)} className='pl-3 text-sm border font-medium text-gray-500 py-2'>ABOUT</NavLink>
                    <NavLink to='/contact' onClick={() => setVisible(false)} className='pl-3 text-sm border font-medium text-gray-500 py-2'>CONTACT</NavLink>
                </div>

            </div>


        </div>
    )
}

export default Navbar


