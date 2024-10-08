import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import StripeLogo from '../../images/stripe-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import countryList from 'react-select-country-list';
import axios from 'axios';

import RegistrationForm from './RegistrationForm';
import ConfirmationCodeInput from './ConfirmationCodeInput';
import OfferSelection from './OfferSelection';
import PaymentForm from './PaymentForm';

const RegisterCard = () => {
    const { darkMode } = useContext(ThemeContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [registerSuccess, setRegisterSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [userId, setUserId] = useState(null);
    const [offers, setOffers] = useState([]);
    const countries = countryList().getData();
    const [confirmationCode, setConfirmationCode] = useState("");
    const [showConfirmationInput, setShowConfirmationInput] = useState(false);

    const validateConfirmationCode = async () => {
        try {
            // Validate the entered confirmation code with your backend
            const isValid = await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URL}/auth/verify-code`, {
                confirmationCode: formData.confirmationCode,
                email: formData.email // Include the user's email
            });

            if (isValid.data.success) {
                setCurrentStep(3); // Move to the payment step
            } else {
                setErrorMessage("Invalid confirmation code. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while validating the confirmation code. Please try again.");
        }
    };

    const validateInputs = () => {
        const { full_name, email, phone, password, terms } = formData;

        // Check for empty fields
        if (!full_name || !email || !phone || !password) {
            setErrorMessage("All fields are required.");
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return false;
        }

        // Validate phone number (simple check)
        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(phone)) {
            setErrorMessage("Phone number can only contain digits.");
            return false;
        }

        // Validate password strength (e.g., at least 6 characters)
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return false;
        }

        // Validate terms agreement
        if (!terms) {
            setErrorMessage("You must agree to the terms and conditions.");
            return false;
        }

        // Clear any previous error messages
        setErrorMessage("");
        return true;
    };

    const handleRegister = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URL}/auth/register`, data);
            return { success: true, data: response.data.userId, confirmationCode: response.data.confirmationCode };
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
            return { success: false };
        }
    };

    const handleNext = async () => {
        if (currentStep === 1) {
            if (!validateInputs()) return;

            const { full_name, email, phone, password } = formData;
            const data = { full_name, email, phone, password };

            setLoading(true);
            const result = await handleRegister(data);
            setLoading(false);

            if (result.success) {
                setUserId(result.data);
                setConfirmationCode(result.confirmationCode); // Save the confirmation code
                setShowConfirmationInput(true); // Show confirmation input
                setCurrentStep(2); // Change step to confirmation input
            } else {
                setRegisterSuccess(false);
            }
            return;
        }

        if (currentStep === 2) {
            await validateConfirmationCode(); // Call validation here instead of handleVerifyCode
            return;
        }

        if (currentStep === 3) {
            if (!formData.selectedOffer) {
                setErrorMessage("Please select an offer to proceed.");
                return;
            }

            if (formData.selectedOffer === 'Free') {
                navigate('/login');
                return;
            }

            setCurrentStep(4);
        }
    };

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confirmationCode: '',
        showPassword: false,
        terms: false,
        selectedOffer: '',
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingPostalCode: '',
        billingCountry: '',
    });

    const countryCode = formData.billingCountry

    const handleBack = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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

    const handlePayment = async () => {
        setLoading(true); // Optional loading state

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        try {
            // Create payment intent by calling backend API
            const paymentIntentResponse = await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URL}/orders/payment/Intent`, {
                amount: parseFloat(offers.find(offer => offer.id === formData.selectedOffer)?.discounted_price),
                currency: 'usd',
            });

            const clientSecret = paymentIntentResponse.data.clientSecret;

            // Confirm card payment using Stripe.js
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: formData.full_name,
                        address: {
                            line1: formData.billingAddress,
                            city: formData.billingCity,
                            state: formData.billingState,
                            postal_code: formData.billingPostalCode,
                            country: formData.billingCountry,
                        },
                    },
                },
            });

            console.log(paymentIntent); // Log paymentIntent details

            if (error) {
                console.error(error);
                setRegisterSuccess(false); // Handle errors
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
                setRegisterSuccess(true);

                // Send the paymentIntent.id
                const billingData = {
                    userId,
                    billingAddress: formData.billingAddress,
                    billingCity: formData.billingCity,
                    billingState: formData.billingState,
                    billingPostalCode: formData.billingPostalCode,
                    billingCountry: formData.billingCountry,
                    paymentID: paymentIntent.id, // Send paymentIntent ID
                };

                console.log(billingData);
                await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URL}/user/billing`, billingData);
                console.log('Billing details sent!');

                // Navigate or update user state after successful payment
                navigate('/#');
            }
        } catch (error) {
            console.error("Payment error:", error);
            setRegisterSuccess(false);
        }

        setLoading(false);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <RegistrationForm
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        errorMessage={errorMessage}
                        darkMode={darkMode}
                    />
                );
            case 2:
                return (
                    <div>
                        {currentStep === 2 && (
                            <ConfirmationCodeInput
                                darkMode={darkMode}
                                formData={formData}
                                handleChange={handleChange}
                            />
                        )}
                    </div>
                );
            case 3:
                return (
                    <OfferSelection
                        darkMode={darkMode}
                        offers={offers}
                        formData={formData}
                        handleChange={handleChange}
                    />
                );
            case 4:
                return (
                    <div>
                        <PaymentForm
                            darkMode={darkMode}
                            offers={offers}
                            formData={formData}
                            handleChange={handleChange}
                            countries={countries}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`flex flex-col justify-around h-full p-10 ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}>
            <div>
                <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Create an account</h2>
                <p className={`text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Register now to grow your business in every possible way!</p>
            </div>
            {renderStepContent()}
            <div className='flex justify-between'>
                {currentStep > 1 && (
                    <button onClick={handleBack} className={`px-4 py-2 border rounded ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-black'}`}>
                        Back
                    </button>
                )}
                <button
                    onClick={currentStep === 4 ? handlePayment : handleNext}
                    className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`}
                >
                    {currentStep === 4 ? (
                        loading ? "Processing..." : "Complete"
                    ) : "Next"}
                </button>
            </div>
        </div>
    );
};

export default RegisterCard;