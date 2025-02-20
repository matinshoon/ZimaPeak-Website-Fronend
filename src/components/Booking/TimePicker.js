import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment-timezone';

const TimePicker = ({ formData, handleChange, darkMode }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(formData.appointmentTime || "");
    const [busyTimes, setBusyTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // User's local timezone
    const userTimezone = moment.tz.guess(); // e.g., 'America/Los_Angeles' for PST

    // EST available times (in EST timezone)
    const availableTimesEST = [
        "10:00", "11:00", "12:00", "13:00", "14:00",
        "15:00", "16:00", "17:00", "18:00", "19:00",
        "20:00", "21:00"
    ];

    // Fetch available times whenever the selected date changes
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableTimes(selectedDate);
        }
    }, [selectedDate]);

    // Function to fetch available times from the backend
    const fetchAvailableTimes = async (date) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_BASE_URL}/booking/available-times?date=${date.toISOString().split('T')[0]}`);
            const data = await response.json();

            const localBusyTimes = data.map(time => convertToLocalTime(time));
            setBusyTimes(localBusyTimes);
        } catch (error) {
            setError('Failed to fetch available times.');
        } finally {
            setLoading(false);
        }
    };

    // Convert EST times to user's local time zone (PST)
    const convertToLocalTime = (estTime) => {
        const estMoment = moment.tz(estTime, 'YYYY-MM-DD HH:mm', 'America/New_York'); // Convert from EST
        const localTime = estMoment.clone().tz(userTimezone); // Convert to user timezone
        return localTime.format('HH:mm'); // Return time in the user’s local format
    };

    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
            handleChange({ target: { name: "appointmentDate", value: date.toISOString().split('T')[0] } });
        }
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        handleChange({ target: { name: "appointmentTime", value: time } });
    };

    // Check if the time is available
    const isTimeAvailable = (time) => {
        return Array.isArray(busyTimes) && !busyTimes.includes(time);
    };

    // Convert available EST times to user's local time (PST) for display
    const localAvailableTimes = selectedDate 
        ? availableTimesEST.map((time) => {
            // Convert each EST time to the user's local time
            const localTime = convertToLocalTime(`${selectedDate.toISOString().split('T')[0]} ${time}:00`);
            return localTime;
        })
        : [];

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
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

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary"></div>
                </div>
            ) : (
                <>
                    <label htmlFor="appointmentTime" className="mb-2 font-semibold">Available Times:</label>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {localAvailableTimes.map((time, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleTimeChange(time)}
                                disabled={!selectedDate || !isTimeAvailable(time)}
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
                </>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default TimePicker;