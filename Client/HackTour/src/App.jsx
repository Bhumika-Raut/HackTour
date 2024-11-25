import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Account from './components/Account';

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleToggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} transition duration-500`}>
        <Navbar user={user} onToggleTheme={handleToggleTheme} theme={theme} onSignOut={handleSignOut} />
        <Routes>
          {/* Conditionally render either the Account or Home component */}
          <Route path="/" element={user ? <Home /> : <Account user={user} setUser={setUser} />} />
          <Route path="/account" element={<Account user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
