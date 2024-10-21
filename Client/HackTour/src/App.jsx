import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Saved from './components/Saved';
import Account from './components/Account';

function App() {
    const [theme, setTheme] = useState("light");
    const [user, setUser] = useState(null);

    // Check if a user is signed in on initial load
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <Router>
            <div className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-gray-900"} transition duration-500`}>
                <Navbar user={user} handleSignOut={handleSignOut} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/account" element={<Account user={user} setUser={setUser} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
