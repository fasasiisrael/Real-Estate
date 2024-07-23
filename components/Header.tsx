import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const Header: React.FC = () => {
  const [user, setUser] = useState(null);
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
        <div className="flex items-center space-x-4">
          <Link href="../" className="hover:text-gray-200 transition">
            Go Home
          </Link>
          <Link href="/my-listings" className="hover:text-gray-200 transition">
            My Favourites
          </Link>
          {user ? (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10">
                <img
                  src={user.photoURL}
                  alt="User profile"
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
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
      </nav>
    </header>
  );
};

export default Header;
