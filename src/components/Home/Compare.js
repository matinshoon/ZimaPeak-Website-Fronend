import React, { useState } from 'react';
import logoblue from "../../images/logo-blue.png";

const marketingCards = [
  {
    id: 1,
    investment: "$1000",
    time: "2 - 4 weeks",
    roi: "10x",
    active: false,
    logo: logoblue,
    features: [
      "Google Ads Management",
      "Gauranteed amount of Leads",
      "Campaign Strategy and Planning",
      "Monthly Performance Report",
      "Ongoing Optimization",
    ],
  },
  {
    id: 2,
    investment: "$3000",
    time: "2 - 6 weeks",
    roi: "20x",
    active: false,
    logo: logoblue,
    features: [
      "Management of 1-3 Ad Platforms",
      "Gauranteed amount of Leads",
      "Full Funnel Campaign Strategy and Planning",
      "Bi-Weekly Performance Report",
      "Ongoing Optimization",
      "Bi-Weekly Meetings",
      "Ad Creative Enhancement",
    ],
  },
  {
    id: 3,
    investment: "$5000",
    time: "2 - 6 weeks",
    roi: "100x",
    active: true,
    logo: logoblue,
    features: [
      "Unlimited Ad Platforms",
      "Gauranteed amount of Leads",
      "Full Funnel Campaign Strategy and Planning",
      "Weekly Performance Report",
      "Ongoing Optimization",
      "Weekly Meetings",
      "Ad Creative Enhancement",
    ],
  },
];

const webDevCards = [
  {
    id: 4,
    investment: "$500",
    time: "2 - 4 weeks",
    roi: "2x",
    active: false,
    logo: logoblue,
    features: [
      "3 Pages",
      "Custom Made",
      "Responsive",
      "Unique Design",
      "Full Control Panel",
    ],
  },
  {
    id: 5,
    investment: "$1500",
    time: "4 - 8 weeks",
    roi: "4x",
    active: true,
    logo: logoblue,
    features: [
      "8 Pages",
      "Custom Made",
      "Responsive",
      "Unique Design",
      "Google Registration",
      "Appointment Tool",
      "Full Control Panel",
      "Content Manager System",
      "Multi Lingual",
      "Marketing Setup",
    ],
  },
  {
    id: 6,
    investment: "$3000",
    time: "4 - 8 weeks",
    roi: "5x",
    active: false,
    logo: logoblue,
    features: [
      "10 Pages",
      "Custom Made",
      "Responsive",
      "Unique Design",
      "Google Registration",
      "Appointment Tool",
      "Full Control Panel",
      "Content Manager System",
      "Multi Lingual",
      "Marketing Setup",
      "Lead Form",
      "SEO",
    ],
  },
];

const Compare = ({ darkMode }) => {
  const [serviceType, setServiceType] = useState('marketing');

  const cardsData = serviceType === 'marketing' ? marketingCards : webDevCards;

  return (
    <section id="about" className={`${darkMode ? 'bg-dark text-white' : 'bg-light text-black'}`}>
      <div className="mb-5 text-center">
        <h1 className="font-bold mb-5 text-2xl">Pricing</h1>
        <h5 className="mb-20">
          Your internal team just can't handle every aspect, and that specialized agency fails to grasp the synergy among all marketing channels to optimize outcomes.
        </h5>
        <div className="flex justify-center mb-5">
          <button
            onClick={() => setServiceType('marketing')}
            className={`mx-2 px-4 py-2 ${serviceType === 'marketing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            Marketing
          </button>
          <button
            onClick={() => setServiceType('webDevelopment')}
            className={`mx-2 px-4 py-2 ${serviceType === 'webDevelopment' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            Web Development
          </button>
        </div>
      </div>

      <div className="cards">
        <div className="cards__inner">
          {cardsData.map((card) => (
            <div className={`cardabout ${card.active ? 'active' : ''}`} key={card.id}>
              <div className='flex justify-center'>
                <a href="/booking">
                  <img src={card.logo} className='h-20' alt="Logo" />
                </a>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Monthly Investment</p>
                <h3 className="font-bold">{card.investment}</h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Delivery time</p>
                <h3 className="font-bold">{card.time}</h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>ROI</p>
                <h3 className="font-bold">{card.roi}</h3>
              </div>
              <ul className="flex flex-col justify-center items-center divide-y divide-gray-400">
                {card.features.map((feature, index) => (
                  <li key={index} className="py-1 w-full text-center">{feature}</li>
                ))}
              </ul>
              <a href="/booking" className={`cta w-100 ${darkMode ? 'text-black' : 'text-white'}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
        <div className="overlay cards__inner"></div>
      </div>
    </section>
  );
};

export default Compare;
