import React from 'react'

const NewsletterBox = () => {
   const onSubmitHandler=(event)=>{
      event.preventDefault()
    }
  return (
    <div className='text-center'>
        <p className='font-medium text-2xl text-gray-800'>Subscribe Now And Get 20% Off</p>
        <p>
        Lorem ipsum is the dummy test of the printing and typesetting industry
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 gap-3 border pl-3 my-6 flex items-center m-auto py-3 px-3'>
            <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none font-medium text-gray-800' required/>
            <button type='submit' className='text-xl px-4 font-medium bg-black text-white'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox
