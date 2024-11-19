import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { BsArrowUpRightCircle } from 'react-icons/bs';

const services = [
    { name: 'Google Ads', link: '/services' },
    { name: 'Meta Ads', link: '/services' },
    { name: 'Web Design', link: '/services' },
    { name: 'SEO', link: '/services' },
    { name: 'Content', link: '/services' },
    { name: 'Google Ads', link: '/services' },
    { name: 'Meta Ads', link: '/services' },
    { name: 'Web Design', link: '/services' },
    { name: 'SEO', link: '/services' },
    { name: 'Content', link: '/services' },
    { name: 'Google Ads', link: '/services' },
    { name: 'Meta Ads', Design: '/services' },
    { name: 'Web Development', link: '/services' },
    { name: 'SEO', link: '/services' },
    { name: 'Content', link: '/services' },
  ];

const TagSlider = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <section>
            <div className="bg-gray-200 slider-logo">
                <div className="flex flex-wrap justify-center slide-track space-x-8 md:space-x-16 lg:space-x-40">
                    {services.map((service, i) => (
                        <div key={i} className="slide mb-3 justify-center items-center flex flex-col">
                            <a
                                href={service.link}
                                className="py-4 px-8 w-[60vw] sm:w-[40vw] md:w-[20vw] justify-center items-center flex rounded-full bg-white text-primary text-xl font-bold hover:bg-secondary hover:text-white transition flex items-center gap-2"
                            >
                                {service.name}
                                <BsArrowUpRightCircle />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TagSlider;