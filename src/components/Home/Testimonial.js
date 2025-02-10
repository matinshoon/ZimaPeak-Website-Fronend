import React, { useContext } from 'react';
import { FaGoogle, FaStar } from 'react-icons/fa'; // Assuming you have react-icons installed
import { ThemeContext } from '../../ThemeContext';

const testimonials = [
    {
        name: "Ali Abyari",
        title: "Marketing Director, Arasp Agency",
        quote: "Working with this marketing team has been a game-changer for our business. They bring fresh perspectives and innovative strategies that have significantly boosted our brand awareness and customer engagement.",
    },
    {
        name: "Juan Wood",
        title: "VP of Marketing, Ring Solutions",
        quote: "Matt and his team helped me grow my business beyond my wildest dreams! I really appreciate how they’re always there to help, whether it’s 9 AM or 11 PM. When I needed assistance with marketing, my website, and content management, I found the best with Zimapeak. I highly recommend them!",
    },
    {
        name: "Zohreh Bakhshi",
        title: "Founder, Alpha Gym Fitness",
        quote: "Choosing zimapeak for marketing service was one of the best decisions I made for my business. Their tailored strategies and personalized approach have helped my gym attract more leads and convert them into loyal customers.",
    },
    {
        name: "Donald Alexander",
        title: "Founder & CEO, ONJ Solutions",
        quote: "Zimapeak transformed my business! They didn't just create a presentable website but crafted a highly functional one that they maintain regularly to ensure it's always operational. Their expertise in ad campaigns and web development has been invaluable. It's such a relief to find a team passionate about their work, giving me confidence that my business's assets are well looked after. Communication is top-notch, with extremely responsive support for any questions I have. Put your project in Matt's hands, and with his dedication and skillful execution, you can watch your business reach new heights. Highly recommend!",
    },
    {
        name: "Sophia Carter",
        title: "Co-Founder, Lumina Ventures",
        quote: "Working with Zimapeak has been an absolute game-changer for our company. They didn’t just build a website; they created a seamless digital experience for our customers. Their attention to detail, commitment to excellence, and innovative approach to web development and advertising have exceeded our expectations. What stood out most was their ability to truly understand our goals and translate them into actionable results. Matt and his team are the real deal, and I couldn’t recommend them enough for businesses looking to grow.",
    },
    {
        name: "James Richardson",
        title: "Marketing Director, Horizon Analytics",
        quote: "I can't praise Zimapeak enough for the outstanding work they've done for us. From designing a stunning website to running highly effective ad campaigns, they've helped us scale our business faster than we imagined. The team's professionalism and passion for delivering quality are evident in every interaction. Matt is an absolute genius at turning ideas into reality, and his guidance has been instrumental in our success. If you're looking for a partner who truly cares about your business, Zimapeak is the one!",
    },
    {
        name: "Olivia Martinez",
        title: "CEO, Nova Creations",
        quote: "Zimapeak took our outdated online presence and turned it into a modern, high-performing website that perfectly reflects our brand. Their expertise in web development and marketing strategies has driven significant growth for our business. Matt and his team are incredibly proactive, ensuring everything runs smoothly while always keeping us informed. It's rare to find a team that combines technical expertise with such a personal touch. I couldn’t be happier with the results!",
    },
    {
        name: "Ethan Collins",
        title: "Founder, Apex Digital Studio",
        quote: "Partnering with Zimapeak was the best decision I’ve made for my business. They built a sleek, user-friendly website and have been instrumental in optimizing our ad campaigns. The results? More traffic, higher conversions, and steady growth. Matt's leadership and his team’s dedication to excellence truly set them apart. Whether it's a quick question or a complex issue, their support is always fast and reliable. If you're serious about growing your business, Zimapeak is the team to trust!",
    },
    {
        name: "Emma Reynolds",
        title: "Owner, Serenity Spa & Wellness",
        quote: "Zimapeak has completely revolutionized how we connect with our clients online. They built a visually stunning website that’s both functional and easy to manage. Beyond that, their ad campaigns have brought in a consistent stream of new customers. Matt and his team are a pleasure to work with—always responsive, professional, and full of creative ideas. I feel like I have a true partner in growing my business. Highly recommend their services!",
    },
    {
        name: "Michael Thompson",
        title: "Managing Director, Pinnacle Logistics",
        quote: "We approached Zimapeak to help us modernize our web presence, and they went above and beyond. The website they delivered is nothing short of exceptional, and their ongoing maintenance ensures it’s always running smoothly. Their ad campaigns have helped us reach new markets we didn’t think were possible. Matt and his team are experts in their field and take the time to understand your goals. I’m grateful for their dedication and highly recommend them to anyone looking to take their business to the next level.",
    },
    {
        name: "Sophia Nguyen",
        title: "Creative Director, Urban Bloom Studio",
        quote: "Zimapeak delivered results that exceeded all our expectations. From designing a website that showcases our work beautifully to running ad campaigns that consistently drive leads, they’ve become an invaluable part of our growth strategy. Matt and his team truly care about their clients and are always willing to go the extra mile. Their creativity, technical skill, and responsiveness make them stand out in a crowded market. I couldn’t recommend them more!",
    },
    {
        name: "Daniel Walker",
        title: "Founder, ClearPath Consulting",
        quote: "Working with Zimapeak has been an incredible experience. They took the time to truly understand my business and created a website that not only looks fantastic but performs exceptionally well. Their marketing efforts have brought in leads I never thought possible. Matt’s team operates with precision and passion, and their customer service is second to none. If you’re looking for a partner that will help your business thrive, Zimapeak is the clear choice!",
    },
];

const Testimonial = ({ numberToShow = testimonials.length }) => {
    const { darkMode } = useContext(ThemeContext);

    // Determine how many testimonials to show
    const displayedTestimonials = numberToShow === 'all' 
        ? testimonials 
        : testimonials.slice(0, numberToShow);

    return (
        <div className={` ${darkMode ? 'text-white' : 'text-dark'}`}>
            <div className="max-w-7xl mx-auto flex flex-col justify-center items-center ">
                <div className='w-full md:w-1/2'>
                    <h1 className="text-center text-2xl font-extrabold tracking-tight mb-8">What Our Clients Say</h1>
                    <p className="text-center text-lg mb-12">Hear from our satisfied clients who have experienced the transformative power of our marketing services.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-0">
                    {displayedTestimonials.map((testimonial, index) => (
                        <div key={index} className="flex flex-col rounded-lg border border-4 overflow-hidden">
                            <div className={`px-6 py-8 bg-white text-dark`}>
                                <div className="flex items-center mb-4">
                                    <FaGoogle className="text-primary text-4xl mr-2" />
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="flex items-center">
                                            <FaStar className="text-secondary mr-1" />
                                            <FaStar className="text-secondary mr-1" />
                                            <FaStar className="text-secondary mr-1" />
                                            <FaStar className="text-secondary mr-1" />
                                            <FaStar className="text-secondary" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-m text-left italic mb-4">{testimonial.title}</div>
                                <p className={`text-m text-left text-dark`}>{testimonial.quote}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonial;