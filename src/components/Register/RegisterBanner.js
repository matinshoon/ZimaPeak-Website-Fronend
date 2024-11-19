import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../ThemeContext'; // Import the ThemeContext

const lightImages = [
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1608501821300-4f99e58bba77?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const darkImages = [
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1608501821300-4f99e58bba77?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const RegisterBanner = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext); // Get the darkMode value from context
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const images = darkMode ? darkImages : lightImages; // Use darkImages or lightImages based on the theme

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            setProgress(0);
        }, 5000);

        const progressIntervalId = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 2;
                }
                return 100;
            });
        }, 100);

        return () => {
            clearInterval(intervalId);
            clearInterval(progressIntervalId);
        };
    }, [currentImageIndex, images.length]);

    return (
        <div className="relative flex h-full w-full px-2 py-2">
            <img 
                src={images[currentImageIndex]} 
                alt="Claim Banner"
                className="rounded-xl object-cover h-full w-full"
            />
            {/* Back to Website Button */}
            <div className="absolute top-14 right-10">
                <button 
                    className="glass text-white px-4 py-2 rounded-full flex items-center hover:bg-white hover:text-dark transition duration-200"
                    onClick={() => navigate('/home')}
                >
                    Back to Website
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </button>
            </div>
            {/* Logo Overlay */}
            <div className="absolute top-12 left-10">
                <img 
                    src={logo} 
                    alt="Zimapeak Logo"
                    className="h-16 w-auto"
                />
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div 
                        key={index}
                        className={`h-2 w-14 rounded-full ${index === currentImageIndex ? 'bg-gray-500' : 'bg-gray-400'}`}
                    >
                        {/* Fill effect for the current indicator */}
                        <div 
                            className={`h-full rounded-full bg-white transition-all duration-500`} 
                            style={{
                                width: index === currentImageIndex ? `${progress}%` : '0%',
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegisterBanner;