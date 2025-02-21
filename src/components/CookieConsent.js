import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div>
    <div className="md:hidden fixed inset-0 flex items-end justify-center p-4 md:p-6 z-50">
      <div className="bg-white shadow-2xl text-white rounded-2xl flex flex-col items-start space-y-4 w-full md:w-1/3 lg:w-1/4 p-4 md:p-6">
        <p className="text-sm md:text-base text-dark">
          We use cookies to improve your experience on our site. By using our site, you accept our use of cookies.
        </p>
        <div className="flex space-x-2 w-full">
          <button onClick={handleReject} className="w-full border-2 border-primary text-primary hover:bg-secondary hover:border-secondary hover:text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            Reject
          </button>
          <button onClick={handleAccept} className="w-full bg-primary hover:bg-white hover:text-primary text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            Accept
          </button>
        </div>
      </div>
    </div>

        <div className="hidden md:flex fixed bottom-0 left-0 m-4 p-4 md:p-6 bg-white shadow-2xl text-white rounded-2xl z-50 flex-col items-start space-y-4 w-11/12 md:w-1/3 lg:w-1/4">
        <p className="text-sm md:text-base text-dark">
          We use cookies to improve your experience on our site. By using our site, you accept our use of cookies.
        </p>
        <div className="flex space-x-2 w-full">
          <button onClick={handleReject} className="w-full border-2 border-primary text-primary hover:bg-secondary hover:border-secondary hover:text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            Reject
          </button>
          <button onClick={handleAccept} className="w-full bg-primary hover:bg-white hover:text-primary text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;