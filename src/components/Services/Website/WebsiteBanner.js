import React, { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import { useNavigate } from 'react-router-dom';
import WebsiteForm from './WebsiteForm'; // Assuming the form is a separate component
import importedImage from '../../../images/combineratng.png'; // Replace with the actual path to your image

const WebsiteBanner = () => {
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <div className="pt-[14vh] z-10 flex flex-col justify-center items-center">
            <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-0">
                {/* Left Side */}
                <div className="md:block flex flex-col justify-center items-center md:w-1/2 p-6 sm:pl-40 space-y-6">
                    <span
                        className={`${darkMode ? 'text-white' : 'text-primary'
                            } hover:bg-white hover:text-primary font-bold pl-1 pr-4 rounded-full flex items-center space-x-2`}
                    >
                        <div className="flex items-center space-x-[-10px]">
                            {[
                                'https://plus.unsplash.com/premium_photo-1671282928655-5ffc9cf95728?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                'https://t3.ftcdn.net/jpg/02/58/89/90/360_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg',
                                'https://images.unsplash.com/photo-1595347097560-69238724e7bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            ].map((src, i) => (
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
                    <div>
                        <h1 className="text-left text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-snug">
                            Customized Websites <span className="text-primary">*</span><br />
                            Designed to Elevate <span className="text-secondary">Your Brand</span>!!
                        </h1>
                        <p className='text-left text-xl my-6'>
                            Zimapeak Marketing, a leading Marketing Agency, specializes in web development, SEO, and digital marketing to elevate your business.
                        </p>
                        {/* Imported Image below h1 */}
                        <img
                            src={importedImage}
                            alt="Custom Website Design"
                            className="mt-4 max-w-full h-auto"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2">
                    <WebsiteForm />
                </div>
            </div>
        </div>
    );
};

export default WebsiteBanner;