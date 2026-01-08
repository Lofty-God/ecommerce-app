import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({_id, name, image, price}) => {
  const {currency}  = useContext(ShopContext);
  
  return (
    <Link className='cursor-pointer text-[#414141]' to={`/product/${_id}`}>
      <div>
        <img className='hover:scale-110 transition ease-in-out h-60'  src={image[0]} alt="" />
      </div>
      <p className='text-sm' >{name}</p>
      <p className='text-sm'>{currency}{price}</p>
      
    </Link>
  )
}

export default ProductItem;

