import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';
import AIChatbox from '../Ai/AIChatbox';

const Banner = ({ setModalOpen }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const maxScale = 2;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    let newScale = 1 + scrollY / 500;

    if (newScale > maxScale) {
      newScale = maxScale;
    }

    setScale(newScale);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="banner" className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div
        className={`circle-white-dark transition-transform duration-300`}
        style={{ transform: `translate(80%, -150%) scale(${scale}) rotate(25deg)` }}
      />
      
      {/* Loved by section */}
      <span className={`${darkMode ? 'text-white' : 'text-sky-600'} hover:bg-white hover:text-sky-600 font-bold py-1 pl-1 pr-4 mb-10 rounded-full flex items-center space-x-2 relative sm:w-auto`}>
        <div className="flex items-center space-x-[-10px]">
          <div className="relative z-10">
            <img src="https://images.unsplash.com/photo-1595347097560-69238724e7bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Circle 1" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
          </div>
          <div className="relative z-20">
            <img src="https://t3.ftcdn.net/jpg/02/58/89/90/360_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg" alt="Circle 2" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full " />
          </div>
          <div className="relative z-30">
            <img src="https://plus.unsplash.com/premium_photo-1671282928655-5ffc9cf95728?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Circle 3" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full " />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-xs sm:text-sm">Loved by +20 business owners</p>
          <div className="flex items-center space-x-1">
            <p className="text-xs sm:text-sm">5.0</p>
            {[...Array(5)].map((_, index) => (
              <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21 16.54 14.97 22 10.91 15.81 10.13 12 4.1 8.19 10.13 2 10.91 7.46 14.97 5.82 21 12 17.27z" />
              </svg>
            ))}
          </div>
        </div>
      </span>

      {/* Main header */}
      <h1 className="z-10 text-2xl sm:text-4xl lg:text-5xl font-extrabold py-2 sm:py-5 text-center">
        Make your brand stand out with AI
      </h1>
      
      {/* Subheader */}
      <h4 className="z-10 text-sm sm:text-lg lg:text-xl mt-2 sm:mt-4 pb-2 sm:pb-5 text-center">
        Elevating Your Brand's Social Media Presence.
        <br />
        We're experts in crafting strategies to boost engagement and visibility.
      </h4>
      
      {/* CTA button */}
      <div className="z-10 mt-10 sm:mt-20 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
        <button
          onClick={() => navigate('/register')}
          className={`relative ${darkMode
              ? 'bg-white text-dark hover:bg-white hover:text-black'
              : 'bg-dark text-white hover:bg-black hover:text-white'
            } font-bold py-3 px-10 sm:py-4 sm:px-32 rounded-full flex items-center justify-center sm:w-auto transition-all duration-300 ease-in-out transform hover:scale-105`}
        >
          <span className="flex items-center space-x-2">
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Banner;