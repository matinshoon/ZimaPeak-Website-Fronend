import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../../ThemeContext';
import { Link } from 'react-router-dom';
import services from '../../data/servicesData';

const ServiceInfo = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`flex flex-col items-center py-12 px-4 sm:px-8 ${darkMode ? 'text-white' : 'bg-white text-dark'}`}>
            <Helmet>
                <meta name="description" content="Discover our wide range of services including Social Media Marketing, Software Development, SEO, and more." />
                <meta name="keywords" content="services, social media marketing, software development, SEO, business growth" />
            </Helmet>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-center">Transform Your Ideas into Reality</h1>

            <p className="text-base sm:text-lg md:text-xl mb-8 text-center max-w-3xl">
                Our development team brings your vision to life with cutting-edge technology and innovative solutions. From web and mobile apps to custom software, we deliver products that not only meet but exceed your expectations.
            </p>

            <div className="container flex flex-col w-full max-w-7xl gap-10">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`bg-gray-100 rounded-2xl p-5 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} ${index % 2 !== 0 && 'md:flex-row-reverse'} ${darkMode ? 'bg-dark text-white' : ''} transition duration-300`}
                    >
                        {/* Text Section */}
                        <div className='w-full md:w-1/2 flex flex-col justify-center p-10'>
                            <h2 className="text-lg sm:text-xl font-semibold mb-4">{service.title}</h2>
                            <p className="text-sm sm:text-base">{service.description}</p>

                            <div className='flex'>
                                <span className="relative flex items-center justify-center mt-4 space-x-1 p-2 bg-blue-100 rounded-full">
                                    <span className="justify-center space-x-1 p-2 bg-blue-200 rounded-full">
                                        <Link to={service.link}>
                                            <button
                                                className="text-sm font-bold py-2 px-4 bg-primary text-white rounded-full hover:bg-blue-600 transition"
                                            >
                                                Learn More
                                            </button>
                                        </Link>
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className='w-full md:w-1/2 flex justify-center'>
                            <img
                                src={service.image}
                                alt={`${service.title} image`}
                                className="w-full rounded-2xl"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceInfo;