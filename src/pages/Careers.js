import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const Careers = () => {
    const { darkMode } = useContext(ThemeContext);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.REACT_APP_PUBLIC_BASE_URLL;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${baseUrl}/website/get/careers`);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching job postings:', error);
                setError('Failed to load job postings.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, [baseUrl]);

    return (
        <div className={`py-16 px-6 ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}>
            <Helmet>
                <title>Careers | Join Our Team</title>
                <meta name="description" content="Explore career opportunities at our company. We are hiring talented individuals for various positions. Apply now to join our team!" />
                <meta name="keywords" content="careers, jobs, hiring, frontend developer, backend developer, project manager, SEO, branding specialist" />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <h1 className="mt-32 text-3xl md:text-5xl font-bold mb-8 max-w-7xl mx-auto text-left">Careers</h1>
                <p className="mb-32 text-lg md:text-xl mb-8 text-left max-w-7xl mx-auto">
                    Explore career opportunities at our company. We are hiring talented individuals for various positions. Apply now to join our team!
                </p>
                {isLoading ? (
                    <div className="flex items-center justify-center h-screen">
                        <ClipLoader color={darkMode ? '#ffffff' : '#000000'} loading={isLoading} size={50} />
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <p className="text-xl my-40">{error}</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center">
                        <p className="text-xl my-40">No job postings available at the moment.</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div key={job.id} className={`flex justify-between py-6 border-b ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-black'}`}>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                                <p className="mb-4">{job.description}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <Link to={job.link}>
                                    <button className={`w-full max-w-xs px-10 py-3 rounded-2xl text-sm ${darkMode ? 'bg-sky-950 hover:bg-gray-900 hover:text-white' : 'bg-slate-900 text-white hover:bg-gray-300 hover:text-slate-900'}`}>
                                        Apply
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Careers;
