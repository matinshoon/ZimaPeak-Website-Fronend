import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import AppLayout from './AppLayout';
import { ThemeContext } from './ThemeContext';
import ReactGA from 'react-ga4';

function App() {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
    ReactGA.send('pageview');
  }, []);

  useEffect(() => {
    const path = window.location.pathname;

    // Redirect old /blog/... links to https://zimapeak.com/go/...
    if (path.startsWith('/blog/')) {
      const newPath = path.replace('/blog/', 'https://zimapeak.com/go/');
      window.location.replace(newPath);
    }

    // Redirect https://zimapeak.com/go/... links to the external URL
    if (path.startsWith('https://zimapeak.com/go/')) {
      const externalUrl = `https://zimapeak.com${path}`;
      window.location.href = externalUrl;
    }

    // Keep your existing case studies redirect
    if (path === '/casestudies' || path.startsWith('/casestudy/')) {
      window.location.href = 'https://zimapeak.com/go/casestudies';
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
              <Route path="/services" element={<Services />} />
              <Route path="/marketing" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Privacy />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;