import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import Samples from '../components/Home/Samples.js';
import WebsiteBanner from '../components/Services/Website/WebsiteBanner.js';
import PopupBanner from '../components/PopupBanner';
import Testimonial from '../components/Home/Testimonial.js';
import WebsiteTypes from '../components/Services/Website/WebsiteTypes.js';

const WebLanding = () => {
    const { darkMode } = useContext(ThemeContext);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) {
            setTimeout(() => {
                setPopupVisible(true);
            }, 3000);
        }
    }, []);

    const closePopup = () => {
        setPopupVisible(false);
        localStorage.setItem('hasSeenPopup', 'true');
    };

    return (
        <div className={`bg-tiles flex flex-col justify-center items-center text-center overflow-hidden ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <Helmet>
                <title>Customize Web Design | Zimapeak Marketing</title>
                <meta name="description" content="Affordable web design services starting at $199! Get professional, responsive websites designed to boost your online presence. Perfect for small businesses and startups. Contact us today!" />
                <meta name="keywords" content="cheap web design, affordable web design, web design $199, small business websites, responsive web design, budget-friendly web design, professional web design service, startup websites, Google Ads web design" />
                <link rel="canonical" href="https://www.zimapeak.com/" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Zimapeak Marketing",
                        "url": "https://www.zimapeak.com",
                        "logo": "https://zimapeak.com/static/media/logo-black.e615ec67e0b220c2f2ac.png",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+1-647-570-2244",
                            "contactType": "Customer Service"
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "39 Roehampton Ave",
                            "addressLocality": "Toronto",
                            "addressRegion": "ON",
                            "postalCode": "M4P 0G1",
                            "addressCountry": "Canada"
                        },
                        "sameAs": [
                            "https://www.facebook.com/profile.php?id=61559690607181",
                            "https://www.x.com/zimapeak",
                            "https://www.linkedin.com/company/zimapeak"
                        ]
                    })}
                </script>
            </Helmet>
            {popupVisible && <PopupBanner closePopup={closePopup} />}

            <div className='flex flex-col justify-center'>
                <WebsiteBanner />
            </div>
            <div className='my-20 z-20'>
                <WebsiteTypes />
            </div>
            <div className='hidden md:p-0 md:h-1/3 mt-40 md:my-20 md:flex flex-col justify-end lg:justify-center'>
                <Samples />
            </div>
            <div className='my-20 z-20'>
                <Testimonial numberToShow="all" />
            </div>
        </div>
    );
};

export default WebLanding;