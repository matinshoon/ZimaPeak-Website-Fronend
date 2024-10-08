import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Blog = () => {
    const { darkMode } = useContext(ThemeContext);
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const baseUrl = process.env.REACT_APP_PUBLIC_BASE_URLL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/website/get/blogs`); // Update endpoint if necessary
                const dataWithCategories = response.data.map(post => ({
                    ...post,
                    category: capitalizeFirstLetter(post.category),
                }));
                setBlogPosts(dataWithCategories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div
            id='blog'
            className={`text-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'} ${
                filteredPosts.length === 0 && !loading ? 'min-h-screen' : ''
            }`}
            style={{ minHeight: filteredPosts.length === 0 && !loading ? '100vh' : 'auto' }}
        >
            <Helmet>
                <title>Blog | Zimapeak Marketing</title>
                <meta name="description" content="Explore our blog articles on digital marketing, web development, and more. Stay updated with the latest industry trends and tips." />
                <link rel="canonical" href="https://www.zimapeak.com/blog" />
            </Helmet>
           
            <h1 className="pt-28 pb-8 text-3xl font-bold">Blog</h1>

            {/* Filter Buttons */}
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
                <div className={`pb-20 px-20 flex flex-wrap justify-center ${filteredPosts.length === 0 ? 'h-screen' : ''}`}>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <div key={index} className={`max-w-sm m-4 rounded w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} hover:border-blue-500 transition duration-300`}>
                                <img src={post.banner} alt={post.title} className="w-full h-80 object-cover object-center" />
                                <div className="px-6 py-4">
                                    <div className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{post.title}</div>
                                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.summary.length > 100 ? post.summary.substring(0, 100) + '...' : post.summary}</p>
                                </div>
                                <div className="px-6 pb-4">
                                    <Link to={`/blog/${post.id}`} className={`inline-block ${darkMode ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded`}>
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No blog posts available at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;
