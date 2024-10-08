import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterNavbar from './components/Register/RegisterNavbar';
import Footer from './components/Footer';

const AppLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname === '/register' ? <RegisterNavbar /> : <Navbar />}
      <main className="flex-grow">{children}</main>
      {location.pathname !== '/register' && <Footer />}
    </div>
  );
};

export default AppLayout;