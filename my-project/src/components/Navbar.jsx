// import React, { useContext, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { assets } from "../assets/Asset";
// import { ShopContext } from "../context/ShopContext";

// const Navbar = () => {
//     const [visible, setVisible] = useState(false);
//     const [showProfile, setShowProfile] = useState(false);

//     const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
//         useContext(ShopContext);

//     const logout = () => {
//         navigate("/login");
//         localStorage.removeItem("token");
//         setToken("");
//         setCartItems({});
//     };

//     const navLinks = [
//         { to: "/", label: "HOME" },
//         { to: "/collection", label: "COLLECTION" },
//         { to: "/about", label: "ABOUT" },
//         { to: "/contact", label: "CONTACT" },
//     ];

//     return (
//         <nav className="flex justify-between items-center px-4 py-2 shadow-md">
//             {/* Logo */}
//             <Link to="/">
//                 <img src={assets.logo} alt="Logo" className="w-32" />
//             </Link>

//             {/* Desktop Menu */}
//             <ul className="hidden sm:flex gap-6 items-center">
//                 {navLinks.map(({ to, label }) => (
//                     <NavLink
//                         key={to}
//                         to={to}
//                         className={({ isActive }) =>
//                             `flex flex-col items-center text-sm font-medium ${isActive ? "text-black" : "text-gray-700"
//                             }`
//                         }
//                     >
//                         <p>{label}</p>
//                         {({ isActive }) =>
//                             isActive && (
//                                 <hr className="w-3/4 h-[1.5px] bg-gray-700 border-none" />
//                             )
//                         }
//                     </NavLink>
//                 ))}
//             </ul>

//             {/* Right Icons */}
//             <div className="flex items-center gap-4">
//                 {/* Search */}
//                 <button
//                     onClick={() => setShowSearch(true)}
//                     aria-label="Search"
//                     className="cursor-pointer"
//                 >
//                     <img src={assets.search_icon} alt="Search" className="w-10" />
//                 </button>

//                 {/* Profile */}
//                 {token && (
//                     <div
//                         className="relative"
//                         onMouseEnter={() => setShowProfile(true)}
//                         onMouseLeave={() => setShowProfile(false)}
//                     >
//                         <button className="mb-1"
//                             onClick={() => setShowProfile((prev) => !prev)}
//                             aria-label="Profile"
//                         >
//                             <img src={assets.profile_icon} alt="Profile" className="w-8" />
//                         </button>

//                         {showProfile && (
//                             <div className="absolute right-0 top-full mt-2 shadow-lg rounded z-50 w-32 bg-slate-100 text-gray-500">
//                                 <p className="py-2 px-4 text-sm font-medium hover:text-black cursor-pointer">My Profile</p>
//                                 <p
//                                     onClick={() => navigate("/orders")}
//                                     className="py-2 px-4 text-sm font-medium hover:text-black cursor-pointer"
//                                 >
//                                     Orders
//                                 </p>
//                                 <p
//                                     onClick={logout}
//                                     className="py-2 px-4 text-sm font-medium hover:text-black cursor-pointer"
//                                 >
//                                     Logout
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Cart */}
//                 <Link to="/cart" className="relative">
//                     <img src={assets.cart_icon} alt="Cart" className="w-10" />
//                     <span className="absolute -bottom-1.25 -right-1.25 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
//                         {getCartCount()}
//                     </span>
//                 </Link>

//                 {/* Mobile Menu Icon */}
//                 <button
//                     onClick={() => setVisible(true)}
//                     aria-label="Menu"
//                     className="sm:hidden"
//                 >
//                     <img src={assets.menu_icon} alt="Menu" className="w-8" />
//                 </button>
//             </div>

//             {/* Mobile Sidebar */}
//             <div
//                 className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${visible ? "translate-x-0 w-3/4" : "translate-x-full w-0"
//                     }`}
//             >
//                 <div className="flex flex-col py-6 pl-6">
//                     <button
//                         onClick={() => setVisible(false)}
//                         className="flex items-center gap-2 py-3"
//                     >
//                         <span className="text-xl">&lt;</span>
//                         <p className="text-sm font-medium">BACK</p>
//                     </button>

//                     {navLinks.map(({ to, label }) => (
//                         <NavLink
//                             key={to}
//                             to={to}
//                             onClick={() => setVisible(false)}
//                             className="pl-3 py-2 text-sm font-medium text-gray-600 hover:text-black"
//                         >
//                             {label}
//                         </NavLink>
//                     ))}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;







import React, { useContext, useState } from 'react'
import { assets } from '../assets/Asset'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
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
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className='w-10' />
                <div className='group relative cursor-pointer' >
                    {/* <img src={assets.profile_icon} alt="" className='w-7 ' /> */}
                    {/* {token &&
                        <div className='z-50 absolute right-0 w-32 rounded hidden group-hover:block dropdown-menu'>
                            <div className='flex flex-col items-center py-3 px-2 bg-slate-100 text-gray-500 ' >
                                <p className='py-2 text-sm font-medium hover:text-black  '>My-profile</p>
                                <p onClick={() => navigate('/orders')} className='py-2 text-sm font-medium hover:text-black  '>Orders</p>
                                <p onClick={logout} className='py-2 text-sm font-medium hover:text-black  '>Logout</p>
                            </div>
                        </div>
                    } */}
                    {token && (
                        <div className="relative" onClick={() => setShowProfile(!showProfile)} onMouseEnter={() => setShowProfile(true)} onMouseLeave={() => setShowProfile(false)}>
                            <img src={assets.profile_icon} alt="profile" className='w-8 cursor-pointer' />

                            {showProfile && (
                                <div className="absolute right-0 top-full mt-0 bg-slate-100 text-gray-500 w-32 shadow-lg rounded z-50">
                                    <p className='py-2 text-sm font-medium px-4 hover:text-black'>My-profile</p>
                                    <p onClick={() => navigate('/orders')} className='py-2 text-sm font-medium hover:text-black px-4 cursor-pointer'>Orders</p>
                                    <p onClick={logout} className='py-2 text-sm font-medium hover:text-black px-4 cursor-pointer'>Logout</p>
                                </div>
                            )}
                        </div>
                    )}

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


