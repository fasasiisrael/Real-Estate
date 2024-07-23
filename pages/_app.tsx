// _app.tsx
import '../styles/globals.css';
import '../styles/tailwind.css';
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthProvider>
  );
}

export default MyApp;
