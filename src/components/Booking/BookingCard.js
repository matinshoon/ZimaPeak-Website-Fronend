import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import BookingForm from './BookingForm';
import TimePicker from './TimePicker';
import Confirmation from './Confirmation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API calls
import moment from 'moment-timezone';

const BookingCard = () => {
    const { darkMode } = useContext(ThemeContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentStep, setCurrentStep] = useState(1);  // Start from Step 1
    const [loading, setLoading] = useState(false); // Add a loading state

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        website: '',
        appointmentDate: null,
        appointmentTime: '',
        terms: false,
        additional_details: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => {
        if (validateInputs()) {
            if (currentStep === 2) {
                createBooking(); // Call the API to create a booking
            } else {
                setCurrentStep((prevStep) => prevStep + 1);
            }
        }
    };

    const createBooking = async () => {
        setLoading(true); // Start loading spinner
        const { full_name, email, phone, website, appointmentDate, appointmentTime, additional_details } = formData;

        // Convert appointmentTime to Date object
        const [hours, minutes] = appointmentTime.split(':');
        const startTime = new Date(`${appointmentDate}T${appointmentTime}:00`);

        const torontoTime = moment(startTime).tz('America/Toronto').format();
        const endTime = moment(torontoTime).add(1, 'hour').format();
        const eventName = `Meeting with ${full_name}`;

        const bookingData = {
            full_name,
            email,
            phone,
            website,
            additional_details,
            appointmentDate,
            appointmentTime: torontoTime,
            startTime: torontoTime,
            endTime: endTime,
            summary: eventName,
            conferenceData: {
                createRequest: {
                    requestId: `${Date.now()}`,
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet'
                    },
                    status: {
                        statusCode: 'success'
                    }
                }
            }
        };

        try {
            // Create booking event
            const response = await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URL}/booking/create-event`, bookingData);
            console.log('Booking created:', response.data);

            // Fetch IP address for lead data
            const ipAddress = await getIpAddress();
            const leadData = {
                prefix: '',
                fullName: full_name,
                phone,
                email,
                website,
                lists: [7],
                forceUpdate: false,
                status: 'subscribed',
                contactType: 'lead',
                source: window.location.href,
                appointmentDate: moment(appointmentDate).tz('America/Toronto').format('YYYY-MM-DD'),
                appointmentTime: moment(appointmentTime, 'HH:mm').tz('America/Toronto').format('HH:mm'),
                ip: ipAddress
            };

            // Send lead data
            const leadsResponse = await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URL}/leads`, leadData);
            console.log('Lead data sent:', leadsResponse.data);

            // Track Google Analytics event
            if (window.gtag) {
                const formattedDate = moment(appointmentDate).tz('America/Toronto').format('YYYY-MM-DD');
                const formattedTime = moment(appointmentTime, 'HH:mm').tz('America/Toronto').format('HH:mm');

                window.gtag('event', 'Appt_Book_form', {
                    event_category: 'Leads',
                    event_label: `${full_name} | ${formattedDate} ${formattedTime}`,
                });

                console.log('Google Analytics event tracked: Appt_Book_form');
            }

            setCurrentStep(3);  // Proceed to the confirmation step
        } catch (error) {
            console.error('Error creating booking or sending lead data:', error);
            setErrorMessage('Error creating appointment.');
        } finally {
            setLoading(false);  // Stop the spinner
        }
    };

    // Function to get the IP address (on the client side, you can use an API to fetch it)
    const getIpAddress = async () => {
        try {
            const response = await axios.get('https://api.ipify.org?format=json');
            return response.data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return '';  // Fallback if IP cannot be fetched
        }
    };

    const validateInputs = () => {
        const { full_name, email, phone, terms, appointmentDate, appointmentTime } = formData;

        // Step 1: Check for required fields
        if (currentStep === 1) {
            if (!full_name || !email || !phone || !terms) {
                setErrorMessage("All fields are required.");
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setErrorMessage("Please enter a valid email address.");
                return false;
            }

            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phone)) {
                setErrorMessage("Phone number can only contain digits.");
                return false;
            }
        }

        // Step 2: Check for appointment date and time
        if (currentStep === 2) {
            if (!appointmentDate || !appointmentTime) {
                setErrorMessage("Please select both appointment date and time.");
                return false;
            }
        }

        setErrorMessage(""); // Clear error if validation passes
        return true;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const renderStepContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary"></div>
                </div>
            );
        }
    
        switch (currentStep) {
            case 1:
                return <BookingForm formData={formData} handleChange={handleChange} darkMode={darkMode} />;
            case 2:
                return <TimePicker formData={formData} handleChange={handleChange} darkMode={darkMode} />;
            case 3:
                return <Confirmation formData={formData} darkMode={darkMode} />;
            default:
                return null;
        }
    };

    const handleBackToHome = () => {
        navigate('/');  // Redirect to the homepage
    };

    return (
        <div className={`flex flex-col justify-around h-full p-10 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <div>
                <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-dark'}`}>Booking Form</h2>
                <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Learn how to grow your business in every possible way!</p>
            </div>
            {renderStepContent()}
            {currentStep !== 3 && (
                <button
                    onClick={handleNext}
                    className={`px-4 py-2 rounded ${darkMode ? 'bg-primary text-white' : 'bg-primary text-white'}`}
                >
                    {currentStep === 1 ? 'Next' : 'Confirm'}
                </button>
            )}
            {currentStep === 3 && (
                <button
                    onClick={handleBackToHome}
                    className={`px-4 py-2 my-2 rounded ${darkMode ? 'bg-primary text-white' : 'bg-primary text-white'}`}
                >
                    Back to Homepage
                </button>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
};

export default BookingCard;