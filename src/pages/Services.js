import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import Banner from '../components/Services/Banner';
import ServiceInfo from '../components/Services/ServiceInfo';

const Services = () => {
    const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext

    return (
        <div className={`${darkMode ? 'bg-dark text-white' : 'bg-white text-black'} py-20 px-10 md:px-0`}>
            <Helmet>
                <title>Our Services - ZimaPeak Marketing</title>
                <meta name="description" content="Discover the range of services offered by ZimaPeak Marketing, including social media marketing, SEO, and web development. Elevate your brand's online presence with our expert solutions." />
                <meta name="keywords" content="digital marketing, social media marketing, SEO, web development, online marketing services" />
                <link rel="canonical" href="https://www.zimapeak.com/services" />
            </Helmet>

            <Banner />

            <ServiceInfo />
        </div>
    );
};

export default Services;
