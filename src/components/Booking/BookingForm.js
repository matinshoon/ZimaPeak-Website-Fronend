import React from 'react';
import countries from '../../data/countries.json'; // Import your JSON file

const BookingForm = ({ formData, handleChange, darkMode }) => {
    return (
        <div className={`w-full p-4 ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={`p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={`p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                    required
                />
            </div>

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`mt-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {/* Country Code Dropdown */}
                <select
                    name="country_code"
                    value={formData.country_code}
                    onChange={handleChange}
                    className={`p-4 rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                >
                    {countries.map((country) => (
                        <option key={country.code} value={country.dial_code}>
                            {country.emoji} {country.dial_code} ({country.name})
                        </option>
                    ))}
                </select>

                {/* Phone Number Input */}
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                    required
                    pattern="^[0-9]{7,15}$"
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                />
            </div>

            <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website (optional)"
                className={`mt-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
            />

            <textarea
                name="additional_details"
                value={formData.additional_details}
                onChange={handleChange}
                placeholder="Provide additional details (optional)"
                className={`mt-4 p-4 w-full h-32 rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                rows="5"
            />

            <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms || false}
                    onChange={handleChange}
                    required
                    className="mr-2"
                />
                <label htmlFor="terms" className={`${darkMode ? 'text-white' : 'text-dark'}`}>
                    I agree to the <a href="https://zimapeak.com/terms" target="_blank" rel="noopener noreferrer" className="underline">terms and conditions</a> and <a href="https://zimapeak.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">privacy policy</a>.
                </label>
            </div>
        </div>
    );
};

export default BookingForm;