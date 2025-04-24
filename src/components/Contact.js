import React, { useState } from "react";
import contactVideo from "../videos/Support.mp4"; // Adjust the path as per your project structure
import { BsArrowRightCircle } from "react-icons/bs";
import axios from "axios";

const Contact = () => {
    const [selected_option, setselected_option] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        existingWebsite: "",
        termsAccepted: true,
    });

    const [formVisible, setFormVisible] = useState(true); // State to control form visibility
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message visibility
    const [error, setError] = useState(""); // State to store error messages
    const [showHiThere, setShowHiThere] = useState(false); // State to control "Hi there" visibility with animation
    const [loading, setLoading] = useState(false); // State to track loading

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOptionClick = (option) => {
        setselected_option(option);
        setFormData({ ...formData, selected_option: option });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation for required fields
        if (
            !formData.fullName ||
            !formData.phone ||
            !formData.email ||
            !formData.termsAccepted ||
            !selected_option
        ) {
            setError("Please fill in all required fields, including selecting a service.");
            return;
        } else {
            setError(""); // Clear any previous error
        }
    
        // Fetch user IP or any other additional data
        const userIp = await getUserIP(); // Replace with your IP-fetching method
        const locationData = await getIpAndCountry(); // Get location data from IP
    
        const dataToCRM = {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            website: formData.existingWebsite,
            service: selected_option,
            ip: userIp,
            country: locationData.country,
            city: locationData.city,
            state: locationData.state,
            lists: [5],
            status: "Pending",
            contactType: "lead",
            source: window.location.href,
        };
    
        setLoading(true); // Set loading state to true when form submission starts
    
        try {
            // Single API request to /leads
            const leadsResponse = await axios.post(
                `${process.env.REACT_APP_PUBLIC_BASE_URL}/leads`,
                dataToCRM
            );
    
            // Check for success based on the response message
            if (leadsResponse.data.message === "Contact successfully updated in FluentCRM") {
                console.log("Lead submitted successfully:", leadsResponse.data);
    
                // Google Analytics Event
                if (window.gtag) {
                    window.gtag('event', 'Contact_form', {
                        event_category: 'Leads',
                        event_label: `${formData.fullName} | ${formData.email} | ${formData.existingWebsite}`, // Use formData for the values
                    });
    
                    console.log('Google Analytics event tracked: Contact_form');
                }
    
                setFormVisible(false);
                setShowSuccessMessage(true);
            } else {
                // Handle unexpected responses
                console.error("Unexpected response:", leadsResponse.data);
                setError("There was an issue submitting your lead. Please try again.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setError("There was an error submitting your lead. Please try again.");
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    // Example IP fetching function
    const getUserIP = async () => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json"); // Use a public API to get IP
            return response.data.ip;
        } catch (error) {
            console.error("Error fetching IP address", error);
            return null; // Handle failure
        }
    };

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

    const handleLetsTalkClick = () => {
        // Hide the form and display 'Hi there' message with animation
        setFormVisible(false);
        setShowHiThere(true);

        // Reset the visibility after 1 second
        setTimeout(() => {
            setFormVisible(true);
            setShowHiThere(false); // Hide "Hi there" after form reappears
        }, 1000);
    };

    return (
        <div id="contact" className="flex flex-col lg:flex-row bg-gray-100 bg-tiles p-8 md:p-20 pb-20 justify-center items-center">
            <div className="w-full max-w-7xl h-auto mx-auto flex flex-col justify-center items-center">
                <div className="h-full flex flex-col w-full space-y-4">
                    <div className="flex flex-col lg:flex-row bg-white rounded-xl w-full">
                        {/* Text Content */}
                        <div className="w-full h-full lg:w-1/2 p-10 flex flex-col space-y-5 h-full text-left">
                            <h1 className="text-3xl lg:text-5xl">
                                Your Business,
                                <br /> Our Priority
                            </h1>
                            <p>
                                We understand the unique needs of your business and are here to
                                provide tailored solutions to help you grow and succeed. Let’s
                                work together to make an impact!
                            </p>
                            <a
                                onClick={handleLetsTalkClick}
                                className="text-primary font-bold cursor-pointer flex items-center gap-2"
                            >
                                Let's talk <span><BsArrowRightCircle /></span>
                            </a>
                        </div>

                        {/* Video Section */}
                        <div className="w-full lg:w-1/2 h-60 lg:h-full flex p-0 relative overflow-hidden rounded-b-xl lg:rounded-r-xl">
                            <video
                                src={contactVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="video object-cover w-full h-full"
                            >
                                Your browser does not support the video tag.
                            </video>
                            <div className="gradient-overlay"></div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[50vh] space-y-4 lg:space-y-0 lg:space-x-4">
                        {/* Info Section */}
                        <div className="w-full lg:w-6/12 bg-white p-10 rounded-xl hidden md:flex flex-col justify-between text-left">
                            <h1 className="text-2xl lg:text-3xl">
                                Why Choose Us?
                            </h1>
                            <div className='space-y-4'>
                                <p className="text-gray-600">
                                    We offer a range of services tailored to your specific needs. From strategic marketing campaigns to user-friendly website designs, our team is committed to delivering solutions that drive results. Whether you’re just starting out or looking to expand, we’re here to support your growth every step of the way.
                                </p>
                                <p>
                                    <span className='font-bold'>Our Expertise<br /></span>
                                    We specialize in marketing, web design, SEO, and content creation. Our goal is to create a strong online presence for your business, making it easier for potential customers to find you and engage with your brand.
                                </p>
                            </div>
                            <a
                                onClick={handleLetsTalkClick}
                                className="text-primary font-bold cursor-pointer flex items-center gap-2"
                            >
                                Let's talk <span><BsArrowRightCircle /></span>
                            </a>
                        </div>

                        {/* Form or Success Message Section */}
                        <div className="w-full lg:w-6/12 flex flex-col justify-between h-full">
                            {formVisible ? (
                                <div className="bg-white p-10 !h-auto rounded-xl flex items-center justify-center text-left w-full h-full">
                                    <form className="w-full" onSubmit={handleSubmit}>
                                        <div className="mb-4 flex flex-col lg:flex-row justify-between items-start gap-2">
                                            <div className="flex w-full flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name"
                                                    className="w-full border bg-white rounded-full p-4"
                                                    required
                                                />
                                            </div>
                                            <div className="flex w-full flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your phone number"
                                                    className="w-full border bg-white rounded-full p-4"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter your email address"
                                                className="w-full border bg-white rounded-full p-4"
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">What service interests you?</label>
                                            <div className="flex flex-wrap gap-2">
                                                {['Marketing', 'Web Design', 'Content', 'SEO'].map((option) => (
                                                    <button
                                                        type="button"
                                                        key={option}
                                                        onClick={() => handleOptionClick(option)}
                                                        className={`px-4 py-2 rounded-full border ${selected_option === option ? 'bg-blue-100 border-primary text-primary' : 'bg-white text-gray-400'}`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="mb-4 text-red-600">
                                                {error}
                                            </div>
                                        )}

                                        <div className="mb-4 space-y-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Existing Website (if any)</label>
                                            <input
                                                type="text"
                                                name="existingWebsite"
                                                value={formData.existingWebsite}
                                                onChange={handleInputChange}
                                                placeholder="Enter your website URL"
                                                className="w-full border bg-white rounded-full p-4"
                                            />
                                            <p className="text-sm text-gray-600">By clicking the submit button, you agree to<a href='/privacy/#s' className='ml-1 text-primary'>Terms and Conditions</a></p>
                                        </div>

                                        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                                        {/* Submit Button */}
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="bg-primary text-white py-3 px-6 rounded-full w-full"
                                                disabled={loading} // Disable button while loading
                                            >
                                                {loading ? "Submitting..." : "Submit"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : null}

                            {/* Success Message */}
                            {showSuccessMessage && (
                                <div className="bg-white p-6 rounded-xl w-full h-full flex items-center justify-center">
                                    <h2 className="text-xl font-semibold text-center">Thank you for contacting us! We'll get back to you shortly.</h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;