import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import GlassCard from '../GlassCard';
import { FaFacebook, FaGoogle } from 'react-icons/fa'; // Ensure react-icons is installed

const Stats = () => {
    const { darkMode } = useContext(ThemeContext);

    const statsData = [
        {
            id: 1,
            icon: <FaFacebook aria-label="Facebook Ads - Marketing Agency" />,
            title: 'Facebook Ads',
            link: 'https://zimapeak.com/go/meta-ads' // Add URL for each card 
        },
        {
            id: 2,
            icon: <FaGoogle aria-label="Google Ads - Marketing Agency" />,
            title: 'Google Ads',
            link: 'https://zimapeak.com/go/google-ads' // Add URL for each card 
        },
    ];

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
                <div className='w-full md:w-1/2'>
                    <h2 className="my-10 text-center text-2xl font-extrabold">
                        Grow Your Business with Paid Ads
                    </h2>
                    <p className="text-center text-lg">
                        Harness the power of Facebook and Google Ads to attract more customers, increase sales,
                        and expand your business reach with a leading Marketing Agency.
                    </p>
                </div>
                <div className={`hidden md:block flex flex-wrap w-full justify-center gap-6 py-6`}>
                    <div className="w-full space-x-4 flex">
                        {statsData.map(({ id, icon, title, link }) => (
                            <div key={id} className="w-full">
                                <a
                                    href={link}
                                >
                                    <GlassCard icon={icon} title={title} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;