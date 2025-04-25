import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext
import logo from "../images/logo-black.png";
import logowhite from "../images/logo-white.png";

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleGetStartedClick = () => {
    window.location.href = 'https://zimapeak.com/go/booking';
  };

  // Function to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className='flex justify-center items-center'>
    <nav className={`navbar justify-center h-14 md:h-auto md:w-full w-11/12 bg-glass md:bg-inherit md:m-0 mt-4 mx-2 rounded-full md:rounded-none ${hasScrolled ? 'dark' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="py-2 px-4 h-full md:px-12 md:mx-auto flex items-center justify-between">
        <div className={`flex items-center md:w-1/3 space-x-2 ${darkMode ? 'text-white' : 'text-dark'}`}>
          <div className={`md:bg-inherit ${darkMode ? 'bg-dark' : 'bg-white'} h-10 w-10 rounded-full flex justify-center items-center`}>
            <img src={`${darkMode ? logowhite : logo}`} className='md:h-10 h-7' alt="Zimapeak Logo" />
          </div>
          <a href='/' className={`md:hidden font-bold text-xs ${darkMode ? 'text-white' : 'text-dark'}`}>Zimapeak</a>
        </div>

        <div className="hidden lg:flex w-1/3 justify-center">
          <ul className={`flex space-x-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            <li>
              <a 
                href="/" 
                className={`${isActive('/') ? 'font-bold' : ''} hover:${darkMode ? 'text-gray-300' : 'text-secondary'} transition duration-200`} 
                onClick={handleLinkClick}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/services" 
                className={`${isActive('/services') ? 'font-bold' : ''} hover:${darkMode ? 'text-gray-300' : 'text-secondary'} transition duration-200`} 
                onClick={handleLinkClick}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="https://zimapeak.com/go/casestudies" 
                className={`${isActive('https://zimapeak.com/go/casestudies') ? 'font-bold' : ''} hover:${darkMode ? 'text-gray-300' : 'text-secondary'} transition duration-200`} 
                onClick={handleLinkClick}
              >
                Case Studies
              </a>
            </li>
            <li>
              <a 
                href="/go" 
                className={`${isActive('/go') ? 'font-bold' : ''} hover:${darkMode ? 'text-gray-300' : 'text-secondary'} transition duration-200`} 
                onClick={handleLinkClick}
              >
                Blog
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className={`${isActive('/about') ? 'font-bold' : ''} hover:${darkMode ? 'text-gray-300' : 'text-secondary'} transition duration-200`} 
                onClick={handleLinkClick}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/careers" 
                className={`${isActive('/careers') ? 'font-bold' : ''} hover:${darkMode ? 'text-gray-300' : 'text-secondary'} transition duration-200`} 
                onClick={handleLinkClick}
              >
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full`}>
          <ul className={`flex w-screen h-screen flex-col items-start py-20 px-10 space-y-5 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <li className='pb-6'>
              <a 
                href="/" 
                className={`text-4xl font-bold ${isActive('/') ? 'text-secondary' : ''} hover:text-gray-300 text-left w-full`} 
                onClick={handleLinkClick}
              >
                Home
              </a>
            </li>
            <li className='pb-6'>
              <a 
                href="/services" 
                className={`text-4xl font-bold ${isActive('/services') ? 'text-secondary' : ''} hover:text-gray-300 text-left w-full`} 
                onClick={handleLinkClick}
              >
                Services
              </a>
            </li>
            <li className='pb-6'>
              <a 
                href="https://zimapeak.com/go/casestudies" 
                className={`text-4xl font-bold ${isActive('https://zimapeak.com/go/casestudies') ? 'text-secondary' : ''} hover:text-gray-300 text-left w-full`} 
                onClick={handleLinkClick}
              >
                Case Studies
              </a>
            </li>
            <li className='pb-6'>
              <a 
                href="/go" 
                className={`text-4xl font-bold ${isActive('/go') ? 'text-secondary' : ''} hover:text-gray-300 text-left w-full`} 
                onClick={handleLinkClick}
              >
                Blog
              </a>
            </li>
            <li className='pb-6'>
              <a 
                href="/about" 
                className={`text-4xl font-bold ${isActive('/about') ? 'text-secondary' : ''} hover:text-gray-300 text-left w-full`} 
                onClick={handleLinkClick}
              >
                About
              </a>
            </li>
            <li className='pb-6'>
              <a 
                href="/careers" 
                className={`text-4xl font-bold ${isActive('/careers') ? 'text-secondary' : ''} hover:text-gray-300 text-left w-full`} 
                onClick={handleLinkClick}
              >
                Careers
              </a>
            </li>
          </ul>
        </div>

        <div className='flex space-x-2 md:w-1/3 justify-end'>
          <div className='justify-end lg:flex md:w-1/3'>
            <button onClick={handleGetStartedClick} className={`relative transition duration-200 bg-secondary hover:bg-primary md:font-bold h-10 w-full md:w-auto md:h-auto px-4 md:py-3 rounded-full text-white`}>
              <div className='flex items-center justify-center space-x-2'>
                <p className='text-xs'>Book Appointment</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button className="lg:hidden border-2 border-dark rounded-full h-10 w-10 flex items-center justify-center" onClick={handleMenuToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${darkMode ? 'text-white' : 'text-dark'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;