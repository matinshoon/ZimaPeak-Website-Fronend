import React, { useContext } from 'react';
import Slider from 'react-slick';
import sampleWorks from '../../data/sampleworks';
import { ThemeContext } from '../../ThemeContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Samples = () => {
    const { darkMode } = useContext(ThemeContext);

    // Slider settings for react-slick
    const sliderSettings = {
        infinite: true,
        dots: true,
        speed: 10,
        slidesToShow: Math.min(4, sampleWorks.length),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(2, sampleWorks.length),
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div id='samples' className="samples-section py-10">
            <h2 className="text-center text-2xl font-extrabold">
                Web Development Portfolio
            </h2>
            <p className="text-center text-lg my-4">
                Discover our taste in website design from what we've crafted on our dribbble.
                {/* Discover some of the amazing websites we've crafted for our clients. */}
            </p>
            <div className="container mx-auto p-4">
                <Slider {...sliderSettings}>
                    {sampleWorks.map((work) => (

                        <a
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:underline transition"
                            key={work.id}
                        >
                            <div className="px-4">
                                <div className="relative group rounded overflow-hidden h-[13rem]">
                                    {/* Lazy Loaded Image */}
                                    <LazyLoadImage
                                        src={work.image}
                                        alt={`Zimapeak - ${work.headline}`}
                                        effect="blur"
                                        className="object-fill rounded-lg"
                                    />
                                    {/* Hover Content */}
                                    <div
                                        className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    >
                                        <h3 className="text-lg font-bold mb-2">{work.headline}</h3>
                                        <p className="text-sm mb-4 text-center px-4">{work.description}</p>
                                    </div>
                                </div>
                            </div>
                        </a>

                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Samples;