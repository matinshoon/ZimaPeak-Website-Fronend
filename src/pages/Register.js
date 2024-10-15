import React from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterCard from '../components/Register/RegisterCard';
import RegisterBanner from '../components/Register/RegisterBanner';
import { ThemeContext } from '../ThemeContext';



const Register = () => {
    const { darkMode } = React.useContext(ThemeContext);

    return (
        <div className={`h-screen flex items-center overflow-hidden justify-center ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <Helmet>
                <title>Zimapeak - Signup</title>
            </Helmet>
            <div className="flex w-full h-screen">
                {/* Left Side: ClaimCard */}
                {/* <div className="w-1/2 p-6"> */}
                <div className="w-full md:w-1/2 flex md:block justify-center">

                    <RegisterCard />
                </div>
                {/* Right Side: ClaimBanner */}
                <div className={`hidden md:block w-1/2 flex items-center justify-center ${darkMode ? 'bg-' : 'bg-white'}`}>
                    <RegisterBanner />
                </div>
            </div>
        </div>
    );
};

export default Register;