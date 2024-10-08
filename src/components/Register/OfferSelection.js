// RegistrationForm.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfferSelection = ({ darkMode, formData, handleChange }) => {

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_PUBLIC_BASE_URL}/orders/offer`);
                // Access offers from the response
                if (response.data) {
                    const showcasedOffers = response.data.filter(offer => offer.showcase === 1);
                    setOffers(showcasedOffers);
                } else {
                    console.error('Offers key not found in response');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchOffers();
    }, []);

    return (
        <div className={`w-full ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <div className="flex flex-col space-y-4">
                {Array.isArray(offers) && offers.length > 0 ? (
                    offers.map((offer) => (
                        <label
                            key={offer.id}
                            className={`p-4 border rounded-lg ${formData.selectedOffer === offer.id
                                ? 'border-blue-500'
                                : darkMode
                                    ? 'border-gray-600'
                                    : 'border-gray-300'
                                }`}
                        >
                            <input
                                type="radio"
                                name="selectedOffer"
                                value={offer.id}
                                checked={formData.selectedOffer === offer.id}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span
                                className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}
                            >
                                {offer.category.charAt(0).toUpperCase() +
                                    offer.category.slice(1)}{' '}
                                Offer - {(offer.discounted_price)/100} USD

                            </span>
                            <p
                                className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Features: {offer.features}
                            </p>
                        </label>
                    ))
                ) : (
                    <div className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        No offers available
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferSelection;