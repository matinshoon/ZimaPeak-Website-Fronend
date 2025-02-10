import React, { useState } from 'react';
import axios from 'axios';  // Import axios for API calls
import debounce from 'lodash/debounce';

const WebsiteForm = () => {
  const [formData, setFormData] = useState({
    // Existing fields
    fullName: '',
    phone: '',
    email: '',
    existingWebsite: '',
    websiteType: '',
    designRequirement: '',
    websiteObjective: [],
    budget: '',
    otherWebsiteType: '',
    otherDesignRequirement: '',
  });

  const getLocationFromIP = async () => {
    try {
      const { data } = await axios.get('https://ipapi.co/json/'); // Use any reliable IP geolocation API
      return {
        country: data.country_name || '',
        city: data.city || '',
        state: data.region || '',
      };
    } catch (error) {
      console.error('Error fetching location:', error);
      return { country: '', city: '', state: '' };
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({
    websiteType: '',
    designRequirement: '',
    budget: '',
    websiteObjective: '',
    fullName: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Reset error message when field is updated
  };

  const handleObjectiveChange = (objective) => {
    const updatedObjectives = formData.websiteObjective.includes(objective)
      ? formData.websiteObjective.filter((item) => item !== objective)
      : [...formData.websiteObjective, objective];
    setFormData({ ...formData, websiteObjective: updatedObjectives });
    setErrors({ ...errors, websiteObjective: '' }); // Reset error message
  };

  const handleNextStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Step 1: Website Type, Design, and Budget validation
    if (currentStep === 1) {
      if (!formData.websiteType) {
        newErrors.websiteType = 'Please select a website type.';
        isValid = false;
      }
      if (!formData.designRequirement) {
        newErrors.designRequirement = 'Please select a design requirement.';
        isValid = false;
      }
      if (!formData.budget) {
        newErrors.budget = 'Please select your budget.';
        isValid = false;
      }
    } else if (currentStep === 2) {
      // Step 2: Website objectives validation
      if (formData.websiteObjective.length === 0) {
        newErrors.websiteObjective = 'Please select at least one objective.';
        isValid = false;
      }
    } else if (currentStep === 3) {
      // Step 3: Contact info validation
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required.';
        isValid = false;
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required.';
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = 'Email address is required.';
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors(newErrors);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

        // Fire 'Ad_Lead_clicked' when user clicks the submit button
        if (window.gtag) {
          window.gtag('event', 'Lead_Form_Clicked', {
            event_category: 'Leads',
            event_label: `${formData.fullName} | ${formData.websiteType}`,
          });
        }
    try {
      // Fetch location data
      const locationData = await getLocationFromIP();

      // Prepare the data to send
      const leadData = {
        desired_type_of_website:
          formData.websiteType === 'Other'
            ? formData.otherWebsiteType
            : formData.websiteType || '',
        web_design_requirement:
          formData.designRequirement === 'Other'
            ? formData.otherDesignRequirement
            : formData.designRequirement || '',
        project_budget: formData.budget || '',
        objectives: formData.websiteObjective.join(', ') || '',
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || '',
        email: formData.email || '',
        tags: ['website-ad'],
        country: locationData.country,
        city: locationData.city,
        state: locationData.state,
      };

      // Send lead data to the endpoint
      const leadsResponse = await axios.post(
        `${process.env.REACT_APP_PUBLIC_BASE_URL}/leads/`,
        leadData
      );
      console.log('Lead data sent:', leadsResponse.data);

      // Trigger Google Analytics event
      let gtagFired = false;

      if (window.gtag && !gtagFired) {
        gtagFired = true;
        window.gtag('event', 'Lead_Form', {
          event_category: 'Leads',
          event_label: `${formData.fullName} | ${formData.websiteType}`,
          event_callback: () => {
            console.log('Google Analytics event tracked: Ad_Lead');
            window.location = 'https://zimapeak.com/website';
          },
          event_timeout: 2000,
        });
      }

      setLoading(false);
      setShowSuccessMessage(true);
    } catch (error) {
      setLoading(false);
      console.error('Error sending lead data:', error);
      alert('Something went wrong while submitting the form. Please try again later.');
    }
  };

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-100 flex justify-center items-center py-10">
      <div className="flex flex-col space-y-4 w-full">
        <div className="w-full bg-white md:w-[40vw] border shadow-2xl rounded-xl p-6">
        <h2 className="text-3xl mb-8 text-center">
          Let's start something great!
                    </h2>
          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-6 mt-4 mb-8">
            <div
              className="bg-gray-300 h-6 text-white rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            >Question {currentStep} of {totalSteps}</div>
          </div>

          {showSuccessMessage ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-xl font-semibold">
                Thank you for contacting us! We'll get back to you shortly.
              </h2>
              <p className="text-lg">
                You can book a free meeting with our team to go over your project details.
              </p>
              <a
                href="/booking"
                className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition duration-300"
              >
                Book a Free Meeting
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="md:h-[40vh] flex flex-col justify-between">
              {/* Step 1 */}
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="text-left block text-sm font-medium mb-2">
                      What type of website do you want?
                    </label>
                    <select
                      name="websiteType"
                      value={formData.websiteType}
                      onChange={handleInputChange}
                      className={`w-full border rounded-full p-3 mb-4 ${errors.websiteType ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Business">Business</option>
                      <option value="E-commerce">E-commerce / Online store</option>
                      <option value="Non-profit">Non-profit</option>
                      <option value="Personal">Personal website</option>
                      <option value="Not sure">I'm not sure</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.websiteType && <p className="text-red-500 text-sm">{errors.websiteType}</p>}

                    {formData.websiteType === 'Other' && (
                      <input
                        type="text"
                        name="otherWebsiteType"
                        value={formData.otherWebsiteType}
                        onChange={handleInputChange}
                        className="w-full border mt-2 rounded-full p-3"
                        placeholder="Please specify"
                        required
                      />
                    )}

                    <label className="text-left block text-sm font-medium mb-2 mt-4">
                      Which of these best describes your Web Design requirement?
                    </label>
                    <select
                      name="designRequirement"
                      value={formData.designRequirement}
                      onChange={handleInputChange}
                      className={`w-full border rounded-full p-3 mb-4 ${errors.designRequirement ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Create">Create a new website</option>
                      <option value="Overhaul">Overhaul of my website</option>
                      <option value="Minor changes">Minor changes to my website</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.designRequirement && <p className="text-red-500 text-sm">{errors.designRequirement}</p>}

                    {formData.designRequirement === 'Other' && (
                      <input
                        type="text"
                        name="otherDesignRequirement"
                        value={formData.otherDesignRequirement}
                        onChange={handleInputChange}
                        className="w-full border mt-2 rounded-full p-3"
                        placeholder="Please specify"
                        required
                      />
                    )}

                    <label className="text-left block text-sm font-medium mb-2 mt-4">
                      What is your estimated budget for this project?
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={`w-full border rounded-full p-3 mb-4 ${errors.budget ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Less than $500">Less than $500</option>
                      <option value="$500 - $999">$500 - $999</option>
                      <option value="$1,000 - $1,999">$1,000 - $1,999</option>
                      <option value="$2,000 - $2,999">$2,000 - $2,999</option>
                      <option value="$3,000 - $4,999">$3,000 - $4,999</option>
                      <option value="$5,000 or more">$5,000 or more</option>
                    </select>
                    {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
                  </div>

                  <button
                    type="button"
                    className="w-full bg-primary text-white py-3 rounded-full mt-4"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What are the objectives of your website?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Help customers find my business online',
                        'Sell my product or service and take payments online',
                        'Sell my product or service, taking payments offline',
                        'Provide information to the public',
                      ].map((objective) => (
                        <button
                          key={objective}
                          type="button"
                          className={`px-4 w-full py-2 rounded-full border ${formData.websiteObjective.includes(objective)
                            ? 'bg-blue-100 text-primary'
                            : 'bg-white text-gray-400'
                            }`}
                          onClick={() => handleObjectiveChange(objective)}
                        >
                          {objective}
                        </button>
                      ))}
                    </div>
                    {errors.websiteObjective && <p className="text-red-500 text-sm">{errors.websiteObjective}</p>}
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="bg-gray-300 text-black py-3 px-6 rounded-full"
                      onClick={handlePreviousStep}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="bg-primary text-white py-3 px-6 rounded-full"
                      onClick={handleNextStep}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <>
                  <div>
                    <div className='flex space-x-2'>
                      <div className="mb-4 w-full">
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full border rounded-full p-3 ${errors.firstName ? 'border-red-500' : ''}`}
                          placeholder="Enter your first name"
                          required
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                      </div>
                      <div className="mb-4 w-full">
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full border rounded-full p-3 ${errors.lastName ? 'border-red-500' : ''}`}
                          placeholder="Enter your last name"
                          required
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full border rounded-full p-3 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="Enter your phone number"
                        required
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full border rounded-full p-3 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email"
                        required
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-primary text-white py-3 rounded-full flex justify-center items-center`}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex justify-center items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Submitting... Please wait</span>
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteForm;