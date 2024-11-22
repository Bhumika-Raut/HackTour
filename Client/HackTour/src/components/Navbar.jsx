import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ onToggleTheme, theme, user, onSignOut }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch search data whenever searchQuery changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        // Replace with your actual API endpoint for search
        const response = await fetch(`https://api.example.com/search?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.results); // Assuming response has 'results'
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // Delay fetching to avoid too many requests during typing
    const debounceTimer = setTimeout(fetchSearchResults, 500);

    // Cleanup timeout on component unmount or when searchQuery changes
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const navItems = (
    <>
      <li className="my-2 md:my-0 md:mx-4 text-lg">
        <Link to="/" className="hover:text-indigo-500 transition-colors duration-300">Home</Link>
      </li>
      <li className="my-2 md:my-0 md:mx-4 text-lg">
        <Link to="/account" className="hover:text-indigo-500 transition-colors duration-300">Account</Link>
      </li>
      {/* <li className="my-2 md:my-0 md:mx-4 text-lg">
        <Link to="/saved" className="hover:text-indigo-500 transition-colors duration-300">Saved</Link>
      </li> */}
    </>
  );

  return (
    <div className={`sticky top-0 z-50 px-6 py-4 shadow-lg ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-xl"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-indigo-500 transition-colors duration-300">
          HackTour
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex items-center">{navItems}</ul>

          {/* Search bar */}
          

          {/* Display search results */}
          {searchResults.length > 0 && (
            <div className="absolute top-16 left-0 bg-white shadow-lg rounded-md p-4 w-64">
              <ul className="space-y-2">
                {searchResults.map((result, index) => (
                  <li key={index} className="text-sm">
                    <Link to={`/details/${result.id}`} className="text-gray-800 hover:text-indigo-500 transition-colors duration-300">
                      {result.name} {/* Assuming each result has a 'name' property */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Theme Toggle */}
          <label className="swap swap-rotate ml-4">
            <input type="checkbox" checked={theme === "dark"} onChange={onToggleTheme} />
            <svg
              className="swap-off h-8 w-8 text-yellow-400" // Sun icon for light mode
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2 0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-8 w-8 text-white" // Moon icon for dark mode
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.88,1.12A8.04,8.04,0,1,1,11,2.73a1,1,0,0,0-.75-.25A9,9,0,1,0,21.64,13Z"
              />
            </svg>
          </label>

          {/* User Profile or Sign In */}
          {user ? (
            <div className="flex items-center space-x-4">
              <img src={user.profileImage} alt="Profile" className="h-8 w-8 rounded-full" />
              <span>{user.name}</span>
              <button onClick={onSignOut} className="text-red-500 hover:text-red-700">
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/signin" className="text-blue-500 hover:text-blue-700">Sign In</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-gray-100 shadow-lg p-4 rounded-lg">
          <ul className="space-y-4">
            {navItems}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
