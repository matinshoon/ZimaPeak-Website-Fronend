import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import BookingForm from './BookingForm';
import TimePicker from './TimePicker';
import Confirmation from './Confirmation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API calls

const BookingCard = () => {
    const { darkMode } = useContext(ThemeContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentStep, setCurrentStep] = useState(1);  // Start from Step 1
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
        const { full_name, email, phone, website, appointmentDate, appointmentTime, additional_details } = formData;
    
        // Convert appointmentTime to Date object
        const [hours, minutes] = appointmentTime.split(':');
        const startTime = new Date(`${appointmentDate}T${appointmentTime}:00`);
    
        // Calculate the end time by adding 1 hour to the start time
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

        // Create the event name with the full_name
        const eventName = `Meeting with ${full_name}`;
    
        // Omit attendees if the service account cannot invite them, but still include the Google Meet link
        const bookingData = {
            full_name,
            email,
            phone,
            website,
            additional_details,
            appointmentDate,
            appointmentTime: startTime.toISOString(), // Send start time as ISO string
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            summary: eventName,  // Set event name as "Meeting with full_name"
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
            const response = await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URL}/booking/create-event`, bookingData);
            console.log('Booking created:', response.data);
            setCurrentStep(3); // Move to Confirmation step after successful booking
        } catch (error) {
            console.error('Error creating booking:', error);
            setErrorMessage('Error creating appointment.');
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
        if (currentStep === 1) {
            return <BookingForm formData={formData} handleChange={handleChange} darkMode={darkMode} />;
        } else if (currentStep === 2) {
            return <TimePicker formData={formData} handleChange={handleChange} darkMode={darkMode} />;
        } else if (currentStep === 3) {
            return <Confirmation formData={formData} darkMode={darkMode} />;
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
                    className={`px-4 py-2 rounded ${darkMode ? 'bg-primary text-white' : 'bg-primary text-white'}`}
                >
                    Back to Homepage
                </button>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
};

export default BookingCard;