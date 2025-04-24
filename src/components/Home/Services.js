import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';
import { BsArrowUpRightCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Services = () => {
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <div id="banner" className="z-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="w-full flex flex-wrap py-10 md:py-0 md:h-[60vh] justify-center items-center gap-6 sm:gap-[1vw] z-10">

            <div className="sm:hidden sm:flex w-3/4 h-full flex-col justify-center items-center text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">Discover Our Expert Services</h2>
                    <p className="text-sm sm:text-base mb-4">
                        Whether you run an eCommerce store, a service-based business, or an agency seeking better results for your clients—we’re here to help you succeed.
                    </p>
                    <div className='flex flex-col justify-center items-center pt-22'>
                        <a
                            href="#samples"
                            className="text-primary hover:text-dark transition duration-300"
                        >
                            Need a website?
                        </a>
                        <div className="mt-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-primary animate-bounce"
                                fill="none"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    id="XMLID_225_"
                                    fill="currentColor"
                                    d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  
                   c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  
                   s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    className={`${darkMode ? 'border-4 border-gray-100' : 'text-dark bg-white'} p-6 rounded-3xl flex flex-col justify-between items-center w-full sm:w-[45%] lg:w-[30%] h-[70%]`}
                >
                    {/* Image Section */}
                    <div className="flex-shrink-0 mb-4">
                        <img
                            src="https://zimapeak.com/go/wp-content/uploads/2024/12/googleadslogo.png" // Update with the correct image path
                            alt="Card Image"
                            className="w-[7rem] h-[7rem] object-contain rounded-t-xl"
                        />
                    </div>

                    {/* Centered Text Section */}
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Google Ads</h2>
                            <p className="text-sm sm:text-base mb-4">
                                Search, Maps and Youtube Ads
                            </p>
                        </div>
                    </div>

                    {/* Button Section */}
                    <div className="text-center mt-4">
                        <Link to="/services/google-ads">
                            <button
                                className="py-2 px-6 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-200"
                            >
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="hidden sm:flex w-1/3 h-full flex-col justify-center items-center text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">Discover Our Expert Services</h2>
                    <p className="text-sm sm:text-base mb-4">
                        Whether you run an eCommerce store, a service-based business, or an agency seeking better results for your clients—we’re here to help you succeed.
                    </p>
                    <div className='flex flex-col justify-center items-center pt-22'>
                        <a
                            href="#samples"
                            className="text-primary hover:text-dark transition duration-300"
                        >
                            Need a website?
                        </a>
                        <div className="mt-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-primary animate-bounce"
                                fill="none"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    id="XMLID_225_"
                                    fill="currentColor"
                                    d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  
                   c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  
                   s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    className={`${darkMode ? 'border-4 border-gray-100' : 'text-dark bg-white'} p-6 rounded-3xl flex flex-col justify-between items-center w-full sm:w-[45%] lg:w-[30%] h-[70%]`}
                >
                    {/* Image Section */}
                    <div className="flex-shrink-0 mb-4">
                        <img
                            src="https://zimapeak.com/go/wp-content/uploads/2024/12/metalogo.png" // Update with the correct image path
                            alt="Card Image"
                            className="w-[7rem] h-[7rem] object-contain rounded-t-xl"
                        />
                    </div>

                    {/* Centered Text Section */}
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Meta Ads</h2>
                            <p className="text-sm sm:text-base mb-4">
                                Facebook and Instagram Ads
                            </p>
                        </div>
                    </div>

                    {/* Button Section */}
                    <div className="text-center mt-4">
                        <Link to="/services/meta-ads">
                            <button
                                className="py-2 px-6 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-200"
                            >
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Text */}
            <div className="absolute -inset-14 -z-10 flex justify-end items-end overflow-hidden">
                <div
                    className="text-[5rem] sm:text-[5rem] lg:text-[10rem] font-bold uppercase opacity-10 whitespace-nowrap text-dark animate-marquee"
                    style={{ whiteSpace: 'nowrap' }}
                >
                    ZIMAPEAK ZIMAPEAK ZIMAPEAK ZIMAPEAK ZIMAPEAK
                </div>
            </div>


        </div>
    );
};

export default Services;