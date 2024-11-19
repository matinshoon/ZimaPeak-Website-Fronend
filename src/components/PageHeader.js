import React, { useEffect, useState } from 'react';

const Banner = () => {
    const [pageTitle, setPageTitle] = useState('');
    const [pageDescription, setPageDescription] = useState('');

    useEffect(() => {
        // Get the page title and description dynamically
        const fullTitle = document.title; // Full title from the current page
        const titleBeforePipe = fullTitle.split('|')[0].trim(); // Extract part before "|"

        const metaDescriptionTag = document.querySelector('meta[name="description"]'); // Find the description meta tag
        const metaDescription = metaDescriptionTag ? metaDescriptionTag.content : 'No description available';

        setPageTitle(titleBeforePipe);
        setPageDescription(metaDescription);
    }, []);

    return (
        <div id="banner" className="z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Header Section */}
            <div className="pt-32 pb-10 space-y-10 text-center">
                <h1 className="text-5xl md:text-7xl font-bold">{pageTitle}</h1>
                {pageDescription && (
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{pageDescription}</p>
                )}
            </div>
        </div>
    );
};

export default Banner;