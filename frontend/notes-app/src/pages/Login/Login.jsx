import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/Inputs/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');

    // Login API call
    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      });

      
      // Handle successful login
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);        
        navigate("/dashboard");
      } else {
        setError('Login failed: Invalid response from server');
      }
      console.log('Login response:', response);
    } catch (error) {
      console.log('Error details:', error.response || error);
      if (error.response && error.response.data && error.response.data.message) {
        setError('Login failed: ' + error.response.data.message);
      } else if (error.response) {
        setError(`Login failed: ${error.response.status} - ${error.response.statusText}`);
      } else {
        setError('Something went wrong. Please try again later');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28  '>
        <div className='w-96 border rounded bg-white px-7 py-10 '>
          <form onSubmit={handleLogin} >
            <h4 className='text-2xl text-black mb-7 '>Login</h4>

            <input type="text" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type='submit' className='btn-primary'>Login</button>

            <p className='text-sm text-center mt-4 '>
              Not registered yet ?  <Link to={'/signup'} className='font-medium text-primary underline '>Create an account</Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login