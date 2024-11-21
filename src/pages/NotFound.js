import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10); // Initialize the counter to 5 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1); // Decrease the counter every second
    }, 1000);

    // Redirect to home when the counter reaches 0
    if (counter === 0) {
      navigate('/');
    }

    // Cleanup the timer on component unmount
    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-400 mb-6">
        The page you are looking for does not exist.
      </p>
      <p className="text-lg text-gray-600 mb-4">
        Redirecting to the homepage in {counter} second{counter === 1 ? '' : 's'}...
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 border-2 border-primary text-primary font-semibold rounded hover:bg-primary hover:text-white transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;