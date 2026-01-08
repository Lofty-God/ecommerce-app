import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('')
    
    const onSubmitHandler = async(e)=>{
        try{
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email,password})
            console.log(response)
             // Assuming your backend returns a token in response.data.token
            if (response.data.success) {
                setToken(response.data.token);
                
            }else{
                toast.error(response.data.message)
            }

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='rounded-lg bg-white px-8 py-6 shadow-md max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler} >
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full border border-gray-300 px-3 py-2 outline-none rounded-md' type="email" placeholder='your@email.com' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border border-gray-300 px-3 py-2 outline-none rounded-md' type="password" placeholder='Enter your password' required />
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button className='bg-black text-white w-full py-2 px-4 rounded-md mt-2' type='submit'>Login</button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
