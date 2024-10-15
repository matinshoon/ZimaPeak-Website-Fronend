// PaymentForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardElement } from '@stripe/react-stripe-js';
import StripeLogo from '../../images/stripe-logo.png';

const PaymentForm = ({ darkMode, formData, handleChange, countries }) => {

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                // Retrieve token from localStorage
                const token = localStorage.getItem('token');
                
                // Set up headers with the Authorization token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
                    },
                };
    
                // Make the request with the config object that includes headers
                const response = await axios.get(`${process.env.REACT_APP_PUBLIC_BASE_URL}/orders/offer`, config);
                
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

    if (offers.find(offer => offer.id === formData.selectedOffer)?.discounted_price === "0.00") {
        return null;
    }

    return (
        <div className={`w-full ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <div className="flex items-center mb-4">
                <h3 className={`text-lg ${darkMode ? 'text-white' : 'text-dark'}`}>Secure Payments with</h3>
                <img src={StripeLogo} alt="Stripe Logo" className="h-8 ml-2" />
            </div>

            <CardElement
                className={`rounded ${darkMode ? 'bg-slate-800' : 'bg-gray-200'} p-4 mb-4`}
                options={{
                    style: {
                        base: {
                            color: darkMode ? '#ffffff' : '#000000',
                            backgroundColor: darkMode ? '#2b2b2b00' : '#ffffff00',
                        },
                        invalid: {
                            color: '#fa755a',
                            iconColor: '#fa755a',
                        },
                        complete: {
                            color: darkMode ? '#ffffff' : '#000000',
                        },
                    },
                }}
            />
            <p className={`text-lg mb-4 ${darkMode ? 'text-white' : 'text-dark'}`}>
                Total: {(parseFloat(offers.find(offer => offer.id === formData.selectedOffer)?.discounted_price) / 100).toFixed(2)} USD
            </p>
            <h3 className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-dark'}`}>Billing Address</h3>
            <select
                name="billingCountry"
                value={formData.billingCountry}
                onChange={handleChange}
                className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
            >
                <option value="" disabled>Select Country</option>
                {countries.map((country, index) => (
                    <option key={index} value={country.value}>{country.label}</option>
                ))}
            </select>
            <input
                type="text"
                name="billingState"
                value={formData.billingState}
                onChange={handleChange}
                placeholder="State/Province"
                className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
            />
            <input
                type="text"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleChange}
                placeholder="City"
                className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
            />
            <input
                type="text"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
                placeholder="Street Address"
                className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
            />
            <input
                type="text"
                name="billingPostalCode"
                value={formData.billingPostalCode}
                onChange={handleChange}
                placeholder="Postal Code"
                className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
            />
        </div>
    );
};

export default PaymentForm;