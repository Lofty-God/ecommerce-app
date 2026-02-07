import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/Asset';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products, showSearch, search} = useContext(ShopContext);
  const[showfilter, setShowFilter] = useState(false);
  const[filterProducts, setFilterProducts] = useState([]);
  const[sortType, setSortType] = useState('Relevant');


  useEffect(()=>{
    setFilterProducts(products)
  },[products])

  const[category, setCategory] = useState([]);
  const[subcategory, setSubCategory] = useState([]);

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setCategory(prev=>[...prev, e.target.value])
    }
  }
  useEffect(()=>{
    console.log(category)
  },[category]);

  useEffect(()=>{
    console.log(subcategory)
  },[subcategory])

  const toggleSubCategory = (e)=>{
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev=>[...prev, e.target.value])
    }
  };
  const applyFilter =()=>{
    let productsCopy =products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if(subcategory.length > 0){
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory))
    }
    console.log("Filtered products:", productsCopy);
    setFilterProducts(productsCopy)
  }
  useEffect(()=>{
    applyFilter()
  },[category,subcategory, search, showSearch, products])


  const sortProducts = ()=>{
    const fpCopy = filterProducts.slice();
    switch(sortType){
      case 'Low to high' :
        setFilterProducts([...fpCopy].sort((a , b)=>(a.price - b.price)));
        break;

      case 'High to low' :
        setFilterProducts([...fpCopy].sort((a , b)=>(b.price - a.price)));
        break;

      default :
        applyFilter();
        break;
    }
  }
  useEffect(()=>{
    sortProducts();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row border-t gap-1 sm:gap-10 pt-10'>
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showfilter)} className='my-2 text-xl cursor-pointer flex items-center gap-2 '>FILTER
          <img className={`h-5 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        
        <div className={`border border-gray-300 py-3 pl-6 my-3 ${showfilter? '' : 'hidden'} sm:block`} >
          <p className='text-xl text-gray-500 py-3 ' >CATEGORY</p>
          <div className='flex gap-3 cursor-pointer' >
            <input className='w-3' type={'checkbox'} value={'Men'} onChange={toggleCategory} />Men
          </div>
          <div className='flex gap-3 cursor-pointer'>
            <input className='w-3' type={'checkbox'} value={'Women'} onChange={toggleCategory}/>Women
          </div>
          <div className='flex gap-3 cursor-pointer'>
            <input className='w-3' type={'checkbox'} value={'Boy'} onChange={toggleCategory} />Boy
          </div>
          <div className='flex gap-3 cursor-pointer'>
            <input className='w-3' type={'checkbox'} value={'Girl'} onChange={toggleCategory} />Girl
          </div>
        </div>
        {/* subCategory */}
        <div className={`border border-gray-300 py-3 pl-6 my-3 ${showfilter? '' : 'hidden'} sm:block`} >
          <p className='text-xl text-gray-500 py-3 ' >TYPE</p>
          <div className='flex gap-3 cursor-pointer'>
            <input className='w-3' type={'checkbox'} value={'Kid'} onChange={toggleSubCategory} />Kid
          </div>
          
          <div className='flex gap-3 cursor-pointer'>
            <input className='w-3' type={'checkbox'} value={'English'} onChange={toggleSubCategory} />English
          </div>
          <div className='flex gap-3 cursor-pointer'>
            <input className='w-3' type={'checkbox'} value={'Native'} onChange={toggleSubCategory} />Native
          </div>

        </div>
      </div>
      {/* Right handside */}
      <div className='flex-1'>
        <div className='flex justify-between sm:text-2xl text-base mb-4  '>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange = {(e) => setSortType(e.target.value)} className='border-2 border-gray-300 px-3 text-sm'>
            <option value='Relevant'>Sort by: Relevant</option>
            <option value='High to low'>Sort by: High to low</option>
            <option value='Low to high'>Sort by: Low to high</option>
          </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default Collection
