import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';
import { BsArrowUpRightCircle } from "react-icons/bs";
import caseStudiesData from '../../data/casestudiesData';

const Portfolio = () => {
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    // Show only the first three projects
    const displayedProjects = caseStudiesData.slice(0, 3);

    return (
        <div id="banner" className="bg-gray-100 h-full py-10 z-10 flex flex-col px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-7xl w-full h-full mx-auto flex flex-col">
                {/* Header Section */}
                <div className='w-full h-2/5 flex flex-col md:flex-row justify-between mb-4'>
                    <div className='flex flex-col justify-center items-start w-full md:w-1/2'>
                        <h1 className="text-left text-5xl md:text-8xl font-bold">
                            Awsome <br></br>Works
                        </h1>
                    </div>
                    <div className='w-full md:w-1/2 flex flex-col justify-center items-start md:items-end mt-6 md:mt-0'>
                        <div className='flex flex-col justify-center items-start md:w-1/3'>
                            <p className='text-left text-sm md:text-base'>
                                We take pride in delivering top-notch web solutions that are tailored to meet the unique needs of our clients.
                            </p>
                            <span className="flex justify-center mt-4 p-2 bg-blue-100 rounded-full">
                                <span className="justify-center p-2 bg-blue-200 rounded-full">
                                    <button
                                        onClick={() => window.location.href = '/casestudies'}
                                        className="text-sm font-bold py-2 px-4 bg-primary text-white rounded-full hover:bg-blue-600 transition"
                                    >
                                        All Projects
                                    </button>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Portfolio Cards Section */}
                <div className='w-full h-3/5 flex'>
                    <div className='flex flex-wrap md:flex-nowrap w-full h-[95%] justify-center space-x-0 md:space-x-6'>
                        {displayedProjects.map((project) => (
                            <div 
                                key={project.id} 
                                className="flex flex-col justify-start p-4 items-center w-full md:w-1/3 bg-white rounded-2xl overflow-hidden mb-6 md:mb-0"
                            >
                                <img 
                                    src={project.banner} 
                                    alt={project.title} 
                                    className="w-full h-40 sm:h-[58%] rounded-xl object-cover" 
                                />
                                <div className="p-4 text-left">
                                    <h2 className="text-lg md:text-xl font-semibold">{project.title}</h2>
                                    {/* Truncated description */}
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">{project.summary}</p>
                                    <button
                                        onClick={() => navigate(`/casestudy/${project.id}`)} // Navigate to the project details page
                                        className="flex items-center text-blue-500 mt-4 hover:text-blue-700"
                                    >
                                        <span>View Project</span>
                                        <BsArrowUpRightCircle className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;