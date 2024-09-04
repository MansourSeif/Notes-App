import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Inputs/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [name, setName] = useState('')

  const navigate = useNavigate() ; 
  
  const handleSignUp = async (e) => {
    e.preventDefault() ; 
    if(!name){
      setError('Please enter your name');  
      return ; 
    }
    if(!validateEmail(email)){
      setError('Please enter your email address');  
      return ; 
    }
    if(!password || password.length < 6){
      setError('Password must be atleast 6 characters long'); 
      return ;
    }
    setError('') ;

    try {
      const response = await axiosInstance.post('/create-account' ,{
        fullname : name , 
        email : email ,
        password : password
      })
      if(response.data && response.data.accessToken){
        localStorage.setItem('token',response.data.accessToken)
        navigate('/login')
        console.log("done creating")
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
    }
  }
  return (
    <>
    <Navbar />
    <div className='flex items-center justify-center mt-28  '>
      <div className='w-96 border rounded bg-white px-7 py-10 '>
        <form onSubmit={handleSignUp} >
          <h4 className='text-2xl text-black mb-7 '>Sign Up</h4>
          
          <input type="text" value={name} onChange={(e) => setName(e.target.value) } className='input-box' placeholder='Name' />

          <input type="text" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
          <button type='submit' className='btn-primary'>Create an account </button>

          <p className='text-sm text-center mt-4 '> 
            Already have an account ?  <Link to={'/login'} className='font-medium text-primary underline '>Login </Link>
          </p>
          
        </form>
      </div>
    </div>
    
    </>
  )
}

export default SignUp