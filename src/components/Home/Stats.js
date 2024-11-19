// Stats.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import GlassCard from '../GlassCard';
import { FaFacebook, FaGoogle } from 'react-icons/fa'; // Ensure react-icons is installed

const Stats = () => {
    const { darkMode } = useContext(ThemeContext);

    const statsData = [
        { id: 1, icon: <FaFacebook aria-label="Facebook Ads - Toronto Marketing Agency" />, title: 'Facebook Ads' },
        { id: 2, icon: <FaGoogle aria-label="Google Ads - Toronto Marketing Agency" />, title: 'Google Ads' },
    ];

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="max-w-7xl mx-auto flex flex-col justify-center items-center ">
                <div className='w-full md:w-1/2'>
                    <h1 className="my-10 text-center text-2xl font-extrabold">
                        Grow Your Business with Paid Ads
                    </h1>
                    <p className="text-center text-lg">
                        Harness the power of Facebook and Google Ads to attract more customers, increase sales,
                        and expand your business reach with a leading Toronto Marketing Agency.
                    </p>
                </div>
                <div className={`hidden md:block flex flex-wrap w-full justify-center gap-6 py-6`}>
                    <div className="w-full space-x-4 flex">
                        {statsData.map(({ id, icon, title }) => (
                            <div key={id} className="w-full">
                                <GlassCard icon={icon} title={title} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`md:hidden flex flex-wrap w-full justify-center gap-6 py-6`}>
                    {statsData.map(({ id, icon, title }) => (
                        <div
                            key={id}
                            className="w-full sm:w-[45%] md:w-[30%] lg:w-[20%] flex justify-center"
                        >
                            <GlassCard icon={icon} title={title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;