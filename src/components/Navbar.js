import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext
import logo from "../images/logo-black.png";
import logowhite from "../images/logo-white.png";
import CardContainer from './Card';

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false); // State for Resources dropdown
  const [subResourceContent, setSubResourceContent] = useState(''); // State for subresources content
  const [activeResource, setActiveResource] = useState(''); // State for active resource
  const [hoveredResource, setHoveredResource] = useState(''); // State for hovered resource
  const [cardsData, setCardsData] = useState([]); // State for cards data
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const resourcesRef = useRef(null);

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
    navigate('/booking');
  };

  const handleResourcesToggle = () => {
    setResourcesOpen(!resourcesOpen);
    if (!resourcesOpen) {
      handleResourceClick('Blog Content', '');
      fetchResourceData('Blog');
    }
  };

  const handleResourceClick = (content, resource) => {
    setSubResourceContent(content);
    setActiveResource(resource);
  };

  const handleResourceHover = (content, resource) => {
    setSubResourceContent(content);
    setHoveredResource(resource);
    fetchResourceData(resource);
  };

  const fetchResourceData = (resource) => {
    setCardsData([]); // Clear cards data before fetching new data
    let url = '';
    switch (resource) {
      case 'Blog':
        url = 'https://zimapeak.com/blog/wp-json/wp/v2/posts';
        break;
      case 'Webinars':
        url = 'https://zimapeak.com/blog/wp-json/wp/v2/webinars';
        break;
      case 'Case Studies':
        url = 'https://zimapeak.com/blog/wp-json/wp/v2/case-study';
        break;
      default:
        return;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        const data = json.slice(0, 3).map(item => ({
          imageSrc: item.uagb_featured_image_src?.medium_large?.[0] || 'https://picsum.photos/300/300', // Use the featured image if available, otherwise use a placeholder
          title: item.title.rendered || item.title,
          description: item.uagb_excerpt || item.content.rendered || item.body || 'No description available',
          link: item.link || '#'
        }));
        setCardsData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleCardClick = (link) => {
    window.location.href = link;
  };

  // Function to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className='flex justify-center items-center'>
      <nav className={`navbar justify-center h-14 md:h-auto md:w-full w-11/12 bg-glass md:bg-inherit md:m-0 mt-4 mx-2 rounded-full md:rounded-none ${menuOpen ? 'menu-open' : ''}`}>
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
              <li className="relative" ref={resourcesRef}>
                <button
                  className={`hover:${darkMode ? 'text-gray-300' : 'text-secondary'} transition duration-200`}
                  onClick={handleResourcesToggle}
                >
                  Resources
                </button>
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
              <li className='pb-6' ref={resourcesRef}>
                <button
                  className={`text-4xl font-bold hover:text-gray-300 text-left w-full`}
                  onClick={handleResourcesToggle}
                >
                  Resources
                </button>
                {resourcesOpen && (
                  <div className={`w-full mt-2 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
                    <ul className="flex flex-col space-y-2 p-4">
                      <li
                        className={`${activeResource === 'Blog' || hoveredResource === 'Blog' ? 'bg-white text-primary px-4 py-2 w-full rounded-2xl' : ''}`}
                        onMouseEnter={() => handleResourceHover('Blog Content', 'Blog')}
                        onMouseLeave={() => setHoveredResource('')}
                        onClick={() => handleResourceClick('Blog Content', 'Blog')}
                      >
                        <a href="/blog" className="hover:text-secondary">Blog</a>
                      </li>
                      <li
                        className={`${activeResource === 'Webinars' || hoveredResource === 'Webinars' ? 'bg-white text-primary px-4 py-2 w-full rounded-2xl' : ''}`}
                        onMouseEnter={() => handleResourceHover('Webinars Content', 'Webinars')}
                        onMouseLeave={() => setHoveredResource('')}
                        onClick={() => handleResourceClick('Webinars Content', 'Webinars')}
                      >
                        <a href="/webinars" className="hover:text-secondary">Webinars</a>
                      </li>
                      <li
                        className={`${activeResource === 'Case Studies' || hoveredResource === 'Case Studies' ? 'bg-white text-primary px-4 py-2 w-full rounded-2xl' : ''}`}
                        onMouseEnter={() => handleResourceHover('Case Studies Content', 'Case Studies')}
                        onMouseLeave={() => setHoveredResource('')}
                        onClick={() => handleResourceClick('Case Studies Content', 'Case Studies')}
                      >
                        <a href="/casestudies" className="hover:text-secondary">Case Studies</a>
                      </li>
                    </ul>
                  </div>
                )}
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
        {resourcesOpen && (
          <div className={`hidden md:flex justify-center w-screen h-[40vh] navbar-menu`}>
            <div className='container w-full md:px-0 lg:px-40 flex justify-center items-center h-full'>
              <div id='resources' className='w-full md:w-1/4 h-[90%] border-r border-white'>
                <ul className="flex flex-col justify-center space-y-4 h-full p-4">
                  <li
                    className={`${activeResource === 'Blog' || hoveredResource === 'Blog' ? 'transition ease-in-out bg-white text-primary px-4 py-2 w-full rounded-2xl' : 'bg-glass text-white px-4 py-2 w-full rounded-2xl'}`}
                    onMouseEnter={() => handleResourceHover('Blog Content', 'Blog')}
                    onMouseLeave={() => setHoveredResource('')}
                    onClick={() => handleResourceClick('Blog Content', 'Blog')}
                  >
                    <a href="/blog" onClick={() => handleResourceClick('Blog Content', 'Blog')}>Blog</a>
                  </li>
                  <li
                    className={`${activeResource === 'Webinars' || hoveredResource === 'Webinars' ? 'transition ease-in-out bg-white text-primary px-4 py-2 w-full rounded-2xl' : 'bg-glass text-white px-4 py-2 w-full rounded-2xl'}`}
                    onMouseEnter={() => handleResourceHover('Webinars Content', 'Webinars')}
                    onMouseLeave={() => setHoveredResource('')}
                    onClick={() => handleResourceClick('Webinars Content', 'Webinars')}
                  >
                    <a href="/webinars" onClick={() => handleResourceClick('Webinars Content', 'Webinars')}>Webinars</a>
                  </li>
                  <li
                    className={`${activeResource === 'Case Studies' || hoveredResource === 'Case Studies' ? 'transition ease-in-out bg-white text-primary px-4 py-2 w-full rounded-2xl' : 'bg-glass text-white px-4 py-2 w-full rounded-2xl'}`}
                    onMouseEnter={() => handleResourceHover('Case Studies Content', 'Case Studies')}
                    onMouseLeave={() => setHoveredResource('')}
                    onClick={() => handleResourceClick('Case Studies Content', 'Case Studies')}
                  >
                    <a href="/casestudies" onClick={() => handleResourceClick('Case Studies Content', 'Case Studies')}>Case Studies</a>
                  </li>
                  <li className='w-full flex justify-center items-center'>
                  <button
                  className="bg-white text-dark rounded-full h-8 w-8 flex items-center justify-center"
                  onClick={() => setResourcesOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                  </li>
                </ul>
              </div>
              <div id='subresources' className='w-full md:w-3/4 ml-4'>
                <CardContainer cardsData={cardsData} onCardClick={handleCardClick} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;