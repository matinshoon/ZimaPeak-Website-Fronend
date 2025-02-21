import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../ThemeContext';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import logo from "../images/logo-primary.png"; // Ensure the correct path to your logo image

function Footer() {
  const { darkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  // Function to fetch user's IP and country information
  const getIpAndCountry = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      return {
        ip: response.data.ip,
        country: response.data.country_name,
        city: response.data.city,
        state: response.data.region,
      };
    } catch (error) {
      console.error('Error fetching IP or country:', error);
      return { ip: '', country: '', city: '', state: '' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the spinner

    const { ip, country, city, state } = await getIpAndCountry();

    const dataToCRM = {
      email: email,
      ip: ip,
      country: country,
      city: city,
      state: state,
      lists: [6],
      status: "subscribed",
      contactType: "lead",
      source: window.location.href,
      promotion: "10%",
    };

    try {
      const leadsResponse = await axios.post(
        `${process.env.REACT_APP_PUBLIC_BASE_URL}/leads`,
        dataToCRM
      );

      // Check for success with a status code or specific message
      if (leadsResponse.status >= 200 && leadsResponse.status < 300) {
        console.log('Lead submitted successfully:', leadsResponse.data);
        setSubmitted(true); // Show success message
        setLoading(false); // Stop loading spinner

        // Google Analytics Event
        if (window.gtag) {
          window.gtag('event', 'subscriber', {
            event_category: 'Leads',
            event_label: `${email}`,
          });
          console.log('Google Analytics event tracked: subscriber');
        }
      } else {
        console.error('Lead submission error:', leadsResponse.data);
        setLoading(false); // Stop spinner
      }
    } catch (error) {
      console.error('There was an error submitting the lead:', error);
      setLoading(false); // Stop spinner
    }
  };

  return (
    <section id="footer" className={`${darkMode ? 'bg-dark text-white' : 'bg-gray-200 text-dark'}`}>
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo and Social Icons Section */}
        <div className="flex flex-col items-center md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
          <img src={logo} className='h-32 mb-4' alt="Zimapeak Logo" /> {/* Increased size of the logo */}
          <div className="flex justify-center mb-4">
            <a href="https://x.com/zimapeak" className="mx-2 text-decoration-none">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61559690607181" className="mx-2 text-decoration-none">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.linkedin.com/company/zimapeak/" className="mx-2 text-decoration-none">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/zimapeak/" className="mx-2 text-decoration-none">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        
        {/* Links Section */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 md:w-1/2 lg:w-2/12">
          <a href="/about" className="text-decoration-none mb-2">About Us</a>
          <a href="/services" className="text-decoration-none mb-2">Services</a>
          <a href="/booking" className="text-decoration-none mb-2">Contact</a>
          <a href="/privacy" className="text-decoration-none mb-2">Privacy Policy</a>
        </div>

        {/* Subscribe Form Section */}
        <div className="w-full flex flex-col items-center text-center md:items-start md:text-left md:w-1/4">
          {submitted ? (
            <p className="text-center text-green-500">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <h3 className="text-base font-bold mb-4">Subscribe to our Newsletter to get 10% off</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className={`w-full p-2 mb-4 border rounded bg-gray-200 border-2 border-gray-400`}
              />
              <button
                type="submit"
                className={`w-full p-2 rounded bg-gray-400 text-white ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                disabled={loading} // Disable button during loading
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-75 mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Existing Footer Content */}
        <div className="w-full flex flex-col items-center text-center md:items-start md:text-left md:w-1/2 lg:w-1/4">
          <p className="m-0">&copy; ZimaPeak Marketing Inc. 2024</p>
          <div className="flex flex-col justify-center mt-2">
            <div className="w-full md:w-auto mb-2">
              <a href="https://www.google.com/maps/place/toronto/data=!4m2!3m1!1s0x89d4cb90d7c63ba5:0x323555502ab4c477?sa=X&ved=2ahUKEwimoNeUg72EAxXMjIkEHS7NCdsQh8EJegQIFhAA"
                className="text-decoration-none flex items-center justify-center md:justify-start">
                <i className="bi bi-geo-alt-fill pr-1"></i>Toronto - Canada
              </a>
            </div>
            <div className="w-full md:w-auto mb-2">
              <a href="mailto:support@zimapeak.com" className="text-decoration-none flex items-center justify-center md:justify-start">
                <i className="bi bi-envelope-at-fill pr-1"></i>support@zimapeak.com
              </a>
            </div>
            <div className="w-full md:w-auto">
              <a href="tel:+16475702244" className="text-decoration-none flex items-center justify-center md:justify-start">
                <i className="bi bi-telephone-fill pr-1"></i>+1 (647) 570-2244
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;