import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';

const PopupBanner = ({ closePopup }) => {
    const { darkMode } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    // Function to fetch user's IP and country information
    const getIpAndCountry = async () => {
        try {
            const response = await axios.get('https://ipapi.co/json/');
            return {
                ip: response.data.ip,
                country: response.data.country_name,
                city: response.data.city,
                state: response.data.region,
            };
        } catch (error) {
            console.error('Error fetching IP or country:', error);
            return { ip: '', country: '', city: '', state: '' };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start the spinner

        const { ip, country, city, state } = await getIpAndCountry();

        const dataToCRM = {
            email: email,
            ip: ip,
            country: country,
            city: city,
            state: state,
            lists: [6],
            status: "subscribed",
            contactType: "lead",
            source: window.location.href,
            promotion: "10%",
        };

        try {
            const leadsResponse = await axios.post(
                `${process.env.REACT_APP_PUBLIC_BASE_URL}/leads`,
                dataToCRM
            );

            // Check for success with a status code or specific message
            if (leadsResponse.status >= 200 && leadsResponse.status < 300) {
                console.log('Lead submitted successfully:', leadsResponse.data);
                setSubmitted(true); // Show success message
                setLoading(false); // Stop loading spinner

                // Google Analytics Event
                if (window.gtag) {
                    window.gtag('event', 'subscriber', {
                        event_category: 'Leads',
                        event_label: `${email}`,
                    });
                    console.log('Google Analytics event tracked: subscriber');
                }

                // Close the popup after a short delay
                setTimeout(() => {
                    closePopup();
                }, 3000);
            } else {
                console.error('Lead submission error:', leadsResponse.data);
                setLoading(false); // Stop spinner
            }
        } catch (error) {
            console.error('There was an error submitting the lead:', error);
            setLoading(false); // Stop spinner
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-black bg-opacity-75' : 'bg-gray-800 bg-opacity-75'}`}>
            <div className={`p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-dark'}`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Get 10% Off!</h2>
                <p className="mb-6 text-center">Get a 10% discount by subscribing to our newsletter!</p>
                {submitted ? (
                    <p className="text-center text-green-500">Thank you for subscribing!</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className={`w-full p-2 mb-4 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-dark border-gray-300'}`}
                        />
                        <button
                            type="submit"
                            className={`w-full p-2 rounded bg-primary text-white ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                            disabled={loading} // Disable button during loading
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-75 mr-2"></div>
                                    Processing...
                                </div>
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </form>
                )}
                <button onClick={closePopup} className="mt-4 text-red-500 hover:text-red-700">
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopupBanner;