import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

const AuthForm: React.FC = () => {
  const router = useRouter()
  const { login } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      await login()
      router.push('/')
    } catch (err) {
      console.error('Error signing in with Google', err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleGoogleSignIn}
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  )
}

export default AuthForm
