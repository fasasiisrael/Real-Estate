import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const Header: React.FC = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth();

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

  return (
    <header className="p-4 bg-green-500 text-white shadow-md">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-200 transition">
          Fasasi Realty
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="../" className="hover:text-gray-200 transition">
            Go Home
          </Link>
          <Link href="/my-listings" className="hover:text-gray-200 transition">
            My Favourites
          </Link>
          {user ? (
            <div className="w-10 h-10">
              <img
                src={user.photoURL}
                alt="User profile"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-200 transition">
                Login
              </Link>
              <Link href="/signup" className="hover:text-gray-200 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
        {/* Hamburger Icon */}
        <button
          className="md:hidden flex items-center p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 w-2/3 h-full bg-green-700 text-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center mt-8">
          <Link href="../" className="py-2 text-xl hover:text-gray-300 transition">
            Go Home
          </Link>
          <Link href="/my-listings" className="py-2 text-xl hover:text-gray-300 transition">
            My Favourites
          </Link>
          {user ? (
            <div className="w-24 h-24 mt-4">
              <img
                src={user.photoURL}
                alt="User profile"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ) : (
            <>
              <Link href="/login" className="py-2 text-xl hover:text-gray-300 transition">
                Login
              </Link>
              <Link href="/signup" className="py-2 text-xl hover:text-gray-300 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
