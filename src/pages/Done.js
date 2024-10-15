import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Done = ({ setModalOpen }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className={`bg-tiles h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
      {/* Main header */}
      <h1 className="z-10 text-2xl sm:text-4xl lg:text-5xl font-extrabold py-2 sm:py-5 text-center">
        Thank you for choosing us!
      </h1>

      {/* Subheader */}
      <h4 className="z-10 text-sm sm:text-lg lg:text-xl mt-2 sm:mt-4 pb-2 sm:pb-5 text-center">
        We appreciate your trust and look forward to elevating your brand's social media presence.
        <br />
        We will reach out to you soon!
      </h4>

      {/* CTA button */}
      <div className="z-10 mt-10 sm:mt-20 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
        <button
          onClick={() => navigate('/#')}
          className={`relative ${darkMode
            ? 'bg-white text-dark hover:bg-white hover:text-dark'
            : 'bg-dark text-white hover:bg-black hover:text-white'
            } font-bold py-3 px-10 sm:py-4 sm:px-32 rounded-full flex items-center justify-center sm:w-auto transition-all duration-300 ease-in-out transform hover:scale-105`}
        >
          <span className="flex items-center space-x-2">
            <span>Go home</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Done;