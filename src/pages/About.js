import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import PageHeader from '../components/PageHeader'

const About = () => {
    const { darkMode } = useContext(ThemeContext);

    const teamMembersWithPictures = [
        {
            name: 'Matt Rashidi',
            position: 'CEO & Founder',
            imageUrl: 'https://i.ibb.co/7nFXZgS/IMG-0973.jpg'
        },
    ];

    const teamMembersWithoutPictures = [
        {
            name: 'Ava Woods',
            position: 'Marketing Specialist'
        },
        {
            name: 'Mia Carter',
            position: 'Marketing Specialist'
        },
        {
            name: 'Lily Stone',
            position: 'Marketing Specialist'
        },
        {
            name: 'Matthew Woods',
            position: 'Web Developer'
        },
        {
            name: 'Emily Davis',
            position: 'Graphic Designer'
        },
    ];

    return (
        <div id="about" className={`flex flex-col justify-center items-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <Helmet>
                <title>About | ZimaPeak Marketing - Toronto's Premier Digital Marketing Agency</title>
                <meta name="description" content="Learn more about ZimaPeak Marketing, Toronto's leading digital marketing agency specializing in social media marketing, SEO, and web development. Meet our team of experts dedicated to elevating your brand's online presence." />
                <link rel="canonical" href="https://www.zimapeak.com/about" />
            </Helmet>
            <div className="container mx-auto z-10 relative flex flex-col justify-center items-center">
                <PageHeader />
                <div className={`w-full md:w-3/5 h-28 my-20 flex justify-around items-center text-white ${darkMode ? 'border' : 'bg-primary opacity-90'} md:rounded-lg`}>
                    <div className="text-center">
                        <p className='font-bold text-2xl mb-2'>+100</p>
                        <p>Customers Served</p>
                    </div>
                    <div className="text-center">
                        <p className='font-bold text-2xl mb-2'>98%</p>
                        <p>Customer Satisfaction</p>
                    </div>
                    <div className="text-center">
                        <p className='font-bold text-2xl mb-2'>24/7</p>
                        <p>Customer Support</p>
                    </div>
                </div>
                <div className='mx-40 w-3/5'>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Mission:</h2>
                        <p className="mb-10">At ZimaPeak Marketing, our mission is to empower businesses with innovative marketing solutions that drive growth and foster long-term success. We strive to exceed client expectations by delivering exceptional services tailored to their unique needs, while maintaining the highest standards of integrity, professionalism, and customer satisfaction.</p>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Vision:</h2>
                        <p className="mb-10">Our vision at ZimaPeak Marketing is to become a leading force in the digital marketing industry, recognized for our creativity, expertise, and commitment to excellence. We aspire to be the go-to agency for businesses seeking to elevate their online presence, drive engagement, and achieve sustainable growth in an ever-evolving marketplace.</p>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Values:</h2>
                        <p className="mb-10">At ZimaPeak Marketing, our values serve as the foundation of everything we do. We are driven by a passion for innovation, collaboration, and continuous improvement. Integrity, transparency, and accountability guide our actions as we strive to build trust and foster meaningful relationships with our clients, partners, and community.</p>
                    </div>
                </div>
                {/* Team Section with Pictures */}
                <div className='w-full md:w-3/5 my-20'>
                    <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
                    <div className="flex flex-wrap justify-center items-center">
                        {teamMembersWithPictures.map((member, index) => (
                            <div key={index} className="flex flex-col items-center m-4">
                                <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden">
                                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-secondary text-2xl mt-4 font-semibold">{member.name}</p>
                                <p className="text-gray-500">{member.position}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Team Section without Pictures */}
                <div className='w-full md:w-3/5'>
                    <div className="flex flex-wrap justify-center items-center">
                        {teamMembersWithoutPictures.map((member, index) => (
                            <div key={index} className="text-center mb-4 w-full sm:w-1/2 lg:w-1/3 px-4">
                                <p className="font-semibold text-primary text-xl">{member.name}</p>
                                <p className="text-gray-500">{member.position}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
