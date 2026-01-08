import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const Bestsellers = () => {
    const {products} = useContext(ShopContext);
    const[bestseller, setBestSeller] = useState([])
    useEffect(()=>{
        const bestProducts = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProducts.slice(0,5))
    },[products])
  return (
    <div className='my-10'>
        <div className='items-center text-center py-6 text-3xl'>
            <Title className='text-xl sm:text-3xl md:text-5xl lg:text-7xl' text1={'BEST'} text2={'SELLERS'} />
            <p className='text-xs w-3/4 m-auto text-gray-600'>
                Lorem ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is the best.
            </p>
        </div>
        {/* Rendering of BestSellers products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {
                bestseller.map((item)=>(
                    <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }

        </div>
      
    </div>
  )
}

export default Bestsellers

