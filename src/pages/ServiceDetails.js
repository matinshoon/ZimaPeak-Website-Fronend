import React, { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import services from '../data/servicesData';
import caseStudiesData from '../data/casestudiesData';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import { BsArrowUpRightCircle } from 'react-icons/bs';

const ServiceDetails = () => {
    const { serviceName } = useParams();
    const service = services.find(service => service.link === `/services/${serviceName}`);
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service) {
        return <div className={`py-16 px-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Service not found!</div>;
    }

    const { title, description, slang, image, logo, why, how, background, metaTitle, metaDescription, metaKeywords, cardNum } = service;

    // Filter related case studies based on category only
    const relatedCases = caseStudiesData.filter(caseStudy =>
        caseStudy.tags.includes(service.category)
    );

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />
            </Helmet>

            {/* Header Section */}
            <div
                className={`pt-32 pb-20 md:pt-0 md:pb-0 w-full sm:h-[40vh] flex flex-col items-center justify-center px-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">{title}</h1>
                <p className="text-lg sm:max-w-3xl">{description}</p>
            </div>

            <div className='w-full flex justify-center md:-translate-y-20 -translate-y-10'>
                {logo && (
                    <div className='w-20 h-20 sm:w-40 sm:h-40 bg-white rounded-full'>
                        <img
                            src={logo}
                            alt={`${title} logo`}
                            className="w-full h-full border-4 rounded-full object-scale-down"
                        />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="py-10 sm:py-20 px-6 flex flex-col items-center text-xl">
                <div className="flex flex-col items-start justify-center w-full max-w-5xl">
                    <div>
                        <h1 className="font-bold text-xl sm:text-2xl mb-6">Why Choose {title}?</h1>
                        {why.points.map((point, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="font-semibold text-lg sm:text-xl">{point.title}</h3>
                                <p className="leading-relaxed">{point.description}</p>
                            </div>
                        ))}
                    </div>
                    <img
                        src={image}
                        alt={slang}
                        className="rounded-xl w-full sm:w-3/4 object-cover"
                    />
                    <div className="mt-10">
                        <h1 className="font-bold text-xl sm:text-2xl mb-6">How {title} Helps Your Business</h1>
                        {how.steps.map((step, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="font-semibold text-lg sm:text-xl">{step.title}</h3>
                                <p className="leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Example Section */}
                    {service.example && service.example.headline && service.example.details && service.example.image && service.example.results?.length > 0 && (
                        <div className="h-full py-10 sm:py-20 px-6 flex flex-col bg-gray-100 rounded-xl mx-auto">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4">{service.example.headline}</h2>
                            <p className="text-lg sm:text-xl mb-6">{service.example.details}</p>
                            <div className="flex flex-col items-center gap-4">
                                <img
                                    src={service.example.image}
                                    alt={service.example.headline}
                                    className="rounded-xl w-full sm:w-3/4 object-cover"
                                />
                                <ul className="flex flex-col sm:flex-row list-disc list-inside text-left gap-4">
                                    {service.example.results.map((result, index) => (
                                        <li key={index} className="text-base">{result}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Background Section */}
                    <div className="mt-10">
                        <h1 className="font-bold text-xl sm:text-2xl mb-6">Our Expertise in {title}</h1>
                        <p className="mb-10">{background}</p>
                    </div>

                    {/* Additional Features Section (Optional) */}
                    <div>
                        <h1 className="font-bold text-xl sm:text-2xl mb-6">Key Features of Our Service</h1>
                        <ul className="list-disc pl-8">
                            {service.features?.map((feature, index) => (
                                <li key={index} className="mb-4">{feature}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16">
                        <h2 className="text-lg sm:text-xl text-center font-semibold mb-6">{slang}</h2>
                        <Link to="/booking">
                            <button
                                className={`w-full px-10 py-3 rounded-2xl text-white text-xl font-bold bg-primary ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300 hover:text-slate-900'}`}
                            >
                                Book a Free Discovery Call
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Related Cases */}
            <div className="flex flex-col justify-center items-center py-4 px-6 gap-6">
                <h3 className="text-2xl sm:text-3xl font-bold">Related {title} Case Studies</h3>
                <div className="flex flex-wrap justify-center items-center py-10 gap-6">
                    {relatedCases.map((caseStudy, index) => (
                        <div
                            key={caseStudy.id}
                            className="flex flex-col w-full sm:w-1/2 lg:w-1/4 items-center justify-center bg-gray-100 rounded-xl"
                        >
                            <div className='h-1/2 p-2'>
                                <img
                                    src={caseStudy.banner}
                                    alt={caseStudy.title}
                                    className="w-full h-72 sm:h-60 object-cover object-center rounded-xl"
                                />
                            </div>
                            <div className='w-full h-1/2 p-4'>
                                <div className="flex flex-col items-start justify-center">
                                    <h2 className="text-lg md:text-xl font-semibold">
                                        {caseStudy.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                                        {caseStudy.summary}
                                    </p>
                                    <button
                                        onClick={() => navigate(`/casestudy/${caseStudy.id}`)}
                                        className="flex items-center text-blue-500 mt-4 hover:text-blue-700"
                                    >
                                        <span>View Case Study</span>
                                        <BsArrowUpRightCircle className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;