import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-blue-600 text-white">
      <nav className="flex justify-between">
        <Link href="/" className="text-xl font-bold">Real Estate Listings</Link>
        <div className="space-x-4">
          <Link href="/my-listings">My Listings</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
