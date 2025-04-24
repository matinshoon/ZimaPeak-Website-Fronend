import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';
import { BsArrowUpRightCircle } from "react-icons/bs";
import Splitting from 'splitting';
import badgeSVG from '../../images/badge.svg';

const Banner = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const services = [
    { name: 'Google Ads', link: '/services' },
    { name: 'Meta Ads', link: '/services' },
    { name: 'Website Development', link: '/services' },
    { name: 'SEO', link: '/services' },
    { name: 'Content Creation', link: '/services' },
  ];

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2024-11-29T23:59:59'); // End of Black Friday
    const updateTimer = () => {
      const now = new Date();
      const timeLeft = targetDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    Splitting(); // Initialize Splitting
  }, []);

  return (
    <div id="banner" className="z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Section */}
      <div className="text-center relative">
        {/* Badge SVG */}
        <img
          src={badgeSVG}
          alt="Badge"
          className="z-40 absolute -top-8 -right-8 sm:-top-12 sm:-right-10 rotate-12 w-16 sm:w-24"
        />

        <h1 className="text-5xl sm:text-5xl md:text-8xl font-bold relative">
          <span className="glitch glitch--4" data-splitting>Black Friday</span>
        </h1>
        <div className="text-4xl sm:text-6xl md:text-8xl font-medium text-secondary mt-4 animate-pulse">
          {`${timeRemaining.days}d ${timeRemaining.hours}h`}
          <span className="text-4xl">
            {`${timeRemaining.minutes}m ${timeRemaining.seconds}s`}
          </span>
        </div>
      </div>


      {/* Stats Section */}
      <div className="flex flex-wrap justify-center items-start gap-6 sm:gap-[1vw]">
        {/* Card 1 */}
        <div
          className={`${darkMode
            ? 'border-4 border-gray-100'
            : 'text-dark bg-gray-100'
            } p-6 m-4 rounded-3xl flex flex-col items-start justify-between w-[30%] h-[50vh] hidden md:flex`}
        >
          <div className="text-left space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold">10+ years</h2>
            <p className="text-sm sm:text-base">
            Your reliable partner for building a standout online presence. Let’s elevate your digital success together.
            </p>
            <p className="italic font-medium mt-2">Attract, Connect, and Motivate.</p>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-end">
            <a
              href="/go/casestudies"
              className="flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-secondary text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M23 5v13.883l-1 .117v-16c-3.895.119-7.505.762-10.002 2.316-2.496-1.554-6.102-2.197-9.998-2.316v16l-1-.117v-13.883h-1v15h9.057c1.479 0 1.641 1 2.941 1 1.304 0 1.461-1 2.942-1h9.06v-15h-1zm-12 13.645c-1.946-.772-4.137-1.269-7-1.484v-12.051c2.352.197 4.996.675 7 1.922v11.613zm9-1.484c-2.863.215-5.054.712-7 1.484v-11.613c2.004-1.247 4.648-1.725 7-1.922v12.051z" />
              </svg>
            </a>
            <img
              src="https://images.ctfassets.net/g69xg0qy1hq0/3oqGGWnWE7YNFWwSjUjJ6E/e554d879ae46009be4abf0504d3c42c3/Isometric_iPad_Pro_Mockup_Vol_2_by_Anthony_Boyd_Graphics__2_.jpg?w=1100&h=825&q=80&fm=avif"
              alt="Example work"
              className="rounded-lg w-32 sm:w-48 h-32 sm:h-48 object-cover mt-4 sm:mt-0"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full sm:w-[45%] lg:w-[30%] h-auto sm:h-[50vh] flex flex-col justify-end items-center">
          <div className="flex flex-col items-center pb-6 sm:pb-10">
            <span className={`${darkMode ? 'text-white' : 'text-primary'} hover:bg-white hover:text-primary font-bold py-1 pl-1 pr-4 mb-6 sm:mb-10 rounded-full flex items-center space-x-2`}>
              <div className="flex items-center space-x-[-10px]">
                {["https://plus.unsplash.com/premium_photo-1671282928655-5ffc9cf95728?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://t3.ftcdn.net/jpg/02/58/89/90/360_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg", "https://images.unsplash.com/photo-1595347097560-69238724e7bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Client ${i + 1}`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  />
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <p>Loved by +20 business owners</p>
                <div className="flex items-center space-x-1">
                  <p>5.0</p>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-3 w-3 sm:h-4 sm:w-4 text-secondary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21 16.54 14.97 22 10.91 15.81 10.13 12 4.1 8.19 10.13 2 10.91 7.46 14.97 5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
              </div>
            </span>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-transform transform hover:scale-105"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigate('/go/booking')}
                className="px-6 py-3 bg-white text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-transform transform hover:scale-105"
              >
                Book Meeting
              </button>
            </div>
          </div>

          <div
            className={`${darkMode
              ? 'border-4 border-gray-100'
              : 'text-dark bg-gray-100'
              } p-6 rounded-3xl flex flex-col items-start justify-between w-full h-auto sm:h-[40vh] text-left`}
          >
            <h2 className="text-4xl sm:text-7xl">40+</h2>
            <p className="text-sm sm:text-base">
              Elevated Brands through Social Media.
            </p>
            <button
              onClick={() => window.location.href = '/services'}
              className="mt-4 text-sm font-bold py-2 px-4 bg-primary text-white rounded-full hover:bg-blue-600 transition"
            >
              See how it works
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className={`${darkMode ? 'border-4 border-gray-100' : 'text-dark bg-gray-100'} p-6 rounded-3xl flex flex-col justify-between w-full sm:w-[45%] lg:w-[30%] h-auto sm:h-[50vh]`}
        >
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Our Services</h2>
            <p className="text-sm sm:text-base mb-4">
              Transparency, innovation, and outstanding value.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm sm:text-base mt-auto">
            {services.map((service) => (
              <a
                key={service.name}
                href={service.link}
                className="py-2 px-4 rounded-full bg-white text-black hover:bg-primary hover:text-white transition flex items-center gap-2"
              >
                {service.name}
                <BsArrowUpRightCircle />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;