import React, { useState } from 'react';
import webTypes from '../../../data/webtypes'; // Import the data
import WebsiteForm from './WebsiteForm'; // Import the WebsiteForm component

const WebsiteTypes = () => {
  // Set the first website as the default selected one
  const [selectedWebsite, setSelectedWebsite] = useState(webTypes[0]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

  const handleButtonClick = (website) => {
    setSelectedWebsite(website);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl py-10 px-6 lg:px-8">
      <h2 className="text-left sm:text-center text-3xl font-bold mb-6">
        Best Custom Web Development & Design Services
      </h2>
      <p className="text-left sm:text-center text-lg mb-8">
        Offering Outstanding Web Solutions to Help All Types of Businesses, Big or Small, Established or Startup, to Captivate Their Audiences.
      </p>

      {/* Button selection */}
      <div className="flex flex-wrap justify-center space-x-0 sm:space-x-6 mb-10">
        {webTypes.map((website, index) => (
          <button
            key={index}
            className={`flex items-center px-6 py-3 w-full sm:w-auto rounded-full border transition duration-300 mb-4 sm:mb-0 ${
              selectedWebsite === website
                ? 'bg-blue-100 text-primary'
                : 'bg-white text-gray-400'
            }`}
            onClick={() => handleButtonClick(website)}
          >
            <span className="text-center">{website.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Website details */}
      {selectedWebsite && (
        <div className="p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
          {/* Left side - text related to the selected website type */}
          <div className="w-full sm:w-1/2 text-left">
            <h3 className="text-2xl font-semibold mb-4">{selectedWebsite.title}</h3>
            <p className="text-lg mb-6">{selectedWebsite.desc}</p>
            <ul className="list-disc text-left pl-6 space-y-2">
              {selectedWebsite.bullets.map((bullet, index) => (
                <li key={index} className="text-lg">{bullet}</li>
              ))}
            </ul>

            {/* "Get a Quote" button */}
            <button
              onClick={openModal}
              className="mt-6 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-blue-700 transition duration-300"
            >
              Get a Quote
            </button>
          </div>
          {/* Right side - image related to the selected website type */}
          <div className="w-full sm:w-1/2">
            <img
              src={selectedWebsite.image}
              alt={selectedWebsite.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Modal Popup for the form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // Close the modal when the overlay is clicked
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl font-semibold text-gray-700"
            >
              &times;
            </button>
            <WebsiteForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteTypes;