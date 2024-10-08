import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext'; // Import ThemeContext
import logoblue from "../../images/logo-blue.png";
import logowhite from "../../images/logo-white.png";

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navigate = useNavigate();

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
    navigate('/register');
  };

  return (
    <nav className={`navbar justify-center h-14 md:h-auto md:w-full w-11/12 bg-glass md:bg-inherit md:m-0 mt-4 mx-2 rounded-full md:rounded-none ${hasScrolled ? 'dark' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      {/* <div className="py-2 px-4 h-full md:px-12 md:mx-auto flex items-center justify-between">
        <div className={`flex items-center md:w-1/3  space-x-2 ${darkMode ? 'text-white' : 'text-black'}`}>
          <div className={`md:bg-inherit ${darkMode ? 'bg-dark' : 'bg-white'} h-10 w-10 rounded-full flex justify-center items-center`}>
            <img src={`${darkMode ? logowhite : logoblue}`} className='md:h-10 h-7' alt="Logo" />
          </div>
          <p className={`md:hidden font-bold text-xs ${darkMode ? 'text-white' : 'text-primary'}`}>Zimapeak</p>
        </div>

        <div className="hidden lg:flex w-1/3 justify-center">
          <ul className={`flex space-x-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            <li>
              <a href="/" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={handleLinkClick}>Home</a>
            </li>
            <li>
              <a href="/services" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={handleLinkClick}>Services</a>
            </li>
            <li>
              <a href="/casestudies" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={handleLinkClick}>Case Studies</a>
            </li>
            <li>
              <a href="/about" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={handleLinkClick}>About</a>
            </li>
            <li>
              <a href="/blog" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={handleLinkClick}>Blog</a>
            </li>
            <li>
              <a href="/careers" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={handleLinkClick}>Careers</a>
            </li>
          </ul>
        </div>

        <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} absolute top-16 -left-4`}>
          <ul className={`flex w-screen h-screen flex-col items-center py-20 space-y-5 ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}>
            <li>
              <a href="/" className="hover:text-gray-300" onClick={handleLinkClick}>Home</a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-300" onClick={handleLinkClick}>Services</a>
            </li>
            <li>
              <a href="/casestudies" className="hover:text-gray-300" onClick={handleLinkClick}>Case Studies</a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300" onClick={handleLinkClick}>About</a>
            </li>
            <li>
              <a href="/blog" className="hover:text-gray-300" onClick={handleLinkClick}>Blog</a>
            </li>
            <li>
              <a href="/careers" className="hover:text-gray-300" onClick={handleLinkClick}>Careers</a>
            </li>
          </ul>
        </div>
        <div className='flex space-x-2 md:w-1/3 justify-end'>
          <div className='justify-end lg:flex md:w-1/3'>
            <button onClick={handleGetStartedClick} className={`relative border-2 border-primary hover:text-slate-800 hover:border-slate-800 md:font-bold h-10 w-full md:w-auto md:h-auto px-4 md:py-3 md:px-6 rounded-full ${darkMode ? 'text-white' : 'text-primary'}`}>
              <div className='flex items-center justify-center space-x-2'>
                <p className='text-xs'>Get Started</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button className="lg:hidden border-2 border-primary rounded-full h-10 w-10 flex items-center justify-center" onClick={handleMenuToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${darkMode ? 'text-white' : 'text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
