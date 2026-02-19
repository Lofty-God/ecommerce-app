import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/Asset'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, cartItems, setCartItems, delivery_fee, getCartAmount, backendUrl, token, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }
  const initPaystack = (orderData) => {

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: orderData.amount * 100,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        // wrap async work in an IIFE
        (async () => {
          try {
            const { data } = await axios.post(
              backendUrl + "/api/order/verifyPaystack",
              { reference: response.reference },
              { headers: { token } }
            );
            if (data.success) {
              navigate("/orders");
              setCartItems({});
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error(error.message);
          }
        })();
      },
      onClose: function () {
        toast.error("Transaction was not completed, window closed.");
      },
    });
    handler.openIframe();
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + "/api/order/verifyRazorpay", response, { header: { token } })
          if (data.success) {
            navigate("/orders")
            setCartItems({})
          }

        } catch (error) {
          console.log(error)
          toast.error(error)

        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      // console.log(orderItems)
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {
        // API calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        // API calls for Paystack
        case 'paystack':
          const responsePaystack = await axios.post(backendUrl + '/api/order/paystack', orderData, { headers: { token } })
          if (responsePaystack.data.success) {
            initPaystack(responsePaystack.data.order);
          } else {
            toast.error(responsePaystack.data.message)
          }
          break;

        // API calls for Razorpay
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-10 sm:py-14 min-h-[80vh] border-t ' >
      {/* -------Left-side--------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-120 ' >
        <div className='text-xl sm:text-2xl my-3' >
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex items-center gap-3'>
          <input required onChange={onChangeHandler} name='firstName' id='firstName' autoComplete='firstName' value={formData.firstName} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Firstname' />
          <input required onChange={onChangeHandler} name='lastName' id='lastName' autoComplete='lastName' value={formData.lastName} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Lastname' />
        </div>
        <input required onChange={onChangeHandler} name='email' id='email' autoComplete='email' value={formData.email} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="email" placeholder='E-mail address' />
        <input required onChange={onChangeHandler} name='street' id='street' autoComplete='street' value={formData.street} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Street address' />
        <div className='flex items-center gap-3'>
          <input required onChange={onChangeHandler} name='city' id='city' autoComplete='city' value={formData.city} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' id='state' autoComplete='state' value={formData.state} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='State' />
        </div>
        <div className='flex items-center gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' id='zipcode' autoComplete='zipcode' value={formData.zipcode} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="number" placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' id='country' autoComplete='country' value={formData.country} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' id='phone' autoComplete='phone' value={formData.phone} className='border border-gray-300 px-1.5 py-3.5 w-full rounded' type="tel" placeholder='Phone number' />
      </div>
      {/* ----------Right side----------- */}
      <div className='mt-8' >
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ----------payment method selection--------------- */}
          <div className='flex gap-3 flex-col lg:flex-row '>
            <div onClick={() => setMethod('stripe')} className='flex gap-3 items-center border p-2 px-3 cursor-pointer '>
              <p className={`border rounded-full min-w-3.5 h-3.5 ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img className='h-6 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex gap-3 items-center border p-2 px-3 cursor-pointer '>
              <p className={`border rounded-full min-w-3.5 h-3.5 ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img className='h-4 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('paystack')} className='flex gap-3 items-center border p-2 px-3 cursor-pointer '>
              <p className={`border rounded-full min-w-3.5 h-3.5 ${method === 'paystack' ? 'bg-green-500' : ''}`}></p>
              <img className='h-8 w-20 mx-1 my-1' src={assets.paystack_logo} alt="" />
            </div>

            <div onClick={() => setMethod('cod')} className='flex gap-3 items-center border p-2 px-3 cursor-pointer '>
              <p className={`border rounded-full min-w-3.5 h-3.5 ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white py-3 px-16 text-sm cursor-pointer'>PLACE ORDER</button>

          </div>

        </div>

      </div>

    </form>
  )
}

export default Placeorder;
