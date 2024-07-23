import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';

const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://t4.ftcdn.net/jpg/07/08/02/45/360_F_708024524_bWZRZtk76J0cgExkfY3aMoFMSg9PKcfq.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent text-white py-4 px-6 flex justify-between items-center z-10">
        <div className="text-2xl font-bold">FR.</div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-lg hover:underline">
            About Us
          </a>
          <a href="#" className="text-lg hover:underline">
            Contact Us
          </a>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleProfileClick}>
              <div className="w-10 h-10">
                <img
                  src={user.photoURL}
                  alt="User profile"
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <span>{user.displayName}</span>
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="px-4 py-2 border border-green-400 rounded-full text-green-400 hover:bg-green-100 transition duration-300"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="px-4 py-2 bg-green-400 rounded-full text-white hover:bg-white hover:text-green-400 transition duration-300"
              >
                Sign Up
              </a>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
          >
            &times;
          </button>
          <nav className="flex flex-col space-y-6 text-center">
            <a href="#" className="text-lg text-white hover:underline">
              About Us
            </a>
            <a href="#" className="text-lg text-white hover:underline">
              Contact Us
            </a>
            {user ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-10 h-10 cursor-pointer" onClick={handleProfileClick}>
                  <img
                    src={user.photoURL}
                    alt="User profile"
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
                <span className="text-lg text-white" onClick={handleProfileClick}>
                  {user.displayName}
                </span>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 border border-green-400 rounded-full text-green-400 hover:bg-green-100 transition duration-300"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 bg-green-400 rounded-full text-white hover:bg-white-400 hover:text-green-400 transition duration-300"
                >
                  Sign Up
                </a>
              </>
            )}
          </nav>
        </motion.div>
      )}

      {/* Hero Text */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl text-center md:text-left"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="block xl:inline">
                  <br />
                  <br />
                  Welcome to{' '}
                </span>{' '}
                <span className="block text-green-400 xl:inline animate-wave">
                  Fasasi Realty
                </span>
              </motion.h1>
              <motion.p
                className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover the best properties that fit your style and budget.
                Your dream home is just a click away.
              </motion.p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-600 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
