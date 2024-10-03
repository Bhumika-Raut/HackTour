import React, { useState, useEffect } from 'react';

function Account() {
  const [user, setUser] = useState(null);
  const [savedHacks, setSavedHacks] = useState([]);

  // Fetch user information and saved hacks
  useEffect(() => {
    // Replace with your actual API endpoint to fetch user data
    fetch('https://hacktour.onrender.com/account')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUser(data.user); // Assuming the API returns a user object
        setSavedHacks(data.savedHacks); // Assuming saved hacks are included in the response
      })
      .catch(error => {
        console.error('Error fetching account data:', error);
      });
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto px-16 md:px-20 px-3">
      <h1 className="text-3xl font-bold text-center mb-6">Account</h1>
      {user ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">User Information</h2>
          <p className="text-white">Name: {user.name}</p>
          <p className="text-white">Email: {user.email}</p>
        </div>
      ) : (
        <p className="text-white">Loading user information...</p>
      )}

      <h2 className="text-xl font-semibold mb-4 text-white mt-8">Saved Hacks</h2>
      {savedHacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedHacks.map(hack => (
            <div key={hack._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-white">{hack.title}</h3>
              <img src={hack.image} alt={hack.title} className="w-full h-32 object-cover mb-2 rounded-md" />
              <p className="text-white">{hack.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No saved hacks found.</p>
      )}
    </div>
  );
}

export default Account;
