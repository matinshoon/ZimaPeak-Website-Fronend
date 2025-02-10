import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import Banner from '../components/Home/Banner';
import BlackFriday from '../components/Home/BlackFriday';
import Portfolio from '../components/Home/Portfolio';
import Testimonial from '../components/Home/Testimonial';
import LogoSlider from '../components/Home/LogoSlider';
import TagSlider from '../components/Home/TagSlider';
import Stats from '../components/Home/Stats';
import PopupBanner from '../components/PopupBanner';
import Contact from '../components/Contact';
import Samples from '../components/Home/Samples';
import Services from '../components/Home/Services';

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
        <div className={`bg-tiles text-center overflow-hidden ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <Helmet>
                <title>Marketing Agency | Zimapeak Marketing</title>
                <meta name="description" content="Zimapeak Marketing, a leading Marketing Agency, specializes in web development, SEO, and digital marketing to elevate your business." />
                <meta name="keywords" content="Marketing Agency, Digital marketing, SEO services, Web development in Toronto, Social media marketing, Content marketing" />
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

            <div className='md:h-2/3 mt-[20vh] md:mt-0 lg:pt-[15vh] flex flex-col justify-center'>
                <Banner />
            </div>
            <div className='md:p-0 md:h-1/3 mt-40 md:my-20 flex flex-col justify-end lg:justify-center'>
                <LogoSlider />
            </div>
            <div className='md:p-0 md:h-1/3 mt-40 md:my-20 flex flex-col justify-end lg:justify-center'>
                <Services />
            </div>
            <div className='md:p-0 md:h-1/3 mt-40 md:my-20 flex flex-col justify-end lg:justify-center'>
                <Samples />
            </div>
            <div className="z-10 my-20 p-10 md:p-0">
                <Stats />
            </div>
            <div className="z-10 my-20">
                <Portfolio />
            </div>
            <div className='my-20 z-20'>
                <Testimonial numberToShow="4" />
            </div>
            <div className='z-30 relative md:p-0 md:h-1/2 my-20 flex flex-col justify-end lg:justify-center rotate-12 -translate-x-10 translate-y-10 w-[115vw]'>
                <TagSlider />
            </div>
            <div className='mt-20 z-20'>
                <Contact />
            </div>
        </div>
    );
};

export default Home;