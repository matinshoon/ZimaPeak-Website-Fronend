import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

const BlogPost = () => {
    const { darkMode } = useContext(ThemeContext);
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const baseUrl = process.env.REACT_APP_PUBLIC_BASE_URLL;

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await axios.get(`${baseUrl}/website/get/blog/${id}`);
                setBlogPost(response.data);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setBlogPost(null); // Handle case when no blog post is found
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPost();
    }, [id, baseUrl]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (!blogPost) {
        return <div className="flex justify-center items-center min-h-screen">No blog post found.</div>;
    }

    return (
        <div id="blogPost" className={`flex justify-center items-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <span className={`${darkMode ? 'blury-left' : 'blury-left'}`}></span>
            <span className={`${darkMode ? 'blury-right' : 'blury-right'}`}></span>
            <div className="container mx-auto py-40 z-10 relative flex flex-col justify-center items-center">
                <p className="mb-4 text-primary">{blogPost.author}</p>
                <h1 className="text-3xl font-bold relative">{blogPost.title}</h1>
                <p className="text-lg mt-4">{blogPost.summary}</p>
                <p className="text-sm mt-2">{blogPost.publishedDate}</p>
                {blogPost.videoUrl && (
                    <div className="my-10 w-full md:w-3/5">
                        <iframe
                            width="100%"
                            height="315"
                            src={blogPost.videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
                <div className='mx-40 w-3/5'>
                    <p className="mb-10 whitespace-pre-line">{blogPost.content}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
