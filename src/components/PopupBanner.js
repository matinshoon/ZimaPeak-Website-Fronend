import React, { useState, useContext } from 'react';
import axios from 'axios';  // Import axios
import { ThemeContext } from '../ThemeContext';

const PopupBanner = ({ closePopup }) => {
    const { darkMode } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const baseUrl = process.env.REACT_APP_PUBLIC_BASE_URLL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${baseUrl}/website/make/newsletter`, { email }); // Send the email to your server
            setSubmitted(true);
            setTimeout(() => {
                closePopup();
            }, 3000);
        } catch (error) {
            console.error('There was an error subscribing:', error);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-black bg-opacity-75' : 'bg-gray-800 bg-opacity-75'}`}>
            <div className={`p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-dark'}`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Get 50% Off!</h2>
                <p className="mb-6 text-center">Get a 50% discount only by subscribing to our newsletter!</p>
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
                        >
                            Subscribe
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
