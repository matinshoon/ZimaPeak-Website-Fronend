import React from 'react';
import { Helmet } from 'react-helmet-async';
import BookingCard from '../components/Booking/BookingCard';
import RegisterBanner from '../components/Register/RegisterBanner';
import { ThemeContext } from '../ThemeContext';



const Register = () => {
    const { darkMode } = React.useContext(ThemeContext);

    return (
        <div className={`md:h-screen flex items-center overflow-hidden justify-center ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <Helmet>
                <title>Zimapeak - Book an appointment</title>
            </Helmet>
            <div className="flex w-full md:h-screen">
                <div className="w-full mt-20 md:mt-0 md:w-1/2 flex md:block justify-center">

                    <BookingCard />
                </div>
                <div className={`hidden md:block w-1/2 flex items-center justify-center ${darkMode ? 'bg-' : 'bg-white'}`}>
                    <RegisterBanner />
                </div>
            </div>
        </div>
    );
};

export default Register;