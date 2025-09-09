import React from "react";
import ThemeProvider from "./components/ThemeProvider";
import Login from "./components/Login";

function App() {
  return (
    <ThemeProvider>
      <h1 style={{ textAlign: "center", padding: "20px" }}>✨ Welcome ✨</h1>
      <Login />
    </ThemeProvider>
  );
}

export default App;
