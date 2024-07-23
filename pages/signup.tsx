import React from 'react'
import AuthForm from '../components/AuthForm'
import Header from '../components/Header'
import Footer from '../components/Footer'

const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <AuthForm mode="signup" />
      </main>
      <Footer />
    </div>
  )
}

export default SignupPage
