import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/Asset';
import Relatedproducts from '../components/Relatedproducts';

const Product = () => {
  const { productId } = useParams();
  console.log(productId);
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')


  useEffect(() => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products])

  return productData ? (
    <div className='transition-opacity ease-in duration-500 opacity-100 border-t-2 pt-2'>
      {/* product Data */}
      <div className='flex flex-col sm:flex-row gap-12 sm:gap-12'>
        {/* product image */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} alt=""
                  className='w-[24%] hover:scale-110 sm:w-full mb-3 flex-shrink-0 cursor-pointer ' />
              ))

            }


          </div>
          <div className='w-full sm:w-[80%]  '>
            <img className='w-full h-auto ' src={image} alt="" />
          </div>
        </div>
        <div className='flex-1 '>
          <h1 className='text-2xl font-medium mt-3'>{productData.name}</h1>
          <div className='flex items-center gap-1'>
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_icon} alt="" className="w-5" />
            <img src={assets.star_dull_icon} alt="" className="w-5" />
            <p className='pl-2'>123</p>
          </div>
          <p className='text-3xl font-medium mt-5' >{currency}{productData.price}</p>
          <p className='mt-5 md:w-4/5 text-gray-500 '>{productData.description}</p>
          <div className='flex flex-col gap-5 my-8'>
            <p>Select Size</p>

            <div className='flex gap-2 '>
              {
                productData.size.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))
              }
            </div>

          </div>


          <button onClick={() => addToCart(productData._id, size)}
            className=' bg-black text-white px-8 py-3 active:bg-gray-700 text-sm cursor-pointer'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='flex flex-col gap-1 mt-3 text-gray-500 text-sm'>
            <p>100% Original Product</p>
            <p>Cash On Delivery Is Avilable On This Product</p>
            <p>Easy Return And Exchange Policy Within 7 Days On This Product</p>
          </div>

        </div>

      </div>
      {/* Description and Review */}
      <div className='mt-20'>
        <div className='flex '>
          <b className='px-5 py-3 border text-sm' >Description</b>
          <p className='px-5 py-3 border text-sm' >Review (122) </p>
        </div>

      </div>
      <div className='flex flex-col gap-4 border py-6 px-6 text-sm text-gray-500'>
        <div>
          <p>
            An e-commerce website is an online platform that functions as a digital store, allowing businesses to sell products or services directly to customers over the internet.
            Key features include a digital product catalog, shopping cart functionality, secure payment processing, and an online checkout process, enabling users to browse, select,
            and pay for items anytime and from any location with internet access.
          </p>
        </div>

      </div>
      {/* Display related products */}
      <Relatedproducts category={productData?.category} subcategory={productData?.subcategory} />
    </div>

  ) : <div className='opacity-0'>This content is invisible</div>

}

export default Product;
