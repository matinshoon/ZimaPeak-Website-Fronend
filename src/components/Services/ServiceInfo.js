// src/pages/ServiceInfo.js
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../../ThemeContext';
import { Link } from 'react-router-dom';
import services from '../../data/servicesData'; 

const ServiceInfo = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`bg-tiles flex flex-col items-center py-16 px-6 ${darkMode ? 'text-white' : 'bg-white text-dark'}`}>
            <Helmet>
                <meta name="description" content="Discover our wide range of services including Social Media Marketing, Software Development, SEO, and more." />
                <meta name="keywords" content="services, social media marketing, software development, SEO, business growth" />
            </Helmet>
            <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">Transform Your Ideas into Reality</h1>
            <p className="text-lg md:text-xl mb-8 text-center max-w-3xl">
                Our development team brings your vision to life with cutting-edge technology and innovative solutions. From web and mobile apps to custom software, we deliver products that not only meet but exceed your expectations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                {services.map((service, index) => (
                    <div key={index} className={`flex-1 m-4 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-dark text-white' : 'border-dark border-4 bg-white'}`}>
                        <h2 className="text-xl font-semibold mb-4">{service.title}</h2>
                        <p>{service.description}</p>
                        <div className='flex justify-center w-full mt-8'>
                            <Link to={service.link}>
                                <button className={`w-full px-10 py-3 rounded-l-2xl text-sm ${darkMode ? 'border hover:bg-gray-900 hover:text-white' : 'transition duration-200 text-black bg-white border-2 border-dark hover:border-dark hover:bg-dark hover:text-white'}`}>
                                    More
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className={`w-full px-10 py-3 rounded-r-2xl text-sm ${darkMode ? 'bg-secondary border border-secondary hover:border-white hover:bg-white hover:text-dark' : 'transition duration-200 text-white bg-dark border-2 border-dark hover:border-2 hover:border-dark hover:bg-white hover:text-dark'}`}>
                                    Start
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceInfo;
