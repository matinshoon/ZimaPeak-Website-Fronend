// ConfirmationCodeInput.js
import React, { useState } from 'react';
import axios from 'axios';

const ConfirmationCodeInput = ({ darkMode, formData, handleChange }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendCode = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_PUBLIC_BASE_URL}/auth/resend-code`, { email: formData.email });
            setErrorMessage("A confirmation code has been sent to your email.");
        } catch (error) {
            console.error("Error sending confirmation code:", error);
            setErrorMessage("Failed to send confirmation code. Please try again.");
        }
    };

    return (
        <div className={`w-full ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <div className="flex flex-col space-y-4">
                <p className={`text-lg ${darkMode ? 'text-white' : 'text-dark'}`}>
                    Please check your email for the confirmation code. Enter it below to proceed.
                </p>
                <input
                    type="text"
                    name="confirmationCode"
                    value={formData.confirmationCode}
                    onChange={handleChange}
                    placeholder="Enter 4-digit code"
                    className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                    maxLength={4}
                />
                <div className="flex justify-between mb-4">
                    <button onClick={handleSendCode} className={`p-2 rounded ${darkMode ? 'bg-primary' : 'bg-primary'} text-white`}>
                        Resend Code
                    </button>
                </div>
                {errorMessage && (
                    <div className="text-red-500 mt-2">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmationCodeInput;