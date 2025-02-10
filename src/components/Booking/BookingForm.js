import React from 'react';

const BookingForm = ({ formData, handleChange, darkMode }) => {
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
            <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website (optional)"
                className={`mb-4 p-4 w-full rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
            />
                        <textarea
                name="additional_details"
                value={formData.additional_details}
                onChange={handleChange}
                placeholder="Provide additional details (optional)"
                className={`mb-4 p-4 w-full h-32 rounded ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-200 text-dark'}`}
                rows="5"
            />
            <div className="flex items-center mb-4">
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