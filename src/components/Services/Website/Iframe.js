// Iframe.js
import React, { useState, useEffect } from 'react';

const Iframe = ({ src, title }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Set loaded to true after iframe has been rendered
        const timer = setTimeout(() => setIsLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <iframe
            src={isLoaded ? src : ''}
            title={title}
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                transition: 'opacity 1s ease',
                opacity: isLoaded ? 1 : 0,
            }}
        ></iframe>
    );
};

export default Iframe;