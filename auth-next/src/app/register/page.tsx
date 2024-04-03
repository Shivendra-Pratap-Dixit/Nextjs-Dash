'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passErr, setPassErr] = useState('');
  const [userErr, setUserErr] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setError('Please enter email and password');
        return;
      } else if (username.length < 5) {
        setUserErr('Username should be at least 5 characters');
        return;
      } else if (password.length < 8) {
        setPassErr('Password should be at least 8 characters');
        return;
      }

      const response = await axios.post('http://localhost:8000/register', { username, password });
      // console.log(response.data)
      if (response.data.includes('User already registered')) {
        setSuccessMessage('User already registered');
      } else {
        setSuccessMessage("User registered successfully")
        setTimeout(()=>{
          router.push('/login');
        },1500)
        
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-8 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Welcome To Jobong</h2>
      <div className="max-w-md w-full bg-white p-20 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Signup Here </h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 mb-6 p-2"
          />
          {userErr && <p className='text-red-500 text-center mb-4'>{userErr}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full border-none rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 mb-6 p-2"
          />
          {passErr && <p className='text-red-500 text-center mb-4'>{passErr}</p>}
          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
          {successMessage && <p className='text-red-500 text-center mb-4'>{successMessage}</p>}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          >
            Signup
          </button>
        </form>
        <p className='text-center mt-4'>Already A Member ? <Link href="/login" className='text-teal-600'>Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
