// RegistrationForm.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = ({ formData, handleChange, setFormData, errorMessage, darkMode }) => {
    return (
        <div className={`w-full ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
            />
            <div className='flex space-x-4'>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                    required
                    pattern="[0-9]*"
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                />
            </div>
            <div className="relative mb-4">
                <input
                    type={formData.showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                    required
                />
                <button
                    type="button"
                    className={`absolute right-4 top-4 ${darkMode ? 'text-white' : 'text-dark'}`}
                    onClick={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
                >
                    <FontAwesomeIcon icon={formData.showPassword ? faEyeSlash : faEye} />
                </button>
            </div>
            {errorMessage && (
                <div className="text-red-500 mt-2">
                    {errorMessage}
                </div>
            )}
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="mr-2"
                />
                <label htmlFor="terms" className={`${darkMode ? 'text-white' : 'text-dark'}`}>
                    I agree to the <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer" className="underline">terms and conditions</a>
                </label>
            </div>
        </div>
    );
};

export default RegistrationForm;