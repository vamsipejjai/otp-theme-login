// src/components/ThemeProvider.js
import React, { createContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../styles/themes"; // ✅ FIXED import

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    // White theme between 10AM-12PM
    if (hour >= 10 && hour < 12) {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          background: theme.background,
          color: theme.text,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
