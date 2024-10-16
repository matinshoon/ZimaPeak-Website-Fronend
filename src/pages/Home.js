import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import Banner from '../components/Home/Banner';
import Compare from '../components/Home/Compare';
import Testimonial from '../components/Home/Testimonial';
import LogoSlider from '../components/Home/LogoSlider';
import Stats from '../components/Home/Stats';
import PopupBanner from '../components/PopupBanner';
// import Ai from './Ai';

const Home = () => {
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
        <div className={`bg-tiles text-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <Helmet>
                <title>Zimapeak Marketing | Toronto's Best Web Development & Digital Marketing Agency</title>
                <meta name="description" content="Zimapeak Marketing offers top-notch web development, SEO services, and social media marketing in Toronto. Let us help you grow your business online." />
                <meta name="keywords" content="Web development agency, Digital marketing agency, Web design company, SEO services, Social media marketing, Content marketing, PPC management, E-commerce development, Mobile app development, Custom web applications, Toronto web development agency, Toronto digital marketing services, Web design in Toronto, SEO services in Toronto, Toronto social media marketing" />
                <link rel="canonical" href="https://www.zimapeak.com/" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Zimapeak Marketing",
                        "url": "https://www.zimapeak.com",
                        "logo": "https://www.zimapeak.com/logo.png",
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
            <div className='h-screen'>
            <div className='h-full md:h-2/3 lg:pt-40 flex flex-col justify-center'>
                <Banner/>
            </div>
            <div className='md:p-0 md:h-1/3 flex flex-col justify-end lg:justify-center'>
                <LogoSlider />
            </div>
            </div>
            <div className="z-10 my-40">
                <Stats />
            </div>
            <div className='my-40 z-20'>
                <Testimonial />
            </div>
            <div className='mt-40 flex justify-center'>
                <Compare />
            </div>
        
        </div>
    );
};

export default Home;
