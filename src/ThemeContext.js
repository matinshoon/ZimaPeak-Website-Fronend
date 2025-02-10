// ThemeContext.js
import React, { createContext, useState } from 'react';

const ThemeContext = createContext(); // Create a new context

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // Always white mode

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode); // Toggle theme state, but you can keep it unused if you want it to stay white
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };