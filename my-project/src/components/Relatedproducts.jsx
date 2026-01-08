import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const Relatedproducts = ({category, subcategory}) => {
    const {products} = useContext(ShopContext);
    const[related, setRelated] = useState([]);
    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=>category === item.category);
            productsCopy = productsCopy.filter((item)=>subcategory === item.subcategory)
            setRelated(productsCopy.slice(0,5))
        }        
    },[products, category, subcategory])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2 '>
            <Title text1={'RELATED'} text2={'PRODUCTS'}  />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-y-6' >
            {related.map((item, index)=>(
                <ProductItem key={index} _id={item._id} name={item.name} image={item.image} price={item.price} />
            ))}

        </div>
      
    </div>
  )
}

export default Relatedproducts
