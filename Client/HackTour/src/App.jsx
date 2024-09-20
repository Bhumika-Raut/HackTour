import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Saved from "./components/Saved";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("light");

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={theme === "dark" ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
        <Navbar onToggleTheme={toggleTheme} />
        <div className="homepage-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
