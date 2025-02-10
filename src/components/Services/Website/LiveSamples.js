import React, { useContext, Suspense, lazy, useState } from 'react';
import Slider from 'react-slick';
import sampleWorks from '../../../data/livesampleworks';
import { ThemeContext } from '../../../ThemeContext';

// Lazy load iframe component
const Iframe = lazy(() => import('./Iframe'));

const LiveSamples = () => {
    const { darkMode } = useContext(ThemeContext);
    const [hovered, setHovered] = useState(null); // Track hovered sample

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
        <div id="samples" className="samples-section py-10">
            <h2 className="text-center text-2xl font-extrabold">
                <span className="text-secondary">LIVE</span> Web Design Samples
            </h2>
            <p className="text-center text-lg my-4">
               <span className='font-bold'>Hover</span> to explore live previews of our website designs hosted on their respective domains.
            </p>
            <div className="container mx-auto p-4">
                <Slider {...sliderSettings}>
                    {sampleWorks.map((work) => (
                        <div
                            key={work.id}
                            className="px-4"
                            onMouseEnter={() => setHovered(work.id)} // Set hovered ID
                            onMouseLeave={() => setHovered(null)} // Reset hovered ID
                        >
                            <div className="relative group rounded overflow-hidden h-[50vh]">
                                {/* Div mimicking a monitor */}
                                <div
                                    style={{
                                        width: hovered === work.id ? '1280px' : '100%', // Full size on hover
                                        height: hovered === work.id ? '200vh' : '250px', // Full size on hover
                                        transform: hovered === work.id
                                            ? 'scale(0.278)' // Scale to fit within 50vh
                                            : 'scale(1)', // Default size
                                        transformOrigin: 'top left', // Anchor scaling to top-left
                                        transition: 'transform 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out', // Smooth transitions
                                    }}
                                    className="absolute top-0 left-0"
                                >
                                    {/* Display static image by default */}
                                    {hovered === work.id ? (
                                        <Suspense
                                            fallback={
                                                <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50">
                                                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                                                </div>
                                            }
                                        >
                                            <Iframe
                                                src={work.link}
                                                title={`Zimapeak - ${work.headline}`}
                                            />
                                        </Suspense>
                                    ) : (
                                        <img
                                            src={work.thumbnail}
                                            alt={`Thumbnail of ${work.headline}`}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                {/* Hover Content */}
                                <div
                                    className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                >
                                    <h3 className="text-lg font-bold mb-2">{work.headline}</h3>
                                    <p className="text-sm mb-4 text-center px-4">{work.description}</p>
                                    <a
                                        href={work.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Visit Live Site
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default LiveSamples;