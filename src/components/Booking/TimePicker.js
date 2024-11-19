import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TimePicker = ({ formData, handleChange, darkMode }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(formData.appointmentTime || "");
    const [busyTimes, setBusyTimes] = useState([]);
    const [error, setError] = useState(null);

    // Fetch available times whenever the selected date changes
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableTimes(selectedDate);
        }
    }, [selectedDate]);

    // Function to fetch available times from the backend
    const fetchAvailableTimes = async (date) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_BASE_URL}/booking/available-times?date=${date.toISOString().split('T')[0]}`);
            const data = await response.json();
            
            // Convert times from UTC to local time (e.g., Toronto)
            const localBusyTimes = data.map(time => convertToLocalTime(time));
            setBusyTimes(localBusyTimes);
        } catch (error) {
            setError('Failed to fetch available times.');
        }
    };

    // Convert UTC time to local time
    const convertToLocalTime = (utcTime) => {
        const date = new Date(`1970-01-01T${utcTime}Z`); // Assume UTC time (append 'Z' to indicate UTC)
        const localTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/Toronto' }));
        const hours = localTime.getHours().toString().padStart(2, '0');
        const minutes = localTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Handle date change and send it to the parent component
    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleChange({ target: { name: "appointmentDate", value: date.toISOString().split('T')[0] } });
    };

    // Handle time change and send it to the parent component
    const handleTimeChange = (time) => {
        setSelectedTime(time);
        handleChange({ target: { name: "appointmentTime", value: time } });
    };

    // Predefined available times
    const times = [
        "10:00", "11:00", "12:00", "13:00", "14:00", 
        "15:00", "16:00", "17:00", "18:00", "19:00",
        "20:00", "21:00"
    ];

    // Check if the time is available (not present in busyTimes)
    const isTimeAvailable = (time) => {
        return Array.isArray(busyTimes) && !busyTimes.includes(time);
    };

    // Disable today's date and set a 1-year range for date selection
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);  // Disable today
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <div className={`flex flex-col ${darkMode ? 'text-white' : 'text-dark'}`}>
            <label htmlFor="appointmentDate" className="mb-2 font-semibold">Select Date:</label>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={minDate}
                maxDate={maxDate}
                className={`w-full mb-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} calendar-size`}
            />

            <label htmlFor="appointmentTime" className="mb-2 font-semibold">Available Times:</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
                {times.map((time, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleTimeChange(time)}
                        disabled={!selectedDate || !isTimeAvailable(time)} // Disable unavailable times
                        className={`w-full py-2 text-sm font-normal rounded-lg transition-all duration-200 ease-in-out focus:outline-none 
                            ${selectedTime === time 
                            ? 'bg-primary text-white shadow-lg transform scale-105'
                            : darkMode
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-white text-black border-2 border-gray-300 hover:bg-gray-100'} 
                            ${(!selectedDate || !isTimeAvailable(time)) ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        {time}
                    </button>
                ))}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default TimePicker;