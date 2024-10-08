import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const CaseStudies = () => {
    const { darkMode } = useContext(ThemeContext);
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const baseUrl = process.env.REACT_APP_PUBLIC_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/website/get/casestudies`, { withCredentials: true });
                const dataWithCategories = response.data.map(study => ({
                    ...study,
                    category: study.category ? capitalizeFirstLetter(study.category) : 'General',
                }));
                setCaseStudies(dataWithCategories);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const filteredCaseStudies = selectedCategory === 'All'
        ? caseStudies
        : caseStudies.filter(study => study.category === selectedCategory);

    return (
        <div id='casestudies' className={`text-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}>
            <Helmet>
                <title>Case Studies | Zimapeak Marketing</title>
                <meta name="description" content="Explore our case studies showcasing successful digital marketing campaigns, web development projects, and SEO strategies. Learn how we helped clients achieve their business goals." />
                <link rel="canonical" href="https://www.zimapeak.com/casestudies" />
            </Helmet>
            
            <h1 className="pt-28 pb-8 text-3xl font-bold">Case Studies</h1>

            <div className="pb-8">
                {['All', 'Dentistry', 'Beauty', 'Gym', 'General'].map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`mx-2 py-2 px-4 rounded ${darkMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} ${selectedCategory === category ? 'font-bold' : ''} hover:bg-blue-600`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color={darkMode ? '#ffffff' : '#000000'} size={50} />
                </div>
            ) : (
                <div className="pb-20 px-20 flex flex-wrap justify-center">
                    {filteredCaseStudies.map((caseStudy, index) => (
                        <div key={index} className={`max-w-sm m-4 rounded w-full ${darkMode ? 'bg-dark' : 'bg-gray'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} hover:border-blue-500 transition duration-300`}>
                            <img src={caseStudy.banner} alt="Case Study" className="w-full h-80 object-cover object-center" />
                            <div className="px-6 py-4">
                                <div className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{caseStudy.title}</div>
                                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{caseStudy.summary.length > 100 ? caseStudy.summary.substring(0, 100) + '...' : caseStudy.summary}</p>
                            </div>
                            <div className="px-6 pb-4">
                                <Link to={`/casestudy/${caseStudy.id}`} className={`inline-block ${darkMode ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded`}>
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CaseStudies;
