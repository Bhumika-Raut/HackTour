import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Saved from './components/Saved';
import Account from './components/Account'; // Import the Account component

function App() {
  const [theme, setTheme] = useState("light"); // State for theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={theme === "dark" ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
        <Navbar onToggleTheme={toggleTheme} /> {/* Pass toggleTheme to Navbar */}
        <div className="homepage-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/account" element={<Account />} /> {/* Account Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
