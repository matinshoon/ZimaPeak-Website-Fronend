import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import caseStudiesData from '../data/casestudiesData';  // Import the static data
import PageHeader from '../components/PageHeader';

const CaseStudies = () => {
    const { darkMode } = useContext(ThemeContext);
    const [caseStudies, setCaseStudies] = useState(caseStudiesData);  // Set the static data as the initial state
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        // Mimic loading delay
        setLoading(true);
        setTimeout(() => {
            setLoading(false);  // Simulate data loading finish
        }, 1000);
    }, []);

    // Extract unique categories from the case studies
    const categories = ['All', ...new Set(caseStudies.map(study => study.category))];

    // Function to format category names (e.g. 'meta-ads' -> 'Meta Ads')
    const formatCategory = (category) => {
        if (category === 'web') {
            return 'Web Development';
        }
        if (category === 'ig') {
            return 'Instagram';
        }
        return category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Filter case studies based on the selected category
    const filteredCaseStudies = selectedCategory === 'All'
        ? caseStudies
        : caseStudies.filter(study => study.category === selectedCategory);

    return (
        <div className='flex flex-col items-center'>
            <div className="max-w-7xl w-full h-full mx-auto flex flex-col">
                <div id='casestudies' className={`container text-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'} px-4 sm:px-8`}>
                    <Helmet>
                        <title>Case Studies | Zimapeak Marketing</title>
                        <meta name="description" content="Explore our case studies showcasing successful digital marketing campaigns, web development projects, and SEO strategies. Learn how we helped clients achieve their business goals." />
                        <link rel="canonical" href="https://www.zimapeak.com/casestudies" />
                    </Helmet>
                    <PageHeader />

                    {/* Category Buttons */}
                    <div className="pb-6 flex flex-wrap justify-center gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`py-2 px-4 rounded ${darkMode ? 'bg-primary text-white' : 'bg-gray-200 text-black'} ${selectedCategory === category ? 'font-bold' : ''} hover:bg-primary hover:text-white transition duration-200`}
                            >
                                {formatCategory(category)}  {/* Display formatted category name */}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center min-h-[50vh]">
                            <ClipLoader color={darkMode ? '#ffffff' : '#000000'} size={50} />
                        </div>
                    ) : (
                        <div className="pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCaseStudies.map((caseStudy, index) => (
                                <Link to={`/casestudy/${caseStudy.id}`} key={index}>
                                    <div className={`flex flex-col justify-center items-center text-left rounded-2xl w-full p-3 ${darkMode ? 'bg-dark' : 'bg-gray-100 hover:bg-gray-200'} transition duration-300`}>
                                        <img src={caseStudy.banner} alt="zimapeak Case Study" className="w-full h-72 object-cover object-center rounded-xl" />
                                        <div className="px-4 py-4">
                                            <div className={`font-bold text-lg sm:text-xl mb-2 ${darkMode ? 'text-white' : 'text-dark'}`}>{caseStudy.title}</div>
                                            <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{caseStudy.summary.length > 100 ? caseStudy.summary.substring(0, 100) + '...' : caseStudy.summary}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;