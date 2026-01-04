import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const {axios, setToken} = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const { data } = await axios.post('/api/admin/login', {email, password})

        if(data.success) {
          setToken(data.token)
          localStorage.setItem('token', data.token)
          axios.defaults.headers.common['Authorization'] = data.token
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }
   
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
                <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
                <p className='font-light'>Enter your credentials to access the admin panel</p>
            </div>
            <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                <div className='flex flex-col'>
                    <label> Email </label>
                    <input onChange={ (e) => setEmail(e.target.value) } value={email} className='border-b-2 border-gray-300 p-2 outline-none mb-6' type="email" required placeholder='your email id'/>
                </div>
                
                <div className='flex flex-col relative'>
                    <label> Password </label>
                    <input 
                        onChange={ (e) => setPassword(e.target.value) } 
                        value={password} 
                        className='border-b-2 border-gray-300 p-2 pr-10 outline-none mb-6' 
                        type={showPassword ? "text" : "password"} 
                        required 
                        placeholder='your password'
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 bottom-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>

                <button className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all' type='submit'> Login </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login