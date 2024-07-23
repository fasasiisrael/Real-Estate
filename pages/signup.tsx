// components/Login.tsx
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { FaGoogle } from 'react-icons/fa'

const Login = () => {
  const { login } = useAuth()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg"
        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login or Create an Account</h2>
        <p className="text-center mb-6">Connect to Fasasi Realty with your Google account</p>
        <button 
          onClick={login} 
          className="w-full p-3 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition duration-300"
        >
          <FaGoogle className="mr-2" /> Login with Google
        </button>
        <a href="../" className="text-lg hover:underline text-center block">
  Go Back Home
</a>
      </motion.div>
    </div>
  )
}

export default Login
