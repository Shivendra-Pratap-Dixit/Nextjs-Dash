'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'universal-cookie';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();
const cookie=new Cookies()
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setError("")
    try {
      if (!username || !password) {
        setError('Please enter username and password');
        return;
      }

      if (username.length < 5) {
        setEmailError('username should be at least 5 characters');
        return;
      }

      if (password.length < 8) {
        setPasswordError('Password should be at least 8 characters');
        return;
      }

      const response = await axios.post('http://localhost:8000/login', { username, password }, { withCredentials: true });
     
      // console.log(response)
// const authToken=response.data;
// cookie.set('auth-token',authToken,{path:"/"})

      router.push('/dashboard');
    } catch (error:any) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 401) {
          setError('Incorrect username or password. Please try again.');
        } else if (error.response.status === 404) {
          setError('User not registered. Please sign up.');
        } else {
          setError('Login failed. Please try again later.');
        }
      } else {
        setError('Login failed. Please try again later.');
      }
    }
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Welcome Back To Jobong</h2>
      <div className="max-w-md w-full bg-white p-20 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login Here</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 mb-6 p-2"
          />
          {emailError && <p className='text-red-500 text-center mb-4'>{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full border-none rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 mb-6 p-2"
          />
          {passwordError && <p className='text-red-500 text-center mb-4'>{passwordError}</p>}
          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className='text-center mt-4'>New here? <Link href="/register" className='text-teal-600'>Signup</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
