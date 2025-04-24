import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Home from './pages/Home';
// import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
// import Booking from './pages/Booking';
import About from './pages/About';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Done from './pages/Done';
import NotFound from './pages/NotFound';
import AppLayout from './AppLayout';
import { ThemeContext } from './ThemeContext';
import ReactGA from 'react-ga4';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import WebLanding from './pages/WebLanding';

function App() {
  const { darkMode } = useContext(ThemeContext);
  // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
    ReactGA.send('pageview');
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
  
    // Redirect old /blog/... links to /go/...
    if (path.startsWith('/blog/')) {
      const newPath = path.replace('/blog/', '/go/');
      window.location.replace(newPath);
    }
  
    // Keep your existing case studies redirect
    if (path === '/casestudies' || path.startsWith('/casestudy/')) {
      window.location.href = 'https://zimapeak.com/go/casestudies';
    }

    if (path === '/booking' || path.startsWith('/booking/')) {
      window.location.href = 'https://zimapeak.com/go/booking';
    }

    if (path === '/website' || path.startsWith('/website/')) {
      window.location.href = 'https://zimapeak.com/go/website';
    }
    
  }, []);

  return (
    <Router>
      <HelmetProvider>
        <div id="root" className={`${darkMode ? 'dark' : 'light'}`}>
          <Helmet>
            <title>Zimapeak Marketing | Toronto Digital Marketing Agency</title>
            <meta name="description" content="Zimapeak Marketing is a leading digital marketing agency in Toronto offering web development, SEO services, and social media marketing." />
            <link rel="canonical" href="https://www.zimapeak.com/" />
          </Helmet>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              {/* <Route 
                path="/register" 
                element={
                  <Elements stripe={stripePromise}>
                    <Register />
                  </Elements>
                } 
              /> */}
              <Route path="/services" element={<Services />} />
              <Route path="/marketing" element={<Services />} />
              <Route path="/done" element={<Done />} />
              <Route path="/services/:serviceName" element={<ServiceDetails />} />
              {/* <Route path="/booking" element={<Booking />} /> */}
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Privacy />} />
              <Route path="/careers" element={<Careers />} />
              {/* <Route path="/Website" element={<WebLanding />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;