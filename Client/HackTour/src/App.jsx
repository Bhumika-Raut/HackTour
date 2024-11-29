import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Account from './components/Account';

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Handle sign-out action
  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Toggle between light and dark theme
  const handleToggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Apply the theme globally when it changes
  useEffect(() => {
    document.body.classList.toggle('bg-gray-900', theme === 'dark');
    document.body.classList.toggle('bg-white', theme === 'light');
    document.body.classList.toggle('text-white', theme === 'dark');
    document.body.classList.toggle('text-gray-800', theme === 'light');
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen transition duration-500 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <Navbar 
          user={user} 
          onToggleTheme={handleToggleTheme} 
          theme={theme} 
          onSignOut={handleSignOut} 
        />
        <Routes>
        <Route 
            path="/" 
            element={user ? <Home user={user} theme={theme} /> : <Account setUser={setUser} />} 
          />
          <Route 
            path="/account" 
            element={<Account setUser={setUser} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
