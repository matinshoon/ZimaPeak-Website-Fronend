import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';
import ReCAPTCHA from 'react-google-recaptcha';

const Booking = () => {
    const { darkMode } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        Name: '',
        Phone: '',
        Email: '',
        Website: ''
    });
    const [captchaVerified, setCaptchaVerified] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCaptchaChange = (value) => {
        setCaptchaVerified(!!value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaVerified) {
            console.error('Please verify the CAPTCHA');
            return;
        }
        try {
            // Add priority, added_by, niche, and Result to formData
            const formDataWithPriority = { ...formData, priority: 1, added_by: 'system', niche: 'N/A', Result: 'N/A' };
    
            const response = await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URLL}/addContact`, formDataWithPriority);
            console.log(response.data);
            // Optionally, handle any post-submission tasks
        } catch (error) {
            console.error('Error submitting contact:', error);
        }
    };

    return (
        <div className={`${darkMode ? 'bg-dark text-white' : 'bg-white text-black'} pt-20`}>
           <div className="calendly-inline-widget" data-url="https://calendly.com/zimapeak_audit/30min" style={{ minWidth: '10vw', height: '100vh' }}></div>

            {/* <div className="flex justify-center items-center py-28">
                <div className={`${darkMode ? 'bg-dark text-white' : 'bg-white text-black'} p-6 rounded-lg w-1/2`}>
                    <h2 className="text-2xl flex justify-center mb-20">Book a <span className='font-black text-primary mx-2'>Free</span> Discovery call</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="Name" className="block text-sm font-medium">{darkMode ? 'Name' : 'Name'}</label>
                            <input type="text" id="Name" name="Name" value={formData.Name} onChange={handleChange} className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3`} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Phone" className="block text-sm font-medium">{darkMode ? 'Phone' : 'Phone'}</label>
                            <input type="tel" id="Phone" name="Phone" value={formData.Phone} onChange={handleChange} className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3`} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Email" className="block text-sm font-medium">{darkMode ? 'Email' : 'Email'}</label>
                            <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3`} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Website" className="block text-sm font-medium">{darkMode ? 'Website' : 'Website'}</label>
                            <input type="text" id="Website" name="Website" value={formData.Website} onChange={handleChange} className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-3`} />
                        </div>
                        <div className='flex justify-center'>
                        <ReCAPTCHA
                            sitekey="6LfJAdEpAAAAAEES7ARwG87THi3xBD6twpg5svyg"
                            onChange={handleCaptchaChange}
                            onExpired={() => setCaptchaVerified(false)}
                            onErrored={() => setCaptchaVerified(false)}
                        />
                        </div>
                        <div className="flex justify-center mt-4">
                            <button type="submit" className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}>Submit</button>
                        </div>
                    </form>
                </div>
            </div> */}
        </div>
    );
};

export default Booking;
