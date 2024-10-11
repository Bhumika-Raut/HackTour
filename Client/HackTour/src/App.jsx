import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Saved from './components/Saved';
import Account from './components/Account'; // Where sign-up happens

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Check if a user is signed up (logged in) on initial load
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Handle sign-out and clear the user data
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
        {/* Pass user and sign-out function to Navbar */}
        <Navbar 
          onToggleTheme={toggleTheme} 
          theme={theme} 
          user={user} 
          onSignOut={handleSignOut} 
        />
        
        <div className="homepage-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<Saved />} />
            <Route 
              path="/account" 
              element={<Account user={user} setUser={setUser} />} // Handle sign-up in Account page
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
