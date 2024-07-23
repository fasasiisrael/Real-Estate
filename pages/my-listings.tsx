import React from 'react';
import { useAuth } from '../context/AuthContext';
import PropertyList from '../components/PropertyList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyListingsPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex justify-center items-center">
          <p>Please log in to view your saved listings.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PropertyList />
      </main>
      <Footer />
    </div>
  );
};

export default MyListingsPage;
