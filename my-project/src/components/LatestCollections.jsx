import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';


const LatestCollections = () => {
  const {products} = useContext(ShopContext);
  
  const [latestproducts, setLatestProducts] = useState([]);
  useEffect(()=>{
    setLatestProducts(products.slice(0,10));
  },[products])
  return (
    <div className='my-10'>
        <div className='items-center text-center py-8 text-3xl'>
            <Title className='text-xl sm:text-3xl md:text-5xl' text1={'LATEST'} text2 = {'COLLECTION'}/>
            <p className='w-3/4 text-xs sm:text-sm lg:text-basic text-gray-600 m-auto'>
            Lorem ipsum is simply dumy test for the printing and typsetting industry.Lorem ipsum is 
            </p>
                
        </div>
        {/* rendering items */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestproducts.map((item)=>(
                    <ProductItem key={item._id} id={item._id}  name={item.name} image={item.image} price={item.price} />

                ))
            }
        </div>  
    </div>
  )
}

export default LatestCollections


